function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background p-4 border-t border-[var(--border-color)] text-[var(--wine-red)] font-bold">
        <div className="flex items-center justify-center">
            <p>&copy; {currentYear} Photo Gallery. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;