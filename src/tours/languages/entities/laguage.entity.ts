import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TourEntity } from 'src/tours/entities/tours.entity';

@Entity('languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => TourEntity, (tour) => tour.languages)
  tours: TourEntity;
}
