import { getAllDrivers } from '@/features/shared/data/drivers';
import { Driver } from '@/features/shared/types';

// Export the unified drivers data for backward compatibility
export const drivers: Driver[] = getAllDrivers(); 