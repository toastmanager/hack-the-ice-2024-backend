import { ApiProperty } from '@nestjs/swagger';

export class TourBaseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  comfortScore: number;

  @ApiProperty()
  activityScore: number;

  @ApiProperty()
  residenceComfort: number;

  @ApiProperty({})
  ageGroups: string[];

  @ApiProperty({})
  languages: string[];

  @ApiProperty({})
  price: number;

  @ApiProperty({
    description:
      "null if tour don't have discount or else price should be provided",
    nullable: true,
    required: false,
  })
  previousPrice: number;
}
