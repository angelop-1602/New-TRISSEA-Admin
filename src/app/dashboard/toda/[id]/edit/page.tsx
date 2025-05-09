'use client';

import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { todas } from '@/features/toda/data';
import { notFound } from 'next/navigation';

export default function TodaEditPage() {
  const router = useRouter();
  const params = useParams();
  // Using a safer approach without forcing Promise typing
  const todaId = params.id as string;
  const toda = todas.find(t => t.id === todaId);
  
  const handleBack = () => {
    router.back();
  };

  if (!toda) {
    notFound();
  }

  return (
    <PageContainer className="w-full max-w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <IconArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">Edit TODA</h2>
            <p className="text-muted-foreground">
              Update information for {toda.name}
            </p>
          </div>
        </div>
        
        {/* TODA Edit Form would go here */}
        <div className="bg-background/95 shadow-sm p-6 rounded-lg">
          <p className="text-center text-muted-foreground mb-4">
            TODA Edit Form Content
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
 