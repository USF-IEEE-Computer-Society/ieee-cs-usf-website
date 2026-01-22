import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TECHX_DIR = path.join(process.cwd(), 'app/assets/techx');
const OUTPUT_DIR = path.join(process.cwd(), 'app/assets/techx-cropped');
const TARGET_ASPECT_RATIO = 16 / 9;

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

interface ImageStats {
  filename: string;
  originalWidth: number;
  originalHeight: number;
  originalAspect: string;
  newWidth: number;
  newHeight: number;
  cropType: 'width' | 'height' | 'perfect';
}

interface ProcessResult {
  success: ImageStats[];
  failed: { filename: string; error: string }[];
}

/**
 * Calculate the center crop dimensions to achieve 16:9 aspect ratio
 */
function calculateCenterCrop(width: number, height: number): { 
  cropWidth: number; 
  cropHeight: number; 
  offsetX: number; 
  offsetY: number;
  cropType: 'width' | 'height' | 'perfect';
} {
  const currentAspect = width / height;
  
  // Already 16:9 (with small tolerance)
  if (Math.abs(currentAspect - TARGET_ASPECT_RATIO) < 0.01) {
    return { 
      cropWidth: width, 
      cropHeight: height, 
      offsetX: 0, 
      offsetY: 0,
      cropType: 'perfect'
    };
  }
  
  let cropWidth: number;
  let cropHeight: number;
  
  if (currentAspect > TARGET_ASPECT_RATIO) {
    // Image is too wide, crop from sides
    cropHeight = height;
    cropWidth = Math.round(height * TARGET_ASPECT_RATIO);
  } else {
    // Image is too tall, crop from top/bottom
    cropWidth = width;
    cropHeight = Math.round(width / TARGET_ASPECT_RATIO);
  }
  
  // Calculate offsets to center the crop
  const offsetX = Math.round((width - cropWidth) / 2);
  const offsetY = Math.round((height - cropHeight) / 2);
  
  return { 
    cropWidth, 
    cropHeight, 
    offsetX, 
    offsetY,
    cropType: currentAspect > TARGET_ASPECT_RATIO ? 'width' : 'height'
  };
}

/**
 * Format aspect ratio as a readable string
 */
function formatAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;
  
  // For common ratios, simplify further
  const ratio = width / height;
  if (Math.abs(ratio - 16/9) < 0.01) return '16:9';
  if (Math.abs(ratio - 4/3) < 0.01) return '4:3';
  if (Math.abs(ratio - 3/2) < 0.01) return '3:2';
  if (Math.abs(ratio - 1) < 0.01) return '1:1';
  
  return `${ratioW}:${ratioH}`;
}

/**
 * Process a single image: center-crop to 16:9
 */
async function processImage(inputPath: string, outputPath: string): Promise<ImageStats> {
  const filename = path.basename(inputPath);
  
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;
  
  if (!width || !height) {
    throw new Error('Could not read image dimensions');
  }
  
  // Calculate crop
  const { cropWidth, cropHeight, offsetX, offsetY, cropType } = calculateCenterCrop(width, height);
  
  // Process and save
  await sharp(inputPath)
    .extract({
      left: offsetX,
      top: offsetY,
      width: cropWidth,
      height: cropHeight
    })
    .jpeg({ quality: 90 }) // Good quality JPEG
    .toFile(outputPath);
  
  return {
    filename,
    originalWidth: width,
    originalHeight: height,
    originalAspect: formatAspectRatio(width, height),
    newWidth: cropWidth,
    newHeight: cropHeight,
    cropType
  };
}

/**
 * Get all image files from a directory
 */
async function getImageFiles(directory: string): Promise<string[]> {
  const files = await fs.readdir(directory);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });
}

/**
 * Create a visual progress bar
 */
