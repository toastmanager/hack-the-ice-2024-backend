import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto } from './residence-base.dto';

export class ResidenceCreateDto extends ResidenceBaseDto {
  @ApiProperty({
    format: 'binary',
  })
  images: Express.Multer.File[];
}
