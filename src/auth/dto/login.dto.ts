import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    default: 'password1234',
  })
  password: string;
}
