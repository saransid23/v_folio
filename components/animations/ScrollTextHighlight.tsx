"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextHighlightProps {
  text: string | string[];
  className?: string;
  paragraphClassName?: string;
}

interface WordObj {
  text: string;
  isItalic: boolean;
}

export default function ScrollTextHighlight({ 
  text, 
  className = "",
  paragraphClassName = ""
}: ScrollTextHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Select all words across all paragraphs
    const words = el.querySelectorAll(".highlight-word");
    
    // Set initial position: invisible and shifted down slightly
    gsap.set(words, { 
      opacity: 0, 
      y: 15,
      color: (index, target) => {
        return target.classList.contains("is-italic") ? "#000000" : "#ffffff";
      }
    });

    // Create a smooth staggered entrance animation that plays once triggered
    const tl = gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.015, // Smooth delay one after another
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Triggers when the top of the text block is 85% down the viewport
        toggleActions: "play none none none", // Plays once, does not bind directly to scrollbar
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [text]);

  // Parse text to identify which words should be italicized
  const parseText = (rawText: string): WordObj[] => {
    const parts = rawText.split(/(\*[^*]+\*)/g);
    const result: WordObj[] = [];
    
    parts.forEach(part => {
      if (part.startsWith("*") && part.endsWith("*")) {
        const cleanText = part.slice(1, -1);
        cleanText.split(" ").forEach(word => {
          if (word) {
            result.push({ text: word, isItalic: true });
          }
        });
      } else {
        part.split(" ").forEach(word => {
          if (word) {
            result.push({ text: word, isItalic: false });
          }
        });
      }
    });
    
    return result;
  };

  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((para, paraIdx) => {
        const words = parseText(para);
        return (
          <p key={paraIdx} className={paragraphClassName}>
            {words.map((word, wordIdx) => {
              if (word.isItalic) {
                return (
                  <span
                    key={wordIdx}
                    className="highlight-word is-italic font-display italic font-normal inline-block mr-1.5"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {word.text}
                  </span>
                );
              }

              return (
                <span
                  key={wordIdx}
                  className="highlight-word inline-block mr-1.5"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word.text}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
