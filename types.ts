export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  ARCADE = 'Arcade',
  STRATEGY = 'Strategy',
  CLASSIC = 'Classic'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  category: GameCategory;
  featured?: boolean;
}
