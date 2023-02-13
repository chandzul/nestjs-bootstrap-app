import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'coffees' })
export class Coffee extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;
}
