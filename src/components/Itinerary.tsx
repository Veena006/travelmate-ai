'use client';

import { TripDay, RouteSegment, Restaurant, RideEstimate } from '@/types/travel';
import { Clock, MapPin, Navigation, Star, Utensils, Hotel as HotelIcon, ArrowDown, ExternalLink, Car } from 'lucide-react';

interface ItineraryProps {
  days: TripDay[];
  currency?: string;
}

export default function Itinerary({ days, currency = 'INR' }: ItineraryProps) {
  return (
    <div className="space-y-10">
      {days.map((day) => (
        <div key={day.day} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          {/* Day Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 bg-blue-600/10 dark:bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-sm">
                Day {day.day}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{day.title}</h3>
            </div>
          </div>

          {/* Starting Hotel Base Banner */}
          {day.startHotel && (
            <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-600/10 border border-purple-500/20 dark:border-purple-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-700 dark:text-purple-300">
                  <HotelIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-purple-600 dark:text-purple-400 block">
                    Route Starting Point (Your Hotel Base)
                  </span>
                  {/* Hotel Name + Location RIGHT NEXT TO IT */}
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {day.startHotel.name}
                    </h4>
                    {day.startHotel.location && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 shadow-xs">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{day.startHotel.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30 font-semibold shrink-0 hidden sm:block">
                Start of Day
              </span>
            </div>
          )}

          {/* Sequential Route Timeline */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {day.activities.map((activity, idx) => (
              <div key={idx} className="space-y-4">
                {/* Activity Item Card */}
                <div className="relative pl-10 group">
                  <div className="absolute left-1.5 top-2 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-full group-hover:scale-125 transition-transform" />

                  <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all space-y-3 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {activity.timeOfDay && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                            {activity.timeOfDay}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      {activity.suggestedDuration && (
                        <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-md font-medium">
                          ⏱ {activity.suggestedDuration}
                        </span>
                      )}
                    </div>

                    {/* Spot Name + Location RIGHT NEXT TO IT */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activity.name}
                      </h4>
                      {activity.location && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 shadow-xs">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{activity.location}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {activity.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 gap-4">
                      <div className="flex items-center gap-4">
                        {activity.rating && (
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{activity.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {activity.estimatedCost > 0 ? (
                          <span>Est. {currency} {activity.estimatedCost.toLocaleString()}</span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">Free Entry</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Connector + Cab Fare Comparison */}
                {activity.routeToNext && (
                  <RouteConnector segment={activity.routeToNext} currency={currency} />
                )}

                {/* Integrated Lunch after 1st activity */}
                {idx === 0 && day.lunchRestaurant && (
                  <RestaurantCard restaurant={day.lunchRestaurant} type="Lunch" />
                )}

                {/* Integrated Dinner after last activity */}
                {idx === day.activities.length - 1 && day.dinnerRestaurant && (
                  <RestaurantCard restaurant={day.dinnerRestaurant} type="Dinner" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Route Connector Banner with Cab Fare Comparison
function RouteConnector({ segment, currency }: { segment: RouteSegment; currency: string }) {
  const rapidoEstimates = segment.rideEstimates?.filter((r) => r.provider === 'Rapido') ?? [];
  const uberEstimates = segment.rideEstimates?.filter((r) => r.provider === 'Uber') ?? [];
  const cheapest = segment.rideEstimates?.reduce((a, b) =>
    a.estimatedPrice < b.estimatedPrice ? a : b
  );

  return (
    <div className="relative pl-10 space-y-3 py-1">
      {/* Distance/Time Banner */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-4 h-4 text-blue-500 animate-pulse shrink-0" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{segment.fromLocation}</span>
            <span className="text-slate-400 dark:text-slate-500 mx-1">→</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{segment.toLocation}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-blue-500/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-500/30 font-bold">
            📍 {segment.distanceKm}
          </span>
          <span className="px-2.5 py-1 bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold">
            ⏱ {segment.durationMins} by {segment.transportMode}
          </span>
          {segment.isEstimate && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">Est.</span>
          )}
        </div>
      </div>

      {/* Cab Fare Comparison Cards */}
      {segment.rideEstimates && segment.rideEstimates.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Car className="w-3.5 h-3.5 text-blue-500" />
              <span>Compare Cab & Auto Fares for this Segment</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Live Fare Estimates
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {segment.rideEstimates.map((ride, rideIdx) => (
              <RideEstimateCard
                key={rideIdx}
                ride={ride}
                currency={currency}
                isCheapest={cheapest?.serviceName === ride.serviceName}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Ride Option Card
function RideEstimateCard({
  ride,
  currency,
  isCheapest,
}: {
  ride: RideEstimate;
  currency: string;
  isCheapest?: boolean;
}) {
  const isRapido = ride.provider === 'Rapido';
  const isCheapestOption = isCheapest || ride.isCheapest;

  return (
    <div
      className={`p-2.5 rounded-xl border transition-all text-center flex flex-col justify-between space-y-1.5 ${
        isCheapestOption
          ? isRapido
            ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-500/40 ring-1 ring-orange-500/30'
            : 'bg-blue-50 dark:bg-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/30'
          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
      }`}
    >
      {isCheapestOption && (
        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          ✓ Best Value
        </div>
      )}

      <div className={`text-xs font-bold ${isRapido ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>
        {isRapido ? '🟠' : '⚫'} {ride.serviceName}
      </div>

      <div className="text-base font-extrabold text-slate-900 dark:text-white">
        {currency} {ride.estimatedPrice}
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400">ETA: {ride.etaMins}</div>

      <a
        href={ride.bookingUrl}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center justify-center gap-1 w-full py-1.5 rounded-lg font-bold text-[11px] transition-all ${
          isRapido
            ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/30'
            : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30'
        }`}
      >
        Book {ride.provider}
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  );
}

// Inline Restaurant Card Component
function RestaurantCard({ restaurant, type }: { restaurant: Restaurant; type: 'Lunch' | 'Dinner' }) {
  return (
    <div className="relative pl-10 my-2">
      <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              🍽️ {type} Recommendation
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-md">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            {/* Spot Name + Location RIGHT NEXT TO IT */}
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {restaurant.name}
              </h4>
              {restaurant.location && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
                  <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                  <span>{restaurant.location}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{restaurant.cuisine}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>{restaurant.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Navigation className="w-3.5 h-3.5 text-blue-500" />
            <span>{restaurant.distanceFromSpot} · {restaurant.travelTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
