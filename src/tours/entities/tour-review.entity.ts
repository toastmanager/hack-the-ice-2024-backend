import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tour_reviews')
export class TourReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.tourReviews)
  author: UserEntity[];

  @Column('int')
  score: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;
}
