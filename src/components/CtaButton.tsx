import React from 'react';
import { useVideoGate } from '../context/VideoGateContext';

interface CtaButtonProps {
  id?: string;
  isFooter?: boolean;
  className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ id, isFooter = false, className = '' }) => {
  const { isUnlocked, openModal, ctaLink, ctaText } = useVideoGate();

  const handleLeadClick = () => {
    try {
      const w = window as any;
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Lead');
      }
    } catch (err) {
      console.error('Meta Pixel Lead tracking error:', err);
    }
  };

  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold text-[16px] text-[#0E1412] bg-[#F0ECE1]
    rounded-[8px] cursor-pointer select-none text-center
    py-[16px] px-[32px]
    shadow-[0_4px_16px_rgba(0,0,0,0.4)]
    hover:bg-[#FFFFFF] hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200 ease-out
    ${isFooter ? 'w-full md:w-auto' : 'w-full sm:w-auto'}
    ${className}
  `.trim();

  if (isUnlocked) {
    return (
      <a
        id={id}
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLeadClick}
        className={baseStyles}
      >
        {ctaText}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={openModal}
      className={baseStyles}
    >
      {ctaText}
    </button>
  );
};
