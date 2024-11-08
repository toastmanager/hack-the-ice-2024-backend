import { ApiProperty } from '@nestjs/swagger';
import { ResidenceBaseDto } from './residence-base.dto';
import { IsArray, IsUUID } from 'class-validator';

export class ViewResidenceDto extends ResidenceBaseDto {
  @ApiProperty({})
  @IsUUID()
  id: string
  
  @ApiProperty({})
  @IsArray()
  imageUrls: string[];
}
