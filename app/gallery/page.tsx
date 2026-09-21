"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Category } from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

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
      }
    }

    fetchCategories();
  }, []);

  return (
    <main className="px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const covers = category.covers ?? [];

          return (
            <Link
              key={category.slug}
              href={`/gallery/${category.slug}`}
              className="group"
            >
              {/* Bildruta */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                {/* 1 bild */}
                {covers.length === 1 && (
                  <img
                    src={`${API_URL}${covers[0].thumbnail}`}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                )}

                {/* 2 bilder - diagonal */}
                {covers.length === 2 && (
                  <>
                    <img
                      src={`${API_URL}${covers[0].thumbnail}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      }}
                    />

                    <img
                      src={`${API_URL}${covers[1].thumbnail}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                      }}
                    />

                    {/* Diagonal linje */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 2px, 2px 100%, 0 100%)",
                      }}
                    />
                  </>
                )}

                {/* 3 bilder */}
                {covers.length === 3 && (
                  <>
                    <img
                      src={`${API_URL}${covers[0].thumbnail}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      }}
                    />

                    <img
                      src={`${API_URL}${covers[1].thumbnail}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{
                        clipPath:
                          "polygon(100% 0, 100% 50%, 50% 50%)",
                      }}
                    />

                    <img
                      src={`${API_URL}${covers[2].thumbnail}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{
                        clipPath:
                          "polygon(0 100%, 50% 50%, 100% 50%, 100% 100%)",
                      }}
                    />
                  </>
                )}

                {/* 4 bilder */}
                {covers.length >= 4 && (
                  <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
                    {covers.slice(0, 4).map((cover) => (
                      <img
                        key={cover.name}
                        src={`${API_URL}${cover.thumbnail}`}
                        alt=""
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    ))}
                  </div>
                )}

                {/* Hover-overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>

              {/* Kategorinamn */}
              <h2 className="mt-3 text-lg font-bold underline-offset-4 group-hover:underline">
                {category.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </main>
  );
}