'use client';

import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { passengers } from '@/features/passengers/data';

export default function PassengerProfileInfo() {
  const params = useParams();
  const passengerId = params.id as string;
  const passenger = passengers.find(p => p.id === passengerId);

  if (!passenger) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="bg-background/95 shadow-sm overflow-hidden">
      <div className="bg-primary h-24"></div>
      <div className="px-6 pb-6 -mt-12">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={passenger.avatar} alt={passenger.name} />
          <AvatarFallback>{getInitials(passenger.name)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold mt-4">{passenger.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={passenger.status === 'Active' ? 'default' : 'secondary'} className="px-3 py-1 rounded-sm">
            {passenger.status}
          </Badge>
          <p className="text-sm text-muted-foreground">Passenger ID: {passenger.id}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <Icons.calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">Joined Date</div>
              <div className="text-sm text-muted-foreground">{passenger.joinedDate}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">{passenger.phone}</div>
              <div className="text-sm text-muted-foreground">{passenger.email}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.star className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <div className="font-medium">{passenger.rating} Rating</div>
              <div className="text-sm text-muted-foreground">Based on {passenger.totalTrips} trips</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 