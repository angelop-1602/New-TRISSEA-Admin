import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  const { idToken } = await request.json();
  try {
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    if (decodedToken.uid !== process.env.ADMIN_UID) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
} 