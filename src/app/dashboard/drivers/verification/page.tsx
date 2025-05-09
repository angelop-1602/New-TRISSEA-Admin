'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  IconSearch, 
  IconCheck, 
  IconX, 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconCar
} from '@tabler/icons-react';
import { Driver, DriverStatus, VehicleType } from '@/features/shared/types';
import { getAllDrivers } from '@/features/shared/data/drivers';

// Mock data for pending driver registration applications
const pendingDrivers = [
  {
    id: 'app-001',
    name: 'Manuel Perez',
    email: 'manuel.perez@example.com',
    phone: '+63 915 888 9999',
    vehicleType: 'Tricycle' as VehicleType,
    licensePlate: 'TRI-567',
    licenseNumber: 'LIC-2023-00501',
    submittedDate: '2023-12-15T08:30:00Z',
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    avatar: '/avatars/22.png',
    documentsSubmitted: [
      { name: 'Driver\'s License', status: 'Valid', expiryDate: '2025-06-30' },
      { name: 'Vehicle Registration', status: 'Valid', expiryDate: '2024-05-15' },
      { name: 'Insurance Certificate', status: 'Valid', expiryDate: '2024-12-31' },
    ],
    notes: '',
  },
  {
    id: 'app-002',
    name: 'Juliana Reyes',
    email: 'juliana.reyes@example.com',
    phone: '+63 917 777 8888',
    vehicleType: 'Tricycle' as VehicleType,
    licensePlate: 'TRI-321',
    licenseNumber: 'LIC-2023-00515',
    submittedDate: '2023-12-18T14:20:00Z',
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    avatar: '/avatars/23.png',
    documentsSubmitted: [
      { name: 'Driver\'s License', status: 'Valid', expiryDate: '2026-03-15' },
      { name: 'Vehicle Registration', status: 'Expiring Soon', expiryDate: '2024-01-31' },
      { name: 'Insurance Certificate', status: 'Valid', expiryDate: '2024-12-15' },
    ],
    notes: '',
  },
  {
    id: 'app-003',
    name: 'Roberto Luna',
    email: 'roberto.luna@example.com',
    phone: '+63 919 666 7777',
    vehicleType: 'Tricycle' as VehicleType,
    licensePlate: 'TRI-789',
    licenseNumber: 'LIC-2023-00532',
    submittedDate: '2023-12-20T09:45:00Z',
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    avatar: '/avatars/24.png',
    documentsSubmitted: [
      { name: 'Driver\'s License', status: 'Valid', expiryDate: '2025-11-22' },
      { name: 'Vehicle Registration', status: 'Valid', expiryDate: '2024-08-10' },
      { name: 'Insurance Certificate', status: 'Invalid', expiryDate: '2023-11-30' },
    ],
    notes: '',
  }
];

