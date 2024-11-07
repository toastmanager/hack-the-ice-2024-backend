import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto } from './residence-base.dto';

export class ResidenceViewDto extends ResidenceBaseDto {
  @ApiProperty({})
  image_keys: string[];
}
