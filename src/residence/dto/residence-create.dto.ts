import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto as BaseResidenceDto } from './residence-base.dto';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';

export class CreateResidenceDto extends BaseResidenceDto {
  @ApiProperty({
    format: 'binary',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  images: Express.Multer.File[];
}
