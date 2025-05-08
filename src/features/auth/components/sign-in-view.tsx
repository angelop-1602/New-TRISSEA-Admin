'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '@/lib/firebase/config';
import { isAdmin } from '@/lib/admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export default function SignInViewPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      if (!isAdmin(user.uid)) {
        await signOut(auth);
        setError('Access denied. You are not authorized to sign in.');
      } else {
        // Get the ID token and set it in a secure HTTP-only cookie
        const idToken = await user.getIdToken();
        await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken })
        });
        window.location.href = '/dashboard/overview';
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        {/* Green background */}
        {/* Video background with overlay */}
        <div className='absolute inset-0 overflow-hidden'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='absolute inset-0 w-full h-full object-cover'
          >
            <source src="/vid/final-vidMontage.mp4" type="video/mp4" />
          </video>
          {/* Overlay with opacity */}
          <div className='absolute inset-0 bg-green-900/90' />
        </div>
        
        {/* Content */}
      
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This starter template has saved me countless hours of work
              and helped me deliver projects to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className='text-sm'>Random Dude</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
   
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
        <div className='flex items-center w-50 pb-10'>
        <img src="/final-logo.png" alt="TRISSEA Logo" />
        </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email...'
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password...'
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className='text-sm text-red-500'>{error}</div>}
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
