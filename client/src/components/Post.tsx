import { Post as PostType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Share2, AlertOctagon } from 'lucide-react';

interface PostProps {
  post: PostType;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function Post({ post, onRemove, canRemove }: PostProps) {
  const isMisinfo = post.type === 'misinformation' || post.type === 'viral';
  
  // Visual style based on type
  const getStyles = () => {
    switch (post.type) {
      case 'legitimate':
        return 'border-l-4 border-l-green-500 bg-card/90';
      case 'misinformation':
        return 'border-l-4 border-l-red-500 bg-red-950/30';
      case 'viral':
        return 'border-l-4 border-l-red-600 bg-red-900/50 animate-pulse';
      case 'borderline':
        return 'border-l-4 border-l-yellow-500 bg-yellow-950/30';
      default:
        return 'bg-card';
    }
  };

  const getIcon = () => {
    switch (post.type) {
      case 'legitimate': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'misinformation': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'viral': return <AlertOctagon className="w-4 h-4 text-red-600" />;
      case 'borderline': return <Share2 className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute w-[90%] left-[5%] p-3 rounded-md shadow-md border border-border/50 backdrop-blur-sm select-none cursor-pointer transition-colors hover:bg-accent/10",
        getStyles()
      )}
      style={{ 
        top: `${post.y}%`,
        height: '120px' // Fixed height for consistency
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      onClick={() => canRemove && onRemove(post.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {post.content.source}
        </span>
        {/* Debug indicator - in real game this might be hidden or subtle */}
        {/* {getIcon()} */}
      </div>
      
      <h3 className={cn(
        "text-sm font-bold leading-tight mb-2",
        post.type === 'viral' ? "text-red-400 uppercase" : "text-foreground"
      )}>
        {post.content.headline}
      </h3>
      
      <div className="flex items-center gap-2 mt-auto">
        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className={cn("h-full w-[40%]", 
              isMisinfo ? "bg-red-500/50" : "bg-green-500/50"
            )} 
          />
        </div>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
          {Math.floor(Math.random() * 1000) + 100} shares
        </span>
      </div>
    </motion.div>
  );
}
