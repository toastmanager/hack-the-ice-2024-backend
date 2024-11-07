import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column('text', {
    array: true,
  })
  image_keys: string[];
}
