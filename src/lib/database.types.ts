// src/lib/database.types.ts

export type UUID = string; // Alias for UUID type

// Profile Table Structure
export interface Profile {
  id: UUID; // references auth.users primary key
  full_name?: string | null;
  user_type: 'planner' | 'vendor' | 'venue_manager';
  email?: string | null;
  location?: string | null;
  created_at: Date;
  business_name?: string;
  service_type?: string;
}

// Venues Table Structure
export interface Venue {
  id: UUID;
  name: string;
  description?: string | null;
  capacity?: number | null;
  location?: string | null;
  amenities?: string[] | null; // Array of amenities as strings
  images?: string[] | null; // Array of image URLs
  price_range?: number | null; // Decimal stored as a number
  manager_id: UUID; // Foreign key referencing Profile.id
  created_at: Date;
}

// Bookings Table Structure
export interface Booking {
  id: UUID;
  venue_id: UUID; // Foreign key referencing Venue.id
  planner_id: UUID; // Foreign key referencing Profile.id (planner)
  event_date: Date;
  guest_count: number;
  status: 'pending' | 'confirmed' | 'canceled'; // Possible booking statuses
  layout_data?: Record<string, any>; // JSONB type, flexible structure
  created_at: Date;
}

// Vendors Table Structure
export interface Vendor {
  id: UUID;
  profile_id: UUID; // Foreign key referencing Profile.id
  business_name: string;
  service_type?: string | null;
  description?: string | null;
  location?: string | null;
  is_verified: boolean;
  created_at: Date;
}

// Messages Table Structure
export interface Message {
  id: UUID;
  sender_id: UUID; // Foreign key referencing Profile.id
  receiver_id: UUID; // Foreign key referencing Profile.id
  content: string;
  read: boolean;
  created_at: Date;
}

// Main Database Schema Interface
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
      };
      venues: {
        Row: Venue;
      };
      bookings: {
        Row: Booking;
      };
      vendors: {
        Row: Vendor;
      };
      messages: {
        Row: Message;
      };
    };
  };
}
