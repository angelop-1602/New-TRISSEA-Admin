import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconArrowLeft } from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';

export default function LoadingTodaDetails() {
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
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
          <Button disabled>
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            Edit TODA
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* TODA Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-background/95 shadow-sm overflow-hidden">
              <Skeleton className="h-24 w-full" />
              <div className="px-6 pb-6 -mt-12">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-48 mt-4" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-6 space-y-4">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                      <div>
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-40 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-background/95 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                  <CardTitle className="text-lg">Fare Information</CardTitle>
                </div>
                <CardDescription>Current fare rates for this TODA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between py-2 border-b">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between py-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" disabled>
                  Update Fares
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Trip Information and Special Trips - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pricing" disabled>Fare Calculator</TabsTrigger>
                <TabsTrigger value="special-trips" disabled>Special Trip Settings</TabsTrigger>
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
                        {Array(3).fill(0).map((_, i) => (
                          <Card key={i} className="bg-accent/5">
                            <CardHeader className="pb-2 pt-4">
                              <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent className="py-0">
                              <Skeleton className="h-8 w-20" />
                            </CardContent>
                            <CardFooter className="pt-2 pb-4">
                              <Skeleton className="h-4 w-full" />
                            </CardFooter>
                          </Card>
                        ))}
                      </div>

                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
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
                      <Skeleton className="h-24 w-full rounded-lg" />
                      
                      <div className="mt-4">
                        <Skeleton className="h-5 w-48 mb-2" />
                        <div className="space-y-2">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="p-4 border rounded-lg">
                              <div className="flex items-start gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div>
                                  <Skeleton className="h-5 w-32" />
                                  <Skeleton className="h-4 w-48 mt-1" />
                                  <Skeleton className="h-4 w-32 mt-2" />
                                </div>
                              </div>
                            </div>
                          ))}
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