
export enum AppTab {
  DASHBOARD = 'dashboard',
  HASHTAGS = 'hashtags',
  IMAGES = 'images',
  CHAT = 'chat',
  LIVE = 'live',
  BANK = 'bank',
  FORCE = 'force',
  ACADEMY = 'academy',
  INDUSTRIES = 'industries',
  GUARD = 'guard',
  INTEL = 'intel',
  ARCHIVES = 'archives',
  STUDIO = 'studio'
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  imageUrl?: string;
  base64Data?: string;
  mimeType?: string;
}

export interface HashtagResult {
  hashtag: string;
  relevance: number;
  platforms: string[];
}

export interface SocialTrend {
  id: string;
  platform: 'youtube' | 'twitter' | 'tiktok';
  title: string;
  volume: string;
  timestamp: string;
}

declare global {
  // Define AIStudio interface globally to ensure compatibility with window.aistudio
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio: AIStudio;
    webkitAudioContext: typeof AudioContext;
  }
}
