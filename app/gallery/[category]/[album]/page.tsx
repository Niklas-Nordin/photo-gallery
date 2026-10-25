"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Album } from "@/types/gallery";
import ImageGrid from "@/components/gallery/ImageGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AlbumPage() {
  const params = useParams();

  const category = params.category as string;
  const album = params.album as string;

  const [data, setData] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/?category=${encodeURIComponent(category)}&album=${encodeURIComponent(album)}`
        );

        if (!response.ok) {
          throw new Error("Could not fetch images");
        }

        const result: Album = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching images:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [category, album]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!data) {
    return <p className="p-6">Album not found.</p>;
  }

  return (
    <main className="px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">{data.name}</h1>

      <ImageGrid images={data.images ?? []} />
    </main>
  );
}