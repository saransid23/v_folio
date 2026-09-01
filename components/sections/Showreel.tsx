"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/animations/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!section || !video || !overlay || !content) return;

    const ctx = gsap.context(() => {
      // Pin the section for 1 full viewport-height of scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });

      // Fade overlay as user scrolls into the pinned section
      gsap.fromTo(
        overlay,
        { opacity: 0.7 },
        {
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Auto-play video when pinned, pause when leaving
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "+=150%",
        onEnter: () => {
          video.play().catch(() => {});
          setIsPlaying(true);
        },
        onLeave: () => {
          video.pause();
          setIsPlaying(false);
        },
        onEnterBack: () => {
          video.play().catch(() => {});
          setIsPlaying(true);
        },
        onLeaveBack: () => {
          video.pause();
          setIsPlaying(false);
        },
      });
    }, section);

    // Video progress tracking
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      ctx.revert();
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative h-dvh w-full overflow-hidden bg-black"
    >
      {/* Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ scale: 1.15 }}
          src="/videos/showreel.mp4"
        />
      </div>

      {/* Dark cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Content — bottom-left corner, cinematic style */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 pb-12 md:pb-16"
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Left — Title & label */}
          <div>
            <SectionReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4 block">
                showreel · 2025
              </span>
            </SectionReveal>
            <h2 className="font-sans font-black text-[36px] md:text-[54px] lg:text-[72px] text-white uppercase leading-[0.9] tracking-tighter">
              selected<br />
              <span className="font-display italic font-normal text-white/80">work.</span>
            </h2>
          </div>

          {/* Right — Controls */}
          <div className="flex items-center gap-6">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="group relative w-16 h-16 md:w-20 md:h-20 border border-white/40 hover:border-white flex items-center justify-center transition-all duration-300 hover:bg-white/10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <div className="flex gap-1.5">
                  <div className="w-[3px] h-5 bg-white" />
                  <div className="w-[3px] h-5 bg-white" />
                </div>
              ) : (
                <div
                  className="w-0 h-0 ml-1"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "16px solid white",
                  }}
                />
              )}
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleMute}
              className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Toggle sound"
            >
              sound
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-white/80 transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Film frame marks — top corners */}
      <div className="absolute top-6 left-8 z-20 font-mono text-[9px] text-white/30 tracking-widest uppercase pointer-events-none select-none">
        ▶ reel 01
      </div>
      <div className="absolute top-6 right-8 z-20 font-mono text-[9px] text-white/30 tracking-widest uppercase pointer-events-none select-none">
        S. Siddarth © 2025
      </div>
    </section>
  );
}
