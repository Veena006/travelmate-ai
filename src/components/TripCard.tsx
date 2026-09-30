import Link from 'next/link';
import { Itinerary } from '@/types/travel';
import { MapPin, Calendar, DollarSign, ArrowRight, Trash2 } from 'lucide-react';

interface TripCardProps {
  trip: Itinerary;
  onDelete?: (id: string) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const formattedDate = trip.createdAt
    ? new Date(trip.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="glass-card p-6 rounded-3xl space-y-4 hover:border-blue-500/40 transition-all group flex flex-col justify-between shadow-xs">
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {trip.days.length} Days
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{formattedDate}</span>
        </div>

        {/* Destination Title */}
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{trip.destination}</span>
        </h3>

        {/* Summary Snippet */}
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {trip.summary}
        </p>
      </div>

      {/* Footer Meta & Actions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Est. Budget</span>
          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
            {trip.estimatedBudget.currency} {trip.estimatedBudget.total.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onDelete && trip.id && (
            <button
              onClick={() => onDelete(trip.id!)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl transition-colors"
              title="Delete Trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <Link
            href={`/trip/${trip.id || 'temp-id'}`}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>View Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
