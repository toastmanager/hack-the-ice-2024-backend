import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../entities/user.entity';

export class BaseUserDto {
  @ApiProperty({
    default: 'Пупкин Василий Васильевич',
  })
  fullname: string;

  @ApiProperty({
    default: 'tourist',
  })
  type: UserType
}
