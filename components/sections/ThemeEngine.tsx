'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  DollarSign,
  ShoppingBag,
  Zap,
  Code2,
  Palette,
  Layers,
} from 'lucide-react'
import { type ReactNode } from 'react'
import { Button } from "@/components/ui/Button";
/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface BrandCard {
  icon: ReactNode
  brand: string
  badge: string
  bg: string
  text: string
  primary: string
  kpis: { label: string; value: string }[]
  barColor: string
  barHeights: number[]
  button: { label: string; className: string }
  badgeClassName: string
  dividerClassName: string
  mutedClassName: string
  dotColor: string
}

const brands: BrandCard[] = [
  {
    icon: <Heart className="w-4 h-4 text-sky-500" />,
    brand: 'MedDash Analytics',
    badge: 'HEALTHCARE',
    bg: 'bg-bg-base',
    text: 'text-text-primary',
    primary: 'var(--color-accent)',
    kpis: [
      { label: 'Active Patients', value: '12,847' },
      { label: 'Avg Stay', value: '4.2 days' },
    ],
    barColor: 'bg-sky-500',
    barHeights: [45, 70, 55, 90, 60, 80],
    button: {
      label: 'View Patient Report',
      className:
        'bg-sky-500 text-white hover:bg-sky-600',
    },
    badgeClassName: 'bg-sky-100 text-sky-700',
    dividerClassName: 'border-slate-200',
    mutedClassName: 'text-text-secondary',
    dotColor: 'bg-sky-500',
  },
  {
    icon: <DollarSign className="w-4 h-4 text-amber-400" />,
    brand: 'Vault Finance',
    badge: 'FINTECH',
    bg: 'bg-bg-elevated',
    text: 'text-white',
    primary: '#FBBF24',
    kpis: [
      { label: 'Portfolio', value: '$4.8M' },
      { label: 'ROI', value: '+23.5%' },
    ],
    barColor: 'bg-status-warning',
    barHeights: [60, 40, 85, 50, 95, 70],
    button: {
      label: 'Trade Now',
      className:
        'bg-status-warning text-text-primary hover:bg-amber-300 font-bold',
    },
    badgeClassName: 'bg-amber-900/30 text-amber-300',
    dividerClassName: 'border-border-subtle',
    mutedClassName: 'text-emerald-300/60',
    dotColor: 'bg-status-warning',
  },
  {
    icon: <ShoppingBag className="w-4 h-4 text-white" />,
    brand: 'Stitch Style',
    badge: 'CONSUMER',
    bg: '',
    text: 'text-white',
    primary: 'var(--color-white)',
    kpis: [
      { label: 'Orders', value: '1,247' },
      { label: 'AOV', value: '$89.50' },
    ],
    barColor: 'bg-bg-base/70',
    barHeights: [50, 80, 35, 65, 90, 55],
    button: {
      label: 'Shop Now',
      className: 'bg-bg-base text-slate-900 hover:bg-bg-base/90 font-bold',
    },
    badgeClassName: 'bg-bg-base/20 text-white',
    dividerClassName: 'border-white/20',
    mutedClassName: 'text-white/60',
    dotColor: 'bg-bg-base',
  },
  {
    icon: <Zap className="w-4 h-4 text-emerald-400" />,
    brand: 'DevOps Cloud',
    badge: 'DEVELOPER',
    bg: 'bg-bg-base',
    text: 'text-emerald-400',
    primary: 'var(--color-success)',
    kpis: [
      { label: 'Deploys', value: '4,521' },
      { label: 'Uptime', value: '99.99%' },
    ],
    barColor: 'bg-status-success',
    barHeights: [70, 55, 100, 45, 80, 60],
    button: {
      label: 'Deploy',
      className:
        'bg-status-success text-black hover:bg-status-success font-mono font-bold',
    },
    badgeClassName: 'bg-emerald-950 text-emerald-400',
    dividerClassName: 'border-emerald-400/15',
    mutedClassName: 'text-emerald-400/50',
    dotColor: 'bg-status-success',
  },
]

/* ------------------------------------------------------------------ */
/*  Token System Data                                                  */
/* ------------------------------------------------------------------ */

interface TokenColumn {
  icon: ReactNode
  title: string
  description: string
  code: string
}

