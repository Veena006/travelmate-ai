import { Compass, Sparkles } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Creating your personalized itinerary...' }: LoadingProps) {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-8">
      {/* Animated Icon */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
        <div className="p-5 glass-card rounded-full border border-blue-500/40 shadow-xl relative z-10">
          <Compass className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{message}</span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Analyzing destination preferences, spot locations, budget distribution, and local attraction timings...
        </p>
      </div>

      {/* Skeleton Card Mockups */}
      <div className="space-y-4 max-w-xl mx-auto pt-4 text-left">
        <div className="glass-card p-4 rounded-xl space-y-3 animate-pulse shadow-xs">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-3 bg-slate-200/70 dark:bg-slate-800/60 rounded w-5/6" />
          <div className="h-3 bg-slate-200/70 dark:bg-slate-800/60 rounded w-2/3" />
        </div>
        <div className="glass-card p-4 rounded-xl space-y-3 animate-pulse opacity-75 shadow-xs">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-3 bg-slate-200/70 dark:bg-slate-800/60 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
