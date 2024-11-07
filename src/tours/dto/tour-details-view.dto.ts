import { ApiProperty } from "@nestjs/swagger";
import { TourBaseDto } from "./tour-base.dto";
import { ResidenceViewDto } from "../../residence/dto/residence-view.dto";

export class TourDetailsViewDto extends TourBaseDto {
    @ApiProperty({})
    residencies: ResidenceViewDto[];

    @ApiProperty({})
    age_groups: ResidenceViewDto[];
}