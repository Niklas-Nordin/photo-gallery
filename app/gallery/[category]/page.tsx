"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Category } from "@/types/gallery";
import AlbumGrid from "@/components/gallery/AlbumGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const [data, setData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/?category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error("Kunde inte hämta album");
        }

        const result: Category = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fel vid hämtning av album:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, [category]);

  if (loading) {
    return <p className="p-6">Laddar album...</p>;
  }

  if (!data) {
    return <p className="p-6">Kunde inte hitta kategorin.</p>;
  }

  return (
    <main className="px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">{data.name}</h1>

      <AlbumGrid
        albums={data.albums ?? []}
        categorySlug={category}
      />
    </main>
  );
}