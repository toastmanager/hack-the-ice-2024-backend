import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
