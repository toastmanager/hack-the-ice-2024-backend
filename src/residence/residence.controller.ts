import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceCreateDto } from './dto/residence-create.dto';

@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  @Post()
  create(@Body() createResidenceDto: ResidenceCreateDto) {
    return this.residenceService.create(createResidenceDto);
  }

  @Get()
  findAll() {
    return this.residenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residenceService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residenceService.remove(+id);
  }
}
