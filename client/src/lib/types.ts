export type PostType = 'legitimate' | 'misinformation' | 'viral' | 'borderline';

export interface PostContent {
  headline: string;
  source: string;
  image?: string; // Optional image placeholder
}

export interface Post {
  id: string;
  type: PostType;
  content: PostContent;
  feedIndex: number; // Which vertical feed it belongs to
  y: number; // Vertical position (0 to 100%)
  speed: number; // How fast it moves down
  isRemoved: boolean;
  isRevealed: boolean; // For end game stats or specific mechanics
}

export type GameStatus = 'menu' | 'playing' | 'paused' | 'gameover';

export interface GameStats {
  misinformationStopped: number;
  misinformationMissed: number;
  legitimateRemoved: number;
  totalPosts: number;
}
