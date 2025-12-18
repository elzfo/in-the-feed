import { useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/store';
import { FeedColumn } from '@/components/FeedColumn';
import { GameHUD } from '@/components/GameHUD';
import { GameOverlay } from '@/components/GameOverlay';
import { generatePostContent } from '@/lib/content';
import { nanoid } from 'nanoid';
import { PostType } from '@/lib/types';

const FEED_COUNT = 3;
const SPAWN_RATE_BASE = 2000; // ms

export default function Home() {
  const { 
    status, 
    posts, 
    addPost, 
    removePost, 
    updateGame, 
    energy,
    timeRemaining
  } = useGameStore();
  
  const lastTimeRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  // Game Loop
  useEffect(() => {
    const loop = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }
      
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (status === 'playing') {
        updateGame(deltaTime);

        // Spawning Logic
        // Difficulty increases as time decreases
        const difficultyMultiplier = 1 + ((180 - timeRemaining) / 180); 
        const currentSpawnRate = SPAWN_RATE_BASE / difficultyMultiplier;

        if (time - lastSpawnRef.current > currentSpawnRate) {
          spawnPost(difficultyMultiplier);
          lastSpawnRef.current = time;
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [status, timeRemaining, updateGame]);

  const spawnPost = (difficulty: number) => {
    const feedIndex = Math.floor(Math.random() * FEED_COUNT);
    
    // Determine type based on difficulty
    const rand = Math.random();
    let type: PostType = 'legitimate';
    
    // As difficulty increases, more bad posts appear
    const misinfoChance = 0.3 * difficulty;
    const viralChance = 0.1 * difficulty;
    
    if (rand < viralChance) type = 'viral';
    else if (rand < viralChance + misinfoChance) type = 'misinformation';
    else if (rand < viralChance + misinfoChance + 0.2) type = 'borderline';

    const content = generatePostContent(type);
    
    addPost({
      id: nanoid(),
      type,
      content,
      feedIndex,
      y: -20, // Start above screen
      speed: 5 + (Math.random() * 5 * difficulty), // Speed increases with difficulty
      isRemoved: false,
      isRevealed: false
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans select-none">
      <GameHUD />
      <GameOverlay />
      
      <div className="container h-screen pt-16 pb-4">
        <div className="grid grid-cols-3 h-full border border-border/20 rounded-lg overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm">
          {Array.from({ length: FEED_COUNT }).map((_, i) => (
            <FeedColumn 
              key={i} 
              index={i}
              posts={posts.filter(p => p.feedIndex === i)}
              onRemovePost={removePost}
              canRemove={status === 'playing' && energy >= 15}
            />
          ))}
        </div>
      </div>
      
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
      </div>
    </div>
  );
}
