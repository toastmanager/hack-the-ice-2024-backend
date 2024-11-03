import { ApiProperty } from '@nestjs/swagger';
import { ViewUserDto } from './view-user.dto';

export class CreateUserDto extends ViewUserDto {
  @ApiProperty({
    default: 'password1234',
  })
  password: string;
}
