import React from 'react';
import { VideoGateProvider } from './context/VideoGateContext';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { TrustedByMarquee } from './components/TrustedByMarquee';
import { SocialProofSection } from './components/SocialProofSection';
import { StickyFooter } from './components/StickyFooter';
import { VideoGateModal } from './components/VideoGateModal';

export default function App() {
  return (
    <VideoGateProvider>
      <div className="min-h-screen w-full bg-[#0E1412] text-[#F0ECE1] flex flex-col items-center selection:bg-[#C9AB8B]/20 selection:text-[#C9AB8B]">
        {/* Section 1: Hero + VSL Video + Countdown Line + CTA Button */}
        <section
          id="hero-vsl-section"
          className="w-full bg-gradient-to-b from-[#16201D] to-[#0E1412] pt-[20px] md:pt-[80px] pb-[32px] md:pb-[56px] px-[20px] md:px-[48px] flex flex-col items-center"
        >
          <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
            {/* 1. Hero (Badge + Headline + Subheadline) */}
            <HeroSection />

            {/* 2. VSL Video + 3. Countdown Line + 4. CTA Button */}
            <VideoSection />
          </div>
        </section>

        {/* Section: Trusted By Marquee */}
        <TrustedByMarquee />

        {/* Section 2: Social Proof (Headline + 7 Result Cards + CTA Button) */}
        <SocialProofSection />

        {/* 6. Sticky Footer (always visible at bottom) */}
        <StickyFooter />

        {/* Modal for locked CTA clicks */}
        <VideoGateModal />
      </div>
    </VideoGateProvider>
  );
}
