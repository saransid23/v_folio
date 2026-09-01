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
  const stickyNameRef = useRef<HTMLDivElement>(null);

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
    if (loading) return;

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
  }, [loading]);

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
