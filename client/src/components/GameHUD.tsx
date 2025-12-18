import { useGameStore } from '@/lib/store';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Battery, ShieldAlert, Clock } from 'lucide-react';

export function GameHUD() {
  const { energy, maxEnergy, toxicity, timeRemaining } = useGameStore();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const energyPercent = (energy / maxEnergy) * 100;
  const isLowEnergy = energyPercent < 20;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50 pointer-events-none">
      <div className="container max-w-4xl mx-auto flex items-start justify-between gap-4">
        
        {/* Energy Bar (Left) */}
        <div className="flex flex-col gap-1 w-48">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <Battery className={cn("w-3 h-3", isLowEnergy ? "text-red-500 animate-pulse" : "text-primary")} />
              MOD_ENERGY
            </span>
            <span>{Math.floor(energyPercent)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden border border-border/50">
            <div 
              className={cn(
                "h-full transition-all duration-300 ease-out",
                isLowEnergy ? "bg-red-500" : "bg-primary"
              )}
              style={{ width: `${energyPercent}%` }}
            />
          </div>
        </div>

        {/* Timer (Center) */}
        <div className="flex flex-col items-center">
          <div className="bg-background/80 backdrop-blur border border-border/50 px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className={cn(
              "font-mono text-lg font-bold tracking-widest",
              timeRemaining < 60 ? "text-red-500 animate-pulse" : "text-foreground"
            )}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Toxicity Meter (Right) */}
        <div className="flex flex-col gap-1 w-48">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <ShieldAlert className={cn("w-3 h-3", toxicity > 70 ? "text-red-500 animate-pulse" : "text-primary")} />
              SYS_TOXICITY
            </span>
            <span>{Math.floor(toxicity)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden border border-border/50">
            <div 
              className={cn(
                "h-full transition-all duration-300 ease-out",
                toxicity > 70 ? "bg-red-600" : toxicity > 40 ? "bg-yellow-500" : "bg-green-500"
              )}
              style={{ width: `${toxicity}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
