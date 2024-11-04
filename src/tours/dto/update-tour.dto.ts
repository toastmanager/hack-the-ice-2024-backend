import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDto } from './create-tour.dto';

export class UpdateUserDto extends PartialType(CreateTourDto) {}
