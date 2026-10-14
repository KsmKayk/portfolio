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

export type LinkIcon = 'portfolio' | 'godrinking' | 'github' | 'medium' | 'linkedin';

export interface LinktreeLink {
  label: string;
  desc: string;
  href: string;
  icon: LinkIcon;
}
