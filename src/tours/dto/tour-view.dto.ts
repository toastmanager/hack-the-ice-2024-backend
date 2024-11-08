import { ApiProperty } from '@nestjs/swagger';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { TourBaseDto } from './tour-base.dto';
import { IsArray } from 'class-validator';
import { ViewResidenceDto } from 'src/residence/dto/view-residence.dto';
import { Type } from 'class-transformer';

export class TourViewDto extends TourBaseDto {
  @ApiProperty({
    default: '',
  })
  author: ViewUserDto;

  @ApiProperty()
  @IsArray()
  imageUrls: string[];

  @ApiProperty()
  @IsArray()
  @Type(() => ViewResidenceDto)
  residencies: ViewResidenceDto[]
}
