import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('age_groups')
export class AgeGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  min_age: number;

  @Column({ nullable: true })
  max_age: number;
}
