'use client'

import { useRef, useState } from 'react';
import Image from "next/image";
import FadeInSection from '@/app/components/FadeInSection';

interface GalleryImage {
  src: string;
  name: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/assets/gallery/tabling_marshall_student_center.webp", name: "Tabling at Marshall Student Center" },
  { src: "/assets/gallery/building_pc_workshop.webp", name: "Building a PC Workshop" },
  { src: "/assets/gallery/gbm_fall_2025.webp", name: "General Body Meeting Fall 2025" },
  { src: "/assets/gallery/git_github_workshop.webp", name: "Git & Github Workshop" },
  { src: "/assets/gallery/certifications_workshop.webp", name: "Certifications Workshop" },
  { src: "/assets/gallery/bellini_mentorship.webp", name: "Bellini Mentorship Mixer" },
  { src: "/assets/gallery/electronics_repair_workshop.webp", name: "Electronics Repair Workshop" },
  { src: "/assets/gallery/backend_workshop.webp", name: "BackEnd Workshop" },
  { src: "/assets/gallery/panda_express_social.webp", name: "Panda Express Social" },
  { src: "/assets/gallery/senior_students_panel.webp", name: "Senior Students Panel" },
  { src: "/assets/gallery/iot_workshop.webp", name: "IoT Workshop" },
  { src: "/assets/gallery/intern_panel.webp", name: "Intern Panel" },
];

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const scrollAmount = isMobile ? 340 : 380;
    const container = scrollContainerRef.current;
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;
    const duration = 500;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = startScroll + distance * easeOutCubic(progress);
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative w-full py-20 md:py-28">
      <FadeInSection>
        <div className="text-center mb-12 px-6">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
            In Action
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Gallery
          </h2>
        </div>
      </FadeInSection>

      <div className="relative flex flex-col md:flex-row items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-6 z-10 items-center justify-center w-12 h-12 bg-surface/90 dark:bg-surface/90 backdrop-blur-sm border border-borderColor hover:border-ieeeOrange text-foreground hover:text-ieeeOrange rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-5 overflow-x-auto px-6 md:mx-16 py-4 w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {galleryImages.map((image, index) => (
            <div key={index} className="shrink-0 w-[calc(100vw-3rem)] md:w-[350px] select-none group">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-borderColor group-hover:border-ieeeOrange/50 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-ieeeOrange/5">
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 350px"
                  draggable={false}
                />
                {/* Overlay with name */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                  <p className="text-white text-sm font-medium">{image.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-6 z-10 items-center justify-center w-12 h-12 bg-surface/90 dark:bg-surface/90 backdrop-blur-sm border border-borderColor hover:border-ieeeOrange text-foreground hover:text-ieeeOrange rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button
          onClick={() => scroll('left')}
          className="p-3 bg-surface border border-borderColor hover:border-ieeeOrange text-foreground hover:text-ieeeOrange rounded-full shadow-md transition-all duration-300"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="p-3 bg-surface border border-borderColor hover:border-ieeeOrange text-foreground hover:text-ieeeOrange rounded-full shadow-md transition-all duration-300"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  )
}
