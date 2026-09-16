import React, { useState, useEffect } from 'react';
import { useVideoGate } from '../context/VideoGateContext';

const COUNTDOWN_MINUTES = 15;
const SLOTS_LEFT = 3;

export const StickyFooter: React.FC = () => {
  const { openModal } = useVideoGate();

  // In-memory countdown timer starting at 15:00 on page load
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_MINUTES * 60);

  useEffect(() => {
    const endTime = Date.now() + COUNTDOWN_MINUTES * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((endTime - now) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <footer
      id="sticky-footer"
      className="fixed bottom-0 left-0 right-0 w-full h-[80px] z-40 bg-[#0A0A0A]/[0.97] backdrop-blur-[16px] border-t border-[#262626] shadow-[0_-4px_24px_rgba(0,0,0,0.4)] px-[16px] sm:px-[24px] md:px-[40px] flex items-center justify-between"
    >
      {/* Left side: Countdown & Slots text stacked vertically */}
      <div className="flex flex-col text-left justify-center flex-shrink-0">
        <div
          id="sticky-countdown-timer"
          className="text-[#E8D171] font-bold text-[24px] md:text-[32px] leading-none tracking-[-0.01em] select-none font-sans"
        >
          {formatTime(secondsLeft)}
        </div>
        <div
          id="sticky-limited-slots-text"
          className="text-[#A0A0A0] text-[12px] md:text-[14px] leading-tight font-medium mt-[4px] select-none"
        >
          Limited Slots Only!
        </div>
      </div>

      {/* Right side: Pill Apply Now button with floating badge */}
      <div className="relative flex items-center flex-shrink-0">
        {/* "3 Slots Left" BADGE */}
        <div
          id="sticky-slots-badge"
          className="absolute -top-[12px] right-[10px] sm:right-[14px] z-10 flex items-center gap-[6px] bg-[#1A1A1A] border border-[#262626] text-[#FFFFFF] text-[11px] sm:text-[12px] font-bold py-[3px] px-[10px] rounded-full shadow-md select-none pointer-events-none whitespace-nowrap"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-[#E8D171] inline-block flex-shrink-0" />
          <span>{SLOTS_LEFT} Slots Left</span>
        </div>

        {/* Pill Button */}
        <button
          id="sticky-footer-cta"
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center font-semibold text-[15px] sm:text-[16px] text-[#0A0A0A] bg-[#FFFFFF] rounded-full cursor-pointer select-none text-center py-[12px] sm:py-[14px] md:py-[16px] px-[24px] sm:px-[32px] md:px-[40px] min-h-[44px] md:min-h-[48px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#E8D171] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#E8D171] focus-visible:outline-offset-2 transition-all duration-200 ease-out whitespace-nowrap"
        >
          Apply Now
        </button>
      </div>
    </footer>
  );
};
