import { delay } from '@/constants/mock-api';
import { PickupZones } from '@/features/overview/components/pickup-zones';

export default async function PickupZonePage() {
  await delay(1000);
  return <PickupZones />;
} 