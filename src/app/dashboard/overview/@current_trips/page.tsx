import { delay } from '@/constants/mock-api';
import CurrentTrips from '@/features/overview/components/current-trips';

export default async function CurrentTripsPage() {
  await delay(3000);
  return <CurrentTrips />;
} 