"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  target: number;
  format: (n: number) => string;
}

function AnimatedNumber({ target, format }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => format(latest));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2.5, ease: [0.32, 0.72, 0, 1] });
    }
  }, [inView, target, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function MetricsBand() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-12 px-8 bg-bg-base relative border-t border-b border-white/5 overflow-hidden text-center z-10">
      
      {/* Background drifting particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="block text-[13px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            By The Numbers
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-white"
          >
            {"Trusted at".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" "}
            <span
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, #6366F1, #A855F7, #22D3EE, #6366F1)",
              }}
            >
              {"scale.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.05em] leading-none mb-3 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-primary to-accent text-center flex justify-center">
              <AnimatedNumber
                target={2400}
                format={(n) => Math.round(n).toLocaleString() + "+"}
              />
            </span>
            <span className="text-sm sm:text-base font-semibold text-white mb-1">
              B2B companies
            </span>
            <span className="text-xs text-text-secondary">
              trust Prism in production
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.05em] leading-none mb-3 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-primary to-accent text-center flex justify-center">
              <AnimatedNumber
                target={180}
                format={(n) => Math.round(n) + "M"}
              />
            </span>
            <span className="text-sm sm:text-base font-semibold text-white mb-1">
              API calls per day
            </span>
            <span className="text-xs text-text-secondary">
              across all tenants
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.05em] leading-none mb-3 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-primary to-accent text-center flex justify-center">
              <AnimatedNumber
                target={47}
                format={(n) => Math.round(n) + "ms"}
              />
            </span>
            <span className="text-sm sm:text-base font-semibold text-white mb-1">
              Average query latency
            </span>
            <span className="text-xs text-text-secondary">
              p95 globally
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.05em] leading-none mb-3 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-primary to-accent text-center flex justify-center">
              <AnimatedNumber
                target={99.99}
                format={(n) => n.toFixed(2) + "%"}
              />
            </span>
            <span className="text-sm sm:text-base font-semibold text-white mb-1">
              Uptime SLA
            </span>
            <span className="text-xs text-text-secondary">
              guaranteed
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
