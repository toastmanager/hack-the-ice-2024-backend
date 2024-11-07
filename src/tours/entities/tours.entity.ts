import { UserEntity } from 'src/users/entities/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tours')
export class TourEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column('int')
  days_duration: number;

  @Column('int')
  price: number;

  @Column('int')
  previous_price: number;

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => UserEntity, (user) => user.tours)
  author: UserEntity;
}
