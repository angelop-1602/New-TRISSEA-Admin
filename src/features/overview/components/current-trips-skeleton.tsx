import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export function CurrentTripsSkeleton() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <Skeleton className='h-6 w-[140px]' /> {/* CardTitle */}
        <Skeleton className='h-4 w-[180px]' /> {/* CardDescription */}
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='border rounded-md p-5'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Skeleton className='h-9 w-9 rounded-full mr-3' /> {/* Avatar */}
                  <div>
                    <Skeleton className='h-4 w-[100px] mb-2' /> {/* Driver Name */}
                    <Skeleton className='h-3 w-[80px]' /> {/* Vehicle Model */}
                  </div>
                </div>
                <div className='flex items-center'>
                  <Skeleton className='h-4 w-4 rounded-full mr-1' /> {/* Icon */}
                  <Skeleton className='h-4 w-[120px]' /> {/* Destination */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full flex justify-center'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-10 w-24' /> {/* Previous button */}
            <Skeleton className='h-10 w-10' /> {/* Page numbers */}
            <Skeleton className='h-10 w-10' /> {/* Page numbers */}
            <Skeleton className='h-10 w-10' /> {/* Page numbers */}
            <Skeleton className='h-10 w-24' /> {/* Next button */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CurrentTripsSkeleton; 