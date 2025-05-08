import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecentTripsLoading() {
  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="border">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-16 mr-2" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-10" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {i === 0 && (
                  <div className="mt-3 pt-3 border-t flex justify-end">
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 