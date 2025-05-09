import { delay } from '@/constants/mock-api';
import { IncidentReports } from '@/features/overview/components/incident-reports';

export default async function IncidentReportsPage() {
  await delay(4000);
  return <IncidentReports />;
} 