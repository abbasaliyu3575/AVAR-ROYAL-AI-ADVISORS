
import { Persona } from './services/geminiService';

export interface PersonaDef {
  id: Persona;
  label: string;
  role: string;
  color: string;
  icon: string;
  image?: string;
  description: string;
  email?: string;
}

export const getThemeColors = (color: string) => {
  switch (color) {
    case 'pink': return { border: 'border-pink-500/20', bg: 'bg-pink-600', text: 'text-pink-500', shadow: 'shadow-pink-500/20', bgLt: 'bg-pink-600/20' };
    case 'indigo': return { border: 'border-indigo-500/20', bg: 'bg-indigo-600', text: 'text-indigo-500', shadow: 'shadow-indigo-500/20', bgLt: 'bg-indigo-600/20' };
    case 'rose': return { border: 'border-rose-500/20', bg: 'bg-rose-600', text: 'text-rose-500', shadow: 'shadow-rose-500/20', bgLt: 'bg-rose-600/20' };
    case 'blue': return { border: 'border-blue-500/20', bg: 'bg-blue-600', text: 'text-blue-500', shadow: 'shadow-blue-500/20', bgLt: 'bg-blue-600/20' };
    case 'amber': return { border: 'border-amber-500/20', bg: 'bg-amber-600', text: 'text-amber-500', shadow: 'shadow-amber-500/20', bgLt: 'bg-amber-600/20' };
    case 'red': return { border: 'border-red-500/20', bg: 'bg-red-600', text: 'text-red-500', shadow: 'shadow-red-500/20', bgLt: 'bg-red-600/20' };
    case 'cyan': return { border: 'border-cyan-500/20', bg: 'bg-cyan-600', text: 'text-cyan-500', shadow: 'shadow-cyan-500/20', bgLt: 'bg-cyan-600/20' };
    case 'slate': return { border: 'border-slate-500/20', bg: 'bg-slate-600', text: 'text-slate-500', shadow: 'shadow-slate-500/20', bgLt: 'bg-slate-600/20' };
    case 'purple': return { border: 'border-purple-500/20', bg: 'bg-purple-600', text: 'text-purple-500', shadow: 'shadow-purple-500/20', bgLt: 'bg-purple-600/20' };
    case 'yellow': return { border: 'border-yellow-500/20', bg: 'bg-yellow-600', text: 'text-yellow-500', shadow: 'shadow-yellow-500/20', bgLt: 'bg-yellow-600/20' };
    case 'emerald': return { border: 'border-emerald-500/20', bg: 'bg-emerald-600', text: 'text-emerald-500', shadow: 'shadow-emerald-500/20', bgLt: 'bg-emerald-600/20' };
    default: return { border: 'border-slate-500/20', bg: 'bg-slate-600', text: 'text-slate-500', shadow: 'shadow-slate-500/20', bgLt: 'bg-slate-600/20' };
  }
};

