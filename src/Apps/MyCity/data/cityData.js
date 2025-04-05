import { CityOverview, LocalAttraction, EmergencyService, NewsEvent, Business, Transport } from '../models/CityData';

export const cityOverview = {
  description: "Sojat City is a significant commercial center in Rajasthan, India, famous for its mehendi (henna) production and processing. It's known as the world's largest mehendi manufacturing hub.",
  population: "65,000+",
  climate: "Hot semi-arid climate with very hot summers and mild winters",
  mainIndustries: [
    "Mehendi (Henna) Processing",
    "Agriculture",
    "Oil Mills",
    "Textile Trading",
    "Marble Industry"
  ],
  famousFor: [
    "World's largest mehendi mandi",
    "Sojat Mehendi (GI Tagged)",
    "Agricultural produce",
    "Traditional handicrafts",
    "Historical temples"
  ],
  landmarks: [
    "Sojat Fort",
    "Mehendi Mandi",
    "Ancient Temples",
    "Sukanya Mata Temple",
    "Industrial Area"
  ]
};

export const localAttractions = [
  {
    id: 1,
    name: "Sojat Fort",
    description: "Historical fort showcasing Rajasthani architecture and offering panoramic views of the city",
    image: "https://api.a0.dev/assets/image?text=ancient%20fort%20in%20Sojat%20City%20Rajasthan%20with%20traditional%20architecture&aspect=16:9",
    distance: "1.5 km from center",
    rating: 4.5,
    type: "Historical"
  },
  {
    id: 2,
    name: "Mehendi Mandi",
    description: "World's largest mehendi trading market, where you can witness the processing and trading of henna",
    image: "https://api.a0.dev/assets/image?text=busy%20traditional%20market%20with%20mehendi%20trading%20in%20Rajasthan&aspect=16:9",
    distance: "0.5 km from center",
    rating: 4.8,
    type: "Market"
  },
  {
    id: 3,
    name: "Sukanya Mata Temple",
    description: "Ancient temple with beautiful architecture and spiritual significance",
    image: "https://api.a0.dev/assets/image?text=ancient%20temple%20in%20Rajasthan%20with%20intricate%20carvings&aspect=16:9",
    distance: "3 km from center",
    rating: 4.7,
    type: "Religious"
  }
];

export const emergencyServices = [
  {
    id: 1,
    name: "Sojat Government Hospital",
    phone: "02960-222222",
    address: "Main Hospital Road, Sojat City",
    type: "hospital",
    available24x7: true
  },
  {
    id: 2,
    name: "Sojat City Police Station",
    phone: "02960-222111",
    address: "Police Station Road, Sojat City",
    type: "police",
    available24x7: true
  },
  {
    id: 3,
    name: "Fire Station Sojat",
    phone: "02960-222333",
    address: "Industrial Area, Sojat City",
    type: "fire",
    available24x7: true
  }
];

export const newsAndEvents= [
  {
    id: 1,
    title: "Annual Mehendi Festival",
    description: "Three-day celebration of Sojat's famous mehendi industry with cultural programs",
    date: "2025-10-15",
    image: "https://api.a0.dev/assets/image?text=traditional%20mehendi%20festival%20celebration%20in%20Rajasthan&aspect=16:9",
    category: "event"
  },
  {
    id: 2,
    title: "New Industrial Park Announcement",
    description: "Government announces new industrial park development in Sojat City",
    date: "2025-04-10",
    category: "news"
  },
  {
    id: 3,
    title: "Cultural Program at Town Hall",
    description: "Local artists showcase traditional Rajasthani culture",
    date: "2025-04-20",
    category: "event"
  }
];

export const businesses = [
  {
    id: 1,
    name: "Rajasthan Mehendi Processing Unit",
    category: "Manufacturing",
    address: "Industrial Area, Sojat City",
    phone: "02960-223344",
    rating: 4.5,
    openingHours: "9:00 AM - 6:00 PM"
  },
  {
    id: 2,
    name: "Sojat Oil Mills",
    category: "Manufacturing",
    address: "Mill Road, Sojat City",
    phone: "02960-224455",
    rating: 4.3,
    openingHours: "8:00 AM - 8:00 PM"
  },
  {
    id: 3,
    name: "City Market Complex",
    category: "Shopping",
    address: "Main Market, Sojat City",
    phone: "02960-225566",
    rating: 4.6,
    openingHours: "10:00 AM - 9:00 PM"
  }
];

export const transportInfo= [
  {
    id: 1,
    type: "bus",
    route: "Sojat City Bus Stand to Pali",
    schedule: "Every 30 minutes (6 AM - 10 PM)",
    contact: "02960-227788",
    fare: "₹30-50"
  },
  {
    id: 2,
    type: "train",
    route: "Sojat Road Railway Station",
    schedule: "Multiple trains daily to Jodhpur, Jaipur, and Delhi",
    contact: "02960-228899",
    fare: "₹100-1000"
  },
  {
    id: 3,
    type: "taxi",
    contact: "02960-229900",
    fare: "₹10/km (approx)"
  }
];