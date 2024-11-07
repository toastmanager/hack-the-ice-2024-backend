import {
  Request,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceCreateDto } from './dto/residence-create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ResidenceViewDto } from './dto/residence-view.dto';

@Controller('residencies')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async create(
    @Request() req: any,
    @Body() createResidenceDto: ResidenceCreateDto,
    @UploadedFiles() images: { images?: Express.Multer.File[] },
  ) {
    return await this.residenceService.create(
      createResidenceDto,
      images.images,
      req.id,
    );
  }

  @Get()
  async findAll() {
    return await this.residenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResidenceViewDto> {
    return await this.residenceService.getById(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.residenceService.remove(+id);
  }
}
