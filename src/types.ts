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
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  ctaLink: string;
  ctaText: string;
}
