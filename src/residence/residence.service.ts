import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Residence } from './entities/residence.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ResidenceCreateDto } from './dto/residence-create.dto';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Residence)
    private residenceRepository: Repository<Residence>,
  ) {}

  async findAll(): Promise<Residence[] | undefined> {
    return await this.residenceRepository.find({});
  }

  async findById(id: number): Promise<Residence | undefined> {
    return await this.residenceRepository.findOne({
      where: { id: id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.residenceRepository.delete(id);
  }

  async update(
    id: number,
    residence: QueryDeepPartialEntity<Residence>,
  ): Promise<void> {
    await this.residenceRepository.update({ id }, residence);
  }

  async create(input: ResidenceCreateDto): Promise<Residence> {
    return await this.residenceRepository.save(input);
  }
}
