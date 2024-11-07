import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { LanguageEntity } from '../tours/languages/entities/laguage.entity';

class LanguageSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const languages: LanguageEntity[] = [
      {
        id: 0,
        name: 'Русский',
      },
      {
        id: 1,
        name: 'English',
      },
      {
        id: 2,
        name: 'Español',
      },
      {
        id: 3,
        name: 'Français',
      },
      {
        id: 4,
        name: 'Deutsch',
      },
      {
        id: 5,
        name: 'Italiano',
      },
      {
        id: 6,
        name: 'Português',
      },
      {
        id: 7,
        name: '中文',
      },
      {
        id: 8,
        name: '日本語',
      },
      {
        id: 9,
        name: '한국어',
      },
      {
        id: 10,
        name: 'Nederlands',
      },
      {
        id: 11,
        name: 'Svenska',
      },
      {
        id: 12,
        name: 'Dansk',
      },
      {
        id: 13,
        name: 'Suomi',
      },
      {
        id: 14,
        name: 'हिन्दी',
      },
    ];
    await dataSource.createEntityManager().save<LanguageEntity>(languages);
  }
}
