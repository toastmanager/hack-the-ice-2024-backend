import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
import { UsersModule } from 'src/users/users.module';
import { TourReviewEntity } from './entities/tour-review.entity';
import { StorageModule } from 'src/storage/storage.module';
import { LanguagesService } from './languages/languages.service';
import { AgeGroupsService } from './age-groups/age-groups.service';
import { ResidenceModule } from 'src/residence/residence.module';

@Module({
  controllers: [ToursController],
  imports: [
    TypeOrmModule.forFeature([TourEntity, TourReviewEntity]),
    StorageModule.register('tours'),
    UsersModule,
    ResidenceModule,
  ],
  providers: [ToursService, AgeGroupsService, LanguagesService, AgeGroupsService],
})
export class ToursModule {}
