import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-screen">
        <Image
          src="/Landingpage_image.jpg"
          alt="Description"
          fill
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40" />


        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-6 p-6 lg:gap-10">
          <h1 className="text-4xl font-bold text-center lg:text-6xl">
            Welcome to the Photo Gallery
          </h1>

          <p className="text-center lg:text-2xl">
            Explore my collection of stunning photographs.
          </p>

          <Button />
        </div>
      </div>

      <section className="w-full px-6 py-10 flex flex-col gap-8 text-center items-center bg-[var(--coffee-background)] md:flex-row lg:justify-center lg:gap-16 lg:text-start">
        <Image src="/linkedIn-me.jpg" alt="Gallery Image" width={300} height={300} className="rounded-full w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]" />
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