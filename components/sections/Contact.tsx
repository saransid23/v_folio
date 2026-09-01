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

  const textRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0 });
      gsap.set(textRef.current, { y: 40, opacity: 0, filter: "blur(15px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Card container appears
      tl.to(cardRef.current, {
        opacity: 1,
        duration: 0.2,
      })
      // Text elegant blur fade-in
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-dvh px-6 md:px-12 bg-accent relative overflow-hidden border-t border-white/15 flex flex-col"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Contact content — top portion */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch w-full">
          {/* Portrait */}
          <SectionReveal delay={0.1}>
            <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.png"
                alt="Saran Siddarth"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </SectionReveal>

          {/* Right content */}
          <div className="flex flex-col justify-center gap-8 py-8 lg:py-12">
            <SectionReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-2 block">
                get in touch
              </span>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <h2 className="font-sans font-black text-[36px] md:text-[52px] lg:text-[64px] text-white uppercase leading-[0.9] tracking-tighter select-none">
                let&apos;s create<br />something{" "}
                <span className="font-display italic font-normal text-black">extraordinary</span>
              </h2>
            </SectionReveal>

            <ScrollTextHighlight
              text="Ready to bring your vision to life? Whether it's a brand film, a creative project, or just an idea worth exploring  let's talk."
              className="font-sans text-[13px] md:text-[15px] leading-relaxed max-w-lg font-light"
            />

            <SectionReveal delay={0.3}>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="font-sans font-bold text-[20px] md:text-[30px] text-white hover:text-black border-b border-white/40 hover:border-black transition-all duration-300 pb-2 lowercase inline-block"
              >
                {PERSONAL.email}
              </a>
            </SectionReveal>

            <SectionReveal delay={0.35}>
              <div className="flex items-center gap-8 font-sans text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/80">
                <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">instagram</a>
                <span className="opacity-30">/</span>
                <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">linkedin</a>
                <span className="opacity-30">/</span>
                <a href={PERSONAL.behance} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">behance</a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="mt-4 pt-6 border-t border-white/15">
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
                  {PERSONAL.location} · Available for freelance
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Marvel Title Card — bottom of the same page */}
      <div className="w-full flex items-center justify-center pb-16 md:pb-20 relative z-10">
        <div ref={cardRef} className="relative flex items-center justify-center opacity-0">

          <h1
            ref={textRef}
            className="font-sans font-black uppercase text-white text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none tracking-[-0.02em] select-none whitespace-nowrap"
          >
            SARAN SIDDARTH
          </h1>
        </div>
      </div>
    </section>
  );
}
