import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  @Get()
  async findAll(): Promise<TourEntity[]> {
    return this.toursService.findAll();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createTourDto: CreateTourDto,
    @Request() req: any,
  ): Promise<TourEntity> {
    return this.toursService.create(createTourDto, req.user.sub);
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param('uuid') uuid: string,
    @Request() req: any,
  ): Promise<{ message: string }> {
    await this.toursService.delete(uuid, req.user.sub);
    return { message: 'Tour deleted successfully' };
  }

  @Patch(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('uuid') uuid: string,
    @Body() updateTourDto: UpdateTourDto,
    @Request() req: any,
  ): Promise<TourEntity> {
    return await this.toursService.patch(uuid, updateTourDto, req.user.sub);
  }
}
