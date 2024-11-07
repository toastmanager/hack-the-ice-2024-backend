import { ApiProperty } from '@nestjs/swagger';
import { TourResidenceBaseDto } from './tour-residence-base.dto';

export class TourResidenceViewDto extends TourResidenceBaseDto {
  @ApiProperty({})
  image_keys: string[];
}
