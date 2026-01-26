'use client'

import { useRef, useState } from 'react';
import Image from "next/image";

interface GalleryImage {
    src: string;
    name: string;
}

const galleryImages: GalleryImage[] = [
    { src: "/assets/gallery/b753b8de-9f1a-4453-ad0a-e95ad4f30a82.webp", name: "Tabling at Marshall Student Center" },
    { src: "/assets/gallery/image-20240913-232123-32df26ea.webp", name: "Building a PC Workshop" },
    { src: "/assets/gallery/image-20250912-192318-840449a3 1.webp", name: "General Body Meeting Fall 2025" },
    { src: "/assets/gallery/image-20251030-230821-c83d1d51.webp", name: "Git & Github Workshop" },
    { src: "/assets/gallery/image-20251113-235726-00b2d023.webp", name: "Certifications Workshop" },
    { src: "/assets/gallery/bellini_mentorship.webp", name: "Bellini Mentorship Mixer" },
    { src: "/assets/gallery/WhatsAppImage2024-09-20at21.52.28.webp", name: "Electronics Repair Workshop" },
    { src: "/assets/gallery/a990cd75-6b89-4ec0-bc4c-d1f4ebe96bc5.webp", name: "BackEnd Workshop" },
    { src: "/assets/gallery/PXL_20250915_220933519.webp", name: "Panda Express Social" },
    { src: "/assets/gallery/PXL_20250917_224641292.webp", name: "Senior Students Panel" },
    { src: "/assets/gallery/PXL_20251009_230407877.webp", name: "IoT Workshop" },
    { src: "/assets/gallery/e3ac21eb-7d1f-4fe3-9d15-b3cdb5c7ee10.webp", name: "Intern Panel" },
];

export default function Gallery() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        
        const isMobile = window.innerWidth < 768;
        const scrollAmount = isMobile ? 340 : 750; // Width of one card + gap
        const container = scrollContainerRef.current;
        const targetScroll = direction === 'left' 
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;
        
        // Custom smooth scroll animation
        const startScroll = container.scrollLeft;
        const distance = targetScroll - startScroll;
        const duration = 400; // ms
        let startTime: number | null = null;
        
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        
        const animateScroll = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            container.scrollLeft = startScroll + distance * easeOutCubic(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
        
        requestAnimationFrame(animateScroll);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className='w-full flex flex-col items-center bg-gray-100/50'>
            <div className='w-full py-10'>
                <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-8">Gallery</h2>

                {/* Carousel Container */}
                <div className="relative flex flex-col md:flex-row items-center px-4">
                    {/* Left Arrow - Hidden on mobile, shown on desktop */}
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:block absolute left-6 z-10 p-3 bg-neutral-800/90 hover:bg-ieeeOrange text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                        aria-label="Scroll left"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Scrollable Images Container */}
                    <div 
                        ref={scrollContainerRef}
                        className={`flex gap-4 overflow-x-auto scrollbar-hide px-2 md:mx-16 py-4 w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${!isDragging ? 'scroll-smooth' : ''}`}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        {galleryImages.map((image, index) => (
                            <div 
                                key={index} 
                                className="shrink-0 w-[calc(100vw-4rem)] md:w-80 select-none"
                            >
                                <div className="relative aspect-4/3 overflow-hidden rounded-xl border-2 border-neutral-700 hover:border-ieeeOrange transition-colors duration-175 select-none">
                                    <Image 
                                        src={image.src} 
                                        alt={image.name}
                                        fill
                                        className="object-cover pointer-events-none"
                                        sizes="(max-width: 768px) 100vw, 320px"
                                        draggable={false}
                                    />
                                </div>
                                
                                {/* Caption */}
                                <p className="text-center mt-4 text-base text-ieeeDark font-medium">
                                    {image.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow - Hidden on mobile, shown on desktop */}
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:block absolute right-6 z-10 p-3 bg-neutral-800/90 hover:bg-ieeeOrange text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                        aria-label="Scroll right"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Buttons - Below images */}
                <div className="flex md:hidden justify-center gap-6 mt-4">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 bg-neutral-800/90 hover:bg-ieeeOrange text-white rounded-full shadow-lg transition-all duration-300"
                        aria-label="Scroll left"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 bg-neutral-800/90 hover:bg-ieeeOrange text-white rounded-full shadow-lg transition-all duration-300"
                        aria-label="Scroll right"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}