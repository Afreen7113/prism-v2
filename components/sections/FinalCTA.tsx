"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";

export default function FinalCTA() {
  return (
    <section className="min-h-screen py-16 px-8 bg-black relative flex items-center justify-center overflow-hidden z-10">
      
      {/* BACKGROUND LAYERS */}

      {/* Background Image with Muted Vignette Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: "url('/ready-to-ship-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/65 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_95%)] pointer-events-none z-0" />

      {/* Layer 1 - Three animated gradient orbs */}
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />

      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2)_0%,transparent_70%)] pointer-events-none blur-[120px] z-0"
      />

      {/* Layer 2 - Subtle Grid overlay with radial mask */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Layer 3 - Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.015] pointer-events-none mix-blend-overlay z-0" />

      {/* Layer 4 - Vignette shadow edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-0" />

      {/* CONTENT */}
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-[14px] font-semibold text-primary uppercase tracking-[0.3em] mb-6"
        >
          Ready to ship?
        </motion.span>

        {/* Massive Staggered Heading */}
        <div className="text-[clamp(36px,5.5vw,64px)] font-semibold tracking-[-0.03em] leading-[1.1] text-white mt-6 mb-8 block flex flex-col items-center">
          <RevealText
            text="Stop building charts."
            tag="h2"
            trigger="view"
            className="text-white font-semibold text-center block"
          />
          <RevealText
            text="Start building product."
            tag="span"
            trigger="view"
            delay={0.3}
            className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] font-semibold text-center block mt-1"
          />
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto mb-12"
        >
          Join 2,400+ B2B SaaS companies using Prism to power their customer-facing analytics. Get your API key in 30 seconds.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl text-base font-semibold shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-1.05 active:scale-95 transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 group cursor-pointer">
            <span>Get API Key Free</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <button className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-xl text-base font-semibold hover:bg-white/5 active:scale-95 transition-all duration-300 focus:outline-none text-center cursor-pointer">
            Talk to Sales
          </button>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-text-muted">
            Used by teams at
          </span>
          <div className="flex justify-center items-center gap-6 sm:gap-10 flex-wrap">
            {["Stripe", "Linear", "Notion", "Vercel", "Framer"].map((name) => (
              <span
                key={name}
                className="text-sm sm:text-base font-semibold text-white/40 hover:text-white/80 transition-colors duration-300 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
