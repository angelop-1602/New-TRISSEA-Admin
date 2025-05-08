'use client';

import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAdmin } from '@/hooks/use-admin';
import ProfileCreateForm from '@/features/profile/components/profile-create-form';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { loading, needsProfile } = useAdmin();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (needsProfile) {
    return (
      <div className="container mx-auto py-10">
        <ProfileCreateForm initialData={null} />
      </div>
    );
  }

  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
