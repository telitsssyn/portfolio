"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type AutoSliderProps = {
  images: string[];
  intervalMs?: number;
};

export function AutoSlider({ images, intervalMs = 4000 }: AutoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(images.length > 1);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scrollBy = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ 
        left: direction === "left" ? -clientWidth : clientWidth, 
        behavior: "smooth" 
      });
    }
  };

  useEffect(() => {
    if (intervalMs <= 0) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  if (images.length === 0) return null;

  return (
    <div className="relative flex-1 w-full max-w-full overflow-hidden group rounded-2xl bg-neutral-900 border border-neutral-800">
      <div 
        ref={scrollRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button 
          onClick={() => scrollBy("left")}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 opacity-0 group-hover:opacity-100 border border-white/20 shadow-sm"
          aria-label="Previous image"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {canScrollRight && (
        <button 
          onClick={() => scrollBy("right")}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 opacity-0 group-hover:opacity-100 border border-white/20 shadow-sm"
          aria-label="Next image"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      
      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.map((_, idx) => (
            <div key={idx} className="h-1.5 w-1.5 rounded-full bg-white/50" />
          ))}
        </div>
      )}
    </div>
  );
}
