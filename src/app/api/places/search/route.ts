import { NextResponse } from 'next/server';
import { APIResponse } from '@/types/travel';

export async function POST(request: Request) {
  try {
    const { destination, query } = await request.json();

    if (!destination) {
      return NextResponse.json<APIResponse<null>>(
        { success: false, error: { message: 'Destination query parameter required.' } },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // If Google Maps API key exists and is valid, fetch from Google Places API
    if (apiKey && apiKey !== 'mock-key-development' && apiKey !== 'your_google_maps_api_key_here') {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          `${query || 'attractions'} in ${destination}`
        )}&key=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.status === 'OK') {
          const places = data.results.slice(0, 6).map((item: any) => ({
            id: item.place_id,
            name: item.name,
            address: item.formatted_address,
            rating: item.rating || 4.5,
            userRatingsTotal: item.user_ratings_total || 120,
            location: {
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
            },
          }));

          return NextResponse.json({ success: true, data: places });
        }
      } catch (err) {
        console.warn('Google Places API error, using mock places:', err);
      }
    }

    const destLower = destination.toLowerCase().trim();
    let mockPlaces = [];

    if (destLower.includes('mumbai')) {
      mockPlaces = [
        {
          id: 'mum_1',
          name: 'Gateway of India',
          address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
          rating: 4.8,
          userRatingsTotal: 84200,
          location: { lat: 18.9220, lng: 72.8347 },
        },
        {
          id: 'mum_2',
          name: 'Marine Drive (Queen’s Necklace)',
          address: 'Netaji Subhash Chandra Bose Road, South Mumbai 400020',
          rating: 4.9,
          userRatingsTotal: 65100,
          location: { lat: 18.9432, lng: 72.8230 },
        },
        {
          id: 'mum_3',
          name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
          address: 'Chhatrapati Shivaji Terminus Area, Fort, Mumbai 400001',
          rating: 4.7,
          userRatingsTotal: 42100,
          location: { lat: 18.9401, lng: 72.8354 },
        },
        {
          id: 'mum_4',
          name: 'Bandra Bandstand Promenade',
          address: 'Bandstand Promenade, Bandra West, Mumbai 400050',
          rating: 4.7,
          userRatingsTotal: 29800,
          location: { lat: 19.0435, lng: 72.8197 },
        },
      ];
    } else if (destLower.includes('mangalore')) {
      mockPlaces = [
        {
          id: 'mng_1',
          name: 'Panambur Beach',
          address: 'Port Trust Area, Panambur, Mangalore, Karnataka 575010',
          rating: 4.7,
          userRatingsTotal: 18200,
          location: { lat: 12.9538, lng: 74.8037 },
        },
        {
          id: 'mng_2',
          name: 'Kudroli Gokarnath Temple',
          address: 'Kudroli, Kodialbail, Mangalore, Karnataka 575003',
          rating: 4.8,
          userRatingsTotal: 22100,
          location: { lat: 12.8803, lng: 74.8329 },
        },
        {
          id: 'mng_3',
          name: 'St. Aloysius Chapel',
          address: 'P B No 720, K.S. Rao Road, Kodialbail, Mangalore 575003',
          rating: 4.8,
          userRatingsTotal: 8400,
          location: { lat: 12.8732, lng: 74.8465 },
        },
        {
          id: 'mng_4',
          name: 'Tannirbhavi Beach',
          address: 'Tannirbhavi Coastal Corridor, Mangalore 575010',
          rating: 4.6,
          userRatingsTotal: 14500,
          location: { lat: 12.9126, lng: 74.8115 },
        },
      ];
    } else if (destLower.includes('mysore') || destLower.includes('mysuru')) {
      mockPlaces = [
        {
          id: 'mys_1',
          name: 'Mysore Palace (Amba Vilas)',
          address: 'Sayyaji Rao Road, Agrahara, Chamrajpura, Mysuru 570001',
          rating: 4.9,
          userRatingsTotal: 96000,
          location: { lat: 12.3051, lng: 76.6551 },
        },
        {
          id: 'mys_2',
          name: 'Chamundeshwari Temple & Chamundi Hill',
          address: 'Chamundi Hill Summit, Mysuru, Karnataka 570010',
          rating: 4.8,
          userRatingsTotal: 38400,
          location: { lat: 12.2724, lng: 76.6710 },
        },
        {
          id: 'mys_3',
          name: 'Brindavan Gardens',
          address: 'KRS Dam Road, Krishna Raja Sagara, Mysuru 571607',
          rating: 4.6,
          userRatingsTotal: 52000,
          location: { lat: 12.4243, lng: 76.5746 },
        },
        {
          id: 'mys_4',
          name: "St. Philomena's Cathedral",
          address: 'Lourdes Nagar, Ashoka Road, Mysuru, Karnataka 570001',
          rating: 4.7,
          userRatingsTotal: 18900,
          location: { lat: 12.3211, lng: 76.6582 },
        },
      ];
    } else if (destLower.includes('malaysia')) {
      mockPlaces = [
        {
          id: 'mys_kl_1',
          name: 'Petronas Twin Towers',
          address: 'Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia',
          rating: 4.8,
          userRatingsTotal: 124000,
          location: { lat: 3.1579, lng: 101.7116 },
        },
        {
          id: 'mys_kl_2',
          name: 'Batu Caves Complex',
          address: 'Gombak, 68100 Batu Caves, Selangor, Malaysia',
          rating: 4.7,
          userRatingsTotal: 89000,
          location: { lat: 3.2379, lng: 101.6840 },
        },
        {
          id: 'mys_kl_3',
          name: 'Bukit Bintang Street & Jalan Alor',
          address: 'Bukit Bintang, 50200 Kuala Lumpur, Malaysia',
          rating: 4.6,
          userRatingsTotal: 45000,
          location: { lat: 3.1466, lng: 101.7107 },
        },
      ];
    } else {
      mockPlaces = [
        {
          id: 'place_1',
          name: `${destination} Landmark Spot`,
          address: `Main Boulevard, Old Town, ${destination}`,
          rating: 4.8,
          userRatingsTotal: 340,
          location: { lat: 15.4989, lng: 73.8278 },
        },
        {
          id: 'place_2',
          name: `Heritage Museum & Cultural Hub`,
          address: `Historic Centre, ${destination}`,
          rating: 4.6,
          userRatingsTotal: 210,
          location: { lat: 15.5204, lng: 73.8152 },
        },
        {
          id: 'place_3',
          name: `Local Gourmet Dining Market`,
          address: `Promenade Waterfront, ${destination}`,
          rating: 4.7,
          userRatingsTotal: 490,
          location: { lat: 15.4801, lng: 73.8345 },
        },
      ];
    }

    return NextResponse.json({ success: true, data: mockPlaces });
  } catch (error: any) {
    return NextResponse.json<APIResponse<null>>(
      { success: false, error: { message: 'Failed to search places', details: error.message } },
      { status: 500 }
    );
  }
}
