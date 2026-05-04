import { Project } from '@/lib/types';

export const PROJECTS: Project[] = [
  {
    id: 'p2a',
    name: 'P2A Consulting',
    tag: 'Landing Page',
    desc: 'Landing page para uma empresa de automação com o uso das LLMs mais fortes do mercado atual.',
    longDesc: 'Site institucional desenvolvido para uma agência de consultoria em automação. Foco em performance, SEO e narrativa visual sobre como LLMs podem ser aplicadas para resolver problemas reais de negócio. Deploy no GitHub Pages com pipeline de build automatizado.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'GitHub Pages'],
    slides: ['hero', 'features', 'pricing', 'mobile'],
  },
  {
    id: 'omnigen',
    name: 'Omnigen',
    tag: 'Sistema de Videos Automáticos',
    desc: 'Gerador de vídeos que cria roteiro, busca imagens, narra e legenda a partir de um tema.',
    longDesc: 'Pipeline completo de geração de vídeo a partir de um único prompt. Integra OpenRouter para roteiro, APIs de busca de imagens, ffmpeg para composição e Piper TTS para narração natural — tudo orquestrado em uma fila assíncrona com retry e cache.',
    tech: ['Python', 'OpenRouter', 'FFmpeg', 'Piper TTS'],
    slides: ['terminal', 'video', 'queue', 'output'],
  },
  {
    id: 'sodden',
    name: 'SoddenBot',
    tag: 'Bot de Música',
    desc: 'Bot de música para Discord com playlists, filas e integração via discord.js + DisTube.',
    longDesc: 'Bot full-featured para servidores de Discord: tocar de YouTube/Spotify/SoundCloud, filas, playlists salvas, controles de volume e equalizador, comandos slash e suporte a múltiplos servidores simultâneos. Construído com discord.js v14 e DisTube.',
    tech: ['Node.js', 'discord.js', 'DisTube', 'TypeScript'],
    slides: ['discord', 'commands', 'embed'],
  },
];
