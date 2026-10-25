"use client";

import { useCallback, useState } from "react";
import type { GalleryImage } from "@/types/gallery";
import ImageCard from "./ImageCard";
import Lightbox from "./Lightbox";
import PreviousPageButton from "./PreviousPageButton";

type ImageGridProps = {
  images: GalleryImage[];
};

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  if (images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <>
      <PreviousPageButton />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {images.map((image, index) => (
          <ImageCard
            key={`${image.name}-${index}`}
            image={image}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}