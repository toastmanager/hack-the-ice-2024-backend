import { ApiProperty } from '@nestjs/swagger';
import { TourBaseDto } from './tour-base.dto';

export class CreateTourDto extends TourBaseDto {
  @ApiProperty({
    format: 'binary',
  })
  images: Express.Multer.File[];

  @ApiProperty({})
  residence_id: number;
}
