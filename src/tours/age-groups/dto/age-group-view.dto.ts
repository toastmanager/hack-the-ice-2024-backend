import { ApiProperty } from '@nestjs/swagger';
import { AgeGroupBaseDto } from './age-group-base.dto';

export class AgeGroupViewDto extends AgeGroupBaseDto {
  @ApiProperty()
  id: number;
}
