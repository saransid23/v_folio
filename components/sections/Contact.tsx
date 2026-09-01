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
      // Premium Kinetic Typography Reveal
      
      const line1 = sectionRef.current?.querySelector(".name-line-1");
      const line2 = sectionRef.current?.querySelector(".name-line-2");
      const bgText = sectionRef.current?.querySelector(".floating-bg-text");
      const mainText = sectionRef.current?.querySelector(".main-name-text");

      gsap.set([line1, line2], { yPercent: 120, rotationX: -80, opacity: 0, transformOrigin: "50% 100% -50px" });
      gsap.set(bgText, { scale: 0.8, opacity: 0, rotationZ: -5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 100%",
          once: true,
        },
      });

      // Shimmering light sweep on text (continuous)
      gsap.to([line1, line2], {
        backgroundPositionX: "200%",
        duration: 6,
        repeat: -1,
        ease: "linear",
      });

      // 3D rotation and reveal of the main text
      tl.to(line1, {
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      })
      .to(line2, {
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      }, 0.15)
      
      // Floating massive background text appears
      .to(bgText, {
        scale: 1.1,
        opacity: 0.15,
        rotationZ: 0,
        duration: 3,
        ease: "power3.out",
      }, 0)
      
      // Infinite slow float for background text
      .to(bgText, {
        scale: 1.15,
        rotationZ: 2,
        yPercent: -5,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }, 3);

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

      {/* Premium End Card — Cinematic Typography */}
      <div className="w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center relative z-10 overflow-hidden perspective-[1200px] mt-12 md:mt-20">
        
        {/* Deep background glowing hollow text */}
        <div 
          className="floating-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black uppercase text-transparent text-[25vw] leading-[0.8] tracking-tighter text-center pointer-events-none blur-[4px] mix-blend-screen whitespace-nowrap"
          style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.4)" }}
        >
          SARAN<br/>SIDDARTH
        </div>

        {/* Main foreground text with masking and shimmering metallic gradient */}
        <h1 className="main-name-text font-sans font-black uppercase text-[12vw] md:text-[11vw] lg:text-[10vw] leading-[0.85] tracking-[-0.03em] text-center select-none relative z-10">
          <div className="overflow-hidden pb-2" style={{ perspective: "1000px" }}>
            <div 
              className="name-line-1 inline-block will-change-transform text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #ffffff 0%, #777777 20%, #ffffff 40%, #ffffff 60%, #777777 80%, #ffffff 100%)",
                backgroundSize: "200% auto",
              }}
            >
              SARAN
            </div>
          </div>
          <div className="overflow-hidden pt-1" style={{ perspective: "1000px" }}>
            <div 
              className="name-line-2 inline-block will-change-transform text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #ffffff 0%, #777777 20%, #ffffff 40%, #ffffff 60%, #777777 80%, #ffffff 100%)",
                backgroundSize: "200% auto",
              }}
            >
              SIDDARTH
            </div>
          </div>
        </h1>

      </div>
    </section>
  );
}
