export interface User {
  address: string;
  company_name: string;
  created_at: string;
  description: string;
  id: number;
  role: string;
  updated_at: string;
  username: string;
}

export interface EditUser {
  username: string;
  company_name: string;
  address: string;
  description: string;
}
