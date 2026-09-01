"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".service-item");
    if (!items) return;
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const line = item.querySelector(".service-line");
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-accent border-t border-white/15">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-6 block text-center">Capabilities</span>
          <h2 className="font-sans font-bold text-[36px] md:text-[50px] lg:text-[60px] text-white uppercase tracking-tighter mb-12 text-center">Services</h2>
        </SectionReveal>

        <div ref={listRef} className="flex flex-col max-w-5xl mx-auto">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="service-item group relative overflow-hidden">
              <div className="service-line absolute bottom-0 left-0 right-0 h-[1px] bg-white/30 origin-left" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 md:py-12 transition-colors duration-300">
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-sans text-[11px] md:text-[12px] tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans font-bold text-[28px] md:text-[40px] lg:text-[50px] text-white uppercase tracking-tighter leading-none group-hover:text-black transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="font-sans font-light text-[13px] md:text-[14px] text-white/0 group-hover:text-white/90 transition-all duration-500 max-w-sm leading-relaxed md:text-right translate-x-4 group-hover:translate-x-0 md:opacity-0 md:group-hover:opacity-100">
                  {service.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
          <div className="h-[1px] bg-white/15" />
        </div>
      </div>
    </section>
  );
}
