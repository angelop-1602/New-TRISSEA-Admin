export type DriverStatus = 'Active' | 'Inactive';
export type VehicleType = 'Car' | 'Motorcycle';

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: DriverStatus;
  vehicleType: VehicleType;
  licensePlate: string;
  rating: number;
  totalTrips: number;
  avatar: string;
} 