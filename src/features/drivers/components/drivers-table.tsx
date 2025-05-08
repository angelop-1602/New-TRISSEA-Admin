'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  IconDotsVertical, 
  IconEdit, 
  IconTrash, 
  IconSearch,
  IconFilter,
  IconEye
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Driver, DriverStatus, VehicleType } from '../types';
import Link from 'next/link';
import { drivers } from '../data';

const ITEMS_PER_PAGE = 5;

export function DriversTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'all'>('all');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter drivers based on search and filters
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesVehicle = vehicleFilter === 'all' || driver.vehicleType === vehicleFilter;

    return matchesSearch && matchesStatus && matchesVehicle;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">All Drivers</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 w-[180px] max-w-[180px] rounded-md"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as DriverStatus | 'all')}
            >
              <SelectTrigger className="h-9 w-[120px] rounded-md">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={vehicleFilter}
              onValueChange={(value) => setVehicleFilter(value as VehicleType | 'all')}
            >
              <SelectTrigger className="h-9 w-[120px] rounded-md">
                <SelectValue placeholder="All Vehicles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="Car">Car</SelectItem>
                <SelectItem value="Motorcycle">Motorcycle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="w-[50px] text-center text-muted-foreground font-mono">
                    {driver.id.slice(0, 2)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {driver.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{driver.vehicleType}</div>
                    <div className="text-sm text-muted-foreground">
                      {driver.licensePlate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{driver.phone}</div>
                    <div className="text-sm text-muted-foreground">
                      {driver.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={driver.status === 'Active' ? 'default' : 'secondary'}
                      className="px-3 py-1 rounded-sm"
                    >
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{driver.rating} ⭐</div>
                    <div className="text-sm text-muted-foreground">
                      {driver.totalTrips} trips
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <IconDotsVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/drivers/${driver.id}`}>
                            <IconEye className="mr-2 h-4 w-4" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/drivers/${driver.id}/edit`}>
                            <IconEdit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <IconTrash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
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
  );
} 