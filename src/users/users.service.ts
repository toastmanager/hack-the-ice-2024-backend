import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserDto } from './dto/create-user.dto';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private toursStorage: StorageService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({
      where: { email: email },
      relations: {
        tours: true,
      },
    });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({
      where: { id: id },
      relations: { tours: true },
    });
  }

  async getById(id: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: { tours: true },
    });

    const newTours = [];
    for (const tour of user.tours) {
      const imageUrls = [];
      for (const imageKey of tour.imageKeys) {
        imageUrls.push(await this.toursStorage.get(imageKey));
      }
      newTours.push({
        image_urls: imageUrls,
        ...tour,
      });
    }

    return {
      ...user,
      tours: newTours,
    };
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(
    id: string,
    user: QueryDeepPartialEntity<UserEntity>,
  ): Promise<void> {
    await this.usersRepository.update({ id }, user);
  }

  async create(input: CreateUserDto): Promise<UserEntity> {
    const user = await this.findByEmail(input.email);
    if (user != undefined) {
      throw new ForbiddenException('User already exists');
    }
    return await this.usersRepository.save(input);
  }
}
