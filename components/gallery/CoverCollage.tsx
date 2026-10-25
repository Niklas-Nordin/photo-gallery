
import type { GalleryCover } from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CoverCollageProps = {
  covers?: GalleryCover[];
  alt: string;
};

export default function CoverCollage({
  covers = [],
  alt,
}: CoverCollageProps) {
  const firstImage = covers[0];

  if (!firstImage) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-stone-200 text-stone-500">
        No images available
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <img
        src={`${API_URL}${firstImage.thumbnail}`}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </div>
  );
}
