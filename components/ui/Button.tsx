"use client";

import { useRouter } from "next/navigation";

function Button() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/gallery")}
      className="bg-[var(--wine-red)] text-white px-6 py-4 text-sm font-bold rounded cursor-pointer"
    >
      EXPLORE GALLERY
    </button>
  );
}

export default Button;