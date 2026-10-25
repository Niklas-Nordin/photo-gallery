"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/types/gallery";
import CategoryGrid from "@/components/gallery/CategoryGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_URL}/`);

        if (!response.ok) {
          throw new Error("Could not fetch categories");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className="px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">Gallery</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryGrid categories={categories} />
      )}
    </main>
  );
}