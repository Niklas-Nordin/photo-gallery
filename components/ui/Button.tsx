"use client";

import { useRouter } from "next/navigation";

function Button() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/gallery")}
      className="bg-[var(--wine-red)] text-white px-4 py-2 text-sm font-bold rounded cursor-pointer lg:px-8 lg:py-4"
    >
      EXPLORE GALLERY
    </button>
  );
}

export default Button;