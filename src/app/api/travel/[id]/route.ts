import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { APIResponse, Itinerary } from '@/types/travel';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const trip = await prisma.trip.findUnique({
        where: { id },
      });

      if (!trip) {
        return NextResponse.json<APIResponse<null>>(
          { success: false, error: { message: 'Trip not found.' } },
          { status: 404 }
        );
      }

      const parsed: Itinerary = {
        ...JSON.parse(trip.itineraryJson),
        id: trip.id,
        createdAt: trip.createdAt.toISOString(),
      };

      return NextResponse.json<APIResponse<Itinerary>>({
        success: true,
        data: parsed,
      });
    } catch (dbErr) {
      return NextResponse.json<APIResponse<null>>(
        { success: false, error: { message: 'Database query failed.' } },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: { message: 'Failed to process request.' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      await prisma.trip.delete({
        where: { id },
      });

      return NextResponse.json<APIResponse<{ deleted: boolean }>>({
        success: true,
        data: { deleted: true },
      });
    } catch (dbErr) {
      return NextResponse.json<APIResponse<{ deleted: boolean }>>({
        success: true,
        data: { deleted: true },
      });
    }
  } catch (error: any) {
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: { message: 'Failed to delete trip.' } },
      { status: 500 }
    );
  }
}
