'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Itinerary as ItineraryType } from '@/types/travel';
import Itinerary from '@/components/Itinerary';
import HotelsSection from '@/components/HotelsSection';
import FamousPlaces from '@/components/FamousPlaces';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import Map from '@/components/Map';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { MapPin, Calendar, Bookmark, RefreshCw, Trash2, ShieldAlert, CheckCircle, Lightbulb, PackageCheck, Hotel as HotelIcon } from 'lucide-react';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<ItineraryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadTripDetails() {
      setLoading(true);
      setError(null);

      try {
        if (tripId === 'temp-id') {
          const cached = sessionStorage.getItem('current_itinerary');
          if (cached) {
            setTrip(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`/api/travel/${tripId}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setTrip(result.data);
        } else {
          const cached = sessionStorage.getItem('current_itinerary');
          if (cached) {
            setTrip(JSON.parse(cached));
          } else {
            throw new Error(result.error?.message || 'Failed to load trip details');
          }
        }
      } catch (err: any) {
        console.error('Error fetching trip:', err);
        setError(err.message || 'Unable to retrieve itinerary details.');
      } finally {
        setLoading(false);
      }
    }

    loadTripDetails();
  }, [tripId]);

  const handleSaveTrip = async () => {
    if (!trip) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/travel/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSaveSuccess(true);
      } else {
        const savedList = JSON.parse(localStorage.getItem('saved_trips') || '[]');
        savedList.push({ ...trip, id: `saved_${Date.now()}` });
        localStorage.setItem('saved_trips', JSON.stringify(savedList));
        setSaveSuccess(true);
      }
    } catch (err) {
      const savedList = JSON.parse(localStorage.getItem('saved_trips') || '[]');
      savedList.push({ ...trip, id: `saved_${Date.now()}` });
      localStorage.setItem('saved_trips', JSON.stringify(savedList));
      setSaveSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTrip = async () => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      await fetch(`/api/travel/${tripId}`, { method: 'DELETE' });
      const savedList = JSON.parse(localStorage.getItem('saved_trips') || '[]');
      const filtered = savedList.filter((item: any) => item.id !== tripId);
      localStorage.setItem('saved_trips', JSON.stringify(filtered));

      router.push('/my-trips');
    } catch (err) {
      router.push('/my-trips');
    }
  };

  if (loading) {
    return <Loading message="Creating your route-connected itinerary..." />;
  }

  if (error || !trip) {
    return (
      <ErrorMessage
        title="Trip Not Found"
        message={error || 'We could not find details for this itinerary.'}
        onRetry={() => router.push('/travel-planner')}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Top Banner & Header */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6 relative overflow-hidden border border-blue-500/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{trip.destination}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {trip.days.length}-Day Route Plan to <span className="gradient-text">{trip.destination}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {trip.summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSaveTrip}
              disabled={isSaving || saveSuccess}
              className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                saveSuccess
                  ? 'bg-emerald-600/20 border border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'gradient-btn text-white shadow-lg'
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Trip Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Trip'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => router.push('/travel-planner')}
              className="px-4 py-3 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>

            {tripId !== 'temp-id' && (
              <button
                onClick={handleDeleteTrip}
                className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🏨 Where to Stay Section */}
      {trip.hotels && trip.hotels.length > 0 && (
        <HotelsSection hotels={trip.hotels} destination={trip.destination} />
      )}

      {/* 📍 Famous Attractions Section */}
      {trip.famousSpots && trip.famousSpots.length > 0 && (
        <FamousPlaces famousSpots={trip.famousSpots} destination={trip.destination} />
      )}

      {/* 📅 Day by Day Sequential Route Itinerary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          <span>Day-by-Day Route Itinerary</span>
        </h2>
        <Itinerary days={trip.days} currency={trip.estimatedBudget.currency} />
      </div>

      {/* 🗺️ Places & Map Section */}
      <Map destination={trip.destination} />

      {/* 💰 Estimated Budget Breakdown */}
      <BudgetBreakdown budget={trip.estimatedBudget} />

      {/* 💡 Tips, Packing & Warnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Travel Tips */}
        {trip.tips && trip.tips.length > 0 && (
          <div className="glass-card p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Travel Tips</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {trip.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Packing List */}
        {trip.packingList && trip.packingList.length > 0 && (
          <div className="glass-card p-6 rounded-3xl border border-purple-500/20 bg-purple-500/5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <PackageCheck className="w-5 h-5" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Packing Essentials</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {trip.packingList.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {trip.warnings && trip.warnings.length > 0 && (
          <div className="glass-card p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Safety Notices</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {trip.warnings.map((warn, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
