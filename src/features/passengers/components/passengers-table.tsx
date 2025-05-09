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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  IconDotsVertical, 
  IconEdit, 
  IconTrash, 
  IconSearch,
  IconEye,
  IconUser
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Passenger, PassengerStatus } from '../types';
import Link from 'next/link';
import { passengers } from '../data';

const ITEMS_PER_PAGE = 5;

export function PassengersTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PassengerStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter passengers based on search and filters
  const filteredPassengers = passengers.filter(passenger => {
    const matchesSearch = 
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || passenger.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPassengers.length / ITEMS_PER_PAGE);
  const paginatedPassengers = filteredPassengers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="bg-background/95 shadow-sm w-full">
      <CardHeader className="py-1 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Registered Passengers</CardTitle>
          <CardDescription>
            Manage passenger accounts and view their trip history
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as PassengerStatus | 'all')}
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
          <div className="relative w-64">
            <IconSearch className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search passengers..."
              className="w-full rounded-md pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Passenger</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPassengers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No passengers found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPassengers.map((passenger) => (
                  <TableRow key={passenger.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="bg-primary/10 text-primary mr-2 flex h-7 w-7 items-center justify-center rounded-full">
                          <IconUser className="h-4 w-4" />
                        </div>
                        <div>
                          <div>{passenger.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {passenger.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{passenger.phone}</div>
                      <div className="text-sm text-muted-foreground">{passenger.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={passenger.status === 'Active' ? 'default' : 'secondary'}
                        className="px-3 py-1 rounded-sm"
                      >
                        {passenger.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{passenger.totalTrips} trips</div>
                      <div className="text-sm text-muted-foreground">{passenger.rating} ⭐</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{passenger.joinedDate}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <IconDotsVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/passengers/${passenger.id}`}>
                              <IconEye className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/passengers/${passenger.id}/edit`}>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between py-4 text-sm">
          <div className="text-muted-foreground">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredPassengers.length)} of {filteredPassengers.length} passengers
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