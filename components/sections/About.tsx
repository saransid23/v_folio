"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "@/lib/data";
import SectionReveal from "@/components/animations/SectionReveal";
import ScrollTextHighlight from "@/components/animations/ScrollTextHighlight";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageRef.current;
    if (!section || !imageContainer) return;

    const ctx = gsap.context(() => {
      const img = imageContainer.querySelector(".portrait-img");
      const mask = imageContainer.querySelector(".image-mask");

      if (mask) {
        gsap.to(mask, {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: imageContainer, start: "top 75%", once: true },
        });
      }

      if (img) {
        gsap.fromTo(img,
          { scale: 1.1 },
          { scale: 1, duration: 2, ease: "power3.out", scrollTrigger: { trigger: imageContainer, start: "top 75%", once: true } }
        );
        gsap.to(img, { yPercent: 8, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="h-dvh px-6 md:px-12 bg-accent overflow-hidden relative border-t border-white/15"
      style={{ maxHeight: "100dvh" }}
    >
      <div className="h-full flex flex-col max-w-7xl mx-auto">
        {/* Biography label */}
        <div className="pt-6 pb-2">
          <SectionReveal>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 block">biography</span>
          </SectionReveal>
        </div>

        {/* Main content — takes remaining height */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 pb-6">
          {/* Portrait — stretches to fill column height */}
          <div ref={imageRef} className="relative overflow-hidden h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait.png"
              alt="Saran Siddarth"
              className="portrait-img absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="image-mask absolute inset-0 bg-accent z-30" />
          </div>

          {/* Text column — flex to distribute within available height */}
          <div className="flex flex-col justify-between h-full min-h-0">
            <div className="flex-1 min-h-0 flex flex-col justify-center">
              <SectionReveal>
                <h2 className="font-sans font-black text-[clamp(1.8rem,4vw,3.5rem)] text-white uppercase leading-[0.93] tracking-tighter mb-[clamp(0.75rem,2vh,1.5rem)]">
                  I don&apos;t make videos.<br />
                  I craft <span className="font-display italic font-normal text-black">cinematic</span> aesthetics.
                </h2>
              </SectionReveal>

              <ScrollTextHighlight
                text={ABOUT.description}
                className="space-y-[clamp(0.5rem,1.2vh,1rem)]"
                paragraphClassName="font-sans text-[clamp(0.75rem,1.2vw,0.95rem)] leading-relaxed font-light"
              />
            </div>

            <SectionReveal delay={0.3}>
              <div className="pt-3 border-t border-white/20">
                <p className="font-display text-xl text-white italic opacity-90">Saran Siddarth</p>
                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/50 mt-0.5">Founder &amp; Director</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
