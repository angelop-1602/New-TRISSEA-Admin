import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

interface AdminData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export function useAdmin() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAdminData(null);
        setLoading(false);
        router.push('/sign-in');
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          const data = adminDoc.data() as AdminData;
          setAdminData(data);
          // Check if profile is complete
          setNeedsProfile(!data.displayName);
        } else {
          // Create initial admin document if it doesn't exist
          const newAdminData: AdminData = {
            uid: user.uid,
            email: user.email!,
            photoURL: '/logo/final-logo.png' // Set default profile picture
          };
          await setDoc(doc(db, 'admins', user.uid), newAdminData);
          setAdminData(newAdminData);
          setNeedsProfile(true);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        if (error instanceof Error && error.message.includes('permissions')) {
          router.push('/sign-in');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const updateAdminData = async (data: Partial<AdminData>) => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/sign-in');
      return false;
    }

    try {
      await updateDoc(doc(db, 'admins', user.uid), data);
      setAdminData(prev => prev ? { ...prev, ...data } : null);
      setNeedsProfile(false);
      return true;
    } catch (error) {
      console.error('Error updating admin data:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    adminData,
    loading,
    needsProfile,
    updateAdminData,
    handleLogout,
  };
} 