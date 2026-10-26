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
      className="group relative block overflow-hidden rounded-lg bg-neutral-950 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Bildbehållare */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CoverCollage
          covers={album.covers}
          alt={album.name}
        />

        {/* 1. Varmare och mjukare gradient i botten (kombinerar mörkt med en hint av varm brun/bärton) */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 via-neutral-950/30 to-transparent pointer-events-none" />

        {/* Uppe till höger: Antal bilder (lite mjukare glas-effekt) */}
        <div className="absolute top-3 right-3 rounded-full bg-wine-red/70 px-3 py-1 text-[12px] font-medium tracking-widest text-white/95 backdrop-blur-md border border-wine-red/80 shadow-sm">
          {imageCount === 0 ? "No images" : `${imageCount} images`}
        </div>

        {/* Längst ner: Albumnamn med en subtil, varmare ton istället för hårdsvart */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-neutral-950/60 to-transparent backdrop-blur-[2px]">
          <h2 className="font-serif text-2xl font-normal tracking-wide text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:translate-x-1">
            {album.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}