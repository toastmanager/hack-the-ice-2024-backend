import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto } from './residence-base.dto';

export class ResidenceViewDto extends ResidenceBaseDto {
  @ApiProperty({})
  id: number
  
  @ApiProperty({})
  image_urls: string[];
}
