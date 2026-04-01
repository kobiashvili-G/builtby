"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex h-20 w-full items-center justify-between px-8 transition-all duration-300 md:px-16 ${
        scrolled ? "bg-cream/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <span className="font-display text-[22px] font-extrabold tracking-[2px] text-primary">
        BUILTBY
      </span>

      <div className="flex items-center gap-4">
        <a
          href="#projects"
          className="flex items-center gap-2 rounded-lg bg-accent-bg px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[1.5px] text-primary transition-transform hover:scale-105"
        >
          <ExternalLink size={16} />
          PROJECTS
        </a>
        <button
          className="rounded-lg border border-subtle bg-white p-2.5 transition-colors hover:bg-cream"
          aria-label="Menu"
        >
          <Menu size={20} className="text-primary" />
        </button>
      </div>
    </nav>
  );
}
