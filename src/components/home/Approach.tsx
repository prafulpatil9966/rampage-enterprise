"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { approachSteps } from "@/lib/content";

export function Approach() {
  const [active, setActive] = useState(0);
  const step = approachSteps[active];

  return (
    <section id="approach" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
      <Reveal>
        <SectionHeading
          label="03 / How We Work"
          title="A clear approach to better security."
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <ul className="divide-y divide-border border-t border-border">
          {approachSteps.map((s, i) => (
            <li key={s.number}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="flex w-full items-center gap-6 py-6 text-left transition-colors"
              >
                <span
                  className={`font-display text-2xl transition-colors ${
                    active === i ? "text-taupe" : "text-ink/30"
                  }`}
                >
                  {s.number}
                </span>
                <span
                  className={`font-display text-2xl transition-colors sm:text-3xl ${
                    active === i ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-10 text-cream lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
                Step {step.number}
              </span>
              <h3 className="mt-6 font-display text-4xl">{step.title}</h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
