import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import TodayDate from '@/components/ui/time-today'
import { drivers } from '@/features/drivers/data';

// Dummy data for the trips
const tripStats = {
  totalTrips: 156,
  todaysTrips: 4,
  cancelledTrips: 2
};

export default function TripStats({
  params
}: {
  params: { id: string };
}) {
  const driver = drivers.find(d => d.id === params.id);
  
  if (!driver) {
    return null;
  }
  

  return (
    <div className="grid gap-4 grid-cols-3">
      <Card className="bg-background/95 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{tripStats.totalTrips}</div>
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
          <CardTitle className="text-sm font-medium text-muted-foreground">Today's Trips</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{tripStats.todaysTrips}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.calendar className="h-4 w-4 mr-1" />
            <TodayDate/>
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-background/95 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cancellations</CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <div className="text-2xl font-bold">{tripStats.cancelledTrips}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.close className="h-4 w-4 mr-1" />
            Cancelled trips
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 