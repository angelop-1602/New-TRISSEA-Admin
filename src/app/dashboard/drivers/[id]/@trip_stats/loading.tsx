import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TripStatsLoading() {
  return (
    <div className="grid gap-4 grid-cols-3">
      {Array(3).fill(0).map((_, i) => (
        <Card key={i} className="bg-background/95 shadow-sm">
          <CardHeader className="pb-2 pt-4">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="py-0">
            <Skeleton className="h-8 w-12" />
          </CardContent>
          <CardFooter className="pt-2 pb-4">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 