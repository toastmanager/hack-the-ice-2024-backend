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

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TourEntity, (tour) => tour.author)
  tours: TourEntity[];

  @OneToMany(() => TourReviewEntity, (tourReview) => tourReview.author)
  tourReviews: TourReviewEntity[];
}
