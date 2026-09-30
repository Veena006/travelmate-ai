import { Hotel } from '@/types/travel';
import { Hotel as HotelIcon, MapPin, Star, CheckCircle, Navigation } from 'lucide-react';

interface HotelsSectionProps {
  hotels: Hotel[];
  destination: string;
}

export default function HotelsSection({ hotels, destination }: HotelsSectionProps) {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-600 dark:text-purple-400">
            <HotelIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Where to Stay in {destination}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Recommended hotel bases with locations displayed right next to each stay
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
          {hotels.length} Stay Options
        </span>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel, idx) => (
          <div
            key={hotel.id || idx}
            className={`p-6 rounded-2xl border transition-all space-y-4 ${
              idx === 0
                ? 'bg-purple-50/50 dark:bg-slate-900/80 border-purple-500/40 shadow-lg shadow-purple-500/5'
                : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Top row: Name & Location right beside it */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                {idx === 0 && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-600 text-white uppercase tracking-wider">
                    ★ Selected Base Hotel
                  </span>
                )}
                
                {/* Spot Name + Location RIGHT NEXT TO IT */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {hotel.name}
                  </h4>
                  {hotel.location && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 shadow-xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{hotel.location}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{hotel.rating}</span>
                </div>
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {hotel.priceRange}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {hotel.description}
            </p>

            {/* Proximity & Convenience Badges */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <Navigation className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Distance:</strong> {hotel.distanceFromFirstSpot} to 1st spot</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate" title={hotel.whyConvenient}>
                  <strong className="text-slate-900 dark:text-slate-200">Convenience:</strong> {hotel.whyConvenient}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
