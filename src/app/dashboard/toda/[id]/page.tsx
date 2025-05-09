'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  IconArrowLeft,
  IconEdit,
  IconMap,
  IconPhone,
  IconMail,
  IconCalendar,
  IconCar,
  IconInfoCircle,
  IconUser,
  IconBike,
  IconExternalLink,
} from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';
import { todas } from '@/features/toda/data';
import { formatCurrency, calculateBasicFare } from '@/features/toda/utils';

export default function TodaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const todaId = params.id as string;
  
  const toda = todas.find(t => t.id === todaId);
  
  // For demo purposes only - in a real app this would update the backend
  const [todaState, setTodaState] = useState(toda);
  
  if (!toda || !todaState) {
    return (
      <PageContainer className="w-full max-w-full">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold">TODA Not Found</h2>
          <p className="text-muted-foreground mb-4">The TODA you're looking for doesn't exist or was removed</p>
          <Link href="/dashboard/toda">
            <Button>
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to TODA List
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  // Sample trip distances for demonstration
  const sampleTrips = [
    { name: '1 km trip', distance: 1 },
    { name: '2 km trip', distance: 2 },
    { name: '5 km trip', distance: 5 }
  ];

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

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/toda">
                <Button variant="ghost" size="sm">
                  <IconArrowLeft className="h-4 w-4 mr-1" />
                  Back to TODA List
                </Button>
              </Link>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">TODA Details</h2>
            <p className="text-muted-foreground">
              View and manage information for {todaState.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/toda/${todaId}/edit`}>
              <Button>
                <IconEdit className="mr-2 h-4 w-4" />
                Edit TODA
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* TODA Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-background/95 shadow-sm overflow-hidden">
              <div className="bg-primary h-24"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="h-24 w-24 rounded-full border-4 border-background bg-primary/10 text-primary flex items-center justify-center">
                  <IconBike className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mt-4">{todaState.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getStatusVariant(todaState.status)} className="px-3 py-1 rounded-sm">
                    {todaState.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">Code: {todaState.code}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <IconMap className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{todaState.location.name}</div>
                      <div className="text-sm text-muted-foreground">{todaState.location.address}</div>
                      <div className="text-sm text-muted-foreground">{todaState.location.city}, {todaState.location.province}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconUser className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{todaState.contactInfo.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">Contact Person</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconPhone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{todaState.contactInfo.phoneNumber}</div>
                      <div className="text-sm text-muted-foreground">Phone Number</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconMail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{todaState.contactInfo.email}</div>
                      <div className="text-sm text-muted-foreground">Email Address</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconCalendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Registered {formatDate(todaState.createdAt)}</div>
                      <div className="text-sm text-muted-foreground">Last updated {formatDate(todaState.updatedAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-background/95 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <IconCar className="h-5 w-5 mr-2 text-muted-foreground" />
                  Fare Information
                </CardTitle>
                <CardDescription>Current fare rates for this TODA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Base Fare</span>
                  <span className="font-medium">{formatCurrency(todaState.baseFare)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Per Kilometer Rate</span>
                  <span className="font-medium">{formatCurrency(todaState.perKilometerRate)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Registered Members</span>
                  <span className="font-medium">{todaState.memberCount}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/toda/${todaId}/edit`)}>
                  Update Fares
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Trip Information and Special Trips - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pricing">Fare Calculator</TabsTrigger>
                <TabsTrigger value="special-trips">Special Trip Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pricing" className="mt-4">
                <Card className="bg-background/95 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Fare Calculator</CardTitle>
                    <CardDescription>
                      Calculate the fare for different trip distances based on current settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        {sampleTrips.map((trip) => (
                          <Card key={trip.name} className="bg-accent/5">
                            <CardHeader className="pb-2 pt-4">
                              <CardTitle className="text-sm font-medium text-muted-foreground">{trip.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-0">
                              <div className="text-2xl font-bold">
                                {formatCurrency(calculateBasicFare(todaState, trip.distance))}
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <IconInfoCircle className="h-4 w-4 mr-1" />
                                Base fare + ({trip.distance} km × {formatCurrency(todaState.perKilometerRate)})
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>

                      <div>
                        <h3 className="text-md font-medium mb-2">How fares are calculated</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>Base fare ({formatCurrency(todaState.baseFare)}) is applied to all trips regardless of distance.</p>
                          <p className="mt-1">For every kilometer traveled, an additional {formatCurrency(todaState.perKilometerRate)} is added.</p>
                          <p className="mt-1">Special trips (rain, night, etc.) will apply a multiplier to the total fare.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="special-trips" className="mt-4">
                <Card className="bg-background/95 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Special Trip Settings</CardTitle>
                    <CardDescription>
                      Special fare multipliers applied during certain conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Special Trip Conditions</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Special trip settings (rain, night trips, holidays, etc.) are managed globally and apply to all TODAs.
                            </p>
                          </div>
                          <Link href="/dashboard/todo/special-trips">
                            <Button variant="outline" size="sm">
                              <IconExternalLink className="mr-2 h-4 w-4" />
                              Manage Global Settings
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Active Special Trip Conditions</h3>
                        <div className="space-y-2">
                          {todaState.specialTrips.filter(s => s.isActive).length === 0 ? (
                            <p className="text-sm text-muted-foreground">No active special trip conditions.</p>
                          ) : (
                            todaState.specialTrips.filter(s => s.isActive).map((setting) => {
                              const Icon = setting.icon;
                              return (
                                <div key={setting.id} className="flex items-start justify-between p-4 border rounded-lg">
                                  <div className="flex items-start gap-3">
                                    <div className={`h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center`}>
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{setting.name}</h4>
                                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                                      <p className="text-sm font-medium mt-1">
                                        Multiplier: {setting.multiplier}× ({((setting.multiplier - 1) * 100).toFixed(0)}% increase)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}