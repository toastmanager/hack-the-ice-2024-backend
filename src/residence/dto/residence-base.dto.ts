import { ApiProperty } from '@nestjs/swagger';

export class ResidenceBaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration: string;
}
