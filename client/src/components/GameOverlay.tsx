import { useGameStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, XCircle } from 'lucide-react';

export function GameOverlay() {
  const { status, startGame, resetGame, stats } = useGameStore();

  if (status === 'playing' || status === 'paused') return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {status === 'menu' && (
          <Card className="w-full max-w-md border-primary/20 shadow-2xl bg-card/95">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tighter">IN THE FEED</CardTitle>
              <CardDescription className="text-base">
                You are a content moderator during a high-stakes election. 
                The algorithm prioritizes engagement. You prioritize truth.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <strong>SWIPE / CLICK</strong> red posts to remove misinformation.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <strong>IGNORE</strong> legitimate news (green/neutral).
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <strong>WATCH</strong> energy levels. Don't burn out.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startGame} className="w-full h-12 text-lg font-bold gap-2">
                <Play className="w-5 h-5" /> START SHIFT
              </Button>
            </CardFooter>
          </Card>
        )}

        {status === 'gameover' && (
          <Card className="w-full max-w-md border-destructive/20 shadow-2xl bg-card/95">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tighter text-destructive">SYSTEM FAILURE</CardTitle>
              <CardDescription className="text-base">
                The feed has become too toxic. Misinformation has overwhelmed the moderation queue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-green-500">{stats.misinformationStopped}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Stopped</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-red-500">{stats.misinformationMissed}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Missed</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-yellow-500">{stats.legitimateRemoved}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">False Positives</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-primary">{Math.floor((stats.misinformationStopped / (stats.misinformationStopped + stats.misinformationMissed || 1)) * 100)}%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Efficiency</div>
                </div>
              </div>
              
              <p className="text-center text-sm italic text-muted-foreground">
                "Most misinformation wasn't caught in time."
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={resetGame} variant="outline" className="w-full h-12 text-lg font-bold gap-2">
                <RotateCcw className="w-5 h-5" /> TRY AGAIN
              </Button>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
