export interface Project {
  id: string;
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  tech: string[];
  slides: SlideKind[];
  images: string[];
  link: string;
}

export type SlideKind =
  | 'hero' | 'features' | 'pricing' | 'mobile'
  | 'terminal' | 'video' | 'queue' | 'output'
  | 'discord' | 'commands' | 'embed';

export type StackName = 'Node.js' | 'TypeScript' | 'Python' | 'PostgreSQL' | 'Docker' | 'Oracle';

export type Theme = 'dark' | 'light';
