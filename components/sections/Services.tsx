"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

// Helper SVG Icons for Services
function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case "Film":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25-15h17.25M3.375 4.5v15m17.25-15v15M6.75 4.5v15m10.5-15v15M3.375 9.75h17.25m-17.25 4.5h17.25" />
        </svg>
      );
    case "Scissors":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5-4.5L7.5 12l2.25 2.25M6 6a3 3 0 100 6 3 3 0 000-6zm0 12a3 3 0 100-6 3 3 0 000 6zm12-12a3 3 0 100 6 3 3 0 000-6zm0 12a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "Palette":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 003 17.25V4.5A2.25 2.25 0 015.25 2.25h13.5A2.25 2.25 0 0121 4.5v12.75a3.75 3.75 0 01-3.75 3.75h-10.5z" />
        </svg>
      );
    case "Aperture":
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0c-.693.04-1.346.43-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      );
  }
}

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".service-card");
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-accent relative overflow-hidden border-t border-white/15">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-white/70 bg-black/30 px-4 py-1.5 rounded-full border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Capabilities & Craft
            </span>
            <h2 className="font-sans font-black text-[40px] md:text-[60px] lg:text-[72px] text-white uppercase tracking-tighter leading-none mb-6">
              What I Deliver
            </h2>
            <p className="font-sans font-light text-[14px] md:text-[16px] text-white/80 max-w-2xl leading-relaxed">
              Elevating visuals from raw concepts into high-impact, narrative-driven experiences built for audience retention and visual influence.
            </p>
          </div>
        </SectionReveal>

        {/* Interactive Service Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="service-card group relative bg-black/40 backdrop-blur-xl border border-white/15 hover:border-white/50 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
            >
              {/* Top Card Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header Row: Index Number + Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-3xl font-black text-white/30 group-hover:text-white transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    <ServiceIcon name={service.icon} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-sans font-light text-sm md:text-base text-white/80 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Skill Tag Badges */}
                {service.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full group-hover:border-white/25 group-hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row / Direct Action Link */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <a
                  href="#contact"
                  className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-white/80 group-hover:text-white transition-colors flex items-center gap-2"
                >
                  Discuss Project
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

