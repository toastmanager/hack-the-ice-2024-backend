import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Residence } from '../../residence/entities/residence.entity';
import { Exclude } from 'class-transformer';

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
  duration: number;

  @Column('int', { name: 'comfort_score' })
  comfortScore: number;

  @Column('int', { name: 'activity_score' })
  activityScore: number;

  @Column('int')
  price: number;

  @Column('int', { name: 'previous_price', default: 0 })
  previousPrice: number;

  @Column('text', {
    array: true,
    name: 'image_keys',
  })
  @Exclude()
  imageKeys: string[];

  @Column({ name: 'is_published', default: false })
  @Exclude()
  isPublished: string;

  @Column({ name: 'is_on_moderation', default: false })
  @Exclude()
  isOnModeration: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Residence, (residency) => residency.tour)
  residencies: Residence[];

  @Column('text', { array: true })
  ageGroups: string[];

  @Column('text', { array: true })
  languages: string[];

  @ManyToOne(() => UserEntity, (user) => user.tours, {
    nullable: false,
  })
  author: UserEntity;
}
