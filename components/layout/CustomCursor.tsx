"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos1 = useRef({ x: 0, y: 0 });
  const pos2 = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const glow = glowRef.current;
    const text = textRef.current;
    if (!dot || !ring1 || !ring2 || !glow || !text) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Ring 1 follows tightly
      pos1.current.x += (mouse.current.x - pos1.current.x) * 0.18;
      pos1.current.y += (mouse.current.y - pos1.current.y) * 0.18;

      // Ring 2 follows more loosely
      pos2.current.x += (mouse.current.x - pos2.current.x) * 0.08;
      pos2.current.y += (mouse.current.y - pos2.current.y) * 0.08;

      gsap.set(dot, {
        x: mouse.current.x - dot.offsetWidth / 2,
        y: mouse.current.y - dot.offsetHeight / 2,
      });
      gsap.set(ring1, {
        x: pos1.current.x - ring1.offsetWidth / 2,
        y: pos1.current.y - ring1.offsetHeight / 2,
      });
      gsap.set(ring2, {
        x: pos2.current.x - ring2.offsetWidth / 2,
        y: pos2.current.y - ring2.offsetHeight / 2,
      });
      gsap.set(glow, {
        x: pos2.current.x - glow.offsetWidth / 2,
        y: pos2.current.y - glow.offsetHeight / 2,
      });
      gsap.set(text, {
        x: pos1.current.x + 20,
        y: pos1.current.y - 10,
      });
    };

    gsap.ticker.add(animate);
    window.addEventListener("mousemove", onMouseMove);

    // Interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor='pointer'], input, textarea, select"
    );
    const viewEls = document.querySelectorAll('[data-cursor="view"]');
    const playEls = document.querySelectorAll('[data-cursor="play"]');

    const onEnter = () => {
      gsap.to(dot, { width: 6, height: 6, duration: 0.3, ease: "expo.out" });
      gsap.to(ring1, { width: 52, height: 52, borderColor: "rgba(245,245,240,0.5)", duration: 0.3, ease: "expo.out" });
      gsap.to(ring2, { width: 80, height: 80, opacity: 0.4, duration: 0.4, ease: "expo.out" });
    };

    const onLeave = () => {
      gsap.to(dot, { width: 8, height: 8, duration: 0.3, ease: "expo.out" });
      gsap.to(ring1, { width: 36, height: 36, borderColor: "rgba(255,255,255,0.6)", duration: 0.3, ease: "expo.out" });
      gsap.to(ring2, { width: 60, height: 60, opacity: 1, duration: 0.4, ease: "expo.out" });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    const onViewEnter = () => {
      gsap.to(dot, { width: 4, height: 4, opacity: 0.5, duration: 0.3 });
      gsap.to(ring1, { width: 70, height: 70, duration: 0.3, ease: "expo.out" });
      gsap.to(ring2, { width: 100, height: 100, opacity: 0.3, duration: 0.4 });
      gsap.to(text, { opacity: 1, duration: 0.2 });
    };

    const onViewLeave = () => {
      gsap.to(dot, { width: 8, height: 8, opacity: 1, duration: 0.3 });
      gsap.to(ring1, { width: 36, height: 36, borderColor: "rgba(255,255,255,0.6)", duration: 0.3, ease: "expo.out" });
      gsap.to(ring2, { width: 60, height: 60, opacity: 1, duration: 0.4 });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    const onPlayEnter = () => {
      gsap.to(dot, { width: 4, height: 4, opacity: 0.5, duration: 0.3 });
      gsap.to(ring1, { width: 80, height: 80, duration: 0.3 });
      gsap.to(ring2, { width: 110, height: 110, duration: 0.4 });
      if (text) text.textContent = "PLAY ▶";
      gsap.to(text, { opacity: 1, duration: 0.2 });
    };

    const onPlayLeave = () => {
      gsap.to(dot, { width: 8, height: 8, opacity: 1, duration: 0.3 });
      gsap.to(ring1, { width: 36, height: 36, borderColor: "rgba(255,255,255,0.6)", duration: 0.3 });
      gsap.to(ring2, { width: 60, height: 60, duration: 0.4 });
      if (text) text.textContent = "VIEW";
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    viewEls.forEach((el) => {
      el.addEventListener("mouseenter", onViewEnter);
      el.addEventListener("mouseleave", onViewLeave);
    });
    playEls.forEach((el) => {
      el.addEventListener("mouseenter", onPlayEnter);
      el.addEventListener("mouseleave", onPlayLeave);
    });

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("mousemove", onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      viewEls.forEach((el) => {
        el.removeEventListener("mouseenter", onViewEnter);
        el.removeEventListener("mouseleave", onViewLeave);
      });
      playEls.forEach((el) => {
        el.removeEventListener("mouseenter", onPlayEnter);
        el.removeEventListener("mouseleave", onPlayLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ring1Ref} className="cursor-ring" />
      <div ref={ring2Ref} className="cursor-ring-outer" />
      <div ref={glowRef} className="cursor-glow" />
      <div ref={textRef} className="cursor-text">VIEW</div>
    </>
  );
}
