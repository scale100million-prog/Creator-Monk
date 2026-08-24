import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { VideoGateContextType } from '../types';

const STORAGE_KEY = 'coachos_watched_v1';
const MEDIA_ID = '[MEDIA-ID]';
const CTA_LINK = '[ADD YOUR CALENDLY OR APPLICATION FORM LINK]';
const CTA_TEXT = 'Apply Now.';

const VideoGateContext = createContext<VideoGateContextType | null>(null);

export const VideoGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchedSeconds, setWatchedSeconds] = useState<Set<number>>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((n) => typeof n === 'number' && Number.isFinite(n))) {
          return new Set(parsed);
        }
      }
    } catch {
      // Ignore parse errors and fallback
    }
    return new Set<number>();
  });

  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [failOpen, setFailOpen] = useState<boolean>(false);

  const lastRecordedTimeRef = useRef<number | null>(null);
  const consecutiveSameTimeRef = useRef<number>(0);
  const hasEverReceivedReadingRef = useRef<boolean>(false);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(watchedSeconds)));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [watchedSeconds]);

  // Fail-open timer: 15 seconds from mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasEverReceivedReadingRef.current && watchedSeconds.size < 60) {
        console.warn('TheCoachOS™: No player handle detected within 15 seconds. Failing open to allow visitor access.');
        setFailOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [watchedSeconds.size]);

  // Polling mechanism (250ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const w = window as any;
      
      const getTime = (): number | null => {
        // 1. Check wistia-player custom element
        const el = document.querySelector('wistia-player') as any;
        if (el && Number.isFinite(el.currentTime)) return el.currentTime;
        
        // 2. Check Wistia API with specific media ID
        const h1 = w.Wistia?.api?.(MEDIA_ID);
        if (h1 && Number.isFinite(h1.time?.())) return h1.time();
        
        // 3. Check any Wistia API instance
        const all = w.Wistia?.api?.all?.();
        if (all && all[0] && Number.isFinite(all[0].time?.())) return all[0].time();
        
        // 4. Check HTML5 video elements (embedded or fallback)
        const videoEl = document.querySelector('video') as HTMLVideoElement | null;
        if (videoEl && Number.isFinite(videoEl.currentTime)) {
          return videoEl.currentTime;
        }

        return null;
      };

      const currentTime = getTime();

      if (currentTime !== null && Number.isFinite(currentTime)) {
        hasEverReceivedReadingRef.current = true;
        const sec = Math.floor(currentTime);

        // Detect if playing or paused based on time advancing or video state
        const videoEl = document.querySelector('video') as HTMLVideoElement | null;
        const wistiaEl = document.querySelector('wistia-player') as any;

        let currentlyPlaying = false;
        if (videoEl) {
          currentlyPlaying = !videoEl.paused && !videoEl.ended && videoEl.readyState > 2;
        } else if (wistiaEl) {
          currentlyPlaying = wistiaEl.state === 'playing' || (lastRecordedTimeRef.current !== null && currentTime !== lastRecordedTimeRef.current);
        } else if (lastRecordedTimeRef.current !== null && currentTime !== lastRecordedTimeRef.current) {
          currentlyPlaying = true;
        }

        if (currentTime !== lastRecordedTimeRef.current) {
          lastRecordedTimeRef.current = currentTime;
          consecutiveSameTimeRef.current = 0;
          setHasPlayed(true);
          setIsPlaying(true);
        } else {
          consecutiveSameTimeRef.current += 1;
          // If the time hasn't changed for 3 ticks (750ms), consider paused unless actively playing
          if (consecutiveSameTimeRef.current > 3 && !currentlyPlaying) {
            setIsPlaying(false);
          }
        }

        // Add whole second to the watched Set
        setWatchedSeconds((prev) => {
          if (prev.has(sec)) return prev;
          const next = new Set(prev);
          next.add(sec);
          return next;
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const isUnlocked = failOpen || watchedSeconds.size >= 60;
  const remaining = Math.max(0, 60 - watchedSeconds.size);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const playVideo = useCallback(() => {
    const w = window as any;
    // Try wistia-player
    const wistiaEl = document.querySelector('wistia-player') as any;
    if (wistiaEl && typeof wistiaEl.play === 'function') {
      try {
        wistiaEl.play();
      } catch (err) {
        console.error('Error playing wistia-player:', err);
      }
    }

    // Try Wistia API
    const h1 = w.Wistia?.api?.(MEDIA_ID);
    if (h1 && typeof h1.play === 'function') {
      try {
        h1.play();
      } catch (err) {
        console.error('Error playing Wistia instance:', err);
      }
    }

    const all = w.Wistia?.api?.all?.();
    if (all && all[0] && typeof all[0].play === 'function') {
      try {
        all[0].play();
      } catch (err) {
        console.error('Error playing Wistia all[0]:', err);
      }
    }

    // Try HTML5 video element
    const videoEl = document.querySelector('video') as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.play().catch(() => {});
    }

    setHasPlayed(true);
    setIsPlaying(true);
  }, []);

  // Context value object is rebuilt on every render so consumers re-render when state changes
  const contextValue: VideoGateContextType = {
    watchedSeconds,
    isUnlocked,
    remaining,
    hasPlayed,
    isPlaying,
    isModalOpen,
    openModal,
    closeModal,
    playVideo,
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
