import { create } from 'zustand';
import { GameStatus, GameStats, Post } from './types';

interface GameState {
  status: GameStatus;
  energy: number;
  maxEnergy: number;
  toxicity: number; // 0 to 100
  timeRemaining: number; // in seconds
  posts: Post[];
  stats: GameStats;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateGame: (deltaTime: number) => void;
  removePost: (id: string) => void;
  addPost: (post: Post) => void;
  resetGame: () => void;
}

const INITIAL_TIME = 300; // 5 minutes
const MAX_ENERGY = 100;
const ENERGY_REGEN_RATE = 5; // per second
const REMOVAL_COST = 15;

export const useGameStore = create<GameState>((set, get) => ({
  status: 'menu',
  energy: MAX_ENERGY,
  maxEnergy: MAX_ENERGY,
  toxicity: 0,
  timeRemaining: INITIAL_TIME,
  posts: [],
  stats: {
    misinformationStopped: 0,
    misinformationMissed: 0,
    legitimateRemoved: 0,
    totalPosts: 0,
  },

  startGame: () => set({ 
    status: 'playing', 
    energy: MAX_ENERGY, 
    toxicity: 0, 
    timeRemaining: INITIAL_TIME, 
    posts: [],
    stats: {
      misinformationStopped: 0,
      misinformationMissed: 0,
      legitimateRemoved: 0,
      totalPosts: 0,
    }
  }),

  pauseGame: () => set((state) => ({ status: state.status === 'playing' ? 'paused' : state.status })),
  
  resumeGame: () => set((state) => ({ status: state.status === 'paused' ? 'playing' : state.status })),
  
  endGame: () => set({ status: 'gameover' }),
  
  resetGame: () => set({ 
    status: 'menu', 
    energy: MAX_ENERGY, 
    toxicity: 0, 
    timeRemaining: INITIAL_TIME, 
    posts: [],
    stats: {
      misinformationStopped: 0,
      misinformationMissed: 0,
      legitimateRemoved: 0,
      totalPosts: 0,
    }
  }),

  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),

  removePost: (id) => set((state) => {
    const post = state.posts.find(p => p.id === id);
    if (!post || state.energy < REMOVAL_COST) return {};

    const isMisinfo = post.type === 'misinformation' || post.type === 'viral';
    const isLegit = post.type === 'legitimate';

    return {
      posts: state.posts.filter(p => p.id !== id),
      energy: Math.max(0, state.energy - REMOVAL_COST),
      stats: {
        ...state.stats,
        misinformationStopped: isMisinfo ? state.stats.misinformationStopped + 1 : state.stats.misinformationStopped,
        legitimateRemoved: isLegit ? state.stats.legitimateRemoved + 1 : state.stats.legitimateRemoved,
      }
    };
  }),

  updateGame: (deltaTime) => set((state) => {
    if (state.status !== 'playing') return {};

    // Update time
    const newTime = Math.max(0, state.timeRemaining - deltaTime);
    if (newTime <= 0) {
      return { status: 'gameover', timeRemaining: 0 };
    }

    // Regenerate energy
    const newEnergy = Math.min(state.maxEnergy, state.energy + (ENERGY_REGEN_RATE * deltaTime));

    // Move posts and check for leaks
    let newToxicity = state.toxicity;
    let misinfoMissed = state.stats.misinformationMissed;
    
    const newPosts = state.posts.map(post => ({
      ...post,
      y: post.y + (post.speed * deltaTime)
    })).filter(post => {
      if (post.y >= 100) {
        // Post reached bottom
        if (post.type === 'misinformation' || post.type === 'viral') {
          newToxicity += 5; // Increase toxicity
          misinfoMissed += 1;
        }
        return false; // Remove from list
      }
      return true;
    });

    if (newToxicity >= 100) {
      return { status: 'gameover', toxicity: 100, posts: newPosts, stats: { ...state.stats, misinformationMissed: misinfoMissed } };
    }

    return {
      timeRemaining: newTime,
      energy: newEnergy,
      posts: newPosts,
      toxicity: newToxicity,
      stats: { ...state.stats, misinformationMissed: misinfoMissed }
    };
  }),
}));
