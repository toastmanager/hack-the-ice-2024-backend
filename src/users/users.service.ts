import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type UserCreateInput = { email: string; password: string };

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(
    id: string,
    user: QueryDeepPartialEntity<UserEntity>,
  ): Promise<void> {
    await this.usersRepository.update({ id }, user);
  }

  async create(input: UserCreateInput): Promise<UserEntity> {
    const user = await this.findByEmail(input.email);
    if (user != undefined) {
      throw new ForbiddenException('');
    }
    return await this.usersRepository.save(input);
  }
}
