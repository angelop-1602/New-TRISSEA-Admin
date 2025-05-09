'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconAlertTriangle, IconFlag, IconClock, IconCalendar } from '@tabler/icons-react';
import { format } from 'date-fns';

// Sample incident report data
const incidentReportsData = [
  {
    id: 'INC-001',
    passenger: {
      name: 'Maria Santos',
      avatar: 'https://api.slingacademy.com/public/sample-users/10.png',
      fallback: 'MS',
      contact: '+63 939 123 4567'
    },
    driver: {
      name: 'Juan Dela Cruz',
      id: 'DRV-452'
    },
    tripId: 'TRP-78932',
    vehicle: {
      model: 'Toyota Vios',
      plate: 'ABC 123'
    },
    timestamp: new Date('2023-11-23T14:32:00'),
    category: 'Safety Concern',
    status: 'Pending',
    priority: 'High',
    description: 'Driver was speeding excessively and ignored traffic signals. I felt unsafe throughout the trip and had to repeatedly ask him to slow down.',
    location: 'Along EDSA near Cubao',
    attachments: ['photo1.jpg']
  },
  {
    id: 'INC-002',
    passenger: {
      name: 'Carlos Reyes',
      avatar: 'https://api.slingacademy.com/public/sample-users/11.png',
      fallback: 'CR',
      contact: '+63 917 765 4321'
    },
    driver: {
      name: 'Ana Marasigan',
      id: 'DRV-128'
    },
    tripId: 'TRP-65421',
    vehicle: {
      model: 'Honda Civic',
      plate: 'XYZ 456'
    },
    timestamp: new Date('2023-11-24T09:15:00'),
    category: 'Route Deviation',
    status: 'Under Investigation',
    priority: 'Medium',
    description: 'Driver took a completely different route than what was shown on the app. When questioned, the driver claimed it was a shortcut, but it added 15 minutes to my trip time and increased the fare.',
    location: 'From Makati to Taguig',
    attachments: ['screenshot.jpg', 'trip_map.jpg']
  },
  {
    id: 'INC-003',
    passenger: {
      name: 'Sofia Mendoza',
      avatar: 'https://api.slingacademy.com/public/sample-users/12.png',
      fallback: 'SM',
      contact: '+63 995 555 8888'
    },
    driver: {
      name: 'Miguel Santos',
      id: 'DRV-309'
    },
    tripId: 'TRP-12453',
    vehicle: {
      model: 'Mitsubishi Mirage',
      plate: 'DEF 789'
    },
    timestamp: new Date('2023-11-22T18:45:00'),
    category: 'Unprofessional Behavior',
    status: 'Resolved',
    priority: 'Low',
    description: 'Driver was on a personal call throughout most of the trip and was speaking loudly. When I requested him to lower his voice, he was dismissive and rude.',
    location: 'From Quezon City to Manila',
    attachments: []
  },
  {
    id: 'INC-004',
    passenger: {
      name: 'Leo Villanueva',
      avatar: 'https://api.slingacademy.com/public/sample-users/13.png',
      fallback: 'LV',
      contact: '+63 928 333 9999'
    },
    driver: {
      name: 'Gabriel Torres',
      id: 'DRV-587'
    },
    tripId: 'TRP-34985',
    vehicle: {
      model: 'Nissan Almera',
      plate: 'GHI 012'
    },
    timestamp: new Date('2023-11-20T22:10:00'),
    category: 'Vehicle Condition',
    status: 'Resolved',
    priority: 'Medium',
    description: 'The vehicle had a strong smell of cigarettes despite being listed as a non-smoking vehicle. Additionally, the air conditioning was barely working making the trip very uncomfortable in the hot weather.',
    location: 'BGC area',
    attachments: ['car_interior.jpg']
  },
  {
    id: 'INC-005',
    passenger: {
      name: 'Isabella Cruz',
      avatar: 'https://api.slingacademy.com/public/sample-users/14.png',
      fallback: 'IC',
      contact: '+63 917 222 3333'
    },
    driver: {
      name: 'Rafael Bautista',
      id: 'DRV-215'
    },
    tripId: 'TRP-56872',
    vehicle: {
      model: 'Kia Soluto',
      plate: 'JKL 345'
    },
    timestamp: new Date('2023-11-25T07:30:00'),
    category: 'Safety Concern',
    status: 'Pending',
    priority: 'High',
    description: 'Driver appeared to be drowsy and nearly hit another vehicle twice. I had to stay alert throughout the journey and even had to warn him when he was drifting out of the lane.',
    location: 'From Paranaque to Makati',
    attachments: ['video_evidence.mp4']
  },
  {
    id: 'INC-006',
    passenger: {
      name: 'Diego Ramos',
      avatar: 'https://api.slingacademy.com/public/sample-users/15.png',
      fallback: 'DR',
      contact: '+63 939 777 8888'
    },
    driver: {
      name: 'Carmen Resurreccion',
      id: 'DRV-401'
    },
    tripId: 'TRP-23498',
    vehicle: {
      model: 'Toyota Wigo',
      plate: 'MNO 678'
    },
    timestamp: new Date('2023-11-21T13:15:00'),
    category: 'App Issues',
    status: 'Resolved',
    priority: 'Low',
    description: 'The trip fare shown at the end was significantly higher than the estimate. The route taken matched the app suggestion, but the final fare was ₱150 more than the initial estimate.',
    location: 'From Mall of Asia to Fairview',
    attachments: ['fare_screenshot.jpg', 'estimate_screenshot.jpg']
  }
];

