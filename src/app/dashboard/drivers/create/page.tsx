'use client';

import { DriverForm } from '@/features/drivers/components/driver-form';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function CreateDriverPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-col space-y-4 w-full">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/drivers">
              <Button variant="ghost" size="sm">
                <IconArrowLeft className="h-4 w-4 mr-1" />
                Back to Drivers
              </Button>
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Add New Driver</h2>
          <p className="text-muted-foreground">
            Create a new driver account in the system
          </p>
        </div>
        <DriverForm />
      </div>
    </PageContainer>
  );
} 