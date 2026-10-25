import Link from "next/link";
import type { Category } from "@/types/gallery";
import CoverCollage from "./CoverCollage";

type CategoryCardProps = {
  category: Category;
  hrefPrefix?: string;
};

export default function CategoryCard({
  category,
  hrefPrefix = "/gallery",
}: CategoryCardProps) {
  const albumCount = category.albums?.length ?? 0;

  return (
    <Link
      href={`${hrefPrefix}/${category.slug}`}
      className="group relative block overflow-hidden rounded-lg bg-neutral-950 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Bildbehållare */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CoverCollage
          covers={category.covers}
          alt={category.name}
        />

        {/* 1. Varmare och mjukare gradient i botten */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 via-neutral-950/30 to-transparent pointer-events-none" />

        {/* Uppe till höger: Antal album (med din vinröda glas-effekt) */}
        <div className="absolute top-3 right-3 rounded-full bg-wine-red/70 px-3 py-1 text-[12px] font-medium tracking-widest text-white/95 backdrop-blur-md border border-wine-red/80 shadow-sm">
          {albumCount === 0
            ? "No albums"
            : albumCount === 1
            ? "1 album"
            : `${albumCount} albums`}
        </div>

        {/* Längst ner: Kategorinamn med samma snygga typografi och slide-effekt */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-neutral-950/60 to-transparent backdrop-blur-[2px]">
          <h2 className="font-serif text-2xl font-normal tracking-wide text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:translate-x-1">
            {category.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}