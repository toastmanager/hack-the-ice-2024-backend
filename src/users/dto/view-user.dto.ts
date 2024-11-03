import { ApiProperty } from "@nestjs/swagger";

export class ViewUserDto {
  @ApiProperty({
    default: 'username',
  })
  username: string;

  @ApiProperty({
    default: 'example@example.com',
  })
  email: string;
}
