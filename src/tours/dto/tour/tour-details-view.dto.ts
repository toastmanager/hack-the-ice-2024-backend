import { ApiProperty } from "@nestjs/swagger";
import { TourBaseDto } from "./tour-base.dto";
import { TourResidenceViewDto } from "../residence/tour-residence-view.dto";

export class TourDetailsViewDto extends TourBaseDto {
    @ApiProperty({})
    residencies: TourResidenceViewDto[];

    @ApiProperty({})
    age_groups: TourResidenceViewDto[];
}