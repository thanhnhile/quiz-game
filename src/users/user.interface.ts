import { Role } from 'src/utils/enums';

export interface User extends Document {
  readonly name: string;
  readonly role: Role;
}
