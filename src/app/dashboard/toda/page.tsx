'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconMap,
  IconBike,
  IconCloudRain
} from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';
import { todas } from '@/features/toda/data';
import { formatCurrency } from '@/features/toda/utils';

export default function TodaListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodas = todas.filter(
    (toda) =>
      toda.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toda.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      toda.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      case 'Suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <PageContainer className="w-full max-w-full">
      <div className='flex flex-col space-y-6 w-full'>
        <div className='flex items-center justify-between w-full'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              TODA Management
            </h2>
            <p className='text-muted-foreground'>
              Manage Tricycle Operators and Drivers Associations, their fare
              prices, and special trip settings
            </p>
          </div>
          <div className="flex gap-2">
            <Link href='/dashboard/toda/special-trips'>
              <Button variant="outline">
                <IconCloudRain className='mr-2 h-4 w-4' />
                Special Trip Settings
              </Button>
            </Link>
            <Link href='/dashboard/toda/create'>
              <Button>
                <IconPlus className='mr-2 h-4 w-4' />
                New TODA
              </Button>
            </Link>
          </div>
        </div>

        <Card className='bg-background/95 shadow-sm w-full'>
          <CardHeader className='py-1 flex flex-row items-center justify-between'>
            <div>
              <CardTitle className='text-lg'>Registered TODAs</CardTitle>
              <CardDescription>
                Manage tricycle associations, fare rates, and special trip
                settings
              </CardDescription>
            </div>
            <div className='relative w-64'>
              <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
              <Input
                type='search'
                placeholder='Search TODA...'
                className='w-full rounded-md pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[200px]'>Name</TableHead>
                    <TableHead className='w-[150px]'>Code</TableHead>
                    <TableHead className='w-[200px]'>Location</TableHead>
                    <TableHead className='w-[120px]'>Base Fare</TableHead>
                    <TableHead className='w-[120px]'>Per KM Rate</TableHead>
                    <TableHead className='w-[120px]'>Members</TableHead>
                    <TableHead className='w-[100px]'>Status</TableHead>
                    <TableHead className='w-[100px]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTodas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className='h-24 text-center'>
                        No TODAs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTodas.map((toda) => (
                      <TableRow key={toda.id}>
                        <TableCell className='font-medium'>
                          <div className='flex items-center'>
                            <div className='bg-primary/10 text-primary mr-2 flex h-7 w-7 items-center justify-center rounded-full'>
                              <IconBike className='h-4 w-4' />
                            </div>
                            <div>{toda.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{toda.code}</TableCell>
                        <TableCell>
                          <div className='flex items-center'>
                            <IconMap className='text-muted-foreground mr-1 h-4 w-4' />
                            <span>
                              {toda.location.city}, {toda.location.province}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(toda.baseFare)}</TableCell>
                        <TableCell>
                          {formatCurrency(toda.perKilometerRate)}
                        </TableCell>
                        <TableCell>{toda.memberCount}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(toda.status)}>
                            {toda.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <IconDotsVertical className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/dashboard/toda/${toda.id}`)
                                }
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/dashboard/toda/${toda.id}/edit`)
                                }
                              >
                                Edit TODA
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/dashboard/toda/${toda.id}/members`
                                  )
                                }
                              >
                                View Members
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
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
