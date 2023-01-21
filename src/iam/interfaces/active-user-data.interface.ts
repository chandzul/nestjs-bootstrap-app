import { Role } from '../../users/enums/role.enum';

export interface ActiveUserData {
  /**
   * The "subject" of the token
   */
  sub: number;

  /**
   * The subject's (user) email.
   */
  email: string;

  /**
   * The subject's (user) role
   */
  role: Role;
}
