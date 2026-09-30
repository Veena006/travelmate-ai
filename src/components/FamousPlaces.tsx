import { FamousSpot } from '@/types/travel';
import { Compass, Clock, MapPin, Sparkles, Info } from 'lucide-react';

interface FamousPlacesProps {
  famousSpots: FamousSpot[];
  destination: string;
}

export default function FamousPlaces({ famousSpots, destination }: FamousPlacesProps) {
  if (!famousSpots || famousSpots.length === 0) return null;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Famous Attractions in {destination}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Iconic landmarks and must-visit spots with locations displayed beside each name
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Famous Spots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {famousSpots.map((spot, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Famous Landmark</span>
              </div>

              {/* Spot Name + Location RIGHT NEXT TO IT */}
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {spot.name}
                </h4>
                {spot.location && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{spot.location}</span>
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                {spot.description}
              </p>
              
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-800 dark:text-slate-200">Why Famous:</strong> {spot.whyFamous}</span>
                </div>
              </div>
            </div>

            {/* Meta details */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span>Best Visit Time:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{spot.suggestedVisitingTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{spot.recommendedDuration}</span>
              </div>
              {spot.openingHours && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/40">
                  <span>Opening Hours:</span>
                  <span>{spot.openingHours}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
