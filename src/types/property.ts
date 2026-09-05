export type ListingType = 'buy' | 'rent';

export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Studio' | 'Duplex' | 'Townhouse';

export interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  agency: string;
  avatar: string;
  rating: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: ListingType; // 'buy' | 'rent'
  propertyType: PropertyType;
  bhk: number; // 1, 2, 3, 4, 5
  bathrooms: number;
  balconies: number;
  areaSqFt: number;
  carpetAreaSqFt: number;
  price: number; // total price for buy (INR), monthly rent for rent (INR)
  location: {
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  images: string[];
  featuredImage: string;
  isVerified: boolean;
  isFeatured: boolean;
  furnishingStatus: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East';
  floorNumber: number;
  totalFloors: number;
  possessionStatus: 'Ready to Move' | 'Under Construction';
  possessionDate: string;
  amenities: string[];
  agent: PropertyAgent;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  listingType: ListingType; // 'buy' | 'rent'
  selectedBhks: number[]; // e.g. [2, 3] or empty for all
  propertyType: string; // 'all' or specific
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
}
