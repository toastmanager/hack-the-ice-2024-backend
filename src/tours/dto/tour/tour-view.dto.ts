import { ApiProperty } from '@nestjs/swagger';
import { ViewUserDto } from 'src/users/dto/view-user.dto';
import { TourBaseDto } from './tour-base.dto';

export class TourViewDto extends TourBaseDto {
  @ApiProperty({
    default: '',
  })
  author: ViewUserDto;

  @ApiProperty()
  image_urls: string[];
}
