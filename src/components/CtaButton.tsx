import React from 'react';
import { useVideoGate } from '../context/VideoGateContext';

interface CtaButtonProps {
  id?: string;
  isFooter?: boolean;
  className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ id, isFooter = false, className = '' }) => {
  const { openModal, ctaText } = useVideoGate();

  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold text-[16px] text-[#0A0A0A] bg-[#FFFFFF]
    rounded-[8px] cursor-pointer select-none text-center
    py-[16px] px-[32px] min-h-[48px]
    shadow-[0_4px_16px_rgba(0,0,0,0.4)]
    hover:bg-[#F5E6A3] hover:scale-[1.02] active:scale-[0.98]
    focus-visible:outline-2 focus-visible:outline-[#F5E6A3] focus-visible:outline-offset-2
    transition-all duration-200 ease-out
    ${isFooter ? 'w-full md:w-auto' : 'w-full sm:w-auto'}
    ${className}
  `.trim();

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
