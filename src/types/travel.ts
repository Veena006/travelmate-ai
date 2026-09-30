// Travel preferences entered by the user in the planner form
export interface TravelPreferences {
  destination: string;
  startingLocation: string;
  budget: number;
  currency: string;
  days: number;
  travelers: number;
  travelStyle: 'Budget' | 'Relaxed' | 'Adventure' | 'Luxury' | 'Family' | 'Romantic' | 'Solo';
  interests: string[];
  dietaryPreference?: string;
  transportPreference?: string;
  accommodationPreference?: string;
}

// User Profile Data Interface
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  savedTripsCount?: number;
  memberSince?: string;
}

// Uber & Rapido Ride Estimate Option
export interface RideEstimate {
  provider: 'Uber' | 'Rapido';
  serviceName: string; // e.g. "Rapido Bike", "Rapido Auto", "Uber Auto", "UberGo"
  estimatedPrice: number;
  currency: string;
  etaMins: string;
  bookingUrl: string;
  isCheapest?: boolean;
}

// Recommended hotel / stay
export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  priceRange: string;
  rating: number;
  description: string;
  distanceFromFirstSpot: string;
  whyConvenient: string;
}

// Transit & route segment between consecutive locations
export interface RouteSegment {
  fromLocation: string;
  toLocation: string;
  distanceKm: string;
  durationMins: string;
  transportMode: 'walking' | 'car' | 'taxi' | 'metro' | 'bus';
  isEstimate?: boolean;
  rideEstimates?: RideEstimate[];
}

// Integrated dining recommendation
export interface Restaurant {
  id?: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  distanceFromSpot: string;
  travelTime: string;
  suggestedMeal: 'breakfast' | 'lunch' | 'dinner';
}

// Famous tourist spot overview
export interface FamousSpot {
  name: string;
  location?: string;
  description: string;
  whyFamous: string;
  suggestedVisitingTime: string;
  recommendedDuration: string;
  openingHours: string;
  distanceFromPrevious?: string;
  travelTimeFromPrevious?: string;
  distanceToNext?: string;
}

// Activity item for each day
export interface Activity {
  id?: string;
  time: string;
  timeOfDay?: 'Morning' | 'Afternoon' | 'Evening';
  name: string;
  description: string;
  location?: string;
  category?: 'attraction' | 'food' | 'adventure' | 'relaxation' | 'shopping' | 'travel';
  estimatedCost: number;
  rating?: number;
  suggestedDuration?: string;
  routeToNext?: RouteSegment;
}

// Single day breakdown in the itinerary
export interface TripDay {
  day: number;
  title: string;
  startHotel?: Hotel;
  activities: Activity[];
  lunchRestaurant?: Restaurant;
  dinnerRestaurant?: Restaurant;
}

// Budget breakdown summary
export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
  total: number;
  currency: string;
  isWithinBudget: boolean;
  budgetComparison: string;
}

// Complete generated itinerary object
export interface Itinerary {
  id?: string;
  destination: string;
  startingLocation?: string;
  summary: string;
  hotels: Hotel[];
  famousSpots: FamousSpot[];
  estimatedBudget: BudgetBreakdown;
  days: TripDay[];
  tips: string[];
  packingList: string[];
  warnings: string[];
  createdAt?: string;
}

// Standard API Response Wrappers
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: string;
  };
}
