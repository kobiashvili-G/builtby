"use client";

import { useEffect, useState } from "react";

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

      <span className="font-display text-[14px] font-extrabold tracking-[1px] text-tertiary">
        .PRO
      </span>
    </nav>
  );
}
