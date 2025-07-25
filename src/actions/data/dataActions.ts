'use server';
import { createClient } from '@/lib/supabase/server';
import {
  GenerealResponse,
  GetAllRolesResult,
  GetAllStatusResult,
  Role,
  Status,
  UserUpload,
} from '@/lib/zod/commonTypes';

export async function getAllStatus(): Promise<GetAllStatusResult> {
  const supabase = await createClient();
  const { data, error } = (await supabase.from('statuses').select('*')) as {
    data: Status[];
    error: any;
  };
  if (error) {
    return {
      status: false,
      message: 'Couldent fetch data',
    };
  }
  return {
    status: false,
    message: 'Successfully fetched data',
    data,
  };
}

export async function getAllRoles(): Promise<GetAllRolesResult> {
  const supabase = await createClient();
  const { data, error } = (await supabase.from('roles').select('*')) as {
    data: Role[];
    error: any;
  };
  if (error) {
    return {
      status: false,
      message: 'Couldent fetch data',
    };
  }
  return {
    status: false,
    message: 'Successfully fetched data',
    data,
  };
}

export async function uploadUserDetails(
  uplaodData: UserUpload
): Promise<GenerealResponse> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').insert(uplaodData);
  if (error) {
    return {
      status: false,
      message: 'Couldent upload data' + error.message,
    };
  }
  return {
    status: true,
    message: 'Successfully uploaded data',
  };
}
