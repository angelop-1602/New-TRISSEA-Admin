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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  IconSearch, 
  IconDownload, 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconX, 
  IconCheck,
  IconLicense,
  IconCalendarTime,
  IconCar,
  IconId,
  IconPhone,
  IconMail
} from '@tabler/icons-react';
import { getAllDrivers } from '@/features/shared/data/drivers';
import { Driver, DriverStatus, VehicleType } from '@/features/shared/types';

// Mock license and registration expiry data for drivers
const driversWithExpiryData = getAllDrivers().map(driver => ({
  ...driver,
  licenseExpiryDate: getRandomFutureDate(),
  registrationExpiryDate: getRandomFutureDate(),
  insuranceExpiryDate: getRandomFutureDate()
}));

// Helper function to generate random future dates
function getRandomFutureDate() {
  const today = new Date();
  // Random days between 30-730 (1 month to 2 years)
  const daysToAdd = Math.floor(Math.random() * 700) + 30;
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysToAdd);
  return futureDate.toISOString();
}

// Determine expiry status
function getExpiryStatus(expiryDateString: string) {
  const today = new Date();
  const expiryDate = new Date(expiryDateString);
  const differenceInDays = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  if (differenceInDays < 0) {
    return 'Expired';
  } else if (differenceInDays < 30) {
    return 'Expiring Soon';
  } else {
    return 'Valid';
  }
}

