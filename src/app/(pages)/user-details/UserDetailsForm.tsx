'use client';

import { getAllRoles, uploadUserDetails } from '@/actions/data/dataActions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UserDetailsSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Role } from '@/lib/zod/commonTypes';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

interface Props {
  email: string;
}

export default function UserDetailsForm({ email }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      email: email,
      firstName: '',
      lastName: '',
      role: 1,
      status: 1,
    },
  });

  const handleFormSubmit = async (
    values: z.infer<typeof UserDetailsSchema>
  ) => {
    const res = await uploadUserDetails(values);
    if (res.status) {
      toast.success(res.message, { position: 'top-right' });
      redirect('/dashboard');
    } else {
      toast.error(res.message, { position: 'top-right' });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getAllRoles();
      setRoles(res.data!);
    };

    getData();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='grid grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='first name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='lastName'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='abc@mail.com'
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => {
            const currentStatus =
              roles.find((r) => r.id === field.value)?.role_label ?? '';
            return (
              <FormItem className='col-span-2'>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={currentStatus}
                    onValueChange={(val) => {
                      const selected = roles.find(
                        (item) => item.role_label === val
                      );
                      field.onChange(selected ? selected.id : 0);
                    }}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select a Role' />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.role_label}>
                          {item.role_label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
}
