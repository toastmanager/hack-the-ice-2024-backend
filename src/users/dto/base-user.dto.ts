import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({
    default: 'Пупкин Василий Васильевич',
  })
  fullname: string;

  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;
}
