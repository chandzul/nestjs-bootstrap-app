import { BaseEntity } from 'src/config/base.entity';
import { Entity, Column } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;
}
