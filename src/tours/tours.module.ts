import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
import { UsersModule } from 'src/users/users.module';
import { TourReviewEntity } from './entities/tour-review.entity';

@Module({
  controllers: [ToursController],
  imports: [
    TypeOrmModule.forFeature([TourEntity]),
    TypeOrmModule.forFeature([TourReviewEntity]),
    UsersModule,
  ],
  providers: [ToursService],
})
export class ToursModule {}
