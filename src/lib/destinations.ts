export interface DestinationOption {
  name: string;
  region: string;
  country: string;
  category: string;
  popularSpots: string[];
}

export const POPULAR_DESTINATIONS: DestinationOption[] = [
  // Starting with "M" (user specific examples)
  {
    name: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    category: 'Metropolis & Coastal Heritage',
    popularSpots: ['Gateway of India', 'Marine Drive', 'Colaba Causeway', 'Elephanta Caves'],
  },
  {
    name: 'Mangalore',
    region: 'Karnataka',
    country: 'India',
    category: 'Coastal Port & Culture',
    popularSpots: ['Panambur Beach', 'Kudroli Temple', 'St. Aloysius Chapel', 'Tannirbhavi Beach'],
  },
  {
    name: 'Mysore',
    region: 'Karnataka',
    country: 'India',
    category: 'Royal Heritage & Palaces',
    popularSpots: ['Mysore Palace', 'Chamundi Hill', 'Brindavan Gardens', 'Devaraja Market'],
  },
  {
    name: 'Malaysia',
    region: 'Southeast Asia',
    country: 'Malaysia',
    category: 'Tropical & Modern Metropolis',
    popularSpots: ['Petronas Towers', 'Batu Caves', 'Penang Heritage', 'Langkawi Island'],
  },
  {
    name: 'Manali',
    region: 'Himachal Pradesh',
    country: 'India',
    category: 'Himalayan Mountain Adventure',
    popularSpots: ['Solang Valley', 'Hadimba Temple', 'Rohtang Pass', 'Old Manali'],
  },
  {
    name: 'Munnar',
    region: 'Kerala',
    country: 'India',
    category: 'Tea Plantations & Hill Station',
    popularSpots: ['Tea Museum', 'Eravikulam Park', 'Mattupetty Dam', 'Anamudi Peak'],
  },
  {
    name: 'Madurai',
    region: 'Tamil Nadu',
    country: 'India',
    category: 'Temple Heritage & Architecture',
    popularSpots: ['Meenakshi Amman Temple', 'Thirumalai Nayak Palace', 'Gandhi Memorial Museum'],
  },
  {
    name: 'Mahabalipuram',
    region: 'Tamil Nadu',
    country: 'India',
    category: 'UNESCO Rock-Cut Monuments',
    popularSpots: ['Shore Temple', 'Pancha Rathas', "Arjuna's Penance", 'Covelong Beach'],
  },
  {
    name: 'Mount Abu',
    region: 'Rajasthan',
    country: 'India',
    category: 'Desert Oasis & Hill Station',
    popularSpots: ['Dilwara Temples', 'Nakki Lake', 'Guru Shikhar', 'Sunset Point'],
  },
  {
    name: 'Mussoorie',
    region: 'Uttarakhand',
    country: 'India',
    category: 'Queen of the Hills',
    popularSpots: ['Kempty Falls', 'Mall Road', 'Gun Hill Point', 'Company Garden'],
  },
  {
    name: 'Madrid',
    region: 'Community of Madrid',
    country: 'Spain',
    category: 'European Art & Historic Plazas',
    popularSpots: ['Prado Museum', 'Royal Palace of Madrid', 'El Retiro Park', 'Plaza Mayor'],
  },
  {
    name: 'Munich',
    region: 'Bavaria',
    country: 'Germany',
    category: 'Bavarian Culture & Castles',
    popularSpots: ['Marienplatz', 'Nymphenburg Palace', 'English Garden', 'BMW Museum'],
  },
  {
    name: 'Melbourne',
    region: 'Victoria',
    country: 'Australia',
    category: 'Coffee, Arts & Coastal Culture',
    popularSpots: ['Federation Square', 'Great Ocean Road', 'Royal Botanic Gardens', 'Flinders Station'],
  },
  {
    name: 'Manila',
    region: 'Metro Manila',
    country: 'Philippines',
    category: 'Colonial Spanish History & Bays',
    popularSpots: ['Intramuros', 'Rizal Park', 'Manila Ocean Park', 'San Agustin Church'],
  },
  {
    name: 'Maldives',
    region: 'Indian Ocean',
    country: 'Maldives',
    category: 'Luxury Overwater Villas & Reefs',
    popularSpots: ['Malé Atoll', 'Maafushi Island', 'Bioluminescent Beach', 'Banana Reef'],
  },
  {
    name: 'Milan',
    region: 'Lombardy',
    country: 'Italy',
    category: 'Fashion, Art & Cathedral Architecture',
    popularSpots: ['Duomo di Milano', 'Galleria Vittorio Emanuele II', 'The Last Supper', 'Teatro alla Scala'],
  },
  {
    name: 'Montreal',
    region: 'Quebec',
    country: 'Canada',
    category: 'French-Canadian Culture & Festivals',
    popularSpots: ['Old Montreal', 'Mount Royal Park', 'Notre-Dame Basilica', 'Jean-Talon Market'],
  },
  {
    name: 'Marrakech',
    region: 'Marrakesh-Safi',
    country: 'Morocco',
    category: 'Historic Medinas & Palaces',
    popularSpots: ['Jemaa el-Fnaa', 'Jardin Majorelle', 'Bahia Palace', 'Koutoubia Mosque'],
  },
  {
    name: 'Mauritius',
    region: 'Indian Ocean',
    country: 'Mauritius',
    category: 'Tropical Lagoons & Waterfalls',
    popularSpots: ['Le Morne Brabant', 'Chamarel 7 Coloured Earth', 'Black River Gorges', 'Flic en Flac'],
  },

  // Other Top Indian Destinations
  {
    name: 'Goa',
    region: 'Konkan Coast',
    country: 'India',
    category: 'Beaches, Nightlife & Portuguese Forts',
    popularSpots: ['Baga Beach', 'Fort Aguada', 'Basilica of Bom Jesus', 'Anjuna Flea Market'],
  },
  {
    name: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    category: 'Silicon Valley & Garden City',
    popularSpots: ['Bangalore Palace', 'Lalbagh Gardens', 'Cubbon Park', 'Bannerghatta Zoo'],
  },
  {
    name: 'Delhi',
    region: 'National Capital Territory',
    country: 'India',
    category: 'Historic Capital & Street Gastronomy',
    popularSpots: ['India Gate', 'Red Fort', 'Qutub Minar', 'Lotus Temple'],
  },
  {
    name: 'Jaipur',
    region: 'Rajasthan',
    country: 'India',
    category: 'The Pink City & Regal Forts',
    popularSpots: ['Hawa Mahal', 'Amber Palace', 'City Palace', 'Jantar Mantar'],
  },
  {
    name: 'Udaipur',
    region: 'Rajasthan',
    country: 'India',
    category: 'City of Lakes & Romantic Palaces',
    popularSpots: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Fateh Sagar Lake'],
  },
  {
    name: 'Kerala',
    region: 'South India',
    country: 'India',
    category: "God's Own Country & Backwaters",
    popularSpots: ['Alleppey Houseboats', 'Fort Kochi', 'Munnar Hills', 'Varkala Cliff'],
  },
  {
    name: 'Varanasi',
    region: 'Uttar Pradesh',
    country: 'India',
    category: 'Sacred River Ghats & Spiritual Heritage',
    popularSpots: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Assi Ghat', 'Sarnath'],
  },
  {
    name: 'Agra',
    region: 'Uttar Pradesh',
    country: 'India',
    category: 'Mughal Architecture & World Wonder',
    popularSpots: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
  },
  {
    name: 'Kolkata',
    region: 'West Bengal',
    country: 'India',
    category: 'Cultural Capital & Colonial Architecture',
    popularSpots: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple', 'Park Street'],
  },
  {
    name: 'Chennai',
    region: 'Tamil Nadu',
    country: 'India',
    category: 'Coastal Gateway & Carnatic Culture',
    popularSpots: ['Marina Beach', 'Kapaleeshwarar Temple', 'San Thome Basilica', 'Guindy Park'],
  },
  {
    name: 'Hyderabad',
    region: 'Telangana',
    country: 'India',
    category: 'City of Pearls, Nizam Forts & Biryani',
    popularSpots: ['Charminar', 'Golconda Fort', 'Hussain Sagar Lake', 'Ramoji Film City'],
  },
  {
    name: 'Pune',
    region: 'Maharashtra',
    country: 'India',
    category: 'Oxford of the East & Maratha History',
    popularSpots: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Osho Garden'],
  },
  {
    name: 'Ooty',
    region: 'Tamil Nadu',
    country: 'India',
    category: 'Nilgiri Mountain Views & Toy Train',
    popularSpots: ['Botanical Gardens', 'Ooty Lake', 'Doddabetta Peak', 'Rose Garden'],
  },
  {
    name: 'Shimla',
    region: 'Himachal Pradesh',
    country: 'India',
    category: 'Colonial Hill Station & Snowy Ridges',
    popularSpots: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri Snow Point'],
  },
  {
    name: 'Rishikesh',
    region: 'Uttarakhand',
    country: 'India',
    category: 'Yoga Capital & River Rafting',
    popularSpots: ['Laxman Jhula', 'Triveni Ghat Aarti', 'Beatles Ashram', 'Shivpuri Rafting'],
  },
  {
    name: 'Amritsar',
    region: 'Punjab',
    country: 'India',
    category: 'Sacred Shrines & Border Patriotism',
    popularSpots: ['Golden Temple', 'Wagah Border Ceremony', 'Jallianwala Bagh'],
  },
  {
    name: 'Srinagar',
    region: 'Jammu & Kashmir',
    country: 'India',
    category: 'Dal Lake Shikaras & Mughal Gardens',
    popularSpots: ['Dal Lake Houseboat', 'Shalimar Bagh', 'Nishat Bagh', 'Shankaracharya Temple'],
  },
  {
    name: 'Leh Ladakh',
    region: 'Ladakh',
    country: 'India',
    category: 'High Altitude Passes & Monasteries',
    popularSpots: ['Pangong Tso', 'Nubra Valley', 'Khardung La Pass', 'Thiksey Monastery'],
  },
  {
    name: 'Andaman Islands',
    region: 'Andaman & Nicobar',
    country: 'India',
    category: 'Turquoise Waters & Scuba Diving',
    popularSpots: ['Radhanagar Beach', 'Cellular Jail', 'Elephant Beach', 'Ross Island'],
  },
  {
    name: 'Pondicherry',
    region: 'Puducherry',
    country: 'India',
    category: 'French Quarter & Bohemian Promenades',
    popularSpots: ['White Town Promenade', 'Auroville', 'Paradise Beach', 'French War Memorial'],
  },
  {
    name: 'Hampi',
    region: 'Karnataka',
    country: 'India',
    category: 'Vijayanagara Ruins & Boulder Landscapes',
    popularSpots: ['Virupaksha Temple', 'Vittala Stone Chariot', 'Lotus Mahal', 'Matanga Hill'],
  },
  {
    name: 'Gokarna',
    region: 'Karnataka',
    country: 'India',
    category: 'Serene Beaches & Cliff Treks',
    popularSpots: ['Om Beach', 'Kudle Beach', 'Mahabaleshwar Temple', 'Half Moon Beach'],
  },
  {
    name: 'Coorg',
    region: 'Karnataka',
    country: 'India',
    category: 'Coffee Estates & Mist-Clad Valleys',
    popularSpots: ['Abbey Falls', 'Raja Seat', 'Dubare Elephant Camp', 'Namdroling Monastery'],
  },

  // Top International Destinations
  {
    name: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    category: 'The City of Lights & Fine Arts',
    popularSpots: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'],
  },
  {
    name: 'Tokyo',
    region: 'Kanto',
    country: 'Japan',
    category: 'Futuristic Skyline & Ancient Shrines',
    popularSpots: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Meiji Shrine'],
  },
  {
    name: 'Dubai',
    region: 'Emirate of Dubai',
    country: 'United Arab Emirates',
    category: 'Modern Skyscrapers & Desert Safari',
    popularSpots: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Marina'],
  },
  {
    name: 'Singapore',
    region: 'Southeast Asia',
    country: 'Singapore',
    category: 'Futuristic Gardens & Global Dining',
    popularSpots: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Changi Jewel'],
  },
  {
    name: 'Bangkok',
    region: 'Central Thailand',
    country: 'Thailand',
    category: 'Golden Temples & Floating Markets',
    popularSpots: ['Grand Palace', 'Wat Arun', 'Chatuchak Weekend Market', 'Khao San Road'],
  },
  {
    name: 'Phuket',
    region: 'Southern Thailand',
    country: 'Thailand',
    category: 'Tropical Islands & Night Markets',
    popularSpots: ['Patong Beach', 'Phi Phi Islands Tour', 'Big Buddha Phuket', 'Old Phuket Town'],
  },
  {
    name: 'Bali',
    region: 'Lesser Sunda Islands',
    country: 'Indonesia',
    category: 'Island of the Gods & Beach Clubs',
    popularSpots: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Uluwatu Cliff', 'Tegallalang Terraces'],
  },
  {
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    category: 'Royal Heritage & World-Class Theatres',
    popularSpots: ['Big Ben & Westminster', 'Tower of London', 'British Museum', 'London Eye'],
  },
  {
    name: 'New York',
    region: 'New York State',
    country: 'United States',
    category: 'The Big Apple & Broadway Lights',
    popularSpots: ['Times Square', 'Central Park', 'Empire State Building', 'Statue of Liberty'],
  },
  {
    name: 'Rome',
    region: 'Lazio',
    country: 'Italy',
    category: 'The Eternal City & Roman Colosseum',
    popularSpots: ['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Pantheon'],
  },
  {
    name: 'Barcelona',
    region: 'Catalonia',
    country: 'Spain',
    category: "Gaudí's Masterpieces & Mediterranean Beaches",
    popularSpots: ['Sagrada Família', 'Park Güell', 'La Rambla', 'Gothic Quarter'],
  },
  {
    name: 'Amsterdam',
    region: 'North Holland',
    country: 'Netherlands',
    category: 'Historic Canals & Art Masters',
    popularSpots: ['Rijksmuseum', 'Van Gogh Museum', 'Anne Frank House', 'Canal Ring Cruise'],
  },
  {
    name: 'Istanbul',
    region: 'Marmara',
    country: 'Turkey',
    category: 'Crossroads of Europe & Asia',
    popularSpots: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus Cruise'],
  },
  {
    name: 'Sydney',
    region: 'New South Wales',
    country: 'Australia',
    category: 'Harbour Icons & Golden Beaches',
    popularSpots: ['Sydney Opera House', 'Sydney Harbour Bridge', 'Bondi Beach', 'Taronga Zoo'],
  },
  {
    name: 'Seoul',
    region: 'Seoul Capital Area',
    country: 'South Korea',
    category: 'K-Culture, Palaces & Street Food',
    popularSpots: ['Gyeongbokgung Palace', 'Myeongdong Night Market', 'N Seoul Tower', 'Bukchon Hanok'],
  },
  {
    name: 'Zurich',
    region: 'Canton of Zurich',
    country: 'Switzerland',
    category: 'Alpine Lakes & Swiss Clockwork',
    popularSpots: ['Lake Zurich', 'Old Town (Altstadt)', 'Uetliberg Mountain', 'Bahnhofstrasse'],
  },
];

