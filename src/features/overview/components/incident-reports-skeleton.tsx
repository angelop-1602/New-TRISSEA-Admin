import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function IncidentReportsSkeleton() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <Skeleton className='h-5 w-5 mr-2 rounded-full' /> {/* Icon */}
              <Skeleton className='h-6 w-[180px]' /> {/* Title */}
            </div>
            <Skeleton className='h-4 w-[220px] mt-1' /> {/* Description */}
          </div>
          <Skeleton className='h-6 w-[100px] rounded-full' /> {/* Badge */}
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='border rounded-md p-4'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                  <Skeleton className='h-9 w-9 rounded-full mr-3' /> {/* Avatar */}
                  <div>
                    <Skeleton className='h-4 w-[150px] mb-2' /> {/* Name */}
                    <div className="flex items-center gap-2">
                      <Skeleton className='h-3 w-[80px]' /> {/* Category */}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <Skeleton className='h-5 w-[90px] rounded-md' /> {/* Status */}
                  <Skeleton className='h-3 w-[80px] mt-1' /> {/* Date */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full flex justify-center'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-8 rounded-md' /> {/* Previous button */}
            <Skeleton className='h-8 w-8 rounded-md' /> {/* Page numbers */}
            <Skeleton className='h-8 w-8 rounded-md' /> {/* Page numbers */}
            <Skeleton className='h-8 w-8 rounded-md' /> {/* Page numbers */}
            <Skeleton className='h-8 w-8 rounded-md' /> {/* Next button */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default IncidentReportsSkeleton; 