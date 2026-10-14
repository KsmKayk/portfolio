import { LinktreeLink } from '@/lib/types';
import { CONTACT, SITE_URL } from '@/lib/constants';

export const LINKS: LinktreeLink[] = [
  { label: 'Portfolio', desc: 'ksmkayk.com.br', href: SITE_URL, icon: 'portfolio' },
  { label: 'GoDrinking', desc: 'meu app na Google Play', href: 'https://play.google.com/store/apps/details?id=com.godrinking.app', icon: 'godrinking' },
  { label: 'GitHub', desc: 'github.com/KsmKayk', href: CONTACT.github, icon: 'github' },
  { label: 'Medium', desc: 'artigos e textos', href: CONTACT.medium, icon: 'medium' },
  { label: 'LinkedIn', desc: 'linkedin.com/in/kaykmascarenhas', href: CONTACT.linkedin, icon: 'linkedin' },
];
