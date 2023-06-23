import { JudgingPermission } from '@/types';

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  birth: string;
  is_admin: boolean;
  email_enable: boolean;
  judging_permissions: JudgingPermission[];
  created_at: string;
  updated_at: string;
}
