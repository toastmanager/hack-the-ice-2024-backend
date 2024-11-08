import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TourBaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsInt()
  comfortScore: number;

  @ApiProperty()
  @IsInt()
  activityScore: number;

  @ApiProperty()
  @IsInt()
  residenceComfort: number;

  @ApiProperty({})
  @IsArray()
  @ArrayMinSize(1)
  ageGroups: string[];

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description:
      "null if tour don't have discount or else price should be provided",
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  previousPrice: number;
}
