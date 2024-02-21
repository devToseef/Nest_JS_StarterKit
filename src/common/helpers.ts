import { User } from 'users/users.entity';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  CAPTAIN = 'CAPTAIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface ICreateAccount {
  user: User;
  token: string;
}
