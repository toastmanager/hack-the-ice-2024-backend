import { ApiProperty } from '@nestjs/swagger';
import { ViewTourDto } from './view-tour.dto';

export class CreateTourDto extends ViewTourDto {
  @ApiProperty({
    default: 'namename',
  })
  name: string;

  @ApiProperty({
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  })
  description: string;
}
