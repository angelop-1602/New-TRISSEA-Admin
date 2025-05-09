'use client';

import { PassengersTable } from '@/features/passengers/components/passengers-table';
import PageContainer from '@/components/layout/page-container';

export default function PassengersPage() {
  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Passengers</h2>
            <p className="text-muted-foreground">
              Manage and monitor all registered passengers
            </p>
          </div>
        </div>
        <PassengersTable />
      </div>
    </PageContainer>
  );
} 