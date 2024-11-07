import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    required: false,
  })
  phone: string;

  @ApiProperty({
    default: 'password1234',
  })
  password: string;

  @ApiProperty({
    format: 'binary',
    nullable: true,
  })
  avatarImage?: Express.Multer.File[];
}
