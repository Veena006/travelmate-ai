import { NextResponse } from 'next/server';
import { generateItineraryWithAI } from '@/lib/openai';
import { TravelPreferences, APIResponse, Itinerary } from '@/types/travel';

export async function POST(request: Request) {
  try {
    // 1. Parse JSON body from HTTP request
    const body: TravelPreferences = await request.json();

    // 2. Validate request parameters on the server side
    if (!body.destination || typeof body.destination !== 'string') {
      return NextResponse.json<APIResponse<null>>(
        {
          success: false,
          error: { message: 'Destination is required and must be a valid string.' },
        },
        { status: 400 }
      );
    }

    if (!body.budget || typeof body.budget !== 'number' || body.budget <= 0) {
      return NextResponse.json<APIResponse<null>>(
        {
          success: false,
          error: { message: 'Budget must be a positive number.' },
        },
        { status: 400 }
      );
    }

    if (!body.days || typeof body.days !== 'number' || body.days < 1 || body.days > 14) {
      return NextResponse.json<APIResponse<null>>(
        {
          success: false,
          error: { message: 'Days must be a number between 1 and 14.' },
        },
        { status: 400 }
      );
    }

    // 3. Call AI Service (OpenAI with automatic mock fallback)
    const itinerary: Itinerary = await generateItineraryWithAI(body);

    // 4. Return successful API Response with HTTP 200
    return NextResponse.json<APIResponse<Itinerary>>({
      success: true,
      data: itinerary,
    });
  } catch (error: any) {
    console.error('API Error /api/travel/generate:', error);

    // 5. Handle unexpected server errors with HTTP 500
    return NextResponse.json<APIResponse<null>>(
      {
        success: false,
        error: {
          message: 'An internal server error occurred while generating your itinerary.',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}
