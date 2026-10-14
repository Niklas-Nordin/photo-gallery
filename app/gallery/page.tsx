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
          throw new Error("Kunde inte hämta kategorier");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Fel vid hämtning av kategorier:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className="px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>

      {loading ? (
        <p>Laddar kategorier...</p>
      ) : (
        <CategoryGrid categories={categories} />
      )}
    </main>
  );
}