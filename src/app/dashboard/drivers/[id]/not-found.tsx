import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';

export default function DriverNotFound() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold">Driver Not Found</h2>
        <p className="text-muted-foreground mb-6 mt-2">
          The driver you're looking for doesn't exist or was removed
        </p>
        <Link href="/dashboard/drivers">
          <Button>
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            Back to Drivers
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
} 