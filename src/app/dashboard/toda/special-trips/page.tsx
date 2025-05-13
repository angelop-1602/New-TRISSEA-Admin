'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  IconArrowLeft,
  IconCloudRain,
  IconMoon,
  IconCalendarEvent,
  IconCar,
  IconInfoCircle
} from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';
import { defaultSpecialTripSettings } from '@/features/toda/data';
import { formatCurrency } from '@/features/toda/utils';

export default function GlobalSpecialTripsPage() {
  const router = useRouter();

  const [specialTrips, setSpecialTrips] = useState(defaultSpecialTripSettings);
  const [sampleDistance, setSampleDistance] = useState(3); // Default 3km trip
  const [appliedSpecials, setAppliedSpecials] = useState<string[]>([]);
  const [baseFare, setBaseFare] = useState(25.0); // Example base fare
  const [perKmRate, setPerKmRate] = useState(7.5); // Example per km rate

  const handleBack = () => {
    router.back();
  };
  const handleToggleSetting = (settingId: string) => {
    setSpecialTrips((prev) =>
      prev.map((setting) => {
        if (setting.id === settingId) {
          return { ...setting, isActive: !setting.isActive };
        }
        return setting;
      })
    );
  };

  const handleUpdateMultiplier = (settingId: string, newMultiplier: number) => {
    // Ensure multiplier is valid (greater than 1.0)
    const safeMultiplier = Math.max(1.01, newMultiplier);

    setSpecialTrips((prev) =>
      prev.map((setting) => {
        if (setting.id === settingId) {
          return { ...setting, multiplier: safeMultiplier };
        }
        return setting;
      })
    );
  };

  const handleToggleAppliedSpecial = (specialId: string) => {
    setAppliedSpecials((prev) => {
      if (prev.includes(specialId)) {
        return prev.filter((id) => id !== specialId);
      } else {
        return [...prev, specialId];
      }
    });
  };

  // Calculate basic fare
  const calculateBasicFare = (distance: number): number => {
    return baseFare + distance * perKmRate;
  };

  // Calculate fare with applied special settings
  const calculateFareWithSpecials = (
    distance: number,
    appliedSpecialIds: string[]
  ): {
    baseFare: number;
    totalFare: number;
    breakdown: Array<{ name: string; amount: number }>;
  } => {
    const basicFare = calculateBasicFare(distance);
    let totalFare = basicFare;
    const breakdown = [{ name: 'Base Fare', amount: basicFare }];

    // Get active special settings that are in the appliedSpecialIds list
    const activeSpecials = specialTrips.filter(
      (setting) => setting.isActive && appliedSpecialIds.includes(setting.id)
    );

    // Apply each special setting
    activeSpecials.forEach((special) => {
      const specialAmount = basicFare * (special.multiplier - 1);
      totalFare += specialAmount;
      breakdown.push({
        name: special.name,
        amount: parseFloat(specialAmount.toFixed(2))
      });
    });

    return {
      baseFare: basicFare,
      totalFare: parseFloat(totalFare.toFixed(2)),
      breakdown
    };
  };

  const fareCalculation = calculateFareWithSpecials(
    sampleDistance,
    appliedSpecials
  );

  return (
    <PageContainer className='w-full max-w-full'>
      <div className='flex w-full flex-col space-y-6'>
        <div className='flex w-full items-center justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' onClick={handleBack}>
                <IconArrowLeft className='mr-1 h-4 w-4' />
                Back
              </Button>
            </div>
            <h2 className='mt-2 text-2xl font-bold tracking-tight'>
              Special Trip Settings
            </h2>
            <p className='text-muted-foreground'>
              Configure special trip conditions and fare multipliers for all
              TODAs
            </p>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Settings Panel - Left Column */}
          <div className='space-y-6 lg:col-span-2'>
            <Card className='bg-background/95 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Special Trip Conditions
                </CardTitle>
                <CardDescription>
                  Configure fare multipliers that will apply to all TODAs
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {specialTrips.map((setting) => {
                  const Icon = setting.icon;
                  const multiplierPercentage = (
                    (setting.multiplier - 1) *
                    100
                  ).toFixed(0);

                  return (
                    <div
                      key={setting.id}
                      className='space-y-4 rounded-lg border p-4'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-3'>
                          <div
                            className={`bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full`}
                          >
                            <Icon className='h-5 w-5' />
                          </div>
                          <div>
                            <h4 className='font-medium'>{setting.name}</h4>
                            <p className='text-muted-foreground text-sm'>
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.isActive}
                          onCheckedChange={() =>
                            handleToggleSetting(setting.id)
                          }
                        />
                      </div>

                      <Separator />

                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <Label className='text-sm font-medium'>
                            Fare Multiplier
                          </Label>
                          <div className='w-20'>
                            <Input
                              type='number'
                              value={setting.multiplier}
                              min={1.01}
                              max={3}
                              step={0.05}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                  handleUpdateMultiplier(setting.id, value);
                                }
                              }}
                              className='h-8'
                            />
                          </div>
                        </div>

                        <div className='space-y-1'>
                          <div className='flex justify-between text-sm'>
                            <span>1.0×</span>
                            <span>1.5×</span>
                            <span>2.0×</span>
                            <span>2.5×</span>
                            <span>3.0×</span>
                          </div>
                          <Slider
                            value={[setting.multiplier]}
                            min={1}
                            max={3}
                            step={0.05}
                            onValueChange={(values) => {
                              handleUpdateMultiplier(setting.id, values[0]);
                            }}
                            disabled={!setting.isActive}
                          />
                        </div>

                        <div className='text-muted-foreground text-sm'>
                          This multiplier will increase fares by{' '}
                          {multiplierPercentage}% during{' '}
                          {setting.name.toLowerCase()} conditions.
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setSpecialTrips([...defaultSpecialTripSettings]);
                  }}
                >
                  Reset to Defaults
                </Button>
                <Button onClick={() => router.push(`/dashboard/toda`)}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Preview Panel - Right Column */}
          <div className='space-y-6 lg:col-span-1'>
            <Card className='bg-background/95 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg'>Fare Calculator</CardTitle>
                <CardDescription>
                  See how special conditions affect fares
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>
                    Trip Distance (km)
                  </Label>
                  <div className='flex items-center gap-2'>
                    <Slider
                      value={[sampleDistance]}
                      min={1}
                      max={10}
                      step={0.5}
                      onValueChange={(values) => setSampleDistance(values[0])}
                      className='flex-1'
                    />
                    <div className='w-16'>
                      <Input
                        type='number'
                        value={sampleDistance}
                        min={0.5}
                        max={20}
                        step={0.5}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            setSampleDistance(value);
                          }
                        }}
                        className='h-8'
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>
                    Apply Special Conditions
                  </Label>
                  <div className='space-y-2'>
                    {specialTrips
                      .filter((s) => s.isActive)
                      .map((setting) => {
                        const Icon = setting.icon;
                        return (
                          <div
                            key={setting.id}
                            className={`flex items-center justify-between rounded border p-2 ${appliedSpecials.includes(setting.id) ? 'bg-primary/5 border-primary/50' : ''}`}
                            onClick={() =>
                              handleToggleAppliedSpecial(setting.id)
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <div className='flex items-center gap-2'>
                              <Icon className='text-muted-foreground h-4 w-4' />
                              <span className='text-sm'>{setting.name}</span>
                            </div>
                            <div className='text-sm font-medium'>
                              +{((setting.multiplier - 1) * 100).toFixed(0)}%
                            </div>
                          </div>
                        );
                      })}

                    {specialTrips.filter((s) => s.isActive).length === 0 && (
                      <div className='text-muted-foreground py-2 text-center text-sm'>
                        No active special conditions available
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Fare Breakdown</Label>
                  <div className='space-y-2'>
                    {fareCalculation.breakdown.map((item, index) => (
                      <div key={index} className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>
                          {item.name}
                        </span>
                        <span className='font-medium'>
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    ))}

                    <Separator />

                    <div className='flex justify-between text-base'>
                      <span className='font-medium'>Total Fare</span>
                      <span className='font-bold'>
                        {formatCurrency(fareCalculation.totalFare)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-background/95 shadow-sm'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center text-sm'>
                  <IconInfoCircle className='text-muted-foreground mr-2 h-4 w-4' />
                  About Global Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground space-y-2 text-sm'>
                  <p>
                    - These settings apply to <strong>all TODAs</strong> in the
                    system
                  </p>
                  <p>
                    - Changes here will affect fare calculations across all
                    areas
                  </p>
                  <p>
                    - Special conditions can be activated during specific
                    weather events, holidays or other situations
                  </p>
                  <p>
                    - Administrators can toggle these settings when conditions
                    arise
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