const tokenColumns: TokenColumn[] = [
  {
    icon: <Palette className="w-5 h-5 text-brand" />,
    title: 'Primitive Tokens',
    description:
      "Raw design values — colors, spacing, fonts — that form your brand's visual foundation.",
    code: `--color-blue-500: var(--color-accent);\n--space-unit: 4px;\n--font-body: 'Inter';`,
  },
  {
    icon: <Layers className="w-5 h-5 text-brand" />,
    title: 'Semantic Tokens',
    description:
      'Purpose-driven aliases that map primitives to UI roles, ensuring consistency across every component.',
    code: `--color-primary: var(--color-blue-500);\n--color-surface: var(--color-slate-900);\n--radius-card: calc(var(--space-unit) * 3);`,
  },
  {
    icon: <Code2 className="w-5 h-5 text-emerald-400" />,
    title: 'Component Tokens',
    description:
      'Scoped overrides for individual elements, giving you pixel-perfect control without breaking the system.',
    code: `--btn-bg: var(--color-primary);\n--btn-radius: var(--radius-card);\n--card-shadow: 0 4px 24px rgba(0,0,0,0.12);`,
  },
]

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ThemeEngine() {
  return (
    <section id="white-label" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ---- HEADER ---- */}
        <div className="text-center mb-12">
          <p className="text-brand text-[13px] uppercase tracking-[0.15em] font-bold mb-4">
            WHITE-LABEL READY
          </p>

          <h2
            className="font-semibold tracking-[-0.04em] text-[var(--prism-site-text)] mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            One platform.{' '}
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              Every brand.
            </span>
          </h2>

          <p className="max-w-[600px] mx-auto text-center text-[var(--prism-site-text-secondary)] text-base leading-relaxed">
            The same Prism dashboard, customized to feel native inside any
            product. See how design teams use our 3-layer token system to match
            their brand perfectly.
          </p>
        </div>

        {/* ---- BRAND SHOWCASE GRID ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((card, i) => {
            const isConsumer = card.badge === 'CONSUMER'

            return (
              <motion.div
                key={card.brand}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className={`
                  rounded-xl overflow-hidden p-4 border border-border-subtle
                  hover:translate-y-[-6px] hover:shadow-xl
                  transition-all duration-300 cursor-pointer
                  ${card.bg} ${card.text}
                `}
                style={
                  isConsumer
                    ? {
                        background:
                          'linear-gradient(135deg, var(--color-accent), #F97316)',
                      }
                    : undefined
                }
              >
                {/* Header row */}
                <div className="flex items-center gap-1.5">
                  {card.icon}
                  <span className="font-semibold text-xs truncate">
                    {card.brand}
                  </span>
                  <span
                    className={`ml-auto w-1.5 h-1.5 rounded-full ${card.dotColor} shrink-0`}
                  />
                </div>

                {/* Divider */}
                <div className={`border-t ${card.dividerClassName} my-3`} />

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {card.kpis.map((kpi) => (
                    <div key={kpi.label}>
                      <p
                        className={`text-[9px] ${card.mutedClassName} mb-0.5`}
                      >
                        {kpi.label}
                      </p>
                      <p className="text-sm font-bold leading-tight">
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-10 mb-3">
                  {card.barHeights.map((h, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm ${card.barColor}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Bottom row */}
                <div className="flex justify-between items-center">
                  <Button 
                  size="sm"
                    className={`px-3 py-1 rounded-md text-[10px] font-bold ${card.button.className} transition-colors`}
                  >
                    {card.button.label}
                  </Button>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${card.badgeClassName}`}
                  >
                    {card.badge}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ---- TOKEN SYSTEM EXPLAINER ---- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tokenColumns.map((col, i) => (
            <motion.div
              key={col.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="mb-3">{col.icon}</div>
              <h3 className="text-[var(--prism-site-text)] font-semibold text-base mb-1.5">
                {col.title}
              </h3>
              <p className="text-[var(--prism-site-text-secondary)] text-xs mb-3 leading-relaxed">
                {col.description}
              </p>
              <div className="bg-bg-elevated border border-border-subtle p-3 rounded-lg">
                <pre className="text-[10px] font-mono text-text-brand whitespace-pre-wrap leading-relaxed">
                  {col.code}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

