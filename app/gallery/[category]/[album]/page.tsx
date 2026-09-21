"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Album } from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AlbumPage() {
  const params = useParams();

  const category = params.category as string;
  const album = params.album as string;

  const [data, setData] = useState<Album | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(
          `${API_URL}/?category=${encodeURIComponent(category)}&album=${encodeURIComponent(album)}`
        );

        if (!response.ok) {
          throw new Error("Kunde inte hämta bilder");
        }

        const result: Album = await response.json();

        setData(result);
      } catch (error) {
        console.error("Fel vid hämtning av bilder:", error);
      }
    }

    fetchImages();
  }, [category, album]);

  if (!data) {
    return <p>Laddar...</p>;
  }

  return (
    <main>
      <h1>{data.name}</h1>

      <div>
        {data.images?.map((image) => (
          <img
            key={image.name}
            src={`${API_URL}${image.thumbnail}`}
            alt={image.name}
          />
        ))}
      </div>
    </main>
  );
}