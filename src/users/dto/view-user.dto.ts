import { ApiProperty } from '@nestjs/swagger';
import { ViewTourDto } from 'src/tours/dto/view-tour.dto';
import { BaseUserDto } from './base-user.dto';

export class ViewUserDto extends BaseUserDto {
  @ApiProperty({
    default: [],
  })
  tours: ViewTourDto[];
}
