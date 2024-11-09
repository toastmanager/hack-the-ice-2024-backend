import { ApiProperty } from '@nestjs/swagger';
import { TourBaseDto } from './tour-base.dto';
import { ValidateNested } from 'class-validator';
import { ResidenceBaseDto } from 'src/residence/dto/residence-base.dto';
import { Transform, Type } from 'class-transformer';

export class CreateTourResidenceDto extends ResidenceBaseDto {
  @ApiProperty()
  imagesNum: number;
}

export class CreateTourDto extends TourBaseDto {
  @ApiProperty({
    format: 'binary',
  })
  images: Express.Multer.File[];

  @ApiProperty({
    format: 'binary',
  })
  scheduleImages: Express.Multer.File[];

  @ApiProperty({
    format: 'binary',
  })
  residenciesImages: Express.Multer.File[];

  @ApiProperty({
    type: () => [CreateTourResidenceDto],
  })
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    const valueToParse = `[${value}]`;
    const res = JSON.parse(valueToParse);
    return res;
  })
  @Type(() => CreateTourResidenceDto)
  residencies: CreateTourResidenceDto[];
}
