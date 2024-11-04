import { ApiProperty } from "@nestjs/swagger";

export class ViewTourDto {
  @ApiProperty({
    default: 'tourname',
  })
  name: string;

  @ApiProperty({
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  })
  description: string;
}
