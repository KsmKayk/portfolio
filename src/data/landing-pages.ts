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
];
