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
        className="inline-flex items-center justify-center rounded-full bg-[#141414] border border-[#262626] text-[#F5E6A3] font-bold text-[13px] md:text-[18px] py-[10px] px-[18px] md:py-[14px] md:px-[32px] leading-[1.35] md:leading-tight mb-[16px] md:mb-[24px] select-none text-center"
      >
        For Coaches Stuck at ₹50K to ₹2L a Month.
      </div>

      {/* Hero Headline */}
      <h1
        id="hero-headline"
        className="w-full max-w-[1180px] mx-auto text-center font-bold tracking-[-0.02em] md:tracking-[-0.025em] text-[26px] sm:text-[36px] md:text-[48px] leading-[1.2] md:leading-[1.1] mb-[16px] md:mb-[24px]"
      >
        <span className="block text-[#FFFFFF]">
          Scale Your Coaching Business to ₹10L a Month
        </span>
        <span className="block text-[#F5E6A3]">
          With the Predictable Client Acquisition System™
        </span>
      </h1>

      {/* Hero Subheadline */}
      <p
        id="hero-subheadline"
        className="w-full max-w-[680px] md:max-w-[700px] mx-auto text-center text-[#A0A0A0] text-[14px] md:text-[16px] leading-[1.55] md:leading-[1.65] mb-[24px] md:mb-[48px]"
      >
        Trusted by <strong className="font-bold text-[#FFFFFF]">147+ Coaches Across 9 Countries</strong> to Scale Without Endless DMs, Webinars, Cold Emails, or Posting Content Every Day — <strong className="font-bold text-[#F5E6A3]">₹2+ Crore Generated.</strong>
      </p>
    </motion.div>
  );
};
