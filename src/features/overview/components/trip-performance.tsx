'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { format, addDays, isWithinInterval, startOfYear, endOfYear, isAfter, isFuture, 
  startOfMonth, endOfMonth, subMonths, differenceInDays } from 'date-fns';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { IconChartBar } from '@tabler/icons-react';

export const description = 'An interactive bar chart with date range filtering';

// Define types for our data
interface TripData {
  date: string;
  completed: number;
  cancelled: number;
}

// Function to generate data from Jan 2024 to current date
const generateData = (): TripData[] => {
  const data: TripData[] = [];
  const startDate = new Date('2024-01-01');
  const today = new Date();
  let currentDate = startDate;

  while (currentDate <= today) {
    // Generate random data with some variation based on weekday
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Weekend vs weekday variation (weekends have more trips)
    const baseCompleted = isWeekend ? 320 : 280;
    const variation = isWeekend ? 80 : 50;
    
    const completed = Math.floor(baseCompleted + (Math.random() * variation * 2) - variation);
    
    // Cancellation rate varies between 5-15%
    const cancelledPercent = Math.random() * (0.15 - 0.05) + 0.05;
    const cancelled = Math.floor(completed * cancelledPercent);

    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      completed,
      cancelled
    });

    currentDate = addDays(currentDate, 1);
  }

  return data;
};

// Generate data up to current date
const fullData = generateData();

const chartConfig = {
  views: {
    label: 'Total Trips'
  },
  completed: {
    label: 'Completed',
    color: 'var(--primary)'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'var(--destructive)'
  }
} satisfies ChartConfig;

export function TripPerformance() {
  const [activeChart, setActiveChart] = 
    React.useState<keyof typeof chartConfig>('completed');
  
  // Date range state - default to last 30 days
  const today = new Date();
  const [startDate, setStartDate] = React.useState<Date>(subMonths(today, 1));
  const [endDate, setEndDate] = React.useState<Date>(today);
  
  // Filter data based on date range
  const filteredData = React.useMemo(() => {
    return fullData.filter((item) => {
      const itemDate = new Date(item.date);
      return isWithinInterval(itemDate, { 
        start: startDate, 
        end: endDate 
      });
    });
  }, [startDate, endDate]);

  // Calculate totals for the filtered data
  const total = React.useMemo(
    () => ({
      completed: filteredData.reduce((acc, curr) => acc + curr.completed, 0),
      cancelled: filteredData.reduce((acc, curr) => acc + curr.cancelled, 0)
    }),
    [filteredData]
  );

  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Selected date range text
  const dateRangeText = React.useMemo(() => {
    const days = differenceInDays(endDate, startDate) + 1;
    
    if (days <= 1) return "Today";
    if (days <= 31) return `Last ${days} days`;
    
    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === 0 &&
      endDate.getMonth() === 11 &&
      endDate.getDate() === 31
    ) {
      return `Full Year ${startDate.getFullYear()}`;
    }

    if (
      startDate.getDate() === 1 && 
      endDate.getDate() === new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
    ) {
      const monthCount = (endDate.getMonth() - startDate.getMonth()) + 
        (12 * (endDate.getFullYear() - startDate.getFullYear())) + 1;
      
      if (monthCount === 1) {
        return format(startDate, "MMMM yyyy");
      } else {
        return `${format(startDate, "MMM")} - ${format(endDate, "MMM yyyy")}`;
      }
    }

    // Default format
    return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
  }, [startDate, endDate]);

  // Predefined date ranges
  const setDateRange = (days: number) => {
    setIsLoading(true);
    const to = new Date();
    const from = addDays(to, -days + 1);
    setStartDate(from);
    setEndDate(to);
    setTimeout(() => setIsLoading(false), 300);
  };

  const setMonthRange = (months: number) => {
    setIsLoading(true);
    const to = new Date();
    const from = subMonths(to, months - 1);
    setStartDate(startOfMonth(from));
    setEndDate(to);
    setTimeout(() => setIsLoading(false), 300);
  };

  const setFullYear = (year?: number) => {
    setIsLoading(true);
    const selectedYear = year || new Date().getFullYear();
    setStartDate(startOfYear(new Date(selectedYear, 0, 1)));
    setEndDate(endOfYear(new Date(selectedYear, 0, 1)));
    setTimeout(() => setIsLoading(false), 300);
  };

  const setAllData = () => {
    setIsLoading(true);
    setStartDate(new Date('2024-01-01'));
    setEndDate(new Date());
    setTimeout(() => setIsLoading(false), 300);
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card'>
      <CardHeader className='flex flex-col space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-4'>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <IconChartBar className="h-6 w-6 mr-2 text-muted-foreground" />
                Trip Performance
              </CardTitle>
              <CardDescription>
                <span>
                  {dateRangeText}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-xs text-muted-foreground font-normal h-8 border-dashed"
                  >
                    <Icons.calendar className="mr-2 h-4 w-4" />
                    {dateRangeText}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="end">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 font-medium text-sm mb-1">Time Period</div>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setDateRange(7)}
                    >
                      Last 7 days
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setDateRange(30)}
                    >
                      Last 30 days
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setMonthRange(3)}
                    >
                      Last 3 months
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setMonthRange(6)}
                    >
                      Last 6 months
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setFullYear()}
                    >
                      This Year
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs h-8"
                      onClick={() => setAllData()}
                    >
                      All Data
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className='flex'>
          {['completed', 'cancelled'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 relative'>
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        )}
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={filteredData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillCompletedBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
              <linearGradient id='fillCancelledBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--destructive)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--destructive)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return format(date, 'MMM d');
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return format(new Date(value), 'MMM d, yyyy');
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={activeChart === 'completed' ? 'url(#fillCompletedBar)' : 'url(#fillCancelledBar)'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
} 