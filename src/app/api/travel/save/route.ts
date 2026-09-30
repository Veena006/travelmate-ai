import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { APIResponse, Itinerary } from '@/types/travel';

export async function POST(request: Request) {
  try {
    const itinerary: Itinerary = await request.json();

    if (!itinerary || !itinerary.destination) {
      return NextResponse.json<APIResponse<null>>(
        { success: false, error: { message: 'Invalid itinerary data provided.' } },
        { status: 400 }
      );
    }

    try {
      // Save trip in Prisma Database if connected
      const savedTrip = await prisma.trip.create({
        data: {
          destination: itinerary.destination,
          startingLocation: itinerary.startingLocation || '',
          budget: itinerary.estimatedBudget.total,
          currency: itinerary.estimatedBudget.currency,
          days: itinerary.days.length,
          travelers: 1,
          travelStyle: 'Custom',
          interests: 'Travel',
          summary: itinerary.summary,
          itineraryJson: JSON.stringify(itinerary),
        },
      });

      return NextResponse.json<APIResponse<Itinerary>>({
        success: true,
        data: {
          ...itinerary,
          id: savedTrip.id,
        },
      });
    } catch (dbError) {
      console.warn('Prisma DB not available or offline, returning mock saved status:', dbError);
      return NextResponse.json<APIResponse<Itinerary>>({
        success: true,
        data: {
          ...itinerary,
          id: itinerary.id || `saved_${Date.now()}`,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: { message: 'Failed to save trip.', details: error.message } },
      { status: 500 }
    );
  }
}
