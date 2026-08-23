"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#filmography", label: "Filmography" },
  { href: "#awards", label: "Awards" },
  { href: "#news", label: "News" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={
        "fixed left-0 right-0 top-0 z-[50] transition-[height,background,transform] duration-300 " +
        (scrolled
          ? "h-[56px] sm:h-[64px] bg-black/40 backdrop-blur-md border-b border-[rgba(220,38,38,0.18)]"
          : "h-[64px] sm:h-[72px] bg-black/20 backdrop-blur-md border-b border-[rgba(220,38,38,0.12)]")
      }
    >
      <div className="h-full mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-full flex items-center justify-between">
          <Link
            href="#"
            className="group relative inline-flex items-center gap-2 font-extrabold tracking-widest uppercase text-[#d4d4d8]"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[11px] sm:text-[12px] leading-none">
              Puskar Bhatt
            </span>
            <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#dc2626] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] uppercase tracking-widest">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#d4d4d8]/90 hover:text-[#d4d4d8] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="rounded-full border border-[rgba(220,38,38,0.35)] px-4 py-2 text-[12px] uppercase tracking-widest text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:border-[rgba(220,38,38,0.55)] hover:shadow-[0_0_44px_rgba(220,38,38,0.35)] transition"
            >
              Book Casting
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="#contact"
              className="rounded-full border border-[rgba(220,38,38,0.35)] px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#d4d4d8] shadow-[0_0_30px_rgba(220,38,38,0.25)] transition"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative h-9 w-9 flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] bg-black/20"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="flex flex-col gap-[3px] items-center justify-center">
                <span
                  className={`block h-[1.5px] w-4 bg-[#d4d4d8] transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-[#d4d4d8] transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-[#d4d4d8] transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-in overlay menu */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[-1] bg-black/80 backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <nav
          className="flex flex-col items-center justify-center h-full gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#d4d4d8] text-[18px] uppercase tracking-[0.22em] font-black transition-all duration-300 hover:text-[#dc2626]"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform, color",
                transitionDuration: "400ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="h-[2px] w-16 bg-[#dc2626] shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 400ms ease-out",
              transitionDelay: `${NAV_ITEMS.length * 60}ms`,
            }}
          />
        </nav>
      </div>
    </header>
  );
}