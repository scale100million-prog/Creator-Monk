export interface ResultCardData {
  id: string;
  resultLine: string;
  name: string;
  role?: string;
  before: string;
  after: string;
  quote?: string;
  image?: string;
  imageAlt?: string;
}

export interface VideoGateContextType {
  watchedSeconds: Set<number>;
  isUnlocked: boolean;
  remaining: number;
  hasPlayed: boolean;
  isPlaying: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  playVideo: () => void;
  ctaLink: string;
  ctaText: string;
}
