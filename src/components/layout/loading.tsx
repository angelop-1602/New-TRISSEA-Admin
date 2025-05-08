import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type LoadingVariant = 'dashboard' | 'table' | 'form' | 'simple';

interface LoadingProps {
  variant?: LoadingVariant;
  showSidebar?: boolean;
  className?: string;
}

export default function Loading({ variant = 'dashboard', showSidebar = true, className }: LoadingProps) {
  const renderContent = () => {
    switch (variant) {
      case 'table':
        return (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
            {/* Table Content */}
            <div className="rounded-lg border">
              <div className="border-b bg-card p-4">
                <div className="flex items-center gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-[120px]" />
                  ))}
                </div>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border-b p-4">
                  <div className="flex items-center gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-[120px]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-6 p-6">
            <Skeleton className="h-8 w-[300px]" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>
        );

      case 'simple':
        return (
          <div className="flex flex-col space-y-4 p-6">
            <Skeleton className="h-8 w-[200px]" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                  <Skeleton className="h-4 w-[140px] mb-4" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="space-y-4">
              <Skeleton className="h-8 w-[300px]" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card p-6">
                    <Skeleton className="h-4 w-[140px] mb-4" />
                    <Skeleton className="h-8 w-[100px]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <Skeleton className="h-[400px] rounded-lg" />
              </div>
              <div className="col-span-3">
                <Skeleton className="h-[400px] rounded-lg" />
              </div>
              <div className="col-span-4">
                <Skeleton className="h-[400px] rounded-lg" />
              </div>
              <div className="col-span-3">
                <Skeleton className="h-[400px] rounded-lg" />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {showSidebar && (
        /* Sidebar Skeleton */
        <div className="fixed left-0 top-0 bottom-0 w-16 border-r bg-card">
          <div className="flex h-full flex-col items-center space-y-4 py-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Skeleton */}
      <div className={cn(showSidebar ? "pl-16" : "")}>
        {/* Header Skeleton */}
        <div className="border-b bg-card">
          <div className="flex h-14 items-center px-4">
            <Skeleton className="h-8 w-[200px]" />
            <div className="ml-auto flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-4 md:p-6 space-y-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 