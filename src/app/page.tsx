import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('idToken')?.value;
  if (!idToken) {
    redirect('/sign-in');
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) {
    redirect('/sign-in');
  }
  redirect('/dashboard/overview');
}
