// src/db/data-source.ts

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    seeds: ['dist/db/seeds/**/*.js'],
    factories: ['dist/db/factories/**/*.js']
};

export const dataSource = new DataSource(dataSourceOptions);