export default function DriverVerificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filteredPendingDrivers, setFilteredPendingDrivers] = useState(pendingDrivers);
  const [rejectedDrivers, setRejectedDrivers] = useState<typeof pendingDrivers>([]);
  
  // Existing drivers in the database (for comparison)
  const existingDrivers = getAllDrivers();

  // Handle search for pending drivers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredPendingDrivers(pendingDrivers);
      return;
    }
    
    const lowercasedQuery = query.toLowerCase();
    const filtered = pendingDrivers.filter(
      driver => 
        driver.name.toLowerCase().includes(lowercasedQuery) ||
        driver.email.toLowerCase().includes(lowercasedQuery) ||
        driver.phone.includes(query) ||
        driver.licensePlate.toLowerCase().includes(lowercasedQuery) ||
        driver.licenseNumber.toLowerCase().includes(lowercasedQuery)
    );
    
    setFilteredPendingDrivers(filtered);
  };

  // Check for matching existing driver
  const findMatchingExistingDriver = (pendingDriver: any): Driver | undefined => {
    return existingDrivers.find(
      driver => 
        driver.licenseNumber.toLowerCase() === pendingDriver.licenseNumber.toLowerCase() ||
        (driver.name.toLowerCase() === pendingDriver.name.toLowerCase() && 
         driver.licensePlate.toLowerCase() === pendingDriver.licensePlate.toLowerCase())
    );
  };

  // Open verification dialog
  const openVerificationDialog = (driver: any) => {
    setSelectedDriver(driver);
    setVerificationOpen(true);
  };

  // Handle driver approval
  const handleApprove = () => {
    if (!selectedDriver) return;
    
    // Simply remove from pending drivers (no need to track approved separately)
    const updatedPendingDrivers = filteredPendingDrivers.filter(d => d.id !== selectedDriver.id);
    setFilteredPendingDrivers(updatedPendingDrivers);
    setVerificationOpen(false);
    setSelectedDriver(null);
    
    // In a real app, you would add this driver to the verified drivers database
  };

  // Handle driver rejection
  const handleReject = () => {
    if (!selectedDriver || !rejectionReason) return;
    
    const updatedPendingDrivers = filteredPendingDrivers.filter(d => d.id !== selectedDriver.id);
    const updatedDriver = { 
      ...selectedDriver, 
      status: 'Rejected' as const,
      notes: rejectionReason 
    };
    
    setFilteredPendingDrivers(updatedPendingDrivers);
    setRejectedDrivers([...rejectedDrivers, updatedDriver]);
    setVerificationOpen(false);
    setSelectedDriver(null);
    setRejectionReason('');
  };

  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Driver Verification</h2>
          <p className="text-muted-foreground">
            Verify new driver applications and approve or reject them
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          {/* Pending Applications Tab */}
          <TabsContent value="pending">
            <Card className="bg-background/95 shadow-sm w-full">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div>
                  <CardTitle className="text-lg">Pending Driver Applications</CardTitle>
                  <CardDescription>
                    Review and verify new driver applications
                  </CardDescription>
                </div>
                
                <div className="relative w-64">
                  <IconSearch className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="w-full rounded-md pl-8"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              
              <CardContent className="px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Driver</TableHead>
                        <TableHead>License Info</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Date Submitted</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingDrivers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No pending applications found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPendingDrivers.map((driver) => {
                          // Check if there's a matching existing driver
                          const matchingDriver = findMatchingExistingDriver(driver);
                          const hasMatchingDriver = !!matchingDriver;
                          
                          return (
                            <TableRow key={driver.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <Avatar className="mr-2 h-8 w-8">
                                    <AvatarImage src={driver.avatar} alt={driver.name} />
                                    <AvatarFallback>{driver.name.slice(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center">
                                      {driver.name}
                                      {hasMatchingDriver && (
                                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                                          <IconCheck className="h-3 w-3 mr-1" />
                                          Match found
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">ID: {driver.id}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{driver.licenseNumber}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{driver.vehicleType}</div>
                                <div className="text-sm text-muted-foreground">{driver.licensePlate}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{driver.phone}</div>
                                <div className="text-sm text-muted-foreground">{driver.email}</div>
                              </TableCell>
                              <TableCell>
                                {new Date(driver.submittedDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {driver.documentsSubmitted.map((doc, idx) => (
                                  <div key={idx} className="flex items-center text-sm">
                                    {doc.status === 'Valid' ? (
                                      <IconCheck className="h-3 w-3 text-green-500 mr-1" />
                                    ) : doc.status === 'Expiring Soon' ? (
                                      <IconAlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                                    ) : (
                                      <IconX className="h-3 w-3 text-red-500 mr-1" />
                                    )}
                                    {doc.name}
                                  </div>
                                ))}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openVerificationDialog(driver)}
                                >
                                  <IconInfoCircle className="h-4 w-4 mr-1" />
                                  Verify
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rejected Applications Tab */}
          <TabsContent value="rejected">
            <Card className="bg-background/95 shadow-sm w-full">
              <CardHeader>
                <CardTitle className="text-lg">Rejected Driver Applications</CardTitle>
                <CardDescription>
                  Applications that failed verification
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Driver</TableHead>
                        <TableHead>License Info</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Rejection Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedDrivers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No rejected applications.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rejectedDrivers.map((driver) => (
                          <TableRow key={driver.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <Avatar className="mr-2 h-8 w-8">
                                  <AvatarImage src={driver.avatar} alt={driver.name} />
                                  <AvatarFallback>{driver.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div>{driver.name}</div>
                                  <div className="text-sm text-muted-foreground">ID: {driver.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{driver.licenseNumber}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{driver.vehicleType}</div>
                              <div className="text-sm text-muted-foreground">{driver.licensePlate}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{driver.phone}</div>
                              <div className="text-sm text-muted-foreground">{driver.email}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{driver.notes}</div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Verification Dialog */}
      {selectedDriver && (
        <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Verify Driver Application</DialogTitle>
              <DialogDescription>
                Review the application details and compare them with the driver database.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-6 py-4">
              {/* Application Details */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Application Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={selectedDriver.avatar} alt={selectedDriver.name} />
                      <AvatarFallback>{selectedDriver.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                      <p className="text-sm text-muted-foreground">Application ID: {selectedDriver.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">License Number:</div>
                      <div className="font-medium">{selectedDriver.licenseNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Vehicle Type:</div>
                      <div className="font-medium">{selectedDriver.vehicleType}</div>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">License Plate:</div>
                      <div className="font-medium">{selectedDriver.licensePlate}</div>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Email:</div>
                      <div className="font-medium">{selectedDriver.email}</div>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Phone:</div>
                      <div className="font-medium">{selectedDriver.phone}</div>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <div className="text-muted-foreground">Date Submitted:</div>
                      <div className="font-medium">{new Date(selectedDriver.submittedDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Submitted Documents</h4>
                    <div className="space-y-2">
                      {selectedDriver.documentsSubmitted.map((doc: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded">
                          <span>{doc.name}</span>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground mr-2">
                              Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                            </span>
                            {doc.status === 'Valid' ? (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                Valid
                              </Badge>
                            ) : doc.status === 'Expiring Soon' ? (
                              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                Expiring Soon
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                Invalid
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Database Record Comparison */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Database Record</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const matchingDriver = findMatchingExistingDriver(selectedDriver);
                    
                    if (!matchingDriver) {
                      return (
                        <div className="flex flex-col items-center justify-center h-full py-8">
                          <div className="bg-amber-50 p-3 rounded-full mb-4">
                            <IconAlertTriangle className="h-8 w-8 text-amber-500" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No Matching Record Found</h3>
                          <p className="text-center text-muted-foreground">
                            This appears to be a new driver. Verify all documents carefully before approval.
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <>
                        <div className="flex items-center mb-4">
                          <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={matchingDriver.avatar} alt={matchingDriver.name} />
                            <AvatarFallback>
                              {matchingDriver.avatar ? matchingDriver.name.slice(0, 2) : <IconCar className="h-6 w-6" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{matchingDriver.name}</h3>
                            <p className="text-sm text-muted-foreground">Driver ID: {matchingDriver.id}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">License Number:</div>
                            <div className="font-medium">{matchingDriver.licenseNumber}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Vehicle Type:</div>
                            <div className="font-medium">{matchingDriver.vehicleType}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">License Plate:</div>
                            <div className="font-medium">{matchingDriver.licensePlate}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Email:</div>
                            <div className="font-medium">{matchingDriver.email}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Phone:</div>
                            <div className="font-medium">{matchingDriver.phone}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Status:</div>
                            <div className="font-medium">
                              <Badge
                                variant={matchingDriver.status === 'Active' ? 'default' : matchingDriver.status === 'Suspended' ? 'destructive' : 'secondary'}
                                className="px-3 py-1 rounded-sm"
                              >
                                {matchingDriver.status}
                              </Badge>
                            </div>
                          </div>
                          {matchingDriver.todaInfo && matchingDriver.todaInfo.length > 0 && (
                            <div className="grid grid-cols-2 text-sm">
                              <div className="text-muted-foreground">TODA Affiliation:</div>
                              <div className="font-medium">{matchingDriver.todaInfo[0].todaName}</div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Performance:</div>
                            <div className="font-medium">{matchingDriver.rating} ⭐ ({matchingDriver.totalTrips} trips)</div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-2">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason (required if rejecting application)
              </label>
              <Textarea
                id="rejection-reason"
                placeholder="Explain why this application is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="destructive" 
                onClick={handleReject}
                disabled={!rejectionReason}
              >
                <IconX className="mr-2 h-4 w-4" />
                Reject Application
              </Button>
              <Button 
                variant="default"
                onClick={handleApprove}
              >
                <IconCheck className="mr-2 h-4 w-4" />
                Approve Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
} 