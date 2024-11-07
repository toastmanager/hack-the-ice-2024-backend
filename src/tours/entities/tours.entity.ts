import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TourResidence } from '../residence/entities/tour-residence.entity';
import { AgeGroupEntity } from '../age-groups/entities/age-group.entity';
import { LanguageEntity } from '../languages/entities/laguage.entity';

@Entity('tours')
export class TourEntity {
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
  comfort_score: number;

  @Column('int')
  activity_score: number;

  @Column('int')
  price: number;

  @Column('int')
  previous_price: number;

  @Column('text', {
    array: true,
  })
  image_keys: string[];

  @Column()
  residence_comfort: number;

  @Column()
  motel_duration: string;

  @Column()
  hotel_duration: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => TourResidence, (residence) => residence.tours)
  residencies: TourResidence[];

  @ManyToMany(() => AgeGroupEntity, (ageGroup) => ageGroup.tours, {
    nullable: false,
  })
  age_groups: AgeGroupEntity;

  @ManyToMany(() => LanguageEntity, (language) => language.tours, {
    nullable: false,
  })
  languages: LanguageEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tours, {
    nullable: false,
  })
  author: UserEntity;
}
