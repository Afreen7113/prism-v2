"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import RevealText from "@/components/ui/RevealText";

// Themes configuration to demonstrate white-label capability
const themesConfig = {
  white: {
    bg: "bg-white",
    text: "text-slate-900",
    textMuted: "text-slate-400/80",
    accent: "text-blue-500",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
    sidebar: "bg-slate-50",
    border: "border-slate-200/80",
    divider: "border-slate-100",
    logoColor: "#3B82F6",
    chartColor: "#3B82F6",
    gradientId: "whiteGrad",
  },
  beige: {
    bg: "bg-[#FAF7F2]",
    text: "text-stone-900",
    textMuted: "text-stone-400",
    accent: "text-amber-600",
    accentBg: "bg-amber-600/10",
    accentBorder: "border-amber-600/20",
    sidebar: "bg-[#F5F1E8]",
    border: "border-[#E7E5E0]",
    divider: "border-stone-200/60",
    logoColor: "#D97706",
    chartColor: "#D97706",
    gradientId: "beigeGrad",
  },
  darkBlue: {
    bg: "bg-[#0F172A]",
    text: "text-slate-50",
    textMuted: "text-slate-500",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400/10",
    accentBorder: "border-cyan-400/20",
    sidebar: "bg-[#1E293B]",
    border: "border-slate-800",
    divider: "border-slate-800",
    logoColor: "#06B6D4",
    chartColor: "#06B6D4",
    gradientId: "darkBlueGrad",
  },
  darkPurple: {
    bg: "bg-[#1E1B4B]",
    text: "text-indigo-50",
    textMuted: "text-indigo-500",
    accent: "text-purple-400",
    accentBg: "bg-purple-400/10",
    accentBorder: "border-indigo-900",
    sidebar: "bg-[#312E81]",
    border: "border-indigo-900",
    divider: "border-indigo-900",
    logoColor: "#A855F7",
    chartColor: "#A855F7",
    gradientId: "darkPurpleGrad",
  },
  lightMint: {
    bg: "bg-[#F0FDF4]",
    text: "text-emerald-950",
    textMuted: "text-emerald-600/60",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-600/10",
    accentBorder: "border-emerald-600/20",
    sidebar: "bg-[#DCFCE7]",
    border: "border-emerald-200/80",
    divider: "border-emerald-200/60",
    logoColor: "#10B981",
    chartColor: "#10B981",
    gradientId: "lightMintGrad",
  },
};

const cardConfigs = [
  {
    theme: "white" as const,
    title: "Clinix Portal",
    kpi1Label: "Total Patients",
    kpi1Value: "23,685",
    kpi1Trend: "+12.5%",
    kpi2Label: "Avg Stay",
    kpi2Value: "4.2 days",
    chartPath: "M 0 80 Q 40 40 80 70 T 160 30 T 240 50 T 300 20",
    donutRatio: "75 25",
    donutPercent: "75%",
    detailText: "Admissions: 1,420",
    avatarText: "CX",
  },
  {
    theme: "beige" as const,
    title: "Apex Wealth",
    kpi1Label: "Transactions",
    kpi1Value: "12,480",
    kpi1Trend: "+8.2%",
    kpi2Label: "Revenue",
    kpi2Value: "$48.2K",
    chartPath: "M 0 90 Q 45 60 90 80 T 180 40 T 270 60 T 300 30",
    donutRatio: "60 40",
    donutPercent: "60%",
    detailText: "Fulfill Rate: 99.4%",
    avatarText: "AW",
  },
  {
    theme: "darkBlue" as const,
    title: "DevEngine Metrics",
    kpi1Label: "API Requests",
    kpi1Value: "1.2M",
    kpi1Trend: "+18.4%",
    kpi2Label: "Latency",
    kpi2Value: "14ms",
    chartPath: "M 0 95 Q 30 70 70 85 T 150 40 T 230 65 T 300 15",
    donutRatio: "80 20",
    donutPercent: "80%",
    detailText: "Uptime: 99.98%",
    avatarText: "DE",
  },
  {
    theme: "darkPurple" as const,
    title: "Prism Premium",
    kpi1Label: "Active Users",
    kpi1Value: "45.2K",
    kpi1Trend: "+15.1%",
    kpi2Label: "MRR",
    kpi2Value: "$84.2K",
    chartPath: "M 0 75 Q 40 30 90 60 T 180 20 T 270 45 T 300 10",
    donutRatio: "70 30",
    donutPercent: "70%",
    detailText: "ARPU: $184.20",
    avatarText: "PR",
  },
  {
    theme: "lightMint" as const,
    title: "ShopSync Retail",
    kpi1Label: "Net Orders",
    kpi1Value: "3,842",
    kpi1Trend: "+24.1%",
    kpi2Label: "Conversion",
    kpi2Value: "3.8%",
    chartPath: "M 0 85 Q 50 45 100 70 T 200 30 T 300 15",
    donutRatio: "84 16",
    donutPercent: "84%",
    detailText: "Fulfillment: 99.1%",
    avatarText: "SS",
  },
];

