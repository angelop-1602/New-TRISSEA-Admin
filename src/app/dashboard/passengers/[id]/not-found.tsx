'use client';

import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function PassengerNotFound() {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold tracking-tight">Passenger Not Found</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          The passenger profile you are looking for does not exist or has been removed.
        </p>
        <Button onClick={handleBack}>
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </PageContainer>
  );
} 