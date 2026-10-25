"use client";

import { useRouter } from "next/navigation";

type PreviousPageButtonProps = {
  href?: string; // Valfritt: om du vill länka till en specifik sida istället för att gå bakåt i historiken
  label?: string;
};

export default function PreviousPageButton({
  href,
  label = "Back",
}: PreviousPageButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors text-white hover:text-white cursor-pointer bg-[var(--wine-red)] border border-[var(--wine-red)]/20 hover:bg-[var(--wine-red)]/80 w-fit px-2.5 py-1 rounded-full pr-4 mb-6"
    >
        {/* Pil-ikon (du kan byta ut mot din egna pil eller SVG) */}
        <svg
          className="size-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      <span>{label}</span>
    </button>
  );
}