import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService]
})
export class UsersModule {}
