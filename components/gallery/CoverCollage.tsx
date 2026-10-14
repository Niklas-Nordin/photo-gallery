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
  const images = covers.slice(0, 4);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-stone-200 text-stone-500">
        Inga bilder
      </div>
    );
  }

  const clipPaths: Record<number, string[]> = {
    2: [
      "polygon(0 0, 100% 0, 0 100%)",
      "polygon(100% 0, 100% 100%, 0 100%)",
    ],
    3: [
      "polygon(0 0, 100% 0, 0 100%)",
      "polygon(100% 0, 100% 50%, 50% 50%)",
      "polygon(0 100%, 50% 50%, 100% 50%, 100% 100%)",
    ],
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      {images.length === 1 && (
        <img
          src={`${API_URL}${images[0].thumbnail}`}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {(images.length === 2 || images.length === 3) &&
        images.map((image, index) => (
          <img
            key={image.name}
            src={`${API_URL}${image.thumbnail}`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              clipPath: clipPaths[images.length][index],
            }}
          />
        ))}

      {images.length === 4 && (
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
          {images.map((image) => (
            <img
              key={image.name}
              src={`${API_URL}${image.thumbnail}`}
              alt=""
              className="h-full w-full object-cover"
            />
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </div>
  );
}