import { Driver, TodaMembership } from '../types';

// Unified driver database that works for both driver management and TODA member management
export const unifiedDrivers: Driver[] = [
  {
    id: 'member-001',
    name: 'Eduardo Santos',
    email: 'eduardo@example.com',
    phone: '+63 915 123 4567',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-001',
    licenseNumber: 'LIC-2022-00154',
    rating: 4.8,
    totalTrips: 165,
    avatar: '/avatars/01.png',
    joinedDate: '2022-03-15T08:00:00Z',
    todaInfo: [
      {
        todaId: 'toda-001',
        todaName: 'Tuguegarao City Central TODA',
        role: 'President',
        joinedDate: '2022-03-15T08:00:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-002',
    name: 'Rafael Domingo',
    email: 'rafael@example.com',
    phone: '+63 917 234 5678',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-002',
    licenseNumber: 'LIC-2022-00165',
    rating: 4.7,
    totalTrips: 142,
    avatar: '/avatars/02.png',
    joinedDate: '2022-03-16T09:30:00Z',
    todaInfo: [
      {
        todaId: 'toda-001',
        todaName: 'Tuguegarao City Central TODA',
        role: 'Vice President',
        joinedDate: '2022-03-16T09:30:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-003',
    name: 'Maria Reyes',
    email: 'maria@example.com',
    phone: '+63 919 345 6789',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-003',
    licenseNumber: 'LIC-2022-00172',
    rating: 4.9,
    totalTrips: 138,
    avatar: '/avatars/03.png',
    joinedDate: '2022-03-18T10:15:00Z',
    todaInfo: [
      {
        todaId: 'toda-001',
        todaName: 'Tuguegarao City Central TODA',
        role: 'Secretary',
        joinedDate: '2022-03-18T10:15:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-004',
    name: 'Jose Tomas',
    email: 'jose@example.com',
    phone: '+63 918 456 7890',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-004',
    licenseNumber: 'LIC-2022-00189',
    rating: 4.6,
    totalTrips: 115,
    avatar: '/avatars/04.png',
    joinedDate: '2022-03-20T11:00:00Z',
    todaInfo: [
      {
        todaId: 'toda-001',
        todaName: 'Tuguegarao City Central TODA',
        role: 'Treasurer',
        joinedDate: '2022-03-20T11:00:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-005',
    name: 'Carlos Villegas',
    email: 'carlos@example.com',
    phone: '+63 916 567 8901',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-005',
    licenseNumber: 'LIC-2022-00205',
    rating: 4.7,
    totalTrips: 98,
    avatar: '/avatars/05.png',
    joinedDate: '2022-04-05T08:30:00Z',
    todaInfo: [
      {
        todaId: 'toda-001',
        todaName: 'Tuguegarao City Central TODA',
        role: 'Member',
        joinedDate: '2022-04-05T08:30:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-006',
    name: 'Ricardo Mendoza',
    email: 'ricardo@example.com',
    phone: '+63 917 234 5678',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-006',
    licenseNumber: 'LIC-2022-00228',
    rating: 4.8,
    totalTrips: 175,
    avatar: '/avatars/06.png',
    joinedDate: '2022-05-10T09:15:00Z',
    todaInfo: [
      {
        todaId: 'toda-002',
        todaName: 'Metro Tuguegarao TODA',
        role: 'President',
        joinedDate: '2022-05-10T09:15:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-007',
    name: 'Antonio Bautista',
    email: 'antonio@example.com',
    phone: '+63 919 876 5432',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-007',
    licenseNumber: 'LIC-2022-00243',
    rating: 4.6,
    totalTrips: 132,
    avatar: '/avatars/07.png',
    joinedDate: '2022-05-12T14:20:00Z',
    todaInfo: [
      {
        todaId: 'toda-002',
        todaName: 'Metro Tuguegarao TODA',
        role: 'Vice President',
        joinedDate: '2022-05-12T14:20:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-008',
    name: 'Sofia Cruz',
    email: 'sofia@example.com',
    phone: '+63 915 765 4321',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-008',
    licenseNumber: 'LIC-2022-00257',
    rating: 4.7,
    totalTrips: 125,
    avatar: '/avatars/08.png',
    joinedDate: '2022-05-15T10:30:00Z',
    todaInfo: [
      {
        todaId: 'toda-002',
        todaName: 'Metro Tuguegarao TODA',
        role: 'Secretary',
        joinedDate: '2022-05-15T10:30:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-011',
    name: 'Fernando Bautista',
    email: 'fernando@example.com',
    phone: '+63 919 345 6789',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-011',
    licenseNumber: 'LIC-2022-00325',
    rating: 4.9,
    totalTrips: 185,
    avatar: '/avatars/11.png',
    joinedDate: '2022-06-20T10:30:00Z',
    todaInfo: [
      {
        todaId: 'toda-003',
        todaName: 'Caritan Norte TODA',
        role: 'President',
        joinedDate: '2022-06-20T10:30:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-012',
    name: 'Luisa Garcia',
    email: 'luisa@example.com',
    phone: '+63 917 456 7890',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-012',
    licenseNumber: 'LIC-2022-00336',
    rating: 4.7,
    totalTrips: 145,
    avatar: '/avatars/12.png',
    joinedDate: '2022-06-22T11:15:00Z',
    todaInfo: [
      {
        todaId: 'toda-003',
        todaName: 'Caritan Norte TODA',
        role: 'Vice President',
        joinedDate: '2022-06-22T11:15:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-016',
    name: 'Antonio Reyes',
    email: 'areyes@example.com',
    phone: '+63 918 456 7890',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-016',
    licenseNumber: 'LIC-2022-00412',
    rating: 4.6,
    totalTrips: 110,
    avatar: '/avatars/16.png',
    joinedDate: '2022-08-05T11:45:00Z',
    todaInfo: [
      {
        todaId: 'toda-004',
        todaName: 'Pengue-Ruyu TODA',
        role: 'President',
        joinedDate: '2022-08-05T11:45:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-017',
    name: 'Gloria Tan',
    email: 'gloria@example.com',
    phone: '+63 915 567 8901',
    status: 'Inactive',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-017',
    licenseNumber: 'LIC-2022-00423',
    rating: 4.3,
    totalTrips: 87,
    avatar: '/avatars/17.png',
    joinedDate: '2022-08-10T13:30:00Z',
    todaInfo: [
      {
        todaId: 'toda-004',
        todaName: 'Pengue-Ruyu TODA',
        role: 'Secretary',
        joinedDate: '2022-08-10T13:30:00Z',
        status: 'Inactive'
      }
    ]
  },
  {
    id: 'member-021',
    name: 'Manuel Garcia',
    email: 'manuel@example.com',
    phone: '+63 916 567 8901',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-021',
    licenseNumber: 'LIC-2022-00510',
    rating: 4.8,
    totalTrips: 172,
    avatar: '/avatars/21.png',
    joinedDate: '2022-09-15T14:00:00Z',
    todaInfo: [
      {
        todaId: 'toda-005',
        todaName: 'Cataggaman TODA',
        role: 'President',
        joinedDate: '2022-09-15T14:00:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-022',
    name: 'Teresa Lim',
    email: 'teresa@example.com',
    phone: '+63 919 678 9012',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-022',
    licenseNumber: 'LIC-2022-00527',
    rating: 4.7,
    totalTrips: 128,
    avatar: '/avatars/22.png',
    joinedDate: '2022-09-18T15:45:00Z',
    todaInfo: [
      {
        todaId: 'toda-005',
        todaName: 'Cataggaman TODA',
        role: 'Vice President',
        joinedDate: '2022-09-18T15:45:00Z',
        status: 'Active'
      }
    ]
  },
  {
    id: 'member-023',
    name: 'Roberto Cruz',
    email: 'roberto@example.com',
    phone: '+63 917 789 0123',
    status: 'Active',
    vehicleType: 'Tricycle',
    licensePlate: 'TRI-023',
    licenseNumber: 'LIC-2022-00535',
    rating: 4.6,
    totalTrips: 118,
    avatar: '/avatars/23.png',
    joinedDate: '2022-09-20T10:15:00Z',
    todaInfo: [
      {
        todaId: 'toda-005',
        todaName: 'Cataggaman TODA',
        role: 'Treasurer',
        joinedDate: '2022-09-20T10:15:00Z',
        status: 'Active'
      }
    ]
  }
];

// Helper functions to work with the unified driver data

/**
 * Get all drivers (for driver management page)
 */
export function getAllDrivers(): Driver[] {
  return unifiedDrivers;
}

/**
 * Get a specific driver by ID
 */
export function getDriverById(driverId: string): Driver | undefined {
  return unifiedDrivers.find(driver => driver.id === driverId);
}

/**
 * Get all members of a specific TODA
 */
export function getTodaMembers(todaId: string) {
  return unifiedDrivers
    .filter(driver => driver.todaInfo?.some(toda => toda.todaId === todaId))
    .map(driver => {
      const todaInfo = driver.todaInfo?.find(toda => toda.todaId === todaId);
      
      return {
        driver,
        role: todaInfo?.role || 'Member',
        joinedDate: todaInfo?.joinedDate || driver.joinedDate,
        status: todaInfo?.status || driver.status
      };
    });
}

/**
 * Get all members with a specific role in a TODA
 */
export function getTodaMembersByRole(todaId: string, role: string) {
  return getTodaMembers(todaId).filter(member => member.role === role);
}

/**
 * Get the president of a TODA
 */
export function getTodaPresident(todaId: string) {
  return getTodaMembers(todaId).find(member => member.role === 'President');
} 