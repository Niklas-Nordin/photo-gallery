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
      className="group block"
    >
      <CoverCollage
        covers={category.covers}
        alt={category.name}
      />

      <div className="mt-3 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-lg font-bold underline-offset-4 group-hover:underline">
          {category.name}
        </h2>

        <p className="text-sm text-stone-600">
          {albumCount === 0
            ? "Inga album"
            : `Antal album: ${albumCount}`}
        </p>
      </div>
    </Link>
  );
}