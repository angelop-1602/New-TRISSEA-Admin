import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { format } from 'date-fns';
import { drivers } from '@/features/drivers/data';

// Dummy data for current/recent trips
const recentTrips = [
  {
    id: 'T1001',
    status: 'In Progress',
    pickupLocation: 'SM City Tuguegarao',
    dropoffLocation: 'Cagayan State University',
    pickupTime: new Date(),
    passengerName: 'Maria Santos',
    passengerPhone: '+63 912 345 6789',
    fare: 120.00,
    distance: '3.2 km',
    estimatedTime: '12 min'
  },
  {
    id: 'T1000',
    status: 'Completed',
    pickupLocation: 'Robinsons Place Tuguegarao',
    dropoffLocation: 'Metro Tuguegarao',
    pickupTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    passengerName: 'Juan Cruz',
    passengerPhone: '+63 923 456 7890',
    fare: 85.00,
    distance: '2.1 km',
    estimatedTime: '8 min',
    rating: 5
  },
  {
    id: 'T999',
    status: 'Cancelled',
    pickupLocation: 'Tuguegarao City Hall',
    dropoffLocation: 'Tuguegarao Airport',
    pickupTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    passengerName: 'Pedro Reyes',
    passengerPhone: '+63 934 567 8901',
    fare: 150.00,
    distance: '4.5 km',
    estimatedTime: '15 min',
    cancelReason: 'Passenger requested cancellation'
  }
];

export default function RecentTrips({
  params
}: {
  params: { id: string };
}) {
  const driver = drivers.find(d => d.id === params.id);
  
  if (!driver) {
    return null;
  }

  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTrips.map((trip) => (
            <Card key={trip.id} className={`border ${trip.status === 'In Progress' ? 'border-primary' : 'border-border'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold">Trip #{trip.id}</span>
                    <Badge 
                      className="ml-2" 
                      variant={
                        trip.status === 'In Progress' ? 'default' : 
                        trip.status === 'Completed' ? 'secondary' : 'destructive'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(trip.pickupTime, 'h:mm a')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.pin className="h-4 w-4 text-primary" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Pickup</div>
                        <div className="text-sm">{trip.pickupLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.store className="h-4 w-4 text-primary" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Dropoff</div>
                        <div className="text-sm">{trip.dropoffLocation}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.phone className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Passenger</div>
                        <div className="text-sm">{trip.passengerName}</div>
                        <div className="text-xs text-muted-foreground">{trip.passengerPhone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.billing className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Fare</div>
                        <div className="text-sm">₱{trip.fare.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{trip.distance} • {trip.estimatedTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {trip.status === 'Completed' && trip.rating && (
                  <div className="mt-3 pt-3 border-t flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Rating:</span>
                    <div className="flex items-center">
                      {Array(trip.rating).fill(0).map((_, i) => (
                        <Icons.star key={i} className="h-4 w-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                )}
                
                {trip.status === 'Cancelled' && trip.cancelReason && (
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-sm text-muted-foreground">Reason: </span>
                    <span className="text-sm">{trip.cancelReason}</span>
                  </div>
                )}
                
                {trip.status === 'In Progress' && (
                  <div className="mt-3 pt-3 border-t flex justify-end">
                    <Button size="sm" variant="outline">View Live Trip</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 