import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { getDriverById } from '@/features/shared/data/drivers';

// This is a server component, so we can directly use params
export default function DriverProfileInfo({
  params
}: {
  params: { id: string };
}) {
  // For server components, accessing params.id directly is still allowed with a warning
  // In the future, this will need to be updated when Next.js fully enforces the Promise API
  const driver = getDriverById(params.id);

  if (!driver) {
    return null;
  }

  // Get TODA membership information if available
  const todaMembership = driver.todaInfo?.[0];
  
  return (
    <Card className="bg-background/95 shadow-sm overflow-hidden">
      <div className="bg-primary h-24"></div>
      <div className="px-6 pb-6 -mt-12">
        <Avatar className="h-24 w-24 border-4 border-background">
          {driver.avatar ? (
            <AvatarImage src={driver.avatar} alt={driver.name} />
          ) : null}
          <AvatarFallback>{driver.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold mt-4">{driver.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            variant={
              driver.status === 'Active' 
                ? 'default' 
                : driver.status === 'Suspended' 
                  ? 'destructive' 
                  : 'secondary'
            } 
            className="px-3 py-1 rounded-sm">
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
              <div className="text-sm text-muted-foreground">License: {driver.licenseNumber}</div>
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
          {todaMembership && (
            <div className="flex items-start gap-3">
              <Icons.user className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">{todaMembership.todaName}</div>
                <div className="text-sm text-primary">{todaMembership.role}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
} 