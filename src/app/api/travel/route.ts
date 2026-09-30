import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { APIResponse, Itinerary } from '@/types/travel';

export async function GET() {
  try {
    try {
      const trips = await prisma.trip.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const parsedTrips: Itinerary[] = trips.map((t) => {
        const parsed = JSON.parse(t.itineraryJson);
        return {
          ...parsed,
          id: t.id,
          createdAt: t.createdAt.toISOString(),
        };
      });

      return NextResponse.json<APIResponse<Itinerary[]>>({
        success: true,
        data: parsedTrips,
      });
    } catch (dbErr) {
      console.warn('Prisma DB query failed, returning empty list:', dbErr);
      return NextResponse.json<APIResponse<Itinerary[]>>({
        success: true,
        data: [],
      });
    }
  } catch (error: any) {
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: { message: 'Failed to fetch trips.' } },
      { status: 500 }
    );
  }
}
