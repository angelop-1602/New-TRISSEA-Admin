'use client';

import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { passengers } from '@/features/passengers/data';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

export default function PassengerProfileLayout({
  params,
  profile_info,
  trip_stats,
  recent_trips,
  incident_reports
}: {
  params: Promise<{ id: string }>;
  profile_info: React.ReactNode;
  trip_stats: React.ReactNode;
  recent_trips: React.ReactNode;
  incident_reports: React.ReactNode;
}) {
  const router = useRouter();
  
  // Access params properly with React.use()
  const { id: passengerId } = React.use(params);
  const passenger = passengers.find(p => p.id === passengerId);

  if (!passenger) {
    notFound();
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <PageContainer>
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <Icons.arrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">Passenger Profile</h2>
            <p className="text-muted-foreground">
              View detailed information about {passenger.name}
            </p>
          </div>
          <Link href={`/dashboard/passengers/${passenger.id}/edit`}>
            <Button>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Passenger Information - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {profile_info}
            {incident_reports}
          </div>

          {/* Trip Statistics and Recent Trips - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Statistics Cards */}
            {trip_stats}

            {/* Recent/Current Trips */}
            {recent_trips}
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 