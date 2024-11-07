import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Residence } from '../../residence/entities/residence.entity';
import { AgeGroupEntity } from '../age-groups/entities/age-group.entity';
import { LanguageEntity } from '../languages/entities/laguage.entity';

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

  @ManyToMany(() => Residence)
  @JoinTable()
  residencies: Residence[];

  @ManyToMany(() => AgeGroupEntity, {
    nullable: false,
  })
  @JoinTable()
  age_groups: AgeGroupEntity[];

  @ManyToMany(() => LanguageEntity, {
    nullable: false,
  })
  @JoinTable()
  languages: LanguageEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tours, {
    nullable: false,
  })
  author: UserEntity;
}
