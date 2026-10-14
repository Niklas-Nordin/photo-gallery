import Link from "next/link";
import type { Album } from "@/types/gallery";
import CoverCollage from "./CoverCollage";

type AlbumCardProps = {
  album: Album;
  categorySlug: string;
  hrefPrefix?: string;
};

export default function AlbumCard({
  album,
  categorySlug,
  hrefPrefix = "/gallery",
}: AlbumCardProps) {
  const imageCount = album.imageCount ?? 0;

  return (
    <Link
      href={`${hrefPrefix}/${categorySlug}/${album.slug}`}
      className="group block"
    >
      <CoverCollage
        covers={album.covers}
        alt={album.name}
      />

      <div className="mt-3 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-lg font-bold underline-offset-4 group-hover:underline">
          {album.name}
        </h2>

        <p className="text-sm text-stone-600">
          {imageCount === 0
            ? "Inga bilder"
            : `Antal bilder: ${imageCount}`}
        </p>
      </div>
    </Link>
  );
}