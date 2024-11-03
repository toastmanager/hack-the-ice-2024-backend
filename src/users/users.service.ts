import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOneBy({ id });
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

  // FIXME: Don't use external libraries in buisiness-logic
  async create(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.findByEmail(userData.email);
    if (user != undefined) {
      throw new ForbiddenException('');
    }
    return await this.usersRepository.save(userData);
  }
}
