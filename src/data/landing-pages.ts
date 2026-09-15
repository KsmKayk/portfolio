export interface LandingPage {
  slug: string;
  title: string;
  desc: string;
  thumbnail: string;
  logo: string;
  url: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: 'bellos',
    title: 'Barbearia Bellos',
    desc: 'Landing page completa para barbearia com agendamento via WhatsApp, cardápio de serviços, galeria e localização.',
    thumbnail: '/landing-pages/bellos/mrzf1jkv-resultado1.jpg',
    logo: '/landing-pages/bellos/mrzga072-logoaw.svg',
    url: '/landing-pages/bellos',
  },
  {
    slug: 'imperiofit',
    title: 'Academia ImperioFit',
    desc: 'Landing page para academia com planos e preços, galeria, modalidades e agendamento via WhatsApp.',
    thumbnail: '/landing-pages/imperiofit/msalpap9-SaveClip.App_591146948_18515541349070282_1391715519757477742_n.jpg',
    logo: '/landing-pages/imperiofit/msalpaqd-logo.png',
    url: '/landing-pages/imperiofit',
  },
  {
    slug: 'rock',
    title: 'Rock For You',
    desc: 'Landing page para loja de camisetas de banda, mangás e colecionáveis, com catálogo filtrável, frase do dia e localização.',
    thumbnail: '/landing-pages/rock/thumbnail.webp',
    logo: '/landing-pages/rock/logo.svg',
    url: '/landing-pages/rock',
  },
  {
    slug: 'hair-style',
    title: 'Hair Style',
    desc: 'Landing page para salão de beleza com agendamento por profissional, agenda da semana, catálogo de serviços e depoimentos.',
    thumbnail: '/landing-pages/hair-style/thumbnail.webp',
    logo: '/landing-pages/hair-style/logo.svg',
    url: '/landing-pages/hair-style',
  },
  {
    slug: 'andy-afrodite',
    title: 'Andy Afrodite',
    desc: 'Portfólio de conteúdo para modelo alternativa: catálogo, reels e editoriais para marcas góticas e de nicho, com galeria filtrável por categoria.',
    thumbnail: '/landing-pages/andy-afrodite/thumbnail.webp',
    logo: '/landing-pages/andy-afrodite/andy-logo.svg',
    url: '/landing-pages/andy-afrodite',
  },
  {
    slug: 'beauty-studios',
    title: 'Beauty Studios',
    desc: 'Landing page para clínica de estética avançada, com protocolos, comparador de antes e depois interativo, investimento e agendamento via WhatsApp.',
    thumbnail: '/landing-pages/beauty-studios/thumbnail.webp',
    logo: '/landing-pages/beauty-studios/uploads/logo.png',
    url: '/landing-pages/beauty-studios',
  },
];
