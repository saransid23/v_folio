"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Parallax on scroll for the background video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const scrollToFilms = () => {
    const el = document.querySelector("#projects");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis && el) lenis.scrollTo(el);
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-accent z-0"
    >
      {/* Video Background — currently empty, ready for your video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ contentVisibility: "auto", scale: 1.15 }}
          src="/videos/hero-bg.mov"
        />
      </div>

      {/* SCROLL indicator — left side */}
      <button
        onClick={scrollToFilms}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 font-sans text-[9px] font-bold tracking-[0.35em] uppercase text-accent bg-white/0 hover:bg-white hover:text-accent px-2 py-1 transition-all duration-300 border border-white/0 hover:border-white"
        style={{ writingMode: "vertical-lr" }}
      >
        scroll
      </button>
    </section>
  );
}
