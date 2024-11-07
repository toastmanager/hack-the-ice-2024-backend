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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { TourEntity } from './entities/tours.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService, private storageService: StorageService) {}

  @Get()
  async findAll(): Promise<TourEntity[]> {
    return this.toursService.findAll();
  }

  @Get(':uuid')
  async findById(@Param('uuid') uuid: string): Promise<TourEntity> {
    const tour = await this.toursService.findById(uuid);
    for (const imageKey of tour.image_keys) {
      console.log(await this.storageService.get(imageKey))
    }
    return tour;
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async create(
    @Body() createTourDto: CreateTourDto,
    @UploadedFiles() images: { images?: Express.Multer.File[] },
    @Request() req: any,
  ): Promise<TourEntity> {
    return this.toursService.create(createTourDto, images.images, req.user.id);
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param('uuid') uuid: string,
    @Request() req: any,
  ): Promise<{ message: string }> {
    await this.toursService.delete(uuid, req.user.id);
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
    return await this.toursService.patch(uuid, updateTourDto, req.user.id);
  }
}
