"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // 1. Hold empty red frame for 2 seconds
    tl.to({}, { duration: 2 });

    // 2. Logo reveals left-to-right via clip-path + fade
    tl.fromTo(
      logoWrapRef.current,
      {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      },
      {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        ease: "power3.inOut",
      }
    );

    // 3. Brief pause with logo visible
    tl.to({}, { duration: 0.8 });

    // 4. Wipe upward to reveal the page
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });

    tl.set(preloaderRef.current, { display: "none" });
    tl.add(() => {
      document.body.style.overflow = "";
      onComplete();
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100000] bg-accent flex items-center justify-center"
    >
      <div
        ref={logoWrapRef}
        style={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
        />
      </div>
    </div>
  );
}
