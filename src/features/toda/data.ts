import { IconCloudRain, IconMoon, IconCalendarEvent, IconCar } from '@tabler/icons-react';

export interface SpecialTripSetting {
  id: string;
  name: string;
  isActive: boolean;
  multiplier: number;
  description: string;
  icon: any;
  color: string;
}

export interface TodaLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Toda {
  id: string;
  name: string;
  code: string;
  location: TodaLocation;
  baseFare: number;
  perKilometerRate: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  memberCount: number;
  specialTrips: SpecialTripSetting[];
  contactInfo: {
    contactPerson: string;
    phoneNumber: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Default special trip settings that can be customized by each TODA
export const defaultSpecialTripSettings: SpecialTripSetting[] = [
  {
    id: 'rain',
    name: 'Rainy Weather',
    isActive: true,
    multiplier: 1.2,
    description: 'Additional fare during heavy rain for driver safety and effort',
    icon: IconCloudRain,
    color: 'blue'
  },
  {
    id: 'night',
    name: 'Night Trip',
    isActive: true,
    multiplier: 1.3,
    description: 'Additional fare for trips between 10:00 PM and 5:00 AM',
    icon: IconMoon,
    color: 'indigo'
  },
  {
    id: 'holiday',
    name: 'Holiday Trip',
    isActive: true,
    multiplier: 1.5,
    description: 'Additional fare during public holidays',
    icon: IconCalendarEvent,
    color: 'red'
  },
  {
    id: 'traffic',
    name: 'Heavy Traffic',
    isActive: false,
    multiplier: 1.2,
    description: 'Additional fare during rush hours or heavy traffic situations',
    icon: IconCar,
    color: 'orange'
  }
];

// Mock data for different TODAs
export const todas: Toda[] = [
  {
    id: 'toda-001',
    name: 'Tuguegarao City Central TODA',
    code: 'TCCT',
    location: {
      id: 'loc-001',
      name: 'Tuguegarao City Central Terminal',
      address: 'Luna St, Centro',
      city: 'Tuguegarao City',
      province: 'Cagayan',
      coordinates: {
        lat: 17.615756,
        lng: 121.726208
      }
    },
    baseFare: 30.00,
    perKilometerRate: 8.50,
    status: 'Active',
    memberCount: 45,
    specialTrips: [
      {
        ...defaultSpecialTripSettings[0],
        multiplier: 1.3 // Customized multiplier
      },
      ...defaultSpecialTripSettings.slice(1)
    ],
    contactInfo: {
      contactPerson: 'Eduardo Santos',
      phoneNumber: '+63 915 123 4567',
      email: 'tcct_toda@gmail.com'
    },
    createdAt: '2022-03-15T08:00:00Z',
    updatedAt: '2023-10-25T14:30:00Z'
  },
  {
    id: 'toda-002',
    name: 'Metro Tuguegarao TODA',
    code: 'MTUG',
    location: {
      id: 'loc-002',
      name: 'Metro Tuguegarao Terminal',
      address: 'Buntun Highway',
      city: 'Tuguegarao City',
      province: 'Cagayan',
      coordinates: {
        lat: 17.603428,
        lng: 121.715635
      }
    },
    baseFare: 25.00,
    perKilometerRate: 7.50,
    status: 'Active',
    memberCount: 38,
    specialTrips: defaultSpecialTripSettings,
    contactInfo: {
      contactPerson: 'Ricardo Mendoza',
      phoneNumber: '+63 917 234 5678',
      email: 'metro_tug_toda@gmail.com'
    },
    createdAt: '2022-05-10T09:15:00Z',
    updatedAt: '2023-11-05T10:45:00Z'
  },
  {
    id: 'toda-003',
    name: 'Caritan Norte TODA',
    code: 'CNTA',
    location: {
      id: 'loc-003',
      name: 'Caritan Norte Terminal',
      address: 'Caritan Norte',
      city: 'Tuguegarao City',
      province: 'Cagayan',
      coordinates: {
        lat: 17.634901,
        lng: 121.729482
      }
    },
    baseFare: 20.00,
    perKilometerRate: 6.50,
    status: 'Active',
    memberCount: 25,
    specialTrips: [
      ...defaultSpecialTripSettings.slice(0, 2),
      {
        ...defaultSpecialTripSettings[2],
        multiplier: 1.4
      },
      {
        ...defaultSpecialTripSettings[3],
        isActive: true
      }
    ],
    contactInfo: {
      contactPerson: 'Fernando Bautista',
      phoneNumber: '+63 919 345 6789',
      email: 'caritannorte_toda@gmail.com'
    },
    createdAt: '2022-06-20T10:30:00Z',
    updatedAt: '2023-10-18T16:20:00Z'
  },
  {
    id: 'toda-004',
    name: 'Pengue-Ruyu TODA',
    code: 'PRTA',
    location: {
      id: 'loc-004',
      name: 'Pengue-Ruyu Terminal',
      address: 'Pengue-Ruyu',
      city: 'Tuguegarao City',
      province: 'Cagayan',
      coordinates: {
        lat: 17.611841,
        lng: 121.739095
      }
    },
    baseFare: 22.00,
    perKilometerRate: 7.00,
    status: 'Inactive',
    memberCount: 15,
    specialTrips: [
      {
        ...defaultSpecialTripSettings[0],
        isActive: false
      },
      {
        ...defaultSpecialTripSettings[1],
        multiplier: 1.4
      },
      defaultSpecialTripSettings[2],
      defaultSpecialTripSettings[3]
    ],
    contactInfo: {
      contactPerson: 'Antonio Reyes',
      phoneNumber: '+63 918 456 7890',
      email: 'pengueruyu_toda@gmail.com'
    },
    createdAt: '2022-08-05T11:45:00Z',
    updatedAt: '2023-09-12T13:10:00Z'
  },
  {
    id: 'toda-005',
    name: 'Cataggaman TODA',
    code: 'CTGM',
    location: {
      id: 'loc-005',
      name: 'Cataggaman Terminal',
      address: 'Cataggaman Nuevo',
      city: 'Tuguegarao City',
      province: 'Cagayan',
      coordinates: {
        lat: 17.595263,
        lng: 121.733301
      }
    },
    baseFare: 25.00,
    perKilometerRate: 7.50,
    status: 'Active',
    memberCount: 30,
    specialTrips: defaultSpecialTripSettings,
    contactInfo: {
      contactPerson: 'Manuel Garcia',
      phoneNumber: '+63 916 567 8901',
      email: 'cataggaman_toda@gmail.com'
    },
    createdAt: '2022-09-15T14:00:00Z',
    updatedAt: '2023-11-10T09:30:00Z'
  }
]; 