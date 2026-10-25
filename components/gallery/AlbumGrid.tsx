// Will contain an amount of AlbumCards components
import type { Album } from "@/types/gallery";
import AlbumCard from "./AlbumCard";
import PreviousPageButton from "./PreviousPageButton";

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
    return <p>No albums found.</p>;
  }

  return (
    <>
      <PreviousPageButton />
      <p className="mb-6 text-[var(--wine-red)]/80">
        Choose an album to view its images.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.slug}
            album={album}
            categorySlug={categorySlug}
            hrefPrefix={hrefPrefix}
          />
        ))}
      </div>
    </>
  );
}