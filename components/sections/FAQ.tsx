"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the embedding actually work?",
    answer: "Install our React SDK with 'npm install @prism/react', wrap your app in <PrismProvider />, and drop in components like <Dashboard /> wherever you need analytics. We handle data fetching, caching, rendering, multi-tenant isolation, and real-time updates. Most teams ship their first dashboard in under an hour.",
  },
  {
    question: "Can I really match my exact brand identity?",
    answer: "Yes. Our theming engine exposes CSS custom properties at three abstraction layers: primitive tokens (raw colors, fonts, spacing), semantic tokens (purpose-mapped like 'primary' or 'success'), and component tokens (scoped to specific components). Designers can match any visual identity — from clinical medical software to vibrant consumer apps — without writing custom CSS.",
  },
  {
    question: "What about data security and tenant isolation?",
    answer: "Every customer (tenant) gets fully isolated data with row-level security enforced at the database layer. We're SOC 2 Type II certified, HIPAA-ready, and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We've never had a security breach since founding.",
  },
  {
    question: "How fast are the queries actually?",
    answer: "Our column-store database with intelligent multi-layer caching delivers sub-100ms queries for 95% of requests. We've benchmarked at 47ms average latency globally across all p95 measurements. Queries that would take seconds in Postgres complete in milliseconds with us.",
  },
  {
    question: "Do you support real-time data updates?",
    answer: "Yes. Connect data via webhooks, Kafka streams, or our streaming API. Dashboard updates push to clients via WebSocket connections — typical freshness is sub-second. Perfect for monitoring dashboards, live ops, and any use case where stale data is unacceptable.",
  },
  {
    question: "Which frameworks and platforms do you support?",
    answer: "Primary support for React (with TypeScript types included). Official packages also available for Vue 3, Angular 17+, Svelte 4+, and vanilla JavaScript. Our SDK core is framework-agnostic — most teams using other frameworks integrate without issues.",
  },
  {
    question: "Can my customers build their own custom reports?",
    answer: "Yes. Our self-serve chart builder lets your end-users drag-and-drop metrics, apply filters, change visualizations, and save custom dashboards — all within your product's UI. You control which metrics are exposed. This typically reduces analytics-related support tickets by 60%+.",
  },
  {
    question: "What's included in the 14-day free trial?",
    answer: "Full access to all Growth plan features for 14 days. No credit card required. Up to 10,000 API calls during trial period. You can theme components, build dashboards, test exports — everything. Convert to paid when you're ready to ship to real customers.",
  },
];

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="block text-[13px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Frequently Asked Questions
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-text-primary"
          >
            {"Questions,".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" " }
            <span
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, #6366F1, #A855F7, #22D3EE, #6366F1)",
              }}
            >
              {"answered.".split(" ").map((word, i) => (
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
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md mx-auto mt-4"
          >
            Can&apos;t find what you&apos;re looking for? Email our team and we&apos;ll get back within 4 hours.
          </motion.p>
        </div>

        {/* Accordion Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {faqData.map((item, idx) => {
              if (idx % 2 !== 0) return null;
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`bg-bg-elevated/60 backdrop-blur-xl border rounded-[16px] overflow-hidden transition-all duration-300 text-left ${
                    isOpen
                      ? "border-primary/30 bg-primary/5 shadow-[0_0_30px_var(--prism-primary-glow, rgba(99,102,241,0.05))]"
                      : "border-border-subtle hover:border-border-subtle/70"
                  }`}
                >
                  
                  {/* Accordion Trigger Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 flex justify-between items-center bg-transparent border-none cursor-pointer focus:outline-none"
                  >
                    <span className="text-[14px] font-medium text-text-primary pr-4 leading-snug">
                      {item.question}
                    </span>
                    
                    {/* Plus/Minus Indicator */}
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center text-text-primary">
                      <Plus
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-primary" : "rotate-0 text-text-primary"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[13px] text-text-secondary leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {faqData.map((item, idx) => {
              if (idx % 2 === 0) return null;
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`bg-bg-elevated/60 backdrop-blur-xl border rounded-[16px] overflow-hidden transition-all duration-300 text-left ${
                    isOpen
                      ? "border-primary/30 bg-primary/5 shadow-[0_0_30px_var(--prism-primary-glow, rgba(99,102,241,0.05))]"
                      : "border-border-subtle hover:border-border-subtle/70"
                  }`}
                >
                  
                  {/* Accordion Trigger Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 flex justify-between items-center bg-transparent border-none cursor-pointer focus:outline-none"
                  >
                    <span className="text-[14px] font-medium text-text-primary pr-4 leading-snug">
                      {item.question}
                    </span>
                    
                    {/* Plus/Minus Indicator */}
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center text-text-primary">
                      <Plus
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-primary" : "rotate-0 text-text-primary"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[13px] text-text-secondary leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
