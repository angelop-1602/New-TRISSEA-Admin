'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { IconAlertTriangle, IconFlag, IconCalendar, IconClock, IconUser } from '@tabler/icons-react';
import { format } from 'date-fns';
import { getDriverById } from '@/features/shared/data/drivers';

interface IncidentReport {
  id: string;
  timestamp: Date;
  category: 'Safety Concern' | 'Route Deviation' | 'Unprofessional Behavior' | 'Vehicle Condition' | 'App Issues';
  status: 'Pending' | 'Under Investigation' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  location: string;
  tripId: string;
  passenger: {
    name: string;
    contact: string;
    avatar?: string;
    fallback: string;
  };
  attachments: string[];
}

export default function DriverIncidentReports() {
  const params = useParams();
  const driverId = params.id as string;
  const driver = getDriverById(driverId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  if (!driver) {
    return null;
  }

  // Sample incident reports about this driver
  const incidentReports: IncidentReport[] = [
    {
      id: 'INC-001',
      timestamp: new Date('2023-11-23T14:32:00'),
      category: 'Safety Concern',
      status: 'Pending',
      priority: 'High',
      description: 'Driver was speeding excessively and ignored traffic signals. I felt unsafe throughout the trip and had to repeatedly ask him to slow down.',
      location: 'Along EDSA near Cubao',
      tripId: 'TRP-78932',
      passenger: {
        name: 'Maria Santos',
        contact: '+63 939 123 4567',
        avatar: 'https://api.slingacademy.com/public/sample-users/10.png',
        fallback: 'MS',
      },
      attachments: ['photo1.jpg']
    },
    {
      id: 'INC-005',
      timestamp: new Date('2023-11-25T07:30:00'),
      category: 'Safety Concern',
      status: 'Under Investigation',
      priority: 'High',
      description: 'Driver appeared to be drowsy and nearly hit another vehicle twice. I had to stay alert throughout the journey and even had to warn him when he was drifting out of the lane.',
      location: 'From Paranaque to Makati',
      tripId: 'TRP-56872',
      passenger: {
        name: 'Isabella Cruz',
        contact: '+63 917 222 3333',
        avatar: 'https://api.slingacademy.com/public/sample-users/14.png',
        fallback: 'IC',
      },
      attachments: ['video_evidence.mp4']
    },
    {
      id: 'INC-003',
      timestamp: new Date('2023-09-22T18:45:00'),
      category: 'Unprofessional Behavior',
      status: 'Resolved',
      priority: 'Low',
      description: 'Driver was on a personal call throughout most of the trip and was speaking loudly. When I requested him to lower his voice, he was dismissive and rude.',
      location: 'From Quezon City to Manila',
      tripId: 'TRP-12453',
      passenger: {
        name: 'Sofia Mendoza',
        contact: '+63 995 555 8888',
        avatar: 'https://api.slingacademy.com/public/sample-users/12.png',
        fallback: 'SM',
      },
      attachments: []
    },
    {
      id: 'INC-002',
      timestamp: new Date('2023-10-15T09:15:00'),
      category: 'Route Deviation',
      status: 'Under Investigation',
      priority: 'Medium',
      description: 'Driver took a completely different route than what was shown on the app. When questioned, the driver claimed it was a shortcut, but it added 15 minutes to my trip time and increased the fare.',
      location: 'From Makati to Taguig',
      tripId: 'TRP-65421',
      passenger: {
        name: 'Carlos Reyes',
        contact: '+63 917 765 4321',
        avatar: 'https://api.slingacademy.com/public/sample-users/11.png',
        fallback: 'CR',
      },
      attachments: ['screenshot.jpg', 'trip_map.jpg']
    }
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncidents = incidentReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incidentReports.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Status badge variants
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'outline';
      case 'Under Investigation':
        return 'secondary';
      case 'Resolved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Priority badge variants
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <IconAlertTriangle className="h-5 w-5 mr-2 text-muted-foreground" />
              Incident Reports
            </CardTitle>
            <CardDescription>Reports about this driver</CardDescription>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            {incidentReports.length} Reports
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {incidentReports.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No incident reports about this driver
          </div>
        ) : (
          <>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {currentIncidents.map((incident) => (
                <AccordionItem 
                  key={incident.id} 
                  value={incident.id} 
                  className="border rounded-md overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{incident.id}</span>
                        <Badge variant="outline" className="ml-1">
                          {incident.category}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant={getStatusVariant(incident.status)} className="text-muted-foreground">
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
                            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Passenger Info</h4>
                            <p className="text-sm">{incident.passenger.name}</p>
                            <p className="text-xs text-muted-foreground">{incident.passenger.contact}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Trip Details</h4>
                            <p className="text-sm">ID: {incident.tripId}</p>
                            <p className="text-xs text-muted-foreground">Location: {incident.location}</p>
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
                            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Priority</h4>
                            <Badge variant={getPriorityVariant(incident.priority)}>
                              {incident.priority}
                            </Badge>
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
          </>
        )}
      </CardContent>
    </Card>
  );
} 