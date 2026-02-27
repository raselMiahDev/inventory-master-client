export type UserRole = 'admin' | 'in_charge';

export interface IUser {
  _id: string;
  username: string;
  role: UserRole;
  depotId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}