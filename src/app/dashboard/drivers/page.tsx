'use client';

import { DriversTable } from '@/features/drivers/components/drivers-table';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export default function DriversPage() {
  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Drivers</h2>
            <p className="text-muted-foreground">
              Manage and monitor all registered drivers
            </p>
          </div>
          <Link href="/dashboard/drivers/create">
            <Button>
              <IconPlus className="mr-2 h-4 w-4" />
              New Driver
            </Button>
          </Link>
        </div>
        <DriversTable />
      </div>
    </PageContainer>
  );
} 