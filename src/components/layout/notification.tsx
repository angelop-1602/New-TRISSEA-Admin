'use client';

import { IconBell } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export function NotificationToggle() {

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle size-8'
    >
      <IconBell />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
