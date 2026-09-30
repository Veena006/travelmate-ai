'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TravelForm from '@/components/TravelForm';
import { TravelPreferences, Itinerary } from '@/types/travel';
import { Compass, Sparkles, AlertTriangle } from 'lucide-react';

export default function TravelPlannerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTrip = async (preferences: TravelPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/travel/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || 'Failed to generate itinerary. Please try again.');
      }

      // Store generated trip temporarily in sessionStorage so details page can load it instantly
      sessionStorage.setItem('current_itinerary', JSON.stringify(result.data));

      // Navigate to dynamic trip details view
      router.push('/trip/temp-id');
    } catch (err: any) {
      console.error('Error generating trip:', err);
      setError(err.message || 'An unexpected error occurred while communicating with the AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>AI Travel Generator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create Your <span className="gradient-text">Personalized Trip</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
          Type any destination to get instant suggestions, and let AI build your custom route-connected itinerary with verified spot locations.
        </p>
      </div>

      {error && (
        <div className="mb-8 glass-card p-4 rounded-2xl border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Generation Failed</h4>
            <p className="text-xs text-red-600 dark:text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      <TravelForm onSubmit={handleGenerateTrip} isLoading={isLoading} />
    </div>
  );
}
