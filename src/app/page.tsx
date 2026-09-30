import Link from 'next/link';
import { Compass, Sparkles, MapPin, DollarSign, Calendar, ArrowRight, Navigation, Hotel, Utensils } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-semibold mb-8 animate-float shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Smart Route-Based Travel Planning</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Plan Your Perfect Trip with <span className="gradient-text">Detailed Route Itineraries</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Enter your destination, budget, and travel style. Get custom day-by-day itineraries complete with hotel recommendations, exact spots and locations, transit times, and local dining suggestions.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/travel-planner"
              className="w-full sm:w-auto gradient-btn px-8 py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/25 transition-all group"
            >
              <span>Plan My Trip Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#how-it-works"
              className="w-full sm:w-auto glass-card px-8 py-4 rounded-2xl text-slate-700 dark:text-slate-200 font-semibold text-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200 dark:border-slate-700/60 shadow-xs"
            >
              See How It Works
            </Link>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">Route-Based</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Sequential Travel Paths</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">Where to Stay</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Convenient Hotel Suggestions</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">Distances</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Transit Time Estimates</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">Integrated</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Local Restaurant Options</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Designed for Practical, Real-World Travel
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base">
              No generic bullet lists. Get logical daily routes that save time, money, and hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-2xl hover:border-blue-500/50 transition-all group shadow-xs">
              <div className="p-3 bg-blue-500/10 w-fit rounded-xl border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Navigation className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sequential Travel Routes</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Clear step-by-step guidance showing distance, travel time, and transit modes between every consecutive spot.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-2xl hover:border-purple-500/50 transition-all group shadow-xs">
              <div className="p-3 bg-purple-500/10 w-fit rounded-xl border border-purple-500/20 text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Hotel className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Where to Stay</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Handpicked hotel recommendations matched to your budget, serving as the central starting point for daily routes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-2xl hover:border-emerald-500/50 transition-all group shadow-xs">
              <div className="p-3 bg-emerald-500/10 w-fit rounded-xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Integrated Dining Recommendations</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Lunch and dinner suggestions placed right along your daily sightseeing route to minimize detour travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Step-by-Step Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              How Your Trip Plan Is Created
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="glass-card p-8 rounded-2xl relative shadow-xs">
              <div className="text-4xl font-black text-blue-500/20 mb-4">01</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Set Travel Preferences</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Input your destination with autocomplete suggestions, trip length, starting city, budget, and activity styles.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-8 rounded-2xl relative shadow-xs">
              <div className="text-4xl font-black text-purple-500/20 mb-4">02</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Geographic Clustering</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Attractions and dining spots are grouped geographically per day to eliminate unnecessary crisscross travel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-8 rounded-2xl relative shadow-xs">
              <div className="text-4xl font-black text-emerald-500/20 mb-4">03</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Explore & Save Route</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Review your route timeline, check distance and transit mode banners, inspect maps, and save your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto glass-card p-8 sm:p-12 rounded-3xl border border-blue-500/30 relative overflow-hidden shadow-lg">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Ready to Experience Stress-Free Travel Planning?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Generate practical daily travel routes, realistic budget breakdowns, and hotel recommendations in seconds.
              </p>
            </div>
            <Link
              href="/travel-planner"
              className="gradient-btn px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg hover:shadow-purple-500/30 transition-all whitespace-nowrap"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
