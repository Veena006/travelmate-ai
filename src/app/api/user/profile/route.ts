import { NextResponse } from 'next/server';
import { APIResponse } from '@/types/travel';

export async function GET() {
  return NextResponse.json<APIResponse<any>>({
    success: true,
    data: {
      name: 'Demo Traveler',
      email: 'traveler@example.com',
      savedTripsCount: 3,
      memberSince: '2026',
    },
  });
}
