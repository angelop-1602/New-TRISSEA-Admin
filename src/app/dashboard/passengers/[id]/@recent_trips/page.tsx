'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Icons } from '@/components/icons';
import { format, addMinutes } from 'date-fns';
import { passengers } from '@/features/passengers/data';

// Define trip type for better type safety
interface Trip {
  id: string;
  status: 'In Progress' | 'Completed' | 'Cancelled';
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: Date;
  dropoffTime?: Date;
  cancelTime?: Date;
  driverName: string;
  driverPhone: string;
  fare: number;
  distance: string;
  estimatedTime: string;
  rating?: number;
  cancelReason?: string;
}

export default function PassengerRecentTrips() {
  const params = useParams();
  const passengerId = params.id as string;
  const passenger = passengers.find(p => p.id === passengerId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (!passenger) return null;

  // Sample trips data for demonstration
  const recentTrips: Trip[] = [
    {
      id: 'T1001',
      status: 'In Progress',
      pickupLocation: 'SM City Makati',
      dropoffLocation: 'Bonifacio Global City',
      pickupTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      driverName: 'John Doe',
      driverPhone: '+63 912 345 6789',
      fare: 180.00,
      distance: '4.5 km',
      estimatedTime: '15 min'
    },
    {
      id: 'T1000',
      status: 'Completed',
      pickupLocation: 'Glorietta Mall',
      dropoffLocation: 'Rockwell Center',
      pickupTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      dropoffTime: new Date(Date.now() - 1 * 60 * 60 * 45 * 1000), // 1 hour 45 minutes ago
      driverName: 'Mike Johnson',
      driverPhone: '+63 923 456 7890',
      fare: 120.00,
      distance: '3.2 km',
      estimatedTime: '12 min',
      rating: 5
    },
    {
      id: 'T999',
      status: 'Cancelled',
      pickupLocation: 'Greenbelt Mall',
      dropoffLocation: 'Ayala Museum',
      pickupTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      cancelTime: new Date(Date.now() - 5 * 60 * 60 * 1000 + 3 * 60 * 1000), // 5 hours ago + 3 minutes
      driverName: 'Sarah Wilson',
      driverPhone: '+63 934 567 8901',
      fare: 90.00,
      distance: '2.5 km',
      estimatedTime: '10 min',
      cancelReason: 'Passenger requested cancellation'
    },
    {
      id: 'T998',
      status: 'Completed',
      pickupLocation: 'Mall of Asia',
      dropoffLocation: 'Makati CBD',
      pickupTime: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      dropoffTime: new Date(Date.now() - 7 * 60 * 60 * 30 * 1000), // 7 hours 30 minutes ago
      driverName: 'Robert Chen',
      driverPhone: '+63 945 678 9012',
      fare: 250.00,
      distance: '7.8 km',
      estimatedTime: '25 min',
      rating: 4
    },
    {
      id: 'T997',
      status: 'Completed',
      pickupLocation: 'Trinoma Mall',
      dropoffLocation: 'UP Diliman',
      pickupTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      dropoffTime: new Date(Date.now() - 24 * 60 * 60 * 1000 + 25 * 60 * 1000), // 1 day ago + 25 minutes
      driverName: 'Alicia Reyes',
      driverPhone: '+63 956 789 0123',
      fare: 130.00,
      distance: '3.5 km',
      estimatedTime: '12 min',
      rating: 5
    }
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrips = recentTrips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recentTrips.length / itemsPerPage);

  // Helper function to get appropriate dropoff time display
  const getDropoffTimeDisplay = (trip: Trip) => {
    if (trip.status === 'Completed' && trip.dropoffTime) {
      return format(trip.dropoffTime, 'h:mm a');
    } else if (trip.status === 'Cancelled' && trip.cancelTime) {
      return `Cancelled at ${format(trip.cancelTime, 'h:mm a')}`;
    } else if (trip.status === 'In Progress') {
      return 'In Progress';
    } else {
      return 'N/A';
    }
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {currentTrips.map((trip) => (
            <AccordionItem 
              key={trip.id} 
              value={trip.id} 
              className={`border rounded-md overflow-hidden ${trip.status === 'In Progress' ? 'border-primary' : 'border-border'}`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/5">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Trip #{trip.id}</span>
                    <Badge 
                      className="ml-1" 
                      variant={
                        trip.status === 'In Progress' ? 'default' : 
                        trip.status === 'Completed' ? 'secondary' : 'destructive'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(trip.pickupTime, 'MMM d, h:mm a')}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.pin className="h-4 w-4 text-primary" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Pickup</div>
                        <div className="text-sm">{trip.pickupLocation}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(trip.pickupTime, 'h:mm a')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.store className="h-4 w-4 text-primary" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Dropoff</div>
                        <div className="text-sm">{trip.dropoffLocation}</div>
                        <div className="text-xs text-muted-foreground">
                          {getDropoffTimeDisplay(trip)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 mt-0.5"><Icons.car className="h-4 w-4 text-muted-foreground" /></div>
                      <div>
                        <div className="text-xs text-muted-foreground">Driver</div>
                        <div className="text-sm">{trip.driverName}</div>
                        <div className="text-xs text-muted-foreground">{trip.driverPhone}</div>
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
                    <Button size="sm" variant="outline">Track Trip</Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); 
                      handlePageChange(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
} 