/**
 * Searches destinations with prioritized prefix matching.
 * E.g., searching "m" ranks Mumbai, Mangalore, Mysore, Malaysia, Manali first!
 */
export function searchDestinations(query: string, limit: number = 8): DestinationOption[] {
  const clean = query.trim().toLowerCase();

  if (!clean) {
    // Return curated popular suggestions when empty
    return POPULAR_DESTINATIONS.slice(0, limit);
  }

  // 1. Exact prefix match on name (e.g. "m" -> "Mumbai", "Mangalore", "Mysore", "Malaysia")
  const prefixNameMatches = POPULAR_DESTINATIONS.filter((item) =>
    item.name.toLowerCase().startsWith(clean)
  );

  // 2. Substring match on name (not prefix)
  const substringNameMatches = POPULAR_DESTINATIONS.filter(
    (item) =>
      !item.name.toLowerCase().startsWith(clean) &&
      item.name.toLowerCase().includes(clean)
  );

  // 3. Match on region or country
  const regionCountryMatches = POPULAR_DESTINATIONS.filter(
    (item) =>
      !item.name.toLowerCase().includes(clean) &&
      (item.region.toLowerCase().includes(clean) ||
        item.country.toLowerCase().includes(clean) ||
        item.category.toLowerCase().includes(clean))
  );

  const combined = [
    ...prefixNameMatches,
    ...substringNameMatches,
    ...regionCountryMatches,
  ];

  return combined.slice(0, limit);
}
