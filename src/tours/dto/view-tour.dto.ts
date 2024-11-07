import { ApiProperty } from '@nestjs/swagger';
import { CreateTourDto } from './create-tour.dto';
import { ViewUserDto } from 'src/users/dto/view-user.dto';

export class ViewTourDto extends CreateTourDto {
  @ApiProperty({
    default: '',
  })
  author: ViewUserDto;

  @ApiProperty()
  image_urls: string[];
}
