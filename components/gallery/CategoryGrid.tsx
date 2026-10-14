import type { Category } from "@/types/gallery";
import CategoryCard from "./CategoryCard";

type CategoryGridProps = {
  categories: Category[];
  hrefPrefix?: string;
};

export default function CategoryGrid({
  categories,
  hrefPrefix = "/gallery",
}: CategoryGridProps) {
  if (categories.length === 0) {
    return <p>Inga kategorier hittades.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.slug}
          category={category}
          hrefPrefix={hrefPrefix}
        />
      ))}
    </div>
  );
}