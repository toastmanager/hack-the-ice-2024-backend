import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto } from './residence-base.dto';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';

export class CreateResidenceDto extends ResidenceBaseDto {
  @ApiProperty({
    format: 'binary',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  images: Express.Multer.File[];
}
