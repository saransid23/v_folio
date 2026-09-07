"use client";

import { useState, useEffect, useRef } from "react";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";

import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const stickyNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    }
    
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      
      window.addEventListener("beforeunload", handleBeforeUnload);
      
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  useEffect(() => {
    if (loading || isMobile) return;

    // Show the sticky name on the bottom left starting from the next page
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 90%", // Trigger when the bottom of hero is leaving the screen
      onEnter: () => {
        gsap.to(stickyNameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to(stickyNameRef.current, { opacity: 0, y: 10, duration: 0.6, ease: "power2.out" });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [loading, isMobile]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#D60001] text-white px-6 text-center h-[100dvh] w-screen">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-black uppercase tracking-[0.2em] mb-4">
          Desktop Only
        </h2>
        <p className="text-xs font-light text-white/80 tracking-wider leading-relaxed max-w-[280px]">
          This portfolio is designed for larger screens. Please open it on a laptop or PC for the best experience.
        </p>
      </div>
    );
  }

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div>
        <CustomCursor />
        <ScrollProgress />
        <div className="noise-overlay" />
        
        {/* Sticky name in bottom-left corner starting from next page */}
        <div
          ref={stickyNameRef}
          className="fixed bottom-8 left-8 z-[998] pointer-events-none opacity-0 select-none hidden md:block"
          style={{ transform: "translateY(10px)" }}
        >
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.35em] text-white">
            saran siddarth
          </span>
        </div>

        <SmoothScroll>
          <Navbar />
          {children}

        </SmoothScroll>
      </div>
    </>
  );
}
