import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Residence } from './entities/residence.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ResidenceCreateDto } from './dto/residence-create.dto';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Residence)
    private readonly residenceRepository: Repository<Residence>,
    private readonly storageService: StorageService,
    private readonly usersService: UsersService,
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

  async create(
    input: ResidenceCreateDto,
    images: Express.Multer.File[],
    authorId: string,
  ): Promise<Residence> {
    const author = await this.usersService.findById(authorId);
    const { images: _, ...residenceData } = input;

    const imageKeys = [];
    for (let img of images) {
      const imageKey = await this.storageService.put(
        img.originalname,
        img.buffer,
      );
      imageKeys.push(imageKey);
    }

    return await this.residenceRepository.save({
      author: author,
      image_keys: imageKeys,
      ...residenceData,
    });
  }
}
