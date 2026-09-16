import React from 'react';
import { motion } from 'motion/react';
import { ResultCardData } from '../types';
import { CtaButton } from './CtaButton';

const RESULT_CARDS: (ResultCardData & { afterFormatted: React.ReactNode })[] = [
  {
    id: 'card-1',
    resultLine: '₹1 Crore in 12 Months',
    name: 'Tahwid',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Tahwid.JPG',
    imageAlt: 'Tahwid client result',
    before: 'Stuck like most business owners. No system. No predictability. Income going nowhere.',
    after: 'Crossed ₹1 crore in business revenue in 12 months. Same skill. Different system.',
    afterFormatted: (
      <>
        Crossed <strong className="font-bold text-[#FFFFFF]">₹1 crore</strong> in business revenue in 12 months. Same skill. Different system.
      </>
    ),
  },
  {
    id: 'card-6',
    resultLine: '₹60 Lakh in 2 Years',
    name: 'Supreet',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Supreet.jpg',
    imageAlt: 'Supreet client result',
    before: 'Zero high-paying clients. Doubted whether ₹1L+ paying clients were even possible for him.',
    after: 'Closed a ₹3L deal from a cold stranger who had never heard of him. Built that into ₹60 Lakh over the next two years.',
    afterFormatted: (
      <>
        Closed a <strong className="font-bold text-[#FFFFFF]">₹3L</strong> deal from a cold stranger who had never heard of him. Built that into <strong className="font-bold text-[#FFFFFF]">₹60 Lakh</strong> over the next two years.
      </>
    ),
  },
  {
    id: 'card-5',
    resultLine: '₹1 Lakh From Two International Clients in 30 Days',
    name: 'Sweta Sharma',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Sweta%20Sharma.JPG',
    imageAlt: 'Sweta Sharma client result',
    before: 'Zero international clients. She did not believe dollar-paying clients were possible for her.',
    after: 'Closed two international clients paying in dollars within 30 days. ₹1 Lakh from those two clients alone.',
    afterFormatted: (
      <>
        Closed two international clients paying in dollars within 30 days. <strong className="font-bold text-[#FFFFFF]">₹1 Lakh</strong> from those two clients alone.
      </>
    ),
  },
  {
    id: 'card-3',
    resultLine: '₹3 Lakh in 30 Days',
    name: 'Nidhi',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Nidhi.JPG',
    imageAlt: 'Nidhi client result',
    before: 'Never made more than ₹50,000 in a single month.',
    after: 'Made ₹3 lakh in 30 days of installing the Client Acquisition System™.',
    afterFormatted: (
      <>
        Made <strong className="font-bold text-[#FFFFFF]">₹3 lakh</strong> in 30 days of installing the Client Acquisition System™.
      </>
    ),
  },
  {
    id: 'card-7',
    resultLine: 'Quit Her Bank Job and Signed a ₹1.2 Lakh Client',
    name: 'Priyanka',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Priyanka.jpeg',
    imageAlt: 'Priyanka client result',
    before: 'Working a full time bank job. Wanted to coach but had no proof she could earn from it.',
    after: 'Signed her first paying client at ₹1.2 lakh after installing the Client Acquisition System™. Then quit the bank job for good.',
    afterFormatted: (
      <>
        Signed her first paying client at <strong className="font-bold text-[#FFFFFF]">₹1.2 lakh</strong> after installing the Client Acquisition System™. Then quit the bank job for good.
      </>
    ),
  },
  {
    id: 'card-4',
    resultLine: 'First Client in 10 Days',
    name: 'Shweta',
    image: 'https://raw.githubusercontent.com/scale100million-prog/my-images/main/Shweta.png',
    imageAlt: 'Shweta client result',
    before: 'Two full years of posting. Two years of DMs. Two years of nothing.',
    after: 'First paying client in 10 days. Two years of struggle ended in 10 days with the right system.',
    afterFormatted: (
      <>
        First paying client in 10 days. Two years of struggle ended in 10 days with the right system.
      </>
    ),
  },
];

export const SocialProofSection: React.FC = () => {
  return (
    <section
      id="social-proof-section"
      className="w-full bg-[#0A0A0A] pt-[32px] md:pt-[56px] pb-[110px] px-[20px] md:px-[48px] flex flex-col items-center"
    >
      {/* Section Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        id="social-proof-headline"
        className="w-full max-w-[320px] md:max-w-[1180px] mx-auto text-center font-bold text-[#FFFFFF] text-[clamp(18px,5.2vw,24px)] md:text-[clamp(26px,2.6vw,34px)] tracking-[-0.02em] leading-[1.25] md:leading-[1.15] mb-[28px] md:mb-[40px] break-words [overflow-wrap:break-word] [text-wrap:balance]"
      >
        Here Is What Happened After We Installed the{' '}
        <span className="text-[#F5E6A3]">Predictable Client Acquisition System™</span>
      </motion.h2>

      <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center">
        {/* Result Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {RESULT_CARDS.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                className="w-full flex flex-col"
              >
                <div
                  id={`result-card-${card.id}`}
                  className="w-full h-full flex flex-col justify-between bg-[#141414] border border-[#262626] rounded-[10px] p-[24px]"
                >
                  <div>
                    {/* Card Photo */}
                    {card.image && (
                      <div className="w-full h-[300px] md:h-[260px] flex items-center justify-center bg-[#1A1A1A] border border-[#262626] rounded-[10px] overflow-hidden mb-[20px]">
                        <img
                          src={card.image}
                          alt={card.imageAlt || `${card.name} client result`}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Result Line */}
                    <div className="text-[16px] font-bold text-[#F5E6A3] text-center leading-snug">
                      {card.resultLine}
                    </div>

                    {/* Name */}
                    <div className="text-[18px] font-bold text-[#FFFFFF] text-center mt-[16px] leading-tight">
                      {card.name}
                    </div>

                    {/* Role (omitted if none) */}
                    {card.role && (
                      <div className="text-[12px] uppercase tracking-[0.1em] text-[#F5E6A3] font-bold text-center mt-[6px]">
                        {card.role}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="w-full my-[24px] border-t border-[#262626]" />

                    {/* BEFORE block */}
                    <div>
                      <div className="text-[12px] uppercase font-bold tracking-[0.1em] text-[#A0A0A0]">
                        BEFORE
                      </div>
                      <p className="text-[15px] font-normal text-[#A0A0A0] leading-[1.65] mt-[8px]">
                        {card.before}
                      </p>
                    </div>

                    {/* 20px gap */}
                    <div className="h-[20px]" />

                    {/* AFTER block */}
                    <div>
                      <div className="text-[12px] uppercase font-bold tracking-[0.1em] text-[#F5E6A3]">
                        AFTER
                      </div>
                      <p className="text-[15px] font-normal text-[#FFFFFF] leading-[1.65] mt-[8px]">
                        {card.afterFormatted}
                      </p>
                    </div>
                  </div>

                  {/* Quote block (only if present) */}
                  {card.quote && (
                    <div className="mt-[20px] bg-[#1A1A1A] border border-[#262626] rounded-[10px] p-[16px]">
                      <p
                        className="italic text-[15px] text-[#A0A0A0] leading-[1.6]"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        "{card.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button below Result Cards */}
        <div className="w-full flex justify-center mt-[44px]">
          <CtaButton id="social-proof-cta-button" />
        </div>
      </div>
    </section>
  );
};
