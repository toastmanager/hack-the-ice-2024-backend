import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { LanguageEntity } from '../tours/languages/entities/laguage.entity';

class LanguageSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const languages: LanguageEntity[] = [
      {
        id: 0,
        name: 'Русский',
        tours: [],
      },
      {
        id: 1,
        name: 'English',
        tours: [],
      },
      {
        id: 2,
        name: 'Español',
        tours: [],
      },
      {
        id: 3,
        name: 'Français',
        tours: [],
      },
      {
        id: 4,
        name: 'Deutsch',
        tours: [],
      },
      {
        id: 5,
        name: 'Italiano',
        tours: [],
      },
      {
        id: 6,
        name: 'Português',
        tours: [],
      },
      {
        id: 7,
        name: '中文',
        tours: [],
      },
      {
        id: 8,
        name: '日本語',
        tours: [],
      },
      {
        id: 9,
        name: '한국어',
        tours: [],
      },
      {
        id: 10,
        name: 'Nederlands',
        tours: [],
      },
      {
        id: 11,
        name: 'Svenska',
        tours: [],
      },
      {
        id: 12,
        name: 'Dansk',
        tours: [],
      },
      {
        id: 13,
        name: 'Suomi',
        tours: [],
      },
      {
        id: 14,
        name: 'हिन्दी',
        tours: [],
      },
    ];
    await dataSource.createEntityManager().save<LanguageEntity>(languages);
  }
}
