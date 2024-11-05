import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    default: 'password1234',
  })
  password: string;
}
