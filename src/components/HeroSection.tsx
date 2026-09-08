import React from 'react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col items-center text-center"
    >
      {/* Qualifier Badge */}
      <div
        id="hero-qualifier-badge"
        className="inline-flex items-center justify-center rounded-[8px] bg-[#16201D] border border-[#1E2F2A] text-[#C9AB8B] font-bold text-[12px] md:text-[13px] py-[10px] px-[18px] md:py-[12px] md:px-[24px] max-w-[300px] md:max-w-none mx-auto leading-[1.35] md:leading-tight mb-[14px] md:mb-[28px] select-none"
      >
        For Coaches Stuck at ₹50K to ₹2L a Month.
      </div>

      {/* Hero Headline */}
      <h1
        id="hero-headline"
        className="w-full max-w-[320px] md:max-w-[1180px] mx-auto text-center font-bold tracking-[-0.02em] md:tracking-[-0.025em] text-[26px] md:text-[48px] leading-[1.2] md:leading-[1.1] mb-[12px] md:mb-[24px] [text-wrap:balance]"
      >
        <span className="block text-[#F0ECE1]">
          Scale Your Coaching Business to ₹10L a Month
        </span>
        <span className="block text-[#C9AB8B]">
          With the Client Acquisition System™
        </span>
      </h1>

      {/* Hero Subheadline */}
      <p
        id="hero-subheadline"
        className="w-full max-w-[320px] md:max-w-[700px] mx-auto text-center text-[#A3B0A9] text-[14px] md:text-[16px] leading-[1.55] md:leading-[1.65] mb-[20px] md:mb-[48px]"
      >
        Trusted by <strong className="font-bold text-[#F0ECE1]">153+ Coaches Across 9 Countries</strong> to Scale Without Endless DMs, Webinars, Cold Emails, or Posting Content Every Day — <strong className="font-bold text-[#C9AB8B]">₹8+ Crore Generated.</strong>
      </p>
    </motion.div>
  );
};
