"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Category } from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryPage() {
  const params = useParams();

  const category = params.category as string;

  const [data, setData] = useState<Category | null>(null);

  useEffect(() => {
    async function fetchAlbums() {
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
      }
    }

    fetchAlbums();
  }, [category]);

  if (!data) {
    return <p>Laddar...</p>;
  }

  return (
    <main>
      <h1>{data.name}</h1>

      <div>
        {data.albums?.map((album) => (
          <Link
            key={album.slug}
            href={`/gallery/${category}/${album.slug}`}
          >
            <div>
              <div>
                {album.covers?.map((cover) => (
                  <img
                    key={cover.name}
                    src={`${API_URL}${cover.thumbnail}`}
                    alt=""
                  />
                ))}
              </div>

              <h2>{album.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}