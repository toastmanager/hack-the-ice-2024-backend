import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    required: false,
  })
  phone: string;

  @ApiProperty({
    default: 'password1234',
  })
  password: string;

  @ApiPropertyOptional({
    format: 'binary',
    nullable: true,
    required: false,
  })
  avatarImage?: Express.Multer.File[];

  @ApiPropertyOptional({
    format: 'binary',
    nullable: true,
    required: false,
  })
  bannerImage?: Express.Multer.File[];
}
