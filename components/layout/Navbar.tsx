"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
  return (
    <nav className="bg-background px-6 py-4 border-b border-[var(--border-color)] text-[var(--wine-red)] font-bold sticky top-0 z-50">
        <div className="flex items-center justify-between">
            <div className="font-bold text-xl">Photo Gallery</div>
            <div className="hidden space-x-4 lg:flex">
            <Link href="/" className="hover:underline underline-offset-6">
                Home
            </Link>
            <Link href="/gallery" className="hover:underline underline-offset-6">
                Public Gallery
            </Link>
            <Link href="/private" className="hover:underline underline-offset-6">
                Private Gallery
            </Link>
            <Link href="/about" className="hover:underline underline-offset-6">
                About
            </Link>
        </div>
            
        
        <div className="lg:hidden z-50">
            {isOpen ? (
                <Image src="/close.svg" alt="Close Menu" width={30} height={30} className="cursor-pointer lg:hidden" onClick={toggleMenu} />
            ) : (
                <Image src="/hamburger-menu.svg" alt="Hamburger Menu" width={30} height={30} className="cursor-pointer lg:hidden" onClick={toggleMenu} />
            )}

        </div>

            {isOpen && (
                <div className="fixed inset-0 z-30" onClick={toggleMenu}>
                    <div className="absolute top-0 right-0 bg-background border border-[var(--border-color)] rounded-lg shadow-lg p-4 pt-14 flex flex-col space-y-2 min-h-screen w-1/2 z-40 lg:hidden" onClick={(e) => e.stopPropagation()}>
                        <Link href="/" className="hover:underline underline-offset-6" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link href="/gallery" className="hover:underline underline-offset-6" onClick={toggleMenu}>
                            Public Gallery
                        </Link>
                        <Link href="/private" className="hover:underline underline-offset-6" onClick={toggleMenu}>
                            Private Gallery
                        </Link>
                        <Link href="/about" className="hover:underline underline-offset-6" onClick={toggleMenu}>
                            About
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
  );
}

export default Navbar;