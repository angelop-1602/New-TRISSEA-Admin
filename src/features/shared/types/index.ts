export type DriverStatus = 'Active' | 'Inactive' | 'Suspended';
export type VehicleType = 'Car' | 'Motorcycle' | 'Tricycle';
export type MemberRole = 'President' | 'Vice President' | 'Secretary' | 'Treasurer' | 'Member';

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: DriverStatus;
  vehicleType: VehicleType;
  licensePlate: string;
  licenseNumber: string;
  rating: number;
  totalTrips: number;
  avatar?: string;
  joinedDate: string;
  todaInfo?: TodaMembership[];
}

export interface TodaMembership {
  todaId: string;
  todaName: string;
  role: MemberRole;
  joinedDate: string;
  status: DriverStatus;
}

export interface TodaDriverMember {
  driver: Driver;
  role: MemberRole;
  joinedDate: string;
  status: DriverStatus;
} 