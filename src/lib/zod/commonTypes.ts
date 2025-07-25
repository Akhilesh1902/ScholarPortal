export interface GenerealResponse {
  status: boolean;
  message: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  status: number;
}

export interface UserUpload {
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
}

export interface Status {
  id: number;
  status: string;
}

export interface Role {
  id: number;
  role_label: string;
}

export interface GetAllStatusResult {
  status: boolean;
  message: string;
  data?: Status[];
}
export interface GetAllRolesResult {
  status: boolean;
  message: string;
  data?: Role[];
}
