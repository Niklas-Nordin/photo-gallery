"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/types/gallery";

type LightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getImageUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentImage = images[currentIndex];

  function showPrevious() {
    setCurrentIndex((index) =>
      index === 0 ? images.length - 1 : index - 1
    );
  }

  function showNext() {
    setCurrentIndex((index) =>
      index === images.length - 1 ? 0 : index + 1
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, images.length]);

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Bildvisare"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-white/80">
          {currentIndex + 1} / {images.length}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng bildvisaren"
          className="rounded-full p-2 text-3xl leading-none hover:bg-white/10"
        >
          &times;
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-16"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Föregående bild"
          className="absolute left-2 z-10 rounded-full bg-white/10 px-3 py-2 text-3xl hover:bg-white/20 sm:left-5 cursor-pointer"
        >
          ‹
        </button>

        <img
          key={currentImage.large}
          src={getImageUrl(currentImage.large)}
          alt={currentImage.name}
          className="max-h-full max-w-full object-contain"
        />

        <button
          type="button"
          onClick={showNext}
          aria-label="Nästa bild"
          className="absolute right-2 z-10 rounded-full bg-white/10 px-3 py-2 text-3xl hover:bg-white/20 sm:right-5 cursor-pointer"
        >
          ›
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="shrink-0 border-t border-white/15 px-3 py-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image.name}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Visa bild ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
              className={`h-14 w-16 shrink-0 overflow-hidden rounded border-2 sm:h-16 sm:w-20 ${
                index === currentIndex
                  ? "border-white opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={getImageUrl(image.thumbnail)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}