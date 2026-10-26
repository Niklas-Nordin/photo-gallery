import Image from "next/image";
import Button from "@/components/ui/Button";
import LatestAlbums from "@/components/gallery/LatestAlbums";
import { Album } from "@/types/gallery";

// Funktion för att hämta de 5 senaste albumen från PHP-backend
async function getLatestAlbums(): Promise<(Album & { categorySlug: string })[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?latest=5`, {
      cache: "no-store", // Säkerställer att du alltid får den senaste datan
    });

    if (!res.ok) return [];

    const data = await res.json();
    
    // PHP-skriptet med ?latest=5 returnerar en lista med bilder. 
    // Om du vill visa de 5 senaste *albumen* istället, 
    // kan du antingen hämta vanliga kategorier/album eller anpassa anropet.
    // Här utgår vi från att din data matchar strukturen:
    return data;
  } catch (error) {
    console.error("Kunde inte hämta senaste albumen:", error);
    return [];
  }
}

export default async function Home() {
  // Hämta albumen direkt på servern
  const latestAlbums = await getLatestAlbums();

  return (
    <div>
      <div className="relative w-full min-h-[calc(100vh-62px)]">
        <Image
          src="/Landingpage_image.jpg"
          alt="Description"
          fill
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-6 p-4 lg:gap-10">
          <div className="flex flex-col items-center justify-center text-center flex-1 gap-12">
            <h1 className="text-4xl font-bold text-center lg:text-6xl">
              Welcome to the Photo Gallery
            </h1>

            <p className="text-center lg:text-2xl">
              Explore my collection of stunning photographs.
            </p>
          </div>
          
          <div className="pb-10">
            <Button />
          </div>
        </div>
      </div>

      <section className="w-full py-30 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-center items-center bg-[var(--coffee-background)] md:flex-row lg:justify-center lg:gap-16 lg:text-start max-w-7xl mx-auto">
        <Image src="/linkedIn-me.jpg" alt="Gallery Image" width={300} height={300} className="rounded-full w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]" />
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2 className="text-xl font-bold lg:text-4xl">About Me</h2>
          <p className="text-lg">
            I am a passionate photographer with a love for capturing the beauty and character of the world around me. Through my photography, I aim to preserve meaningful moments, explore new perspectives, and tell stories through images. 
            <br/>
            <br/>
            Take a look through my gallery to discover some of my favorite photographs and the places, people, and moments that have inspired me.
          </p>
          <a href="/about" className="text-[var(--wine-red)] hover:underline">
            Read more ➡️
          </a>
        </div>
      </section>

      {/* Här skickar vi med de hämtade albumen till din nya karusell! */}
      <LatestAlbums albums={latestAlbums} />
    </div>
  );
}