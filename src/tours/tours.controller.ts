import { Controller, Get, Post, Body, Param, Delete, } from '@nestjs/common';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
import { CreateTourDto } from './dto/create-tour.dto'
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  @Get()
  async findAll(): Promise<TourEntity[]> {
    return this.toursService.findAll();
  }
  @Post('create')

  async create(@Body() createTourDto: CreateTourDto): Promise<TourEntity> {
    const { name, description } = createTourDto;
    return this.toursService.create(name, description);
  }

  @Delete(':uuid')

  async delete(@Param('uuid') uuid: string): Promise<{ message: string }> {
      await this.toursService.delete(uuid);
      return { message: 'Tour deleted successfully' };
    
  }




}
