export type UserRole =
  | 'FIELD_OFFICER'
  | 'GOVERNMENT_OPERATOR'
  | 'GOVERNMENT_ADMIN'
  | 'LOGISTICS_OPERATOR';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  organization_id: string;
  assigned_district?: string;
  assigned_state?: string;
}
