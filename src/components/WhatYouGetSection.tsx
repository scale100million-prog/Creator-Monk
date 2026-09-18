import React from 'react';
import { motion } from 'motion/react';

interface CallDeliverable {
  id: string;
  imageSrc: string;
  imageAlt: string;
  highlightText: string;
  normalText: string;
}

const DELIVERABLES: CallDeliverable[] = [
  {
    id: 'deliverable-1',
    imageSrc: 'https://placehold.co/640x360/1a1a1a/E8D171?text=PLACEHOLDER_IMG_1',
    imageAlt: 'Personalized breakdown and audit',
    highlightText: 'Personalized Breakdown',
    normalText: ' and audit of your current situation to figure out your main bottleneck',
  },
  {
    id: 'deliverable-2',
    imageSrc: 'https://placehold.co/640x360/1a1a1a/E8D171?text=PLACEHOLDER_IMG_2',
    imageAlt: 'Complete walkthrough of backend processes',
    highlightText: 'Complete Walkthrough',
    normalText: ' of our backend processes and systems',
  },
  {
    id: 'deliverable-3',
    imageSrc: 'https://placehold.co/640x360/1a1a1a/E8D171?text=PLACEHOLDER_IMG_3',
    imageAlt: 'Personalized roadmap',
    highlightText: 'Personalized Roadmap',
    normalText: ' which helps you achieve your goals step by step',
  },
];

export const WhatYouGetSection: React.FC = () => {
  return (
    <section
      id="what-you-get-section"
      className="w-full bg-[#0A0A0A] pt-[40px] md:pt-[64px] pb-[40px] md:pb-[64px] px-[20px] md:px-[48px] flex flex-col items-center"
      aria-label="What You'll Get On This Strategy Call"
    >
      {/* 1. The Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        id="what-you-get-heading"
        className="w-full max-w-[340px] sm:max-w-[600px] md:max-w-[1080px] mx-auto text-center font-bold text-[26px] md:text-[44px] leading-[1.2] tracking-[-0.02em] mb-[32px] md:mb-[40px]"
      >
        <span className="text-[#FFFFFF]">What You'll Get On This </span>
        <span className="text-[#E8D171]">Strategy Call</span>
      </motion.h2>

      {/* 2. The Three Columns Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        id="what-you-get-card"
        className="w-full max-w-[1080px] mx-auto bg-[#141414] border border-[#262626] rounded-[16px] p-[24px] md:p-[40px]"
      >
        <div className="flex flex-col md:flex-row gap-[32px] md:gap-[32px] items-stretch">
          {DELIVERABLES.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                {/* Column */}
                <div
                  id={`what-you-get-col-${index + 1}`}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  {/* 16:9 Image Container */}
                  <div className="w-full aspect-[16/9] rounded-[10px] overflow-hidden bg-[#1A1A1A] border border-[#262626]">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover rounded-[10px]"
                      loading="lazy"
                    />
                  </div>

                  {/* Caption */}
                  <p
                    id={`what-you-get-caption-${index + 1}`}
                    className="text-[16px] md:text-[20px] leading-[1.5] text-center mt-[24px]"
                  >
                    <span className="text-[#E8D171] font-semibold">
                      {item.highlightText}
                    </span>
                    <span className="text-[#FFFFFF] font-normal">
                      {item.normalText}
                    </span>
                  </p>
                </div>

                {/* Thin Vertical Divider (Desktop Only) */}
                {index < DELIVERABLES.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block w-[1px] bg-[#262626] shrink-0 self-stretch"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
