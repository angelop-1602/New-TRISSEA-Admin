'use client';

import { DriverForm } from '@/features/drivers/components/driver-form';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import { drivers } from '@/features/drivers/data';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function EditDriverPage() {
  const params = useParams();
  const driverId = params.id as string;
  
  // In a real app, you would fetch this data from an API
  const driver = drivers.find(d => d.id === driverId);

  if (!driver) {
    return (
      <PageContainer scrollable={false}>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold">Driver Not Found</h2>
          <p className="text-muted-foreground mb-4">The driver you're looking for doesn't exist or was removed</p>
          <Link href="/dashboard/drivers">
            <Button>
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to Drivers
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-col space-y-4 w-full">
        <div>
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/drivers/${driver.id}`}>
              <Button variant="ghost" size="sm">
                <IconArrowLeft className="h-4 w-4 mr-1" />
                Back to Driver Profile
              </Button>
            </Link>
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