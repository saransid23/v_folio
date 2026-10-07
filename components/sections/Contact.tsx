"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/animations/SectionReveal";
import ScrollTextHighlight from "@/components/animations/ScrollTextHighlight";
import { PERSONAL } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-dvh lg:h-dvh px-6 md:px-12 bg-accent relative overflow-hidden border-t border-white/15 flex flex-col"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Contact content */}
      <div className="w-full max-w-4xl mx-auto relative z-10 flex-1 flex items-center justify-center py-12 md:py-20">
        <div className="flex flex-col items-center text-center gap-8 w-full">
          <SectionReveal>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-2 block">
              get in touch
            </span>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <h2 className="font-sans font-black text-[36px] md:text-[60px] lg:text-[76px] text-white uppercase leading-[0.95] tracking-tighter select-none">
              let&apos;s create<br />something{" "}
              <span className="font-display italic font-normal text-black">extraordinary</span>
            </h2>
          </SectionReveal>

          <ScrollTextHighlight
            text="Ready to bring your vision to life? Whether it's a brand film, a creative project, or just an idea worth exploring — let's talk."
            className="font-sans text-[14px] md:text-[16px] leading-relaxed max-w-xl font-light text-center"
          />

          <SectionReveal delay={0.3}>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="font-sans font-bold text-[22px] md:text-[36px] text-white hover:text-black border-b border-white/40 hover:border-black transition-all duration-300 pb-2 lowercase inline-block my-2"
            >
              {PERSONAL.email}
            </a>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <div className="flex items-center gap-8 font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/80">
              <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">instagram</a>
              <span className="opacity-30">/</span>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">linkedin</a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="mt-6 pt-6 border-t border-white/15 w-full max-w-xs">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
                {PERSONAL.location} · Available for freelance
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
