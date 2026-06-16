"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="py-16 px-8 bg-bg-base relative z-10 overflow-hidden text-center">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none blur-[80px] z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 px-6">
          <span className="inline-block text-[13px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Pricing
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-primary mb-6"
          >
            {"Simple pricing. Built for".split(" ").map((word, i) => (
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
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Start free. Pay only when you&apos;re ready to ship to real customers.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="bg-white/5 border border-white/10 p-1 rounded-full flex w-fit select-none">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                billing === "monthly"
                  ? "bg-white text-black shadow-md"
                  : "text-text-secondary hover:text-text-primary bg-transparent"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-white text-black shadow-md"
                  : "text-text-secondary hover:text-text-primary bg-transparent"
              }`}
            >
              <span>Annual</span>
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] py-0.5 px-2 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter */}
          <motion.div
            whileHover={{
              y: -8,
              borderColor: "rgba(99, 102, 241, 0.25)",
              boxShadow: "0 15px 35px rgba(99,102,241,0.1)",
            }}
            className="bg-[#0D0F17]/60 border border-white/5 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between text-left transition-all duration-300"
          >
            <div>
              <span className="text-xl font-bold text-white block">Starter</span>
              <span className="text-xs text-text-secondary mt-1 block">For early-stage products</span>
              
              <div className="mt-8 flex items-baseline">
                <span className="text-5xl font-bold tracking-tight text-white">$0</span>
                <span className="text-sm text-text-secondary ml-1">/month</span>
              </div>

              <button className="w-full mt-8 py-3 px-4 border border-white/20 hover:border-white/40 text-white rounded-xl text-sm font-semibold bg-transparent transition-colors duration-300 focus:outline-none text-center block">
                Start free
              </button>

              <div className="w-full h-[1px] bg-white/5 my-8" />

              <div className="flex flex-col gap-3">
                {[
                  "Up to 1,000 monthly active users",
                  "React SDK access",
                  "3 chart types",
                  "Community support",
                  "Prism branding required",
                  "Standard themes",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-text-secondary">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Growth (Highlighted) */}
          <div className="relative scale-100 md:scale-105 z-10 flex flex-col group/growth transition-transform duration-300">
            
            {/* Glowing gradient background border */}
            <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 blur-[1px] z-0" />
            
            {/* MOST POPULAR Badge */}
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold py-1 px-4 rounded-full tracking-wider uppercase shadow-md z-20">
              Most Popular
            </span>

            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(99,102,241,0.2)",
              }}
              className="relative bg-[#0D0F17]/95 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between text-left h-full shadow-[0_0_80px_rgba(99,102,241,0.3)] z-10 transition-all duration-300 flex-1"
            >
              <div>
                <span className="text-xl font-bold text-white block">Growth</span>
                <span className="text-xs text-text-secondary mt-1 block">For scaling B2B SaaS</span>
                
                <div className="mt-8 flex flex-col justify-end">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold tracking-tight text-white transition-all duration-300">
                      {billing === "monthly" ? "$499" : "$399"}
                    </span>
                    <span className="text-sm text-text-secondary ml-1">/month</span>
                  </div>
                  {billing === "annual" && (
                    <span className="text-[10px] text-[#86EFAC] font-mono mt-1 font-semibold block">
                      * billed annually ($4,788/yr)
                    </span>
                  )}
                </div>

                <button className="w-full mt-8 py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 focus:outline-none text-center block">
                  Start 14-day trial
                </button>

                <div className="w-full h-[1px] bg-white/5 my-8" />

                <div className="flex flex-col gap-3">
                  {[
                    "Up to 50,000 monthly active users",
                    "Full React + Vue SDK",
                    "All 15+ chart types",
                    "Full white-label theming engine",
                    "CSV + PDF exports",
                    "Priority support (4hr response)",
                    "Custom domain",
                    "Remove Prism branding",
                    "Advanced analytics",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="text-xs sm:text-sm text-text-secondary">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 3: Enterprise */}
          <motion.div
            whileHover={{
              y: -4,
              borderColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            className="bg-[#0D0F17]/60 border border-white/5 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between text-left transition-colors duration-300"
          >
            <div>
              <span className="text-xl font-bold text-white block">Enterprise</span>
              <span className="text-xs text-text-secondary mt-1 block">For mission-critical deployments</span>
              
              <div className="mt-8 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Custom</span>
              </div>

              <button className="w-full mt-8 py-3 px-4 border border-white/20 hover:border-white/40 text-white rounded-xl text-sm font-semibold bg-transparent transition-colors duration-300 focus:outline-none text-center block">
                Contact sales
              </button>

              <div className="w-full h-[1px] bg-white/5 my-8" />

              <div className="flex flex-col gap-3">
                {[
                  "Unlimited monthly active users",
                  "Self-hosted option available",
                  "Full REST API access",
                  "SSO + SAML authentication",
                  "Dedicated success manager",
                  "99.99% SLA guaranteed",
                  "SOC 2 + HIPAA + GDPR compliance",
                  "Custom contract terms",
                  "White-glove onboarding",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-text-secondary">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <span className="text-sm text-text-secondary">
            Need a custom solution for your team?{" "}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-1 text-white font-semibold text-sm hover:underline cursor-pointer group"
            >
              <span>Talk to our team</span>
              <motion.span
                variants={{
                  hover: { x: 4 },
                }}
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </motion.span>
            </motion.a>
          </span>
        </div>

      </div>
    </section>
  );
}
