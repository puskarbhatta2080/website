"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_HEIGHT = 72;

/**
 * Floating glass navigation bar.
 * - Blur + subtle crimson borders
 * - Shrinks on scroll for premium feel
 */
export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed left-0 right-0 top-0 z-[50] transition-[height,background,transform] duration-300 " +
        (scrolled
          ? "h-[64px] bg-black/40 backdrop-blur-md border-b border-[rgba(220,38,38,0.18)]"
          : "h-[72px] bg-black/20 backdrop-blur-md border-b border-[rgba(220,38,38,0.12)]")
      }
      style={{ height: scrolled ? `${64}px` : `${NAV_HEIGHT}px` }}
    >
      <div className="h-full mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-full flex items-center justify-between">
          <Link
            href="#"
            className="group relative inline-flex items-center gap-2 font-extrabold tracking-widest uppercase text-[#d4d4d8]"
          >
            <span className="text-[12px] leading-none">Puskar Bhatt</span>
            <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#dc2626] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[13px] uppercase tracking-widest">
            {[
              { href: "#filmography", label: "Filmography" },
              { href: "#quotes", label: "Quotes" },
              { href: "#awards", label: "Awards" },
              { href: "#news", label: "News" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#d4d4d8]/90 hover:text-[#d4d4d8] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="md:hidden">
            <Link
              href="#contact"
              className="rounded-full border border-[rgba(220,38,38,0.35)] px-4 py-2 text-[12px] uppercase tracking-widest text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:border-[rgba(220,38,38,0.55)] hover:shadow-[0_0_44px_rgba(220,38,38,0.35)] transition"
            >
              Book Casting
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

