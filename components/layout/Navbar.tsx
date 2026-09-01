"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => setScrolled(self.progress > 0),
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    gsap.fromTo(
      nav,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 3.5, ease: "expo.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 py-6 transition-colors duration-500",
          scrolled ? "bg-accent/90 backdrop-blur-md" : "bg-transparent"
        )}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between max-w-[100%] mx-auto">
          {/* Contacts (Left) — Il Capo style */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className={cn(
              "font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 pointer-events-auto",
              scrolled ? "text-white hover:text-black" : "text-accent hover:text-white"
            )}
          >
            contacts
          </a>

          {/* Logo (Center) */}
          <a
            href="#"
            className={cn(
              "font-sans text-[13px] md:text-[16px] font-bold lowercase tracking-[0.15em] transition-colors duration-300",
              scrolled ? "text-white hover:text-black" : "text-accent hover:text-white"
            )}
            onClick={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lenis = (window as any).__lenis;
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            saran siddarth
          </a>

          {/* Menu Button (Right) */}
          <button
            className={cn(
              "font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 cursor-pointer",
              scrolled ? "text-white hover:text-black" : "text-accent hover:text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[999] bg-accent flex flex-col items-center justify-center transition-all duration-700",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-sans font-black text-5xl md:text-7xl uppercase text-white hover:text-black transition-colors duration-300"
              style={{
                transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(30px)",
                opacity: isOpen ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
