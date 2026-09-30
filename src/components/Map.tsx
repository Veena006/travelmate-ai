'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, Star, ExternalLink, Search } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  address: string;
  rating: number;
  userRatingsTotal?: number;
  location: { lat: number; lng: number };
}

interface MapProps {
  destination: string;
}

export default function Map({ destination }: MapProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true);
        const res = await fetch('/api/places/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ destination }),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setPlaces(json.data);
          if (json.data.length > 0) {
            setSelectedPlace(json.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load map places:', err);
      } finally {
        setLoading(false);
      }
    }

    if (destination) {
      fetchPlaces();
    }
  }, [destination]);

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Places & Map</h3>
        </div>
        <span className="self-start sm:self-auto text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full font-semibold">
          {destination}
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span>Searching top attractions in {destination}...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Places List */}
          <div className="md:col-span-1 space-y-3 max-h-96 overflow-y-auto pr-1">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Featured Venues & Locations
            </h4>
            {places.map((place) => {
              const isSelected = selectedPlace?.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-900 dark:text-white ring-1 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Place Name + Location Badge Right Next to It */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{place.name}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 truncate">
                      <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                      <span className="truncate">{place.address}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-500 mt-2 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{place.rating}</span>
                    {place.userRatingsTotal && (
                      <span className="text-slate-400 font-normal">({place.userRatingsTotal} reviews)</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Map Visualizer */}
          <div className="md:col-span-2 relative min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            {/* Ambient decorative grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

            {selectedPlace ? (
              <div className="relative z-10 max-w-md p-6 glass-card rounded-2xl border border-blue-500/30 space-y-3">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
                  <MapPin className="w-5 h-5 animate-bounce" />
                </div>
                {/* Spot Title + Location Right Next to It */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{selectedPlace.name}</h4>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span>{selectedPlace.address}</span>
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedPlace.rating}</span>
                  <span className="text-slate-500 font-normal">• Verified Destination</span>
                </div>
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedPlace.name} ${selectedPlace.address}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400 text-sm">
                Select a venue to inspect coordinates and explore on Google Maps
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
