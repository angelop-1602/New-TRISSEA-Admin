import { delay } from '@/constants/mock-api';
import { TripPerformance } from '@/features/overview/components/trip-performance';

export default async function TripPerformancePage() {
  await delay(3500);
  return <TripPerformance />;
} 