// Simplified status badge styles
const statusColorMap: Record<string, string> = {
  'Pending': 'border-none',
  'Under Investigation': 'border-none',
  'Resolved': 'border-none'
};

// Simplified priority badge styles
const priorityColorMap: Record<string, string> = {
  'High': 'bg-destructive/10 text-destructive',
  'Medium': 'bg-muted text-muted-foreground',
  'Low': 'bg-muted text-muted-foreground'
};

export function IncidentReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incidentReportsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incidentReportsData.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className='h-full'>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <IconAlertTriangle className="h-6 w-6 mr-2 text-muted-foreground" />
              Incident Reports
            </CardTitle>
            <CardDescription>Passenger complaints and reports</CardDescription>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            {incidentReportsData.length} Reports
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {currentItems.map((incident) => (
            <AccordionItem 
              key={incident.id} 
              value={incident.id} 
              className="border rounded-md overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/5">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={incident.passenger.avatar} alt={incident.passenger.name} />
                      <AvatarFallback>{incident.passenger.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium flex items-center">
                        {incident.passenger.name}
                        <span className="text-xs ml-2 text-muted-foreground">#{incident.id}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{incident.category}</p>
                        {incident.priority === 'High' && (
                          <Badge variant="outline" className="text-destructive border-destructive/50 bg-destructive/5">
                            {incident.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="text-muted-foreground">
                      {incident.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(incident.timestamp, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <IconFlag className="h-4 w-4 mr-1 text-muted-foreground" />
                      Complaint Details
                    </h4>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="border-b pb-3">
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">Driver Info</h4>
                        <p className="text-sm">{incident.driver.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {incident.driver.id}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">Vehicle</h4>
                        <p className="text-sm">{incident.vehicle.model}</p>
                        <p className="text-xs text-muted-foreground">Plate: {incident.vehicle.plate}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-b pb-3">
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">Incident Info</h4>
                        <div className="flex items-center mb-1">
                          <IconCalendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <p className="text-xs">{format(incident.timestamp, 'MMMM dd, yyyy')}</p>
                        </div>
                        <div className="flex items-center">
                          <IconClock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <p className="text-xs">{format(incident.timestamp, 'hh:mm a')}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">Trip Details</h4>
                        <p className="text-sm">ID: {incident.tripId}</p>
                        <p className="text-xs text-muted-foreground">Location: {incident.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  {incident.attachments.length > 0 && (
                    <div className="pt-2 border-t">
                      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {incident.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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
                
                {currentPage > 4 && (
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

export default IncidentReports; 