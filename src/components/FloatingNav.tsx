"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "#filmography", label: "Filmography" },
  { href: "#awards", label: "Awards" },
  { href: "#news", label: "News" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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
      className={`fixed left-0 right-0 top-0 z-[50] transition-all duration-300 ${
        scrolled
          ? "h-[56px] sm:h-[64px] bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-lg border-b border-[rgba(220,38,38,0.25)] shadow-lg shadow-[rgba(220,38,38,0.1)]"
          : "h-[64px] sm:h-[72px] bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border-b border-[rgba(220,38,38,0.12)]"
      }`}
    >
      <div className="h-full mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="#"
              className="group relative inline-flex items-center gap-2 font-extrabold tracking-widest uppercase text-[#d4d4d8] hover:text-[#ff3b3b] transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-[11px] sm:text-[12px] leading-none">
                Puskar Bhatt
              </span>
              <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#dc2626] to-[#ff3b3b] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-widest">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="relative group text-[#d4d4d8]/90 hover:text-[#d4d4d8] transition-colors duration-300 py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#22d3ee] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: NAV_ITEMS.length * 0.08 }}
            >
              <Link
                href="#contact"
                className="rounded-full border border-[rgba(220,38,38,0.4)] px-5 py-2.5 text-[12px] uppercase tracking-widest text-[#d4d4d8] bg-gradient-to-r from-[rgba(220,38,38,0.1)] to-transparent hover:from-[rgba(220,38,38,0.2)] hover:to-[rgba(34,211,238,0.1)] shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_35px_rgba(220,38,38,0.35)] hover:border-[rgba(220,38,38,0.6)] transition-all duration-300 font-bold"
              >
                Book Casting
              </Link>
            </motion.div>
          </nav>

          {/* Mobile hamburger */}
          <motion.div
            className="flex md:hidden items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="#contact"
              className="rounded-full border border-[rgba(220,38,38,0.35)] px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#d4d4d8] hover:border-[rgba(220,38,38,0.6)] hover:bg-[rgba(220,38,38,0.1)] shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-all duration-300"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative h-9 w-9 flex items-center justify-center rounded-full border border-[rgba(220,38,38,0.25)] bg-black/30 hover:bg-black/50 hover:border-[rgba(220,38,38,0.4)] transition-all duration-300"
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
          </motion.div>
        </div>
      </div>

      {/* Mobile slide-in overlay menu */}
      <motion.div
        id="mobile-navigation"
        initial={false}
        animate={menuOpen ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, pointerEvents: "auto" },
          hidden: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[-1] bg-black/80 backdrop-blur-lg md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <motion.nav
          className="flex flex-col items-center justify-center h-full gap-8"
          onClick={(e) => e.stopPropagation()}
          variants={containerVariants}
          initial="hidden"
          animate={menuOpen ? "visible" : "hidden"}
        >
          {NAV_ITEMS.map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#d4d4d8] text-[18px] uppercase tracking-[0.22em] font-black transition-all duration-300 hover:text-[#dc2626] hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            className="h-[2px] w-16 bg-gradient-to-r from-[#dc2626] to-[#22d3ee] shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          />
        </motion.nav>
      </motion.div>
    </header>
  );
}