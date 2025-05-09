'use client';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import TodayDate from '@/components/ui/time-today';
import { Button } from '@/components/ui/button';

export default function OverViewLayout({
  current_trips,
  pickup_zone,
  trip_performance,
  area_stats,
  incident_reports
}: {
  current_trips: React.ReactNode;
  pickup_zone: React.ReactNode;
  trip_performance: React.ReactNode;
  area_stats: React.ReactNode;
  incident_reports: React.ReactNode;
}) {
  const [hideRevenue, setHideRevenue] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before using localStorage
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard');
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
    } else {
      // Set flag in localStorage for future visits
      localStorage.setItem('hasVisitedDashboard', 'true');
      setIsFirstVisit(true);
    }
  }, []);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {isFirstVisit ? 'Hi, Welcome Admin👋' : 'Hi, Welcome back Admin👋'}
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardDescription>Total Revenue</CardDescription>
              </div>
              <CardTitle className='@[250px]/card:text-3xl'>
                <div className='flex items-center gap-2'>
                  <span className='text-2xl font-semibold tabular-nums'>
                    {hideRevenue ? '********' : '₱10,002,250.00'}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setHideRevenue(!hideRevenue)}
                    className='border-primary/40 hover:border-primary flex h-8 w-8 items-center justify-center p-1'
                    title={hideRevenue ? 'Show revenue' : 'Hide revenue'}
                  >
                    {hideRevenue ? (
                      <Icons.eyeOff className='text-muted-foreground h-5 w-5' />
                    ) : (
                      <Icons.eye className='text-primary h-5 w-5' />
                    )}
                  </Button>
                </div>
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Trending up this month <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription className='flex items-center gap-1.5'>
                <span>Today Trips</span>
              </CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                234
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.calendar className='h-5 w-5' />
                  <TodayDate />
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Down 20% this period <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Active Drivers</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Active drivers <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Drivers are active</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Trips</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                10,021
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Steady performance increase{' '}
                <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{trip_performance}</div>
          <div className='col-span-4 md:col-span-3'>{pickup_zone}</div>
          <div className='col-span-4'>{current_trips}</div>
          <div className='col-span-4 md:col-span-3'>{incident_reports}</div>
        </div>
      </div>
    </PageContainer>
  );
}
