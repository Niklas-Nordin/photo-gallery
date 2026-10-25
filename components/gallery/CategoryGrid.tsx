import type { Category } from "@/types/gallery";
import CategoryCard from "./CategoryCard";
import PreviousPageButton from "./PreviousPageButton";

type CategoryGridProps = {
  categories: Category[];
  hrefPrefix?: string;
};

export default function CategoryGrid({
  categories,
  hrefPrefix = "/gallery",
}: CategoryGridProps) {
  if (categories.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <>
      <PreviousPageButton />
      <p className="mb-6 text-[var(--wine-red)]/80">
        Choose a category to view its albums.
      </p>
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.slug}
          category={category}
          hrefPrefix={hrefPrefix}
        />
      ))}
    </div>
    </>
  );
}