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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TourViewDto } from './dto/tour-view.dto';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async getAll(): Promise<TourEntity[]> {
    return this.toursService.getAll();
  }

  @Get(':uuid')
  @ApiOkResponse({
    type: TourViewDto,
  })
  async findById(@Param('uuid') uuid: string): Promise<TourViewDto> {
    const tour = await this.toursService.getById(uuid);
    return tour;
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images' },
      { name: 'scheduleImages' },
      { name: 'residenciesImages' },
    ]),
  )
  async create(
    @Body()
    createTourDto: CreateTourDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      scheduleImages?: Express.Multer.File[];
      residenciesImages?: Express.Multer.File[];
    },
    @Request() req: any,
  ): Promise<TourEntity> {
    console.log(createTourDto);
    return await this.toursService.create(
      createTourDto,
      req.user.id,
      files.images,
      files.scheduleImages,
      files.residenciesImages,
    );
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
