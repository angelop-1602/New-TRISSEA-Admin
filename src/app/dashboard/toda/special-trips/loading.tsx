import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { IconArrowLeft } from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';

export default function LoadingGlobalSpecialTrips() {
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
            <h2 className="text-2xl font-bold tracking-tight mt-2">Global Special Trip Settings</h2>
            <Skeleton className="h-4 w-64 mt-1" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Settings Panel - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-background/95 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Special Trip Conditions</CardTitle>
                <CardDescription>
                  Configure fare multipliers that will apply to all TODAs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-56 mt-1" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-8" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                        <Skeleton className="h-5 w-full rounded-full" />
                      </div>
                      
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" disabled>
                  Reset to Defaults
                </Button>
                <Button disabled>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Preview Panel - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-background/95 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Fare Calculator</CardTitle>
                <CardDescription>
                  See how special conditions affect fares
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-full rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Skeleton className="h-4 w-40" />
                  <div className="space-y-2">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <div className="space-y-2">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background/95 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                  <CardTitle className="text-sm">About Global Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}