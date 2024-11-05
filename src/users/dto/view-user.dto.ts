import { ApiProperty } from '@nestjs/swagger';
import { ViewTourDto } from 'src/tours/dto/view-tour.dto';

export class ViewUserDto {
  @ApiProperty({
    default: 'username',
  })
  username: string;

  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;

  @ApiProperty()
  tours: ViewTourDto[];
}