function progressBar(current: number, total: number, width: number = 30): string {
  const progress = current / total;
  const filled = Math.round(progress * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const percentage = Math.round(progress * 100);
  return `[${bar}] ${percentage}%`;
}

/**
 * Main processing function
 */
async function main(): Promise<void> {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       🖼️  TechX Image Center-Crop Tool (16:9)  🖼️            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('\n');
  
  console.log(`📁 Source:      ${TECHX_DIR}`);
  console.log(`📁 Output:      ${OUTPUT_DIR}`);
  console.log(`📐 Target:      16:9 aspect ratio (center crop)`);
  console.log('\n');
  
  // Ensure output directory exists
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log('✅ Output directory ready\n');
  } catch {
    console.log('✅ Using existing output directory\n');
  }
  
  // Get all image files
  const imageFiles = await getImageFiles(TECHX_DIR);
  
  if (imageFiles.length === 0) {
    console.log('❌ No images found in source directory\n');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} images to process\n`);
  console.log('─'.repeat(64));
  console.log('\n');
  
  const result: ProcessResult = {
    success: [],
    failed: []
  };
  
  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const inputPath = path.join(TECHX_DIR, filename);
    
    // Change extension to .jpg for output
    const baseName = path.basename(filename, path.extname(filename));
    const outputPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);
    
    process.stdout.write(`\r${progressBar(i, imageFiles.length)} Processing: ${filename.padEnd(35).slice(0, 35)}`);
    
    try {
      const stats = await processImage(inputPath, outputPath);
      result.success.push(stats);
    } catch (error) {
      result.failed.push({
        filename,
        error: (error as Error).message
      });
    }
  }
  
  // Clear the progress line and show completion
  process.stdout.write(`\r${progressBar(imageFiles.length, imageFiles.length)} Complete!${''.padEnd(40)}\n`);
  
  console.log('\n');
  console.log('═'.repeat(64));
  console.log('\n');
  
  // Summary
  console.log('📊 SUMMARY');
  console.log('─'.repeat(32));
  console.log(`   ✅ Successfully processed: ${result.success.length}`);
  console.log(`   ❌ Failed: ${result.failed.length}`);
  console.log('\n');
  
  // Stats breakdown
  if (result.success.length > 0) {
    const widthCropped = result.success.filter(s => s.cropType === 'width').length;
    const heightCropped = result.success.filter(s => s.cropType === 'height').length;
    const perfect = result.success.filter(s => s.cropType === 'perfect').length;
    
    console.log('📐 CROP BREAKDOWN');
    console.log('─'.repeat(32));
    console.log(`   ↔️  Cropped width (too wide):  ${widthCropped}`);
    console.log(`   ↕️  Cropped height (too tall): ${heightCropped}`);
    console.log(`   ✨ Already 16:9:              ${perfect}`);
    console.log('\n');
    
    // Show details for first few images
    console.log('📝 SAMPLE TRANSFORMATIONS');
    console.log('─'.repeat(32));
    
    const samplesToShow = Math.min(5, result.success.length);
    for (let i = 0; i < samplesToShow; i++) {
      const s = result.success[i];
      const cropIcon = s.cropType === 'width' ? '↔️' : s.cropType === 'height' ? '↕️' : '✨';
      console.log(`   ${cropIcon} ${s.filename.slice(0, 30).padEnd(30)}`);
      console.log(`      ${s.originalWidth}×${s.originalHeight} (${s.originalAspect}) → ${s.newWidth}×${s.newHeight} (16:9)`);
    }
    
    if (result.success.length > samplesToShow) {
      console.log(`   ... and ${result.success.length - samplesToShow} more`);
    }
    console.log('\n');
  }
  
  // Show failures if any
  if (result.failed.length > 0) {
    console.log('❌ FAILED FILES');
    console.log('─'.repeat(32));
    for (const f of result.failed) {
      console.log(`   • ${f.filename}: ${f.error}`);
    }
    console.log('\n');
  }
  
  console.log('═'.repeat(64));
  console.log(`\n🎉 Done! Cropped images saved to:\n   ${OUTPUT_DIR}\n`);
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Fatal error:', (error as Error).message);
  process.exit(1);
});
