'use client';

import { useParams, useRouter } from 'next/navigation';
import { PassengerForm } from '@/features/passengers/components/passenger-form';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { passengers } from '@/features/passengers/data';
import { notFound } from 'next/navigation';

export default function EditPassengerPage() {
  const params = useParams();
  const router = useRouter();
  const passengerId = params.id as string;
  const passenger = passengers.find(p => p.id === passengerId);
  
  const handleBack = () => {
    router.back();
  };

  if (!passenger) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <Icons.arrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">Edit Passenger</h2>
            <p className="text-muted-foreground">
              Update information for {passenger.name}
            </p>
          </div>
        </div>

        <PassengerForm passenger={passenger} />
      </div>
    </PageContainer>
  );
} 