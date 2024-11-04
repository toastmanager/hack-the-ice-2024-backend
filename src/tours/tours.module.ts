import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
@Module({
  controllers: [ToursController],
  imports: [TypeOrmModule.forFeature([TourEntity])],
  providers: [ToursService]
})
export class ToursModule {}
