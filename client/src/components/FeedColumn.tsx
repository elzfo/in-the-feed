import { Post as PostType } from '@/lib/types';
import { Post } from './Post';
import { cn } from '@/lib/utils';

interface FeedColumnProps {
  index: number;
  posts: PostType[];
  onRemovePost: (id: string) => void;
  canRemove: boolean;
  isOverloaded?: boolean;
}

export function FeedColumn({ index, posts, onRemovePost, canRemove, isOverloaded }: FeedColumnProps) {
  return (
    <div className={cn(
      "relative h-full border-r border-border/20 last:border-r-0 overflow-hidden transition-colors duration-500",
      isOverloaded ? "bg-red-950/10 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]" : "bg-background/50"
    )}>
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
      
      {/* Column Header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-md border-b border-border/20 flex items-center justify-center z-10">
        <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
          FEED_0{index + 1}
        </span>
      </div>

      {/* Posts */}
      <div className="absolute inset-0 top-8">
        {posts.map(post => (
          <Post 
            key={post.id} 
            post={post} 
            onRemove={onRemovePost}
            canRemove={canRemove}
          />
        ))}
      </div>
      
      {/* Danger Zone Indicator at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
    </div>
  );
}
