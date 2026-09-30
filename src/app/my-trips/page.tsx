'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Itinerary } from '@/types/travel';
import TripCard from '@/components/TripCard';
import Loading from '@/components/Loading';
import { Compass, Plus, BookmarkCheck } from 'lucide-react';

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedTrips() {
      setLoading(true);
      try {
        const response = await fetch('/api/travel');
        const json = await response.json();

        let apiTrips: Itinerary[] = [];
        if (response.ok && json.success && Array.isArray(json.data)) {
          apiTrips = json.data;
        }

        // Merge with local fallback saved trips
        const localTrips: Itinerary[] = JSON.parse(
          localStorage.getItem('saved_trips') || '[]'
        );

        const allTrips = [...apiTrips, ...localTrips];
        // Deduplicate by ID
        const uniqueTrips = Array.from(
          new Map(allTrips.map((item) => [item.id || item.destination, item])).values()
        );

        setTrips(uniqueTrips);
      } catch (err) {
        console.error('Error loading saved trips:', err);
        const localTrips: Itinerary[] = JSON.parse(
          localStorage.getItem('saved_trips') || '[]'
        );
        setTrips(localTrips);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedTrips();
  }, []);

  const handleDeleteTrip = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      await fetch(`/api/travel/${id}`, { method: 'DELETE' });
    } catch (e) {
      // Ignore network errors on deletion fallback
    }

    // Update state & localStorage
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem('saved_trips', JSON.stringify(updated));
  };

  if (loading) {
    return <Loading message="Retrieving your saved itineraries..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Saved Itineraries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className="gradient-text">Saved Trips</span>
          </h1>
        </div>

        <Link
          href="/travel-planner"
          className="gradient-btn px-5 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 w-fit shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </Link>
      </div>

      {/* Trips Grid or Empty State */}
      {trips.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center max-w-lg mx-auto space-y-4 my-8 shadow-xs">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 text-blue-600 dark:text-blue-400 mx-auto">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Saved Trips Yet</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            You haven't saved any travel itineraries. Start planning your next dream trip now!
          </p>
          <Link
            href="/travel-planner"
            className="inline-flex items-center gap-2 gradient-btn px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md mt-2"
          >
            Create First Itinerary
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id || trip.destination} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
}
