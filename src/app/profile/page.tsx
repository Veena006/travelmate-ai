'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Compass, LogOut, Bookmark, Plus, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { UserProfile, Itinerary } from '@/types/travel';
import TripCard from '@/components/TripCard';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (!activeUser) {
      // Set default demo user if unauthenticated
      setUser({
        id: 'demo_user',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        memberSince: '2026',
      });
    } else {
      setUser(activeUser);
    }

    // Load user's saved trips
    const localTrips: Itinerary[] = JSON.parse(localStorage.getItem('saved_trips') || '[]');
    setSavedTrips(localTrips);
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Profile Header Card */}
      <div className="glass-card p-8 rounded-3xl space-y-6 border border-blue-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-3xl shadow-xl border-2 border-blue-400/40">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.name}</h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{user.email}</span>
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Traveler Account</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/travel-planner"
              className="gradient-btn px-5 py-2.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>New Trip</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Saved Itineraries</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{savedTrips.length} Trips</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Cab Integration</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">Uber & Rapido Active</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">AI Route Planner</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">Unlimited Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* User's Saved Trips Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-500" />
            <span>My Saved Itineraries</span>
          </h2>

          <Link
            href="/my-trips"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {savedTrips.length === 0 ? (
          <div className="glass-card p-8 rounded-3xl text-center space-y-3 shadow-xs">
            <p className="text-slate-500 dark:text-slate-400 text-sm">You haven't saved any travel plans yet.</p>
            <Link
              href="/travel-planner"
              className="inline-flex items-center gap-2 gradient-btn px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-md"
            >
              Plan Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedTrips.slice(0, 3).map((trip) => (
              <TripCard key={trip.id || trip.destination} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
