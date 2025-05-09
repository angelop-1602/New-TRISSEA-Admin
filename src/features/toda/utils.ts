import { Toda, SpecialTripSetting } from './data';

/**
 * Calculate a basic fare based on distance and TODA rates
 */
export function calculateBasicFare(toda: Toda, distanceInKm: number): number {
  const fare = toda.baseFare + (distanceInKm * toda.perKilometerRate);
  return parseFloat(fare.toFixed(2));
}

/**
 * Get all active special trip settings for a TODA
 */
export function getActiveSpecialSettings(toda: Toda): SpecialTripSetting[] {
  return toda.specialTrips.filter(setting => setting.isActive);
}

/**
 * Calculate fare with applied special trip settings
 */
export function calculateFareWithSpecials(
  toda: Toda, 
  distanceInKm: number, 
  appliedSpecialIds: string[]
): { 
  baseFare: number;
  totalFare: number;
  appliedSettings: SpecialTripSetting[];
  breakdown: Array<{ name: string; amount: number }>
} {
  const baseFare = calculateBasicFare(toda, distanceInKm);
  let totalFare = baseFare;
  const appliedSettings: SpecialTripSetting[] = [];
  const breakdown = [{ name: 'Base Fare', amount: baseFare }];

  // Get active special settings that are in the appliedSpecialIds list
  const activeSpecials = toda.specialTrips.filter(
    setting => setting.isActive && appliedSpecialIds.includes(setting.id)
  );

  // Apply each special setting
  activeSpecials.forEach(special => {
    const specialAmount = baseFare * (special.multiplier - 1);
    totalFare += specialAmount;
    appliedSettings.push(special);
    breakdown.push({
      name: special.name,
      amount: parseFloat(specialAmount.toFixed(2))
    });
  });

  return {
    baseFare,
    totalFare: parseFloat(totalFare.toFixed(2)),
    appliedSettings,
    breakdown
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return `₱${amount.toFixed(2)}`;
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return parseFloat((((newValue - oldValue) / oldValue) * 100).toFixed(1));
}

/**
 * Toggle a special trip setting's active state
 */
export function toggleSpecialTripSetting(toda: Toda, settingId: string): Toda {
  const updatedSpecialTrips = toda.specialTrips.map(setting => {
    if (setting.id === settingId) {
      return { ...setting, isActive: !setting.isActive };
    }
    return setting;
  });
  
  return {
    ...toda,
    specialTrips: updatedSpecialTrips,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Update a special trip setting's multiplier
 */
export function updateSpecialTripMultiplier(
  toda: Toda, 
  settingId: string, 
  newMultiplier: number
): Toda {
  // Ensure multiplier is valid (greater than 1.0)
  const safeMultiplier = Math.max(1.01, newMultiplier);
  
  const updatedSpecialTrips = toda.specialTrips.map(setting => {
    if (setting.id === settingId) {
      return { ...setting, multiplier: safeMultiplier };
    }
    return setting;
  });
  
  return {
    ...toda,
    specialTrips: updatedSpecialTrips,
    updatedAt: new Date().toISOString()
  };
} 