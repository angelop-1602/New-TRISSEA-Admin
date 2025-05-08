import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { drivers } from '@/features/drivers/data';

export default function DriverProfileInfo({
  params
}: {
  params: { id: string };
}) {
  const driver = drivers.find(d => d.id === params.id);

  if (!driver) {
    return null;
  }

  return (
    <Card className="bg-background/95 shadow-sm overflow-hidden">
      <div className="bg-primary h-24"></div>
      <div className="px-6 pb-6 -mt-12">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={driver.avatar} />
          <AvatarFallback>{driver.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold mt-4">{driver.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={driver.status === 'Active' ? 'default' : 'secondary'} className="px-3 py-1 rounded-sm">
            {driver.status}
          </Badge>
          <p className="text-sm text-muted-foreground">Driver ID: {driver.id}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <Icons.car className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">{driver.vehicleType}</div>
              <div className="text-sm text-muted-foreground">{driver.licensePlate}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">{driver.phone}</div>
              <div className="text-sm text-muted-foreground">{driver.email}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.star className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <div className="font-medium">{driver.rating} Rating</div>
              <div className="text-sm text-muted-foreground">Based on {driver.totalTrips} trips</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 