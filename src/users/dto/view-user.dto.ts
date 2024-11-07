import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class ViewUserDto extends BaseUserDto {
  @ApiProperty({
    required: false,
  })
  avatar_url?: string | null;

  @ApiProperty({
    required: false,
  })
  banner_url?: string | null;
}
