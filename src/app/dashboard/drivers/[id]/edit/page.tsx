'use client';

import { DriverForm } from '@/features/drivers/components/driver-form';
import PageContainer from '@/components/layout/page-container';
import { useParams, useRouter } from 'next/navigation';
import { getDriverById } from '@/features/shared/data/drivers';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function EditDriverPage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;
  
  // In a real app, you would fetch this data from an API
  const driver = getDriverById(driverId);
  
  const handleBack = () => {
    router.back();
  };

  if (!driver) {
    return (
      <PageContainer scrollable={false}>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold">Driver Not Found</h2>
          <p className="text-muted-foreground mb-4">The driver you're looking for doesn't exist or was removed</p>
          <Button onClick={handleBack}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-col space-y-4 w-full">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <IconArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Edit Driver</h2>
          <p className="text-muted-foreground">
            Update information for {driver.name}
          </p>
        </div>
        <DriverForm initialData={driver} isEditing />
      </div>
    </PageContainer>
  );
} 