import { ApiProperty } from '@nestjs/swagger';
import { ResidenceViewDto } from '../../residence/dto/residence-view.dto';
import { TourViewDto } from './tour-view.dto';

export class TourDetailsViewDto extends TourViewDto {
  @ApiProperty({})
  residencies: ResidenceViewDto[];

  @ApiProperty({})
  age_groups: ResidenceViewDto[];
}
