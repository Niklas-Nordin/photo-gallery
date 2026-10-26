"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Album } from "@/types/gallery";
import AlbumCard from "@/components/gallery/AlbumCard"; // Se till att sökvägen stämmer

interface LatestAlbumsProps {
  albums: (Album & { categorySlug: string })[];
  hrefPrefix?: string;
}

export default function LatestAlbumsSection({ 
  albums, 
  hrefPrefix = "/gallery" 
}: LatestAlbumsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Vi scrollar ett fast mått (t.ex. 380px eller 400px beroende på kortstorlek)
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!albums || albums.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
      {/* Rubrik & Pil-kontroller */}
        <div className="w-full bg-black/50 h-[1px] mb-10"></div>
          <div className="flex items-end justify-between mb-6 mt-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mt-1">
                Senast uppladdade album
              </h2>
            </div>

          {/* Pilknappar för desktop */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scrolla vänster"
              className="p-2.5 rounded-full border border-border/80 bg-white/50 hover:bg-wine-red hover:text-white transition-all duration-200 text-foreground cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scrolla höger"
              className="p-2.5 rounded-full border border-border/80 bg-white/50 hover:bg-wine-red hover:text-white transition-all duration-200 text-foreground cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horisontell karusell utan "hackig" snap-tvingan */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {albums.map((album) => (
            <div
              key={album.slug}
              className="flex-none w-[300px] sm:w-[380px]"
            >
              <AlbumCard
                album={album}
                categorySlug={album.categorySlug}
                hrefPrefix={hrefPrefix}
              />
            </div>
          ))}
        </div>
        <div className="w-full bg-black/50 h-[1px] mt-10"></div>
      </div>

    </section>
  );
}