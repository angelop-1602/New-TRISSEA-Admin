'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IconAlertCircle } from '@tabler/icons-react';

export default function PickupZonesError({ error }: { error: Error }) {
  return (
    <Alert variant='destructive'>
      <IconAlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to load pickup zones data: {error.message}
      </AlertDescription>
    </Alert>
  );
} 