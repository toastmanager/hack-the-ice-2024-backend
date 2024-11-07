import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { AgeGroupEntity } from '../tours/age-groups/entities/age-group.entity';

class AgeGroupSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const ageGroups: AgeGroupEntity[] = [
      {
        id: 0,
        min_age: 10,
        max_age: 20,
      },
      {
        id: 1,
        min_age: 20,
        max_age: 30,
      },
      {
        id: 2,
        min_age: 40,
        max_age: null,
      },
    ];
    await dataSource.createEntityManager().save<AgeGroupEntity>(ageGroups);
  }
}