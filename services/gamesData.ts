import { Game, GameCategory } from '../types';

// This simulates the requested "JSON file" storage.
// In a real deployment, this could be fetched from an external .json file.

export const GAMES_LIBRARY: Game[] = [
  {
    id: '1',
    title: 'Hextris',
    description: 'An addictive puzzle game inspired by Tetris. Rotate the hexagon to clear lines.',
    thumbnailUrl: 'https://picsum.photos/id/20/400/300',
    embedUrl: 'https://hextris.io/',
    category: GameCategory.PUZZLE,
    featured: true,
  },
  {
    id: '2',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile! A classic logic puzzle.',
    thumbnailUrl: 'https://picsum.photos/id/119/400/300',
    embedUrl: 'https://gabrielecirulli.github.io/2048/',
    category: GameCategory.PUZZLE,
    featured: true,
  },
  {
    id: '3',
    title: 'Pacman Canvas',
    description: 'A pure HTML5 canvas implementation of the classic arcade eater.',
    thumbnailUrl: 'https://picsum.photos/id/21/400/300',
    embedUrl: 'https://pacman-e79.pages.dev/', // A reliable open source mirror often used
    category: GameCategory.ARCADE,
  },
  {
    id: '4',
    title: 'Flappy Bird Clone',
    description: 'Tap to fly. Avoid the pipes. Frustration guaranteed.',
    thumbnailUrl: 'https://picsum.photos/id/133/400/300',
    embedUrl: 'https://flappy-bird-assets.s3.amazonaws.com/index.html', // Placeholder for a generic html5 clone
    category: GameCategory.ARCADE,
  },
  {
    id: '5',
    title: 'Solitaire',
    description: 'The classic card game to kill time.',
    thumbnailUrl: 'https://picsum.photos/id/160/400/300',
    embedUrl: 'https://mrdoob.com/lab/javascript/effects/solitaire/',
    category: GameCategory.CLASSIC,
  },
  {
    id: '6',
    title: 'Astray',
    description: 'A WebGL maze game. Find your way out.',
    thumbnailUrl: 'https://picsum.photos/id/54/400/300',
    embedUrl: 'https://www.astray.xyz/',
    category: GameCategory.ACTION,
  },
  {
    id: '7',
    title: 'Canvas Tetris',
    description: 'Simple, lightweight Tetris clone.',
    thumbnailUrl: 'https://picsum.photos/id/203/400/300',
    embedUrl: 'https://modern-tetris.netlify.app/',
    category: GameCategory.PUZZLE,
  },
  {
    id: '8',
    title: 'Dinosaur Game',
    description: 'The famous chrome offline runner game.',
    thumbnailUrl: 'https://picsum.photos/id/111/400/300',
    embedUrl: 'https://chromedino.com/',
    category: GameCategory.ARCADE,
    featured: true,
  },
  {
    id: '9',
    title: 'Particle Clicker',
    description: 'An addictive incremental game about particle physics.',
    thumbnailUrl: 'https://picsum.photos/id/96/400/300',
    embedUrl: 'https://particle-clicker.web.cern.ch/',
    category: GameCategory.STRATEGY,
  },
];
