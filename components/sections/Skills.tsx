"use client";

import { SKILLS_MARQUEE } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";

export default function Skills() {
  return (
    <section id="skills" className="py-20 overflow-hidden bg-accent border-t border-white/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col items-center text-center">
        <SectionReveal>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4 block">
            The Craft
          </span>
          <h2 className="font-sans font-bold text-[40px] md:text-[70px] text-white uppercase tracking-tighter leading-none">
            Expertise
          </h2>
        </SectionReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center max-w-6xl mx-auto items-center">
          {SKILLS_MARQUEE.map((craft, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <SectionReveal key={`craft-${i}`} delay={i * 0.05}>
                <div
                  className={`group relative px-6 py-3 md:px-10 md:py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 ease-out hover:border-white/80 hover:bg-white hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-default ${
                    isOdd ? "mt-4 md:mt-12" : "mb-4 md:mb-12"
                  }`}
                >
                  <span className="relative z-10 font-sans font-black text-lg md:text-3xl text-white/70 uppercase tracking-widest transition-colors duration-500 group-hover:text-black">
                    {craft}
                  </span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
