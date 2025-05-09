import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PageContainer from '@/components/layout/page-container';

export default function LoadingTodaList() {
  return (
    <PageContainer scrollable={false} className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">TODA Management</h2>
            <p className="text-muted-foreground">
              Manage Tricycle Operators and Drivers Associations, their fare prices, and special trip settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button disabled variant="outline">
              <Skeleton className="h-4 w-4 mr-2 rounded-full" />
              Special Trip Settings
            </Button>
            <Button disabled>
              <Skeleton className="h-4 w-4 mr-2 rounded-full" />
              New TODA
            </Button>
          </div>
        </div>

        <Card className="bg-background/95 shadow-sm w-full">
          <CardHeader className="py-1 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Registered TODAs</CardTitle>
              <CardDescription>
                Manage tricycle associations, fare rates, and special trip settings
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="overflow-x-auto">
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-8 w-16 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
} 