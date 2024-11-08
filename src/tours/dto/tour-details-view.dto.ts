import { ApiProperty } from '@nestjs/swagger';
import { ViewResidenceDto } from '../../residence/dto/view-residence.dto';
import { TourViewDto } from './tour-view.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TourDetailsViewDto extends TourViewDto {
  @ApiProperty({})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ViewResidenceDto)
  residencies: ViewResidenceDto[];

  @ApiProperty({})
  @IsArray()
  ageGroups: string[];
}