export default function DriverDatabasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'all'>('all');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleType | 'all'>('all');
  const [expiryFilter, setExpiryFilter] = useState<'all' | 'expiring' | 'expired'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState<(typeof driversWithExpiryData)[0] | null>(null);
  
  const ITEMS_PER_PAGE = 10;

  // Filter drivers based on search and filters
  const filteredDrivers = driversWithExpiryData.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesVehicle = vehicleFilter === 'all' || driver.vehicleType === vehicleFilter;
    
    // Check expiry status
    let matchesExpiry = true;
    if (expiryFilter === 'expiring') {
      const licenseStatus = getExpiryStatus(driver.licenseExpiryDate);
      const registrationStatus = getExpiryStatus(driver.registrationExpiryDate);
      matchesExpiry = licenseStatus === 'Expiring Soon' || registrationStatus === 'Expiring Soon';
    } else if (expiryFilter === 'expired') {
      const licenseStatus = getExpiryStatus(driver.licenseExpiryDate);
      const registrationStatus = getExpiryStatus(driver.registrationExpiryDate);
      matchesExpiry = licenseStatus === 'Expired' || registrationStatus === 'Expired';
    }

    return matchesSearch && matchesStatus && matchesVehicle && matchesExpiry;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Driver Database</h2>
            <p className="text-muted-foreground">
              Comprehensive driver information with license and registration expiry tracking
            </p>
          </div>
          <Button variant="outline">
            <IconDownload className="mr-2 h-4 w-4" />
            Export Database
          </Button>
        </div>

        <Card className="bg-background/95 shadow-sm w-full">
          <CardHeader className="py-4 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div>
              <CardTitle className="text-lg">Driver Records</CardTitle>
              <CardDescription>
                License, registration, and insurance expiry tracking
              </CardDescription>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
              <div className="relative w-full sm:w-64">
                <IconSearch className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search drivers..."
                  className="w-full rounded-md pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select
                value={vehicleFilter}
                onValueChange={(value) => setVehicleFilter(value as VehicleType | 'all')}
              >
                <SelectTrigger className="h-9 w-[130px] rounded-md">
                  <SelectValue placeholder="All Vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="Tricycle">Tricycle</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as DriverStatus | 'all')}
              >
                <SelectTrigger className="h-9 w-[130px] rounded-md">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={expiryFilter}
                onValueChange={(value) => setExpiryFilter(value as 'all' | 'expiring' | 'expired')}
              >
                <SelectTrigger className="h-9 w-[140px] rounded-md">
                  <SelectValue placeholder="Expiry Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="px-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDrivers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No drivers found matching the filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedDrivers.map((driver) => {
                      const licenseStatus = getExpiryStatus(driver.licenseExpiryDate);
                      const registrationStatus = getExpiryStatus(driver.registrationExpiryDate);
                      const insuranceStatus = getExpiryStatus(driver.insuranceExpiryDate);
                      
                      return (
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
                            <div className="flex items-center text-sm">
                              {licenseStatus === 'Valid' ? (
                                <IconCheck className="h-3 w-3 text-green-500 mr-1" />
                              ) : licenseStatus === 'Expiring Soon' ? (
                                <IconAlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                              ) : (
                                <IconX className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span className={`
                                ${licenseStatus === 'Valid' && 'text-green-600'} 
                                ${licenseStatus === 'Expiring Soon' && 'text-amber-600'} 
                                ${licenseStatus === 'Expired' && 'text-red-600'}
                              `}>
                                Expires: {new Date(driver.licenseExpiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-medium">{driver.licensePlate}</div>
                            <div className="flex items-center text-sm">
                              {registrationStatus === 'Valid' ? (
                                <IconCheck className="h-3 w-3 text-green-500 mr-1" />
                              ) : registrationStatus === 'Expiring Soon' ? (
                                <IconAlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                              ) : (
                                <IconX className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span className={`
                                ${registrationStatus === 'Valid' && 'text-green-600'} 
                                ${registrationStatus === 'Expiring Soon' && 'text-amber-600'} 
                                ${registrationStatus === 'Expired' && 'text-red-600'}
                              `}>
                                Expires: {new Date(driver.registrationExpiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center text-sm">
                              {insuranceStatus === 'Valid' ? (
                                <IconCheck className="h-3 w-3 text-green-500 mr-1" />
                              ) : insuranceStatus === 'Expiring Soon' ? (
                                <IconAlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                              ) : (
                                <IconX className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span className={`
                                ${insuranceStatus === 'Valid' && 'text-green-600'} 
                                ${insuranceStatus === 'Expiring Soon' && 'text-amber-600'} 
                                ${insuranceStatus === 'Expired' && 'text-red-600'}
                              `}>
                                Expires: {new Date(driver.insuranceExpiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-medium">{driver.vehicleType}</div>
                            <div className="text-sm text-muted-foreground">{driver.todaInfo && driver.todaInfo.length > 0 ? driver.todaInfo[0].todaName : 'No TODA'}</div>
                          </TableCell>
                          
                          <TableCell>
                            <Badge
                              variant={driver.status === 'Active' ? 'default' : driver.status === 'Suspended' ? 'destructive' : 'secondary'}
                              className="px-3 py-1 rounded-sm"
                            >
                              {driver.status}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedDriver(driver)}
                            >
                              <span className="sr-only">View details</span>
                              <IconInfoCircle className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between py-4 text-sm">
              <div className="text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredDrivers.length)} of {filteredDrivers.length} drivers
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Driver Details Dialog */}
      {selectedDriver && (
        <Dialog open={!!selectedDriver} onOpenChange={(open) => !open && setSelectedDriver(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Driver Details</DialogTitle>
              <DialogDescription>
                Complete driver information and document status
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              {/* Driver Information */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={selectedDriver.avatar} alt={selectedDriver.name} />
                      <AvatarFallback>{selectedDriver.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{selectedDriver.name}</h3>
                    <Badge
                      variant={selectedDriver.status === 'Active' ? 'default' : selectedDriver.status === 'Suspended' ? 'destructive' : 'secondary'}
                      className="px-3 py-1 rounded-sm mt-2"
                    >
                      {selectedDriver.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <IconId className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Driver ID</div>
                        <div className="font-medium">{selectedDriver.id}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconPhone className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div className="font-medium">{selectedDriver.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconMail className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium">{selectedDriver.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconCalendarTime className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Member Since</div>
                        <div className="font-medium">{new Date(selectedDriver.joinedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Vehicle Information */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <IconCar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Vehicle Type</div>
                        <div className="font-medium">{selectedDriver.vehicleType}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconId className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">License Plate</div>
                        <div className="font-medium">{selectedDriver.licensePlate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconCalendarTime className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Registration Expiry</div>
                        <div className={`font-medium ${
                          getExpiryStatus(selectedDriver.registrationExpiryDate) === 'Valid' 
                            ? 'text-green-600' 
                            : getExpiryStatus(selectedDriver.registrationExpiryDate) === 'Expiring Soon'
                              ? 'text-amber-600'
                              : 'text-red-600'
                        }`}>
                          {new Date(selectedDriver.registrationExpiryDate).toLocaleDateString()}
                          {' '}
                          <Badge variant="outline" className={`ml-1 ${
                            getExpiryStatus(selectedDriver.registrationExpiryDate) === 'Valid'
                              ? 'bg-green-50 text-green-600 border-green-200'
                              : getExpiryStatus(selectedDriver.registrationExpiryDate) === 'Expiring Soon'
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {getExpiryStatus(selectedDriver.registrationExpiryDate)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconCalendarTime className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Insurance Expiry</div>
                        <div className={`font-medium ${
                          getExpiryStatus(selectedDriver.insuranceExpiryDate) === 'Valid' 
                            ? 'text-green-600' 
                            : getExpiryStatus(selectedDriver.insuranceExpiryDate) === 'Expiring Soon'
                              ? 'text-amber-600'
                              : 'text-red-600'
                        }`}>
                          {new Date(selectedDriver.insuranceExpiryDate).toLocaleDateString()}
                          {' '}
                          <Badge variant="outline" className={`ml-1 ${
                            getExpiryStatus(selectedDriver.insuranceExpiryDate) === 'Valid'
                              ? 'bg-green-50 text-green-600 border-green-200'
                              : getExpiryStatus(selectedDriver.insuranceExpiryDate) === 'Expiring Soon'
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {getExpiryStatus(selectedDriver.insuranceExpiryDate)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Performance</h4>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Rating</span>
                        <span className="font-medium">{selectedDriver.rating} ⭐</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Trips</span>
                        <span className="font-medium">{selectedDriver.totalTrips}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* License Information */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">License Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <IconLicense className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">License Number</div>
                        <div className="font-medium">{selectedDriver.licenseNumber}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <IconCalendarTime className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">License Expiry</div>
                        <div className={`font-medium ${
                          getExpiryStatus(selectedDriver.licenseExpiryDate) === 'Valid' 
                            ? 'text-green-600' 
                            : getExpiryStatus(selectedDriver.licenseExpiryDate) === 'Expiring Soon'
                              ? 'text-amber-600'
                              : 'text-red-600'
                        }`}>
                          {new Date(selectedDriver.licenseExpiryDate).toLocaleDateString()}
                          {' '}
                          <Badge variant="outline" className={`ml-1 ${
                            getExpiryStatus(selectedDriver.licenseExpiryDate) === 'Valid'
                              ? 'bg-green-50 text-green-600 border-green-200'
                              : getExpiryStatus(selectedDriver.licenseExpiryDate) === 'Expiring Soon'
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : 'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {getExpiryStatus(selectedDriver.licenseExpiryDate)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedDriver.todaInfo && selectedDriver.todaInfo.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">TODA Membership</h4>
                      {selectedDriver.todaInfo.map((toda, index) => (
                        <div key={index} className="mb-3 p-3 bg-muted/50 rounded-md">
                          <div className="font-medium">{toda.todaName}</div>
                          <div className="grid grid-cols-2 text-sm mt-1">
                            <div className="text-muted-foreground">Role:</div>
                            <div>{toda.role}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Joined:</div>
                            <div>{new Date(toda.joinedDate).toLocaleDateString()}</div>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <div className="text-muted-foreground">Status:</div>
                            <div>
                              <Badge variant={toda.status === 'Active' ? 'default' : 'secondary'} className="px-2 py-0 text-xs">
                                {toda.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
} 