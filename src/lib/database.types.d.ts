export type UUID = string;
export interface Profile {
    id: UUID;
    full_name?: string | null;
    user_type: 'planner' | 'vendor' | 'venue_manager';
    email?: string | null;
    location?: string | null;
    created_at: Date;
    business_name?: string;
    service_type?: string;
}
export interface Venue {
    id: UUID;
    name: string;
    description?: string | null;
    capacity?: number | null;
    location?: string | null;
    amenities?: string[] | null;
    images?: string[] | null;
    price_range?: number | null;
    manager_id: UUID;
    created_at: Date;
}
export interface Booking {
    id: UUID;
    venue_id: UUID;
    planner_id: UUID;
    event_date: Date;
    guest_count: number;
    status: 'pending' | 'confirmed' | 'canceled';
    layout_data?: Record<string, any>;
    created_at: Date;
}
export interface Vendor {
    id: UUID;
    profile_id: UUID;
    business_name: string;
    service_type?: string | null;
    description?: string | null;
    location?: string | null;
    is_verified: boolean;
    created_at: Date;
}
export interface Message {
    id: UUID;
    sender_id: UUID;
    receiver_id: UUID;
    content: string;
    read: boolean;
    created_at: Date;
}
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
