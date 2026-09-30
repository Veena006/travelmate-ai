import { RideEstimate } from '@/types/travel';

/**
 * Calculates estimated cab fares for Uber and Rapido based on route distance (km).
 */
export function calculateRideEstimates(
  fromLocation: string,
  toLocation: string,
  distanceStr: string,
  currency: string = 'INR'
): RideEstimate[] {
  // Extract numerical distance in km
  const numericDistance = parseFloat(distanceStr.replace(/[^0-9.]/g, '')) || 3.0;

  // Base rate cards (India market standards in INR)
  // Rapido Bike: ₹20 base + ₹12/km
  const rapidoBikePrice = Math.max(25, Math.round(20 + numericDistance * 12));
  
  // Rapido Auto: ₹30 base + ₹16/km
  const rapidoAutoPrice = Math.max(35, Math.round(30 + numericDistance * 16));

  // Uber Auto: ₹35 base + ₹18/km
  const uberAutoPrice = Math.max(40, Math.round(35 + numericDistance * 18));

  // UberGo Cab: ₹60 base + ₹22/km
  const uberGoPrice = Math.max(80, Math.round(60 + numericDistance * 22));

  // Construct Uber Deep Link
  const uberBookingUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(
    `${toLocation}`
  )}`;

  // Construct Rapido Link
  const rapidoBookingUrl = `https://www.rapido.bike/`;

  const estimates: RideEstimate[] = [
    {
      provider: 'Rapido',
      serviceName: 'Rapido Bike Taxi',
      estimatedPrice: rapidoBikePrice,
      currency,
      etaMins: '3 min',
      bookingUrl: rapidoBookingUrl,
      isCheapest: true,
    },
    {
      provider: 'Rapido',
      serviceName: 'Rapido Auto',
      estimatedPrice: rapidoAutoPrice,
      currency,
      etaMins: '4 min',
      bookingUrl: rapidoBookingUrl,
    },
    {
      provider: 'Uber',
      serviceName: 'Uber Auto',
      estimatedPrice: uberAutoPrice,
      currency,
      etaMins: '5 min',
      bookingUrl: uberBookingUrl,
    },
    {
      provider: 'Uber',
      serviceName: 'UberGo Cab',
      estimatedPrice: uberGoPrice,
      currency,
      etaMins: '4 min',
      bookingUrl: uberBookingUrl,
    },
  ];

  return estimates;
}
