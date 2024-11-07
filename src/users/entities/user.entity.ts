import { TourReviewEntity } from 'src/tours/entities/tour-review.entity';
import { TourEntity } from 'src/tours/entities/tours.entity';
import {
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
export class UserEntity {
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

  @Column({ default: false })
  is_verified: boolean;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TourEntity, (tour) => tour.author)
  tours: TourEntity[];

  @OneToMany(() => TourReviewEntity, (tourReview) => tourReview.author)
  tourReviews: TourReviewEntity[];
}
