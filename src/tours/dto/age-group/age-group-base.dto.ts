import { ApiProperty } from "@nestjs/swagger";

export class AgeGroupBaseDto {
    @ApiProperty()
    min_age: number;

    @ApiProperty()
    max_age: number;
}