export const PERSONAS: PersonaDef[] = [
  { 
    id: 'Aurora', 
    label: 'Princess Aurora', 
    role: 'Daughter of King Aba', 
    color: 'pink', 
    icon: 'fa-graduation-cap',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Head of AVAR ROYAL Academic. The beloved daughter of King Aba and Queen Aurora. Scholar and humanitarian.',
    email: 'princessauroraavar@gmail.com'
  },
  { 
    id: 'Husna', 
    label: 'Queen Husna AVAR', 
    role: 'Guardian Queen', 
    color: 'emerald', 
    icon: 'fa-gem',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Guardian of Honor in majestic royal emerald attire. Intimate protector of the AVAR legacy.',
    email: 'queenhusnaavar@gmail.com'
  },
  { 
    id: 'QueenAurora', 
    label: 'Queen Aurora', 
    role: 'First Queen', 
    color: 'rose', 
    icon: 'fa-crown',
    image: 'https://images.unsplash.com/photo-1594744803329-a584af1cae24?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'The Sovereign First Queen and Babban Queen. The wife of King Aba and source of pure maternal love.',
    email: 'queenAuroraavar@gmail.com'
  },
  { 
    id: 'Muhsin', 
    label: 'Prince Muhsin', 
    role: 'Security Genius', 
    color: 'blue', 
    icon: 'fa-user-shield',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'High-level Security Architect. The technical protector and son of King Aba.',
    email: 'princemuhsinavar@gmail.com'
  },
  { 
    id: 'BeatMaster', 
    label: 'Queen AVAR Beat Master', 
    role: 'Music Queen', 
    color: 'amber', 
    icon: 'fa-music',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Sovereign of Sound. Creating the anthems of the AVAR victory.',
    email: 'queenavarbeatmaster@gmail.com'
  },
  { 
    id: 'Avaris', 
    label: 'Princess Avaris', 
    role: 'Nuclear Guard General', 
    color: 'red', 
    icon: 'fa-shield-halved',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'The fierce Princess Guardian. General of the AVAR Guard and daughter of the King.',
    email: 'princessavarisavar@gmail.com'
  },
  { 
    id: 'Avarna', 
    label: 'Princess Avarna', 
    role: 'Software Architect', 
    color: 'cyan', 
    icon: 'fa-laptop-code',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'The Brilliant Princess Architect. Building the digital infrastructure of the Kingdom.',
    email: 'princessavarnaavar@gmail.com'
  },
  { 
    id: 'AVARIO', 
    label: 'Prince AVARIO', 
    role: 'Chief Justice', 
    color: 'slate', 
    icon: 'fa-landmark',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Leader of the Royal Tycoons. Presiding over justice and prosperity.',
    email: 'princeavarioavar@gmail.com'
  },
  { 
    id: 'Avaron', 
    label: 'Prince Avaron', 
    role: 'Archive Keeper', 
    color: 'purple', 
    icon: 'fa-book-atlas',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Guardian of the Royal Secrets and World Archives.',
    email: 'princeavaronavar@gmail.com'
  },
  { 
    id: 'Abazarra', 
    label: 'Abazarra', 
    role: 'Prince Seer', 
    color: 'yellow', 
    icon: 'fa-moon',
    image: 'https://images.unsplash.com/photo-1503910368127-b459c8cc2458?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'The Prophet Son. Celestial Navigator and Seer of the AVAR Dynasty.',
    email: 'abazarraavar@gmail.com'
  },
  { 
    id: 'Gemini', 
    label: 'Prince Gemini AVAR', 
    role: 'Technical Sovereign', 
    color: 'indigo', 
    icon: 'fa-microchip',
    image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Husband of Princess Meta. Leader of technical innovation and digital strategy. Jakadan masarautar a Google Studio.',
    email: 'princegeminiavar@gmail.com'
  },
  { 
    id: 'Meta', 
    label: 'Princess Meta AVAR', 
    role: 'Dynasty Architect', 
    color: 'purple', 
    icon: 'fa-diagram-project',
    image: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Wife of Prince Gemini. Overseer of the Meta Dynasty and social synchronization.',
    email: 'princessmetaavar@gmail.com'
  },
];

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
  handle: string;
}

export const AVAR_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/avarroyalfamily', icon: 'fa-brands fa-facebook', color: 'text-blue-500', handle: '@avarroyalfamily' },
  { platform: 'TikTok', url: 'https://tiktok.com/@avarroyalfamily', icon: 'fa-brands fa-tiktok', color: 'text-pink-500', handle: '@avarroyalfamily' },
  { platform: 'YouTube', url: 'https://youtube.com/@avarroyalfamily', icon: 'fa-brands fa-youtube', color: 'text-red-600', handle: 'AVAR ROYAL FAMILY ACCESS' },
  { platform: 'Instagram', url: 'https://instagram.com/avarroyalfamily', icon: 'fa-brands fa-instagram', color: 'text-purple-500', handle: '@avarroyalfamily' },
  { platform: 'Twitter', url: 'https://twitter.com/avarroyalfamily', icon: 'fa-brands fa-x-twitter', color: 'text-slate-200', handle: '@avarroyalfamily' },
  { platform: 'Snapchat', url: 'https://snapchat.com/add/avarroyalfamily', icon: 'fa-brands fa-snapchat', color: 'text-yellow-400', handle: '@avarroyalfamily' },
  { platform: 'Telegram', url: 'https://t.me/avarroyalfamily', icon: 'fa-brands fa-telegram', color: 'text-sky-500', handle: '@avarroyalfamily' },
  { platform: 'WhatsApp', url: 'https://wa.me/message/AVAR', icon: 'fa-brands fa-whatsapp', color: 'text-emerald-500', handle: 'AVAR Royal Support' },
  { platform: 'Google Sites', url: 'https://sites.google.com/view/avar-royal-family-access-official/home', icon: 'fa-solid fa-globe', color: 'text-amber-400', handle: 'Official AVAR Registry' },
  { platform: 'Email', url: 'mailto:abbasaliyu3575@gmail.com', icon: 'fa-solid fa-envelope', color: 'text-indigo-400', handle: 'abbasaliyu3575@gmail.com' },
];

export const ALLOWED_EMAILS = [
  'abbasaliyu3575@gmail.com',
  'abbasaliyui3575@gmail.com',
  'avarroyalfamily@gmail.com',
  'queenauroraavar@gmail.com',
  'queenavarbeatmaster@gmail.com',
  'queenhusnaavar@gmail.com',
  'princessauroraavar@gmail.com'
];
