import { ApiProperty } from '@nestjs/swagger';

export class TourBaseDto {
  @ApiProperty({
    default: 'string',
  })
  title: string;

  @ApiProperty({
    default: 'string',
  })
  description: string;

  @ApiProperty({
    default: 'Бурятия',
  })
  location: string;

  @ApiProperty({
    default: 4,
  })
  days_duration: number;

  @ApiProperty({
    default: 14999,
  })
  price: number;

  @ApiProperty({
    description:
      "null if tour don't have discount or else price should be provided",
    nullable: true,
  })
  previous_price: number;
}
