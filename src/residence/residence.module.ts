import { Module } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceController } from './residence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence } from './entities/residence.entity';
import { UsersModule } from 'src/users/users.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [ResidenceService],
  imports: [
    TypeOrmModule.forFeature([Residence]),
    UsersModule,
    StorageModule.register('residencies'),
  ],
  controllers: [ResidenceController],
  exports: [ResidenceService],
})
export class ResidenceModule {}
