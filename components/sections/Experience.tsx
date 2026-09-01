"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".exp-item");
    if (!items) return;
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-20 px-6 md:px-12 bg-accent border-t border-white/15">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <SectionReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-6 block">Background</span>
              <h2 className="font-sans font-bold text-[36px] md:text-[50px] lg:text-[60px] text-white uppercase tracking-tighter leading-none">
                Selected<br />Experience
              </h2>
            </SectionReveal>
          </div>
        </div>

        <div ref={listRef} className="lg:w-2/3 flex flex-col gap-12">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item group border-t border-white/15 pt-8">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                <h3 className="font-sans font-bold text-[24px] md:text-[32px] text-white uppercase tracking-tighter">{exp.role}</h3>
              </div>
              <div className="font-sans font-light text-[14px] md:text-[18px] text-white/80 mb-6">{exp.company}</div>
              <p className="font-sans font-light text-[13px] md:text-[14px] text-white/60 leading-relaxed max-w-xl">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 lg:mt-20">
        <SectionReveal>
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image 
              src="/me with camera.jpeg" 
              alt="Me with camera" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
