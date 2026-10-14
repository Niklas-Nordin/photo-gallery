// Will contain an amount of AlbumCards components
import type { Album } from "@/types/gallery";
import AlbumCard from "./AlbumCard";

type AlbumGridProps = {
  albums: Album[];
  categorySlug: string;
  hrefPrefix?: string;
};

export default function AlbumGrid({
  albums,
  categorySlug,
  hrefPrefix = "/gallery",
}: AlbumGridProps) {
  if (albums.length === 0) {
    return <p>Inga album hittades.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <AlbumCard
          key={album.slug}
          album={album}
          categorySlug={categorySlug}
          hrefPrefix={hrefPrefix}
        />
      ))}
    </div>
  );
}