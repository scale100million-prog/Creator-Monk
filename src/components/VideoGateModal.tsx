import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { useVideoGate } from '../context/VideoGateContext';

const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzql2WYQGCf-CUG4GI7uXRfcTBMdl94B1pdfgtpqmGAZSWha9aArm2ti3EcKdbyVTkWSg/exec';
const CALENDLY_URL = 'https://calendly.com/creatorsmonk/strategy-call';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const VideoGateModal: React.FC = () => {
  const { isModalOpen, closeModal } = useVideoGate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus the first input when the modal opens and reset validation errors
  useEffect(() => {
    if (isModalOpen) {
      setErrors({});
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen && !isSubmitting) {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, isSubmitting, closeModal]);

  const proceedToBooking = (submittedName: string, submittedEmail: string, submittedPhone: string) => {
    // 2. Fire existing fbq Lead event
    try {
      const w = window as any;
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Lead');
      }
    } catch (pixelErr) {
      console.error('Meta Pixel Lead tracking error:', pixelErr);
    }

    // 3. Build prefilled Calendly URL and redirect in the same tab
    const url =
      CALENDLY_URL +
      '?name=' +
      encodeURIComponent(submittedName) +
      '&email=' +
      encodeURIComponent(submittedEmail) +
      '&a1=' +
      encodeURIComponent(submittedPhone);

    window.location.href = url;
  };

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};
    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();
    const phoneTrimmed = phone.trim();

    // Validation 1: Name — not empty, at least 2 characters
    if (!nameTrimmed || nameTrimmed.length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters).';
    }

    // Validation 2: Email — valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validation 3: Phone — not empty, at least 8 digits, allowing +, spaces, hyphens, parentheses
    const phoneCharRegex = /^[\d\s+\-()]+$/;
    const phoneDigitsCount = (phoneTrimmed.match(/\d/g) || []).length;
    if (!phoneTrimmed) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!phoneCharRegex.test(phoneTrimmed) || phoneDigitsCount < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Prepare fetch request with exact formatting required by Google Apps Script
    const fetchPromise = fetch(LEAD_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: nameTrimmed,
        email: emailTrimmed,
        phone: phoneTrimmed,
      }),
    });

    // 3-second network ceiling: never make the user wait longer than 3 seconds
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      await Promise.race([fetchPromise, timeoutPromise]);
    } catch (networkErr) {
      console.error('Google Sheets lead submission error:', networkErr);
    } finally {
      setIsSubmitting(false);
      proceedToBooking(nameTrimmed, emailTrimmed, phoneTrimmed);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          id="lead-capture-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-[16px] sm:p-[24px] overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!isSubmitting) closeModal();
            }}
            className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-[8px]"
          />

          {/* Modal Card Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            id="lead-capture-modal-card"
            className="relative w-full max-w-[460px] max-h-[calc(100vh-32px)] overflow-y-auto bg-[#141414] border border-[#262626] rounded-[12px] p-[24px] sm:p-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.6)] flex flex-col z-10 my-auto"
          >
            {/* Close Button */}
            <button
              id="modal-close-button"
              type="button"
              onClick={() => {
                if (!isSubmitting) closeModal();
              }}
              aria-label="Close modal"
              className="absolute top-[16px] right-[16px] w-[32px] h-[32px] rounded-full flex items-center justify-center text-[#A0A0A0] hover:text-[#FFFFFF] hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <X className="w-[18px] h-[18px]" />
            </button>

            {/* Heading */}
            <h3
              id="lead-modal-heading"
              className="text-[20px] sm:text-[22px] font-bold text-[#FFFFFF] leading-snug text-center mb-[22px] pr-[16px] pl-[16px]"
            >
              Enter your details to book your call
            </h3>

            {/* Form Fields Stack (No HTML <form> tag used) */}
            <div className="flex flex-col gap-[16px] w-full">
              {/* Field 1: Name */}
              <div className="flex flex-col text-left">
                <label
                  htmlFor="lead-input-name"
                  className="text-[14px] font-medium text-[#FFFFFF] mb-[6px]"
                >
                  Your name <span className="text-[#F5E6A3]">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="lead-input-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  disabled={isSubmitting}
                  className={`w-full min-h-[44px] h-[48px] px-[16px] bg-[#0A0A0A] border rounded-[8px] text-[#FFFFFF] text-[15px] placeholder-[#737373] transition-colors focus:outline-none focus:border-[#F5E6A3] focus:ring-1 focus:ring-[#F5E6A3] ${
                    errors.name ? 'border-red-500/80' : 'border-[#262626]'
                  }`}
                />
                {errors.name && (
                  <p id="name-error-msg" className="text-[13px] text-red-400 mt-[4px] leading-normal">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="flex flex-col text-left">
                <label
                  htmlFor="lead-input-email"
                  className="text-[14px] font-medium text-[#FFFFFF] mb-[6px]"
                >
                  Your email address <span className="text-[#F5E6A3]">*</span>
                </label>
                <input
                  id="lead-input-email"
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  disabled={isSubmitting}
                  className={`w-full min-h-[44px] h-[48px] px-[16px] bg-[#0A0A0A] border rounded-[8px] text-[#FFFFFF] text-[15px] placeholder-[#737373] transition-colors focus:outline-none focus:border-[#F5E6A3] focus:ring-1 focus:ring-[#F5E6A3] ${
                    errors.email ? 'border-red-500/80' : 'border-[#262626]'
                  }`}
                />
                {errors.email && (
                  <p id="email-error-msg" className="text-[13px] text-red-400 mt-[4px] leading-normal">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Field 3: Phone */}
              <div className="flex flex-col text-left">
                <label
                  htmlFor="lead-input-phone"
                  className="text-[14px] font-medium text-[#FFFFFF] mb-[6px]"
                >
                  Your phone number <span className="text-[#F5E6A3]">*</span>
                </label>
                <input
                  id="lead-input-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  disabled={isSubmitting}
                  className={`w-full min-h-[44px] h-[48px] px-[16px] bg-[#0A0A0A] border rounded-[8px] text-[#FFFFFF] text-[15px] placeholder-[#737373] transition-colors focus:outline-none focus:border-[#F5E6A3] focus:ring-1 focus:ring-[#F5E6A3] ${
                    errors.phone ? 'border-red-500/80' : 'border-[#262626]'
                  }`}
                />
                {errors.phone && (
                  <p id="phone-error-msg" className="text-[13px] text-red-400 mt-[4px] leading-normal">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-[8px] w-full">
                <button
                  id="lead-form-submit-btn"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-[16px] px-[32px] bg-[#FFFFFF] text-[#0A0A0A] font-semibold text-[16px] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#F5E6A3] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#F5E6A3] focus-visible:outline-offset-2 transition-all duration-200 ease-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#FFFFFF] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-[8px]">
                      <Loader2 className="w-5 h-5 text-[#0A0A0A] animate-spin" />
                      <span>Continue to Booking</span>
                    </span>
                  ) : (
                    'Continue to Booking'
                  )}
                </button>

                {/* Small muted text below it */}
                <p
                  id="lead-form-disclaimer"
                  className="text-[13px] text-[#A0A0A0] text-center mt-[14px] leading-normal"
                >
                  Your details are used only to confirm your call.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
