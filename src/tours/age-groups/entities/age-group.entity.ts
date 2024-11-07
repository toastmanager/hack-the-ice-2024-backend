import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TourEntity } from 'src/tours/entities/tours.entity';

@Entity('age_groups')
export class AgeGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  min_age: number;

  @Column()
  max_age: number;

  @ManyToMany(() => TourEntity, (tour) => tour.age_groups)
  tours: TourEntity;
}
