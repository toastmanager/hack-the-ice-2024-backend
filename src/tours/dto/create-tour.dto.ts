import { ApiProperty } from '@nestjs/swagger';
import { TourBaseDto } from './tour-base.dto';
import { ArrayMinSize, IsArray } from 'class-validator';
import { ResidenceBaseDto } from 'src/residence/dto/residence-base.dto';
import { CreateResidenceDto } from 'src/residence/dto/residence-create.dto';

export class CreateTourDto extends TourBaseDto {
  @ApiProperty({
    format: 'binary',
  })
  @IsArray()
  images: Express.Multer.File[];

  @ApiProperty({
    type: () => [CreateResidenceDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  residencies: CreateResidenceDto[];
}
