import type { GalleryImage } from "@/types/gallery";

type ImageCardProps = {
  image: GalleryImage;
  onClick: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getImageUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Öppna bilden ${image.name}`}
      className="group block w-full overflow-hidden rounded-lg cursor-pointer"
    >
      <img
        src={getImageUrl(image.thumbnail)}
        alt={image.name}
        loading="lazy"
        className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  );
}