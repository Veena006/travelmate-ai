'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TravelPreferences } from '@/types/travel';
import DestinationAutocomplete from './DestinationAutocomplete';
import { MapPin, Navigation, DollarSign, Calendar, Users, Sparkles, Compass, Check, AlertCircle } from 'lucide-react';

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading?: boolean;
}

const TRAVEL_STYLES = [
  { id: 'Budget', label: 'Budget', desc: 'Backpacker & affordable choices' },
  { id: 'Relaxed', label: 'Relaxed', desc: 'Unhurried pace & leisure' },
  { id: 'Adventure', label: 'Adventure', desc: 'Outdoor activities & thrills' },
  { id: 'Luxury', label: 'Luxury', desc: 'Premium stays & fine dining' },
  { id: 'Family', label: 'Family', desc: 'Kid-friendly & comfortable' },
  { id: 'Romantic', label: 'Romantic', desc: 'Couples getaway & scenic spots' },
  { id: 'Solo', label: 'Solo', desc: 'Self-paced & flexible exploration' },
];

const INTERESTS_OPTIONS = [
  'Beaches', 'Food', 'Adventure', 'History', 
  'Nature', 'Shopping', 'Nightlife', 'Culture', 'Photography'
];

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];

export default function TravelForm({ onSubmit, isLoading = false }: TravelFormProps) {
  const router = useRouter();

  // Controlled component state without hardcoded static destination
  const [formData, setFormData] = useState<TravelPreferences>({
    destination: '',
    startingLocation: '',
    budget: 25000,
    currency: 'INR',
    days: 3,
    travelers: 2,
    travelStyle: 'Budget',
    interests: ['Food', 'History', 'Nature'],
    dietaryPreference: 'Any',
    transportPreference: 'Public transport',
    accommodationPreference: 'Hotel',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'budget' || name === 'days' || name === 'travelers' ? Number(value) : value,
    }));
    // Clear error on user edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDestinationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, destination: value }));
    if (errors.destination) {
      setErrors((prev) => ({ ...prev, destination: '' }));
    }
  };

  const handleStartingLocationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, startingLocation: value }));
    if (errors.startingLocation) {
      setErrors((prev) => ({ ...prev, startingLocation: '' }));
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: '' }));
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Please choose or type a destination (e.g. Mumbai, Mysore, Malaysia).';
    }

    if (!formData.startingLocation.trim()) {
      newErrors.startingLocation = 'Starting location is required (e.g. Bengaluru, Mumbai, Delhi).';
    }

    if (formData.budget <= 0 || isNaN(formData.budget)) {
      newErrors.budget = 'Please enter a valid budget greater than 0.';
    }

    if (formData.days < 1 || formData.days > 14 || isNaN(formData.days)) {
      newErrors.days = 'Number of days must be between 1 and 14.';
    }

    if (formData.travelers < 1 || formData.travelers > 20 || isNaN(formData.travelers)) {
      newErrors.travelers = 'Travelers must be between 1 and 20.';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Select at least one interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 rounded-3xl space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>Tell Us About Your Trip</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Type any destination or starting location to see instant suggestions as you type.
        </p>
      </div>

      {/* Grid Section 1: Dynamic Autocomplete Locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Destination with Prefix Autocomplete Suggestions */}
        <DestinationAutocomplete
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleDestinationChange}
          label="Destination"
          placeholder="Type 'm' for Mumbai, Mangalore, Mysore, Malaysia..."
          icon={MapPin}
          error={errors.destination}
          quickSuggestions={['Mumbai', 'Mangalore', 'Mysore', 'Malaysia', 'Manali', 'Goa']}
          required
        />

        {/* Starting Location with Autocomplete Suggestions */}
        <DestinationAutocomplete
          id="startingLocation"
          name="startingLocation"
          value={formData.startingLocation}
          onChange={handleStartingLocationChange}
          label="Starting Location"
          placeholder="e.g. Bengaluru, Mumbai, Delhi, Chennai..."
          icon={Navigation}
          error={errors.startingLocation}
          quickSuggestions={['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad']}
          required
        />
      </div>

      {/* Grid Section 2: Budget & Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Budget */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>Total Budget *</span>
          </label>
          <input
            type="number"
            name="budget"
            min="100"
            value={formData.budget || ''}
            onChange={handleInputChange}
            placeholder="25000"
            className="w-full px-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors shadow-xs"
          />
          {errors.budget && (
            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.budget}</span>
            </p>
          )}
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors shadow-xs"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr} value={curr} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Section 3: Days & Travelers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Days */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Trip Duration (Days 1-14) *</span>
          </label>
          <input
            type="number"
            name="days"
            min="1"
            max="14"
            value={formData.days || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors shadow-xs"
          />
          {errors.days && (
            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.days}</span>
            </p>
          )}
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-500" />
            <span>Number of Travelers *</span>
          </label>
          <input
            type="number"
            name="travelers"
            min="1"
            max="20"
            value={formData.travelers || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors shadow-xs"
          />
          {errors.travelers && (
            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.travelers}</span>
            </p>
          )}
        </div>
      </div>

      {/* Section 4: Travel Style */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Travel Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRAVEL_STYLES.map((style) => {
            const isSelected = formData.travelStyle === style.id;
            return (
              <button
                type="button"
                key={style.id}
                onClick={() => setFormData((prev) => ({ ...prev, travelStyle: style.id as any }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 border-blue-500 text-blue-700 dark:text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
                    : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-sm flex items-center justify-between">
                  <span>{style.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{style.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 5: Interests */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Interests & Activities (Select multiple) *
        </label>
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS_OPTIONS.map((interest) => {
            const isSelected = formData.interests.includes(interest);
            return (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600/10 dark:bg-purple-600/30 border border-purple-500 text-purple-700 dark:text-purple-200 shadow-xs'
                    : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{interest}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="text-rose-500 text-xs mt-2 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.interests}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full gradient-btn py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating AI Route Itinerary...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-300" />
              <span>Generate Trip Itinerary</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
