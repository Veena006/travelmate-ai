import Link from 'next/link';
import { Compass, Heart, Globe, Shield, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/90 text-slate-600 dark:text-slate-400 py-12 px-4 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand section */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-500" />
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">AI Travel Planner</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Your intelligent travel companion crafting personalized route-based itineraries, hotel recommendations with locations, and smart budget plans.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/travel-planner" className="hover:text-blue-500 transition-colors">Plan Itinerary</Link>
            </li>
            <li>
              <Link href="/my-trips" className="hover:text-blue-500 transition-colors">My Saved Trips</Link>
            </li>
          </ul>
        </div>

        {/* Travel Features */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Features</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>Interactive Autocomplete Suggestions</li>
            <li>Location Right Next to Every Spot</li>
            <li>Light & Dark Theme Switcher</li>
            <li>Transit & Distance Estimations</li>
          </ul>
        </div>

        {/* Travel Support & Info */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Travel Assistance</h4>
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verified Destination Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Smart Distance & Route Maps</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Global Destination Coverage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} AI Travel Planner. All rights reserved.</p>
        <div className="flex items-center gap-1 font-medium">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Travelers Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
