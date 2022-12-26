import { BaseEntity } from 'src/config/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
