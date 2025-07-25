'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signInFormSchema, signUpFormSchema } from '@/lib/zod/schemas';
import z from 'zod';

export async function signup(formData: z.infer<typeof signUpFormSchema>) {
  const supabase = await createClient();

  const validationResult = signUpFormSchema.safeParse(formData);
  if (validationResult.error) {
    return {
      status: false,
      message: validationResult.error.message,
    };
  }

  const cleanData = {
    email: formData['email'],
    password: formData['password'],
  };

  const { error } = await supabase.auth.signUp(cleanData);

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  } else {
    return {
      status: true,
      message: 'Sign Up Successful. Please verify your email.',
    };
  }
}

export async function signin(formData: z.infer<typeof signInFormSchema>) {
  const supabase = await createClient();

  const validationResult = signInFormSchema.safeParse(formData);
  if (validationResult.error) {
    return {
      status: false,
      message: validationResult.error.message,
    };
  }

  const cleanData = {
    email: formData['email'],
    password: formData['password'],
  };

  const { error } = await supabase.auth.signInWithPassword(cleanData);

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  } else {
    return {
      status: true,
      message: 'Sign in Successful.',
    };
  }
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect('/signin');
}
