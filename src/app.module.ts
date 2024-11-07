import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { StorageModule } from './storage/storage.module';
import { ResidenceModule } from './residence/residence.module';

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
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ToursModule,
    StorageModule,
    ResidenceModule,
  ],
})
export class AppModule {}
