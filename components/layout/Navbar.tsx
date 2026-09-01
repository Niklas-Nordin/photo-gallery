import Link from "next/link";

function Navbar() {
  return (
    <>
        <nav className="bg-background p-4 border-b border-[var(--border-color)] text-[var(--wine-red)] font-bold">
            <div className="flex items-center justify-between">
                <div className="font-bold text-xl">Photo Gallery</div>
                <div className="flex space-x-4">
                <Link href="/" className="hover:underline">
                    Home
                </Link>
                <Link href="/gallery" className="hover:underline">
                    Public Gallery
                </Link>
                <Link href="/private" className="hover:underline">
                    Private Gallery
                </Link>
                <Link href="/about" className="hover:underline">
                    About
                </Link>
                </div>
            </div>
        </nav>
    </>
  );
}

export default Navbar;