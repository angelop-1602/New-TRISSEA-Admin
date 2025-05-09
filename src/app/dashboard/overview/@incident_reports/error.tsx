'use client';

import { Button } from '@/components/ui/button';
import { IconRefresh } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IncidentReportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Something went wrong</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full gap-4">
        <p>Failed to load incident reports</p>
        <Button variant="outline" onClick={() => reset()}>
          <IconRefresh className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
} 