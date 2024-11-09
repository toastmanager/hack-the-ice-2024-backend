import { TourReviewEntity } from 'src/tours/entities/tour-review.entity';
import { TourEntity } from 'src/tours/entities/tours.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  tourist = 'tourist',
  author = 'author',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: true,
    default: null,
  })
  avatarImageKey: string;

  @Column({
    nullable: true,
    default: null,
  })
  description: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ name: 'isVerified', default: false })
  isVerified: boolean;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.tourist,
  })
  type: UserType;

  @Column({
    nullable: true,
    default: null,
  })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TourEntity, (tour) => tour.author)
  tours: TourEntity[];

  @OneToMany(() => TourReviewEntity, (tourReview) => tourReview.author)
  tourReviews: TourReviewEntity[];
}
