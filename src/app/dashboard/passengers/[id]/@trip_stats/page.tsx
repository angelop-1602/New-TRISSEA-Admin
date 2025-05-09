'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { passengers } from '@/features/passengers/data';

export default function PassengerTripStats() {
  const params = useParams();
  const passengerId = params.id as string;
  const passenger = passengers.find(p => p.id === passengerId);

  if (!passenger) return null;

  // Enhanced stats for demonstration
  // In a real application, this would come from the backend
  const enhancedStats = {
    totalTrips: passenger.totalTrips,
    cancellations: Math.floor(passenger.totalTrips * 0.05), // Assuming 5% cancellation rate
    mostFrequentRoute: {
      from: 'Makati City',
      to: 'BGC',
      count: Math.floor(passenger.totalTrips * 0.3) // Assuming 30% of trips are on this route
    }
  };

  return (
    <div className="grid gap-4 grid-cols-3">
      <Card className="bg-background/95 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{enhancedStats.totalTrips}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.clipboard className="h-4 w-4 mr-1" />
            All completed trips
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-background/95 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cancellations</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{enhancedStats.cancellations}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.close className="h-4 w-4 mr-1" />
            {((enhancedStats.cancellations / enhancedStats.totalTrips) * 100).toFixed(1)}% of all trips
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-background/95 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Frequent Route</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{enhancedStats.mostFrequentRoute.count}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.routex className="h-4 w-4 mr-1" />
            {enhancedStats.mostFrequentRoute.from} to {enhancedStats.mostFrequentRoute.to}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 