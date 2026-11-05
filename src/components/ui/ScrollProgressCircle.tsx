"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgressCircle() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cream"
      >
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          className="absolute z-10 h-4 w-4 text-taupe"
        >
          <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z" />
        </svg>

        <svg className="absolute h-12 w-12" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={5}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-taupe)"
            strokeWidth={5}
            strokeLinecap="round"
            style={{
              pathLength,
              rotate: -90,
              originX: "50%",
              originY: "50%",
            }}
          />
        </svg>
      </button>
    </div>
  );
}
