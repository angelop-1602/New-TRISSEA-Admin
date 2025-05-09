'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
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
import { IconMapPin, IconCar } from '@tabler/icons-react';

const tripsData = [
  {
    id: '1',
    driver: {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
      fallback: 'OM',
    },
    origin: 'Manila City',
    destination: 'Quezon City',
    distance: '12.5 km',
    duration: '35 mins',
    fare: '₱299.00',
    status: 'In Progress',
    startTime: '10:30 AM',
    estimatedArrival: '11:05 AM',
    vehicle: {
      model: 'Toyota Vios',
      plate: 'ABC 123',
      color: 'White'
    }
  },
  {
    id: '2',
    driver: {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
      fallback: 'JL',
    },
    origin: 'Makati City',
    destination: 'Taguig City',
    distance: '8.3 km',
    duration: '25 mins',
    fare: '₱199.00',
    status: 'In Progress',
    startTime: '9:45 AM',
    estimatedArrival: '10:10 AM',
    vehicle: {
      model: 'Honda Civic',
      plate: 'XYZ 456',
      color: 'Black'
    }
  },
  {
    id: '3',
    driver: {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
      fallback: 'IN',
    },
    origin: 'Pasay City',
    destination: 'Parañaque City',
    distance: '6.7 km',
    duration: '20 mins',
    fare: '₱150.00',
    status: 'In Progress',
    startTime: '11:15 AM',
    estimatedArrival: '11:35 AM',
    vehicle: {
      model: 'Mitsubishi Mirage',
      plate: 'DEF 789',
      color: 'Red'
    }
  },
  {
    id: '4',
    driver: {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
      fallback: 'WK',
    },
    origin: 'Mandaluyong City',
    destination: 'San Juan City',
    distance: '4.2 km',
    duration: '15 mins',
    fare: '₱120.00',
    status: 'In Progress',
    startTime: '10:00 AM',
    estimatedArrival: '10:15 AM',
    vehicle: {
      model: 'Kia Soluto',
      plate: 'GHI 012',
      color: 'Silver'
    }
  },
  {
    id: '5',
    driver: {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
      fallback: 'SD',
    },
    origin: 'Pasig City',
    destination: 'Marikina City',
    distance: '9.1 km',
    duration: '30 mins',
    fare: '₱220.00',
    status: 'In Progress',
    startTime: '9:30 AM',
    estimatedArrival: '10:00 AM',
    vehicle: {
      model: 'Nissan Almera',
      plate: 'JKL 345',
      color: 'Blue'
    }
  },
  {
    id: '6',
    driver: {
      name: 'Ethan Johnson',
      email: 'ethan.johnson@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/6.png',
      fallback: 'EJ',
    },
    origin: 'Caloocan City',
    destination: 'Valenzuela City',
    distance: '7.5 km',
    duration: '25 mins',
    fare: '₱180.00',
    status: 'In Progress',
    startTime: '11:45 AM',
    estimatedArrival: '12:10 PM',
    vehicle: {
      model: 'Suzuki Dzire',
      plate: 'MNO 678',
      color: 'Gray'
    }
  },
  {
    id: '7',
    driver: {
      name: 'Ava Wilson',
      email: 'ava.wilson@email.com',
      avatar: 'https://api.slingacademy.com/public/sample-users/7.png',
      fallback: 'AW',
    },
    origin: 'Las Piñas City',
    destination: 'Muntinlupa City',
    distance: '5.9 km',
    duration: '18 mins',
    fare: '₱140.00',
    status: 'In Progress',
    startTime: '10:15 AM',
    estimatedArrival: '10:33 AM',
    vehicle: {
      model: 'Toyota Wigo',
      plate: 'PQR 901',
      color: 'Yellow'
    }
  }
];

export function CurrentTrips() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tripsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tripsData.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className="flex items-center">
          <IconCar className="h-6 w-6 mr-2 text-muted-foreground" />
          Current Trips
        </CardTitle>
        <CardDescription>Real-time trips currently in progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {currentItems.map((trip) => (
            <AccordionItem key={trip.id} value={trip.id} className="border rounded-md p-1">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={trip.driver.avatar} alt={trip.driver.name} />
                      <AvatarFallback>{trip.driver.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{trip.driver.name}</p>
                      <p className="text-xs text-muted-foreground">{trip.vehicle.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <IconMapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{trip.destination}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Origin</p>
                    <p className="text-sm font-medium">{trip.origin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm font-medium">{trip.destination}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="text-sm font-medium">{trip.distance}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{trip.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Start Time</p>
                    <p className="text-sm font-medium">{trip.startTime}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Est. Arrival</p>
                    <p className="text-sm font-medium">{trip.estimatedArrival}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Vehicle</p>
                    <p className="text-sm font-medium">{trip.vehicle.model} ({trip.vehicle.color})</p>
                    <p className="text-xs text-muted-foreground">{trip.vehicle.plate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Fare</p>
                    <p className="text-sm font-medium">{trip.fare}</p>
                    <p className="text-xs text-muted-foreground">Status: {trip.status}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    isActive={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 4 && (
              <>
                {currentPage > 4 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => handlePageChange(currentPage)}
                      isActive={true}
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default CurrentTrips; 