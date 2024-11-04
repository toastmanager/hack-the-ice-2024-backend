import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourEntity } from './entities/tours.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(TourEntity)
    private toursRepository: Repository<TourEntity>,
  ) {}

  async findAll(): Promise<TourEntity[]> {
    return await this.toursRepository.find();
  }

  async create(name: string, description: string): Promise<TourEntity> {
    const newTour = this.toursRepository.create({ name, description });
    return await this.toursRepository.save(newTour);
  }
  async delete(uuid: string): Promise<void> {
    const tourToDelete = await this.toursRepository.findOne({ where: { uuid: uuid } });
    //TODO: error handling
    await this.toursRepository.remove(tourToDelete);

  }
}
