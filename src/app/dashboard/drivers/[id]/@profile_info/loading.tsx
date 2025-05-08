import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileInfoLoading() {
  return (
    <Card className="bg-background/95 shadow-sm overflow-hidden">
      <div className="bg-primary/40 h-24"></div>
      <div className="px-6 pb-6 -mt-12">
        <Skeleton className="h-24 w-24 rounded-full" />
        
        <Skeleton className="h-6 w-32 mt-6" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
            <div className="space-y-1 w-full">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
            <div className="space-y-1 w-full">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
            <div className="space-y-1 w-full">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 