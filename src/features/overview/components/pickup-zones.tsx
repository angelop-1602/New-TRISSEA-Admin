'use client';

import * as React from 'react';
import { IconTrendingUp, IconMap } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const pickupZoneData = [
  { zone: 'Zone 2', pickups: 355, fill: 'var(--primary)' },
  { zone: 'Zone 1', pickups: 245, fill: 'var(--primary-light)' },
  { zone: 'Zone 3', pickups: 180, fill: 'var(--primary-lighter)' },
  { zone: 'Zone 4', pickups: 155, fill: 'var(--primary-dark)' },
  { zone: 'Zone 5', pickups: 190, fill: 'var(--primary-darker)' }
];

const chartConfig = {
  pickups: {
    label: 'Pickups'
  },
  'Zone 1': {
    label: 'Zone 1',
    color: 'var(--primary-light)'
  },
  'Zone 2': {
    label: 'Zone 2',
    color: 'var(--primary)'
  },
  'Zone 3': {
    label: 'Zone 3',
    color: 'var(--primary-lighter)'
  },
  'Zone 4': {
    label: 'Zone 4',
    color: 'var(--primary-dark)'
  },
  'Zone 5': {
    label: 'Zone 5',
    color: 'var(--primary-darker)'
  }
} satisfies ChartConfig;

export function PickupZones() {
  const totalPickups = React.useMemo(() => {
    return pickupZoneData.reduce((acc, curr) => acc + curr.pickups, 0);
  }, []);

  // Calculate Zone 2 percentage
  const zone2Percentage = React.useMemo(() => {
    const zone2 = pickupZoneData.find(zone => zone.zone === 'Zone 2');
    return zone2 ? ((zone2.pickups / totalPickups) * 100).toFixed(1) : 0;
  }, [totalPickups]);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle className="flex items-center">
          <IconMap className="h-6 w-6 mr-2 text-muted-foreground" />
          Top Pickup Areas
        </CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Frequent pickup zones for efficient driver allocation
          </span>
          <span className='@[540px]/card:hidden'>Pickup distribution by zone</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {pickupZoneData.map((zoneItem, index) => (
                <linearGradient
                  key={zoneItem.zone}
                  id={`fill${zoneItem.zone.replace(/\s+/g, '')}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='var(--primary)'
                    stopOpacity={1 - index * 0.15}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--primary)'
                    stopOpacity={0.8 - index * 0.15}
                  />
                </linearGradient>
              ))}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pickupZoneData.map((item) => ({
                ...item,
                fill: `url(#fill${item.zone.replace(/\s+/g, '')})`
              }))}
              dataKey='pickups'
              nameKey='zone'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalPickups.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Pickups Logged
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Zone 2 dominates with {zone2Percentage}%{' '}
          <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Helps in planning dispatch coverage and driver allocation
        </div>
      </CardFooter>
    </Card>
  );
} 