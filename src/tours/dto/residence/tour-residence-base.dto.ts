import { ApiProperty } from "@nestjs/swagger";

export class TourResidenceBaseDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    duration: string;
}