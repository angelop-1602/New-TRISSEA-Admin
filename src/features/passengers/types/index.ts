export type PassengerStatus = 'Active' | 'Inactive';

export interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: PassengerStatus;
  totalTrips: number;
  rating: number;
  joinedDate: string;
  avatar: string;
} 