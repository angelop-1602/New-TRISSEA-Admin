'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAdmin } from '@/hooks/use-admin';
import * as z from 'zod';

const profileSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters' })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormType {
  initialData: any | null;
}

const ProfileCreateForm: React.FC<ProfileFormType> = ({ initialData }) => {
  const router = useRouter();
  const { updateAdminData } = useAdmin();
  const [loading, setLoading] = useState(false);
  const title = 'Complete Your Profile';
  const description = 'Please enter your name to complete your profile setup.';

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialData?.displayName || ''
    }
  });

  const processForm: SubmitHandler<ProfileFormValues> = async (data) => {
    setLoading(true);
    try {
      const success = await updateAdminData(data);
      if (success) {
        router.push('/dashboard/overview');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-3'>
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='John Doe'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Complete Profile
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileCreateForm;
