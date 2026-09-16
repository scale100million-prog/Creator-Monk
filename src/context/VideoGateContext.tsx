import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { VideoGateContextType } from '../types';

const OLD_STORAGE_KEY = 'coachos_watched_v1';
const CTA_LINK = 'https://calendly.com/creatorsmonk/strategy-call';
const CTA_TEXT = 'Apply Now.';

const VideoGateContext = createContext<VideoGateContextType | null>(null);

export const VideoGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Clean up any old gate state in sessionStorage from previous visits
  useEffect(() => {
    try {
      sessionStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const contextValue: VideoGateContextType = {
    isModalOpen,
    openModal,
    closeModal,
    ctaLink: CTA_LINK,
    ctaText: CTA_TEXT,
  };

  return (
    <VideoGateContext.Provider value={contextValue}>
      {children}
    </VideoGateContext.Provider>
  );
};

export const useVideoGate = (): VideoGateContextType => {
  const context = useContext(VideoGateContext);
  if (!context) {
    throw new Error('useVideoGate must be used within a VideoGateProvider');
  }
  return context;
};
