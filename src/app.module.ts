import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { StorageModule } from './storage/storage.module';
import { ResidenceModule } from './residence/residence.module';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';
import { TourEntity } from './tours/entities/tours.entity';
import { TourReviewEntity } from './tours/entities/tour-review.entity';
import { Residence } from './residence/entities/residence.entity';
import { AgeGroupEntity } from './tours/age-groups/entities/age-group.entity';
import { LanguageEntity } from './tours/languages/entities/laguage.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<TypeOrmModuleOptions>('database.type', {
          infer: true,
        }),
        host: configService.get<string>('database.host'),
        port: configService.get<string>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
      inject: [ConfigService],
    }),
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const { AdminJS } = await import('adminjs');
          const AdminJSTypeorm = await import('@adminjs/typeorm');

          AdminJS.registerAdapter({
            Resource: AdminJSTypeorm.Resource,
            Database: AdminJSTypeorm.Database,
          });

          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                UserEntity,
                TourEntity,
                TourReviewEntity,
                Residence,
                AgeGroupEntity,
                LanguageEntity,
              ],
            },
          };
        },
      }),
    ),
    AuthModule,
    UsersModule,
    ToursModule,
    StorageModule,
    ResidenceModule,
  ],
})
export class AppModule {}
