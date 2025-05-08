import PageContainer from '@/components/layout/page-container';
import { drivers } from '@/features/drivers/data';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function DriverProfileLayout({
  params,
  profile_info,
  trip_stats,
  recent_trips
}: {
  params: { id: string };
  profile_info: React.ReactNode;
  trip_stats: React.ReactNode;
  recent_trips: React.ReactNode;
}) {
  const driverId = params.id;
  const driver = drivers.find(d => d.id === driverId);

  if (!driver) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/drivers">
                <Button variant="ghost" size="sm">
                  <Icons.arrowLeft className="h-4 w-4 mr-1" />
                  Back to Drivers
                </Button>
              </Link>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2">Driver Profile</h2>
            <p className="text-muted-foreground">
              View detailed information about {driver.name}
            </p>
          </div>
          <Link href={`/dashboard/drivers/${driver.id}/edit`}>
            <Button>
              <Icons.edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Driver Information - Left Column */}
          <div className="lg:col-span-1">
            {profile_info}
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