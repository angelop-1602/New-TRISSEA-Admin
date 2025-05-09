import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function IncidentReportsLoading() {
  return (
    <Card className="bg-background/95 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Skeleton className="h-5 w-5 mr-2 rounded-full" />
              <Skeleton className="h-6 w-36" />
            </CardTitle>
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="border rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-24 rounded-md" />
              </div>
              <div className="flex flex-col items-end">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 