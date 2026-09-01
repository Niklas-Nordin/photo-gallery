import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/Landingpage_image.jpg"
          alt="Description"
          width={1200}
          height={592}
          className="w-full h-auto"
        />

        <div className="absolute inset-0 bg-black/40" />


        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-6">
          <h1 className="text-4xl font-bold text-center">
            Welcome to the Photo Gallery
          </h1>

          <p className="text-center">
            Explore my collection of stunning photographs.
          </p>

          <Button />
        </div>
      </div>

      <section className="w-full px-4 py-10 flex gap-8 items-center bg-[var(--coffee-background)]">
        <Image src="/linkedIn-me.jpg" alt="Gallery Image" width={300} height={300} className="rounded-full w-[300px] h-[300px]" />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">About Me</h2>
          <p className="">
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
    </div>
  );
}