export default function Hero() {
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScreenSize("mobile");
      } else if (w < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardTransforms = (index: number, hovered: boolean) => {
    
    // Stack goes from front-left (Card 0) to back-right (Card 4), rotated Y to face left
    const basePositions = [
      { left: 0, top: 25, rotateY: -5, rotateX: 0, z: 80, opacity: 1, zIndex: 5 },
      { left: 55, top: 18, rotateY: -10, rotateX: 0, z: 40, opacity: 1, zIndex: 4 },
      { left: 110, top: 10, rotateY: -15, rotateX: 2, z: 0, opacity: 0.95, zIndex: 3 },
      { left: 165, top: 5, rotateY: -20, rotateX: 3, z: -40, opacity: 0.9, zIndex: 2 },
      { left: 220, top: 0, rotateY: -25, rotateX: 5, z: -80, opacity: 0.85, zIndex: 1 },
    ];

    const current = basePositions[index];

    // Hover spreads out the stack horizontally (Card 0 moves left, Card 4 moves right)
    const spreadOffset = hovered ? (index - 2) * 7.5 : 0;
    
    // On mobile, visible cards [0, 1, 2] start directly from left: 0px fanning to 110px
    const leftVal = current.left + spreadOffset;

    return {
      left: leftVal,
      top: current.top,
      rotateY: current.rotateY,
      rotateX: current.rotateX,
      z: current.z,
      opacity: current.opacity,
      zIndex: current.zIndex,
    };
  };

  const visibleCardIndices = screenSize === "mobile" ? [0, 1, 2] : [0, 1, 2, 3, 4];

  // Render static copy of card contents for bottom diagram or stack cards
  const renderCardContent = (index: number) => {
    const cardConfig = cardConfigs[index];
    const t = themesConfig[cardConfig.theme];

    return (
      <div className={`w-full h-full flex rounded-[16px] border ${t.bg} ${t.text} ${t.border} overflow-hidden font-sans`}>
        {/* Sidebar (45px wide) */}
        <div className={`w-[45px] h-full flex flex-col justify-between items-center py-3 border-r ${t.sidebar} ${t.border} shrink-0`}>
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: t.logoColor }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            
            {/* Nav Icons */}
            <div className="flex flex-col gap-4.5 mt-6">
              <LayoutDashboard className={`w-3.5 h-3.5 ${t.accent}`} />
              <Users className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
              <CreditCard className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
              <Settings className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
            </div>
          </div>
          
          <div className={`w-5 h-5 rounded-full ${t.accentBg} border ${t.accentBorder} flex items-center justify-center text-[7px] font-bold ${t.accent}`}>
            {cardConfig.avatarText}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Bar */}
          <div className={`h-[38px] px-3 flex items-center justify-between border-b ${t.divider} shrink-0`}>
            <span className="text-[10px] font-bold tracking-tight truncate">{cardConfig.title}</span>
            <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${t.accentBg} ${t.accent} border ${t.accentBorder}`}>
              Live
            </span>
          </div>

          <div className="flex-1 p-3 flex flex-col justify-between min-h-0">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <div className={`p-1.5 rounded-lg border ${t.divider} ${t.sidebar}`}>
                <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} block`}>
                  {cardConfig.kpi1Label}
                </span>
                <div className="flex items-baseline gap-0.5 mt-0.5">
                  <span className="text-xs font-bold">{cardConfig.kpi1Value}</span>
                  <span className={`text-[6.5px] font-bold px-0.5 py-0.2 rounded ${t.accentBg} ${t.accent}`}>
                    {cardConfig.kpi1Trend}
                  </span>
                </div>
              </div>
              
              <div className={`p-1.5 rounded-lg border ${t.divider} ${t.sidebar}`}>
                <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} block`}>
                  {cardConfig.kpi2Label}
                </span>
                <span className="text-xs font-bold block mt-0.5">{cardConfig.kpi2Value}</span>
              </div>
            </div>

            {/* Area Chart */}
            <div className="my-2 flex-1 flex flex-col justify-center min-h-0">
              <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} mb-0.5 block`}>
                Analytics Growth
              </span>
              <div className="flex-1 min-h-[50px] max-h-[70px]">
                <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={t.gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={t.chartColor} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={t.chartColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${cardConfig.chartPath} L 300 120 L 0 120 Z`}
                    fill={`url(#${t.gradientId})`}
                  />
                  <path
                    d={cardConfig.chartPath}
                    fill="none"
                    stroke={t.chartColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Footer */}
            <div className={`pt-1.5 border-t ${t.divider} flex items-center justify-between shrink-0`}>
              <span className={`text-[7px] font-semibold ${t.textMuted}`}>{cardConfig.detailText}</span>
              <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="4" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke={t.chartColor}
                    strokeWidth="4"
                    strokeDasharray={cardConfig.donutRatio}
                    strokeDashoffset="0"
                  />
                </svg>
                <span className={`absolute text-[7px] font-bold ${t.text}`}>{cardConfig.donutPercent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-bg-base pt-24 pb-16 md:pt-28 md:pb-20 px-6 z-10">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none" />

      {/* Glow Orbs */}
      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />
      <motion.div
        animate={{
          x: [30, -30, 30],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />

      <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column - Content */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left lg:pl-8">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
            className="glass px-6 py-1.5 rounded-full text-[11px] font-semibold border border-primary/25 text-primary/95 flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.1)] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>WHITE-LABEL ANALYTICS INFRASTRUCTURE</span>
          </motion.div>

          {/* Heading */}
          <div className="text-4xl sm:text-5xl md:text-6.5xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1] max-w-xl">
            <RevealText
              text="Analytics that adapts"
              tag="h1"
              trigger="mount"
              delay={0.1}
              className="text-text-primary font-bold block"
            />
            <RevealText
              text="to any brand"
              tag="span"
              trigger="mount"
              delay={0.4}
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] font-bold block mt-1"
            />
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
            className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-8"
          >
            Build once. Embed everywhere. Prism gives B2B software companies the analytics infrastructure to deliver beautiful dashboards, reports, and exports inside their own product.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.32, 0.72, 0, 1] as const }}
            className="flex flex-wrap gap-4 items-center mb-6 w-full"
          >
            <Link
              href="#get-started"
              className="group relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-primary via-indigo-600 to-tertiary shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <motion.span
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3,
                  ease: "linear",
                  repeatDelay: 1.5,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              />
              Start Free Trial
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#demo"
              className="glass group inline-flex items-center justify-center px-6 py-3 font-medium text-text-primary rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              View Live Demo
            </Link>
          </motion.div>

          {/* Trust Indicators Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-secondary/90 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

        </div>

        <div className="col-span-1 lg:col-span-6 flex items-center justify-center lg:justify-end lg:pr-2 xl:pr-0 min-h-[350px] lg:min-h-[400px] w-full relative lg:translate-x-24 xl:translate-x-36 2xl:translate-x-48">
          
          {/* Decorative Indigo Glow */}
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
          
          {/* Subtle connecting curve behind the stack */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center translate-y-20">
            <svg className="w-[530px] h-[250px] scale-75 sm:scale-90 md:scale-95 lg:scale-100 opacity-60" viewBox="0 0 530 250" fill="none">
              <path
                d="M 30 180 C 130 250, 400 250, 500 180"
                stroke="rgba(99, 102, 241, 0.25)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="100" cy="205" r="3" fill="#6366f1" className="animate-pulse" />
              <circle cx="260" cy="225" r="3.5" fill="#a855f7" className="animate-pulse" />
              <circle cx="420" cy="205" r="3" fill="#10b981" className="animate-pulse" />
            </svg>
          </div>

          {/* Fanned Stack scaling wrapper */}
          <div 
            onMouseEnter={() => setIsStackHovered(true)}
            onMouseLeave={() => setIsStackHovered(false)}
            className="scale-75 sm:scale-90 md:scale-95 lg:scale-100 origin-center transition-transform duration-500 z-10"
          >
            <div 
              className="relative w-[530px] h-[250px]"
              style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
            >
              {visibleCardIndices.map((index) => {
                const cardTransforms = getCardTransforms(index, isStackHovered);
                const cardConfig = cardConfigs[index];
                const t = themesConfig[cardConfig.theme];
                
                return (
                  <motion.div
                    key={index}
                    style={{ 
                      position: "absolute",
                      left: cardTransforms.left,
                      top: cardTransforms.top,
                      zIndex: cardTransforms.zIndex,
                      transformStyle: "preserve-3d", 
                    }}
                    animate={{
                      left: cardTransforms.left,
                      opacity: cardTransforms.opacity,
                      rotateY: cardTransforms.rotateY,
                      rotateX: cardTransforms.rotateX,
                      z: cardTransforms.z,
                    }}
                    transition={{
                      left: { duration: 0.5, ease: "easeOut" },
                      rotateY: { duration: 0.5, ease: "easeOut" },
                      rotateX: { duration: 0.5, ease: "easeOut" },
                      z: { duration: 0.5, ease: "easeOut" },
                      x: { duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] as const },
                      opacity: { duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] as const },
                    }}
                    initial={{
                      opacity: 0,
                      x: -100,
                      rotateY: cardTransforms.rotateY - 20,
                      rotateX: cardTransforms.rotateX + 2,
                      z: cardTransforms.z - 50
                    }}
                    className={`w-[310px] h-[220px]`}
                  >
                    {/* Floating bobbing wrapper */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 4 + (index * 0.5),
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`w-full h-full flex rounded-[16px] overflow-hidden border ${t.bg} ${t.text} ${t.border} ${
                        index === 0 
                          ? "shadow-[0_25px_50px_rgba(0,0,0,0.35)] border-primary/20" 
                          : index === 1
                          ? "shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                          : "shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                      }`}
                    >
                      {/* Sidebar (45px wide) */}
                      <div className={`w-[45px] h-full flex flex-col justify-between items-center py-3 border-r ${t.sidebar} ${t.border} shrink-0`}>
                        <div className="flex flex-col items-center">
                          {/* Logo */}
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center text-white shadow-sm"
                            style={{ backgroundColor: t.logoColor }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          
                          {/* Navigation Icons */}
                          <div className="flex flex-col gap-4.5 mt-6">
                            <LayoutDashboard className={`w-3.5 h-3.5 ${t.accent}`} />
                            <Users className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
                            <CreditCard className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
                            <Settings className={`w-3.5 h-3.5 ${t.textMuted} opacity-40`} />
                          </div>
                        </div>
                        
                        {/* Profile initials */}
                        <div className={`w-5 h-5 rounded-full ${t.accentBg} border ${t.accentBorder} flex items-center justify-center text-[7px] font-bold ${t.accent}`}>
                          {cardConfig.avatarText}
                        </div>
                      </div>

                      {/* Right Content Area */}
                      <div className="flex-1 flex flex-col min-w-0">
                        {/* Header Bar */}
                        <div className={`h-[38px] px-3 flex items-center justify-between border-b ${t.divider} shrink-0`}>
                          <span className="text-[10px] font-bold tracking-tight truncate">{cardConfig.title}</span>
                          <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${t.accentBg} ${t.accent} border ${t.accentBorder}`}>
                            Live
                          </span>
                        </div>

                        {/* Main Body */}
                        <div className="flex-1 p-3 flex flex-col justify-between min-h-0">
                          {/* KPIs Grid */}
                          <div className="grid grid-cols-2 gap-2 shrink-0">
                            {/* KPI 1 */}
                            <div className={`p-1.5 rounded-lg border ${t.divider} ${t.sidebar}`}>
                              <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} block`}>
                                {cardConfig.kpi1Label}
                              </span>
                              <div className="flex items-baseline gap-0.5 mt-0.5">
                                <span className="text-xs font-bold">{cardConfig.kpi1Value}</span>
                                <span className={`text-[6.5px] font-bold px-0.5 py-0.2 rounded ${t.accentBg} ${t.accent}`}>
                                  {cardConfig.kpi1Trend}
                                </span>
                              </div>
                            </div>
                            
                            {/* KPI 2 */}
                            <div className={`p-1.5 rounded-lg border ${t.divider} ${t.sidebar}`}>
                              <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} block`}>
                                {cardConfig.kpi2Label}
                              </span>
                              <span className="text-xs font-bold block mt-0.5">{cardConfig.kpi2Value}</span>
                            </div>
                          </div>

                          {/* Large Area Chart */}
                          <div className="my-2 flex-1 flex flex-col justify-center min-h-0">
                            <span className={`text-[7px] font-medium uppercase tracking-wider ${t.textMuted} mb-0.5 block`}>
                              Analytics Growth
                            </span>
                            <div className="flex-1 min-h-[50px] max-h-[70px]">
                              <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id={t.gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={t.chartColor} stopOpacity="0.25" />
                                    <stop offset="100%" stopColor={t.chartColor} stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d={`${cardConfig.chartPath} L 300 120 L 0 120 Z`}
                                  fill={`url(#${t.gradientId})`}
                                />
                                <path
                                  d={cardConfig.chartPath}
                                  fill="none"
                                  stroke={t.chartColor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className={`pt-1.5 border-t ${t.divider} flex items-center justify-between shrink-0`}>
                            <span className={`text-[7px] font-semibold ${t.textMuted}`}>{cardConfig.detailText}</span>
                            
                            {/* Mini Donut Chart */}
                            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="4" />
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="15.915"
                                  fill="none"
                                  stroke={t.chartColor}
                                  strokeWidth="4"
                                  strokeDasharray={cardConfig.donutRatio}
                                  strokeDashoffset="0"
                                />
                              </svg>
                              <span className={`absolute text-[7px] font-bold ${t.text}`}>{cardConfig.donutPercent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom section diagram */}
      <div className="mt-24 lg:mt-32 w-full max-w-[1100px] mx-auto text-center px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary mb-3">
            One platform. Infinite brands.
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
            The same powerful analytics engine, styled to match your product perfectly.
          </p>
        </motion.div>

        {/* Three connected nodes */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 relative w-full pt-4">
          
          {/* SVG Connector Lines - Desktop only */}
          <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 300" fill="none">
              {/* Left path: Medical SaaS to Prism Engine */}
              <path
                id="left-path"
                d="M 230 150 C 320 150, 360 150, 450 150"
                stroke="rgba(99, 102, 241, 0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Right path: Prism Engine to Retail SaaS */}
              <path
                id="right-path"
                d="M 550 150 C 640 150, 680 150, 770 150"
                stroke="rgba(168, 85, 247, 0.12)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Animated flow dots - Left Direction */}
              <motion.circle r="3.5" fill="#6366f1">
                <animateMotion dur="4.2s" repeatCount="indefinite" path="M 500 150 C 410 150, 370 150, 230 150" />
              </motion.circle>
              <motion.circle r="3.5" fill="#22d3ee">
                <animateMotion dur="4.2s" repeatCount="indefinite" path="M 230 150 C 320 150, 360 150, 500 150" />
              </motion.circle>

              {/* Animated flow dots - Right Direction */}
              <motion.circle r="3.5" fill="#a855f7">
                <animateMotion dur="4.8s" repeatCount="indefinite" path="M 500 150 C 590 150, 630 150, 770 150" />
              </motion.circle>
              <motion.circle r="3.5" fill="#10b981">
                <animateMotion dur="4.8s" repeatCount="indefinite" path="M 770 150 C 680 150, 640 150, 500 150" />
              </motion.circle>
            </svg>
          </div>

          {/* Left Node: Medical SaaS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] as const }}
            className="z-10 w-full max-w-[330px]"
          >
            <div className="text-center mb-3">
              <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/15">Medical SaaS</span>
            </div>
            <div className="w-full aspect-[1.4] scale-95 border border-white/5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden">
              {renderCardContent(0)}
            </div>
          </motion.div>

          {/* Center Node: Prism Engine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] as const }}
            className="z-10 w-full max-w-[360px]"
          >
            <div className="glass border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(99,102,241,0.15)] bg-slate-900/40">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-4">Prism Engine</span>
              <div className="flex gap-4 items-center">
                {/* Prism visual */}
                <div className="w-1/3 flex justify-center">
                  <svg viewBox="0 0 100 100" className="w-16 h-16">
                    <polygon points="50,15 15,80 85,80" fill="url(#prismGrad)" opacity="0.8" />
                    <polygon points="50,15 50,80 85,80" fill="url(#prismSideGrad)" opacity="0.6" />
                    <line x1="50" y1="15" x2="15" y2="80" stroke="#a855f7" strokeWidth="1.5" />
                    <line x1="50" y1="15" x2="85" y2="80" stroke="#ec4899" strokeWidth="1.5" />
                    <line x1="15" y1="80" x2="85" y2="80" stroke="#6366f1" strokeWidth="1.5" />
                    <line x1="50" y1="15" x2="50" y2="80" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                    <defs>
                      <linearGradient id="prismGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                      <linearGradient id="prismSideGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Capabilities list */}
                <div className="w-2/3 flex flex-col gap-2.5 text-left border-l border-white/5 pl-4">
                  {[
                    "Data Collection",
                    "Processing",
                    "Analytics",
                    "Visualization",
                    "Exports & APIs"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-text-primary/95 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Node: Retail SaaS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] as const }}
            className="z-10 w-full max-w-[330px]"
          >
            <div className="text-center mb-3">
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">Retail SaaS</span>
            </div>
            <div className="w-full aspect-[1.4] scale-95 border border-white/5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden">
              {renderCardContent(3)}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
