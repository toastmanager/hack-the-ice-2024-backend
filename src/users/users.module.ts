import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    StorageModule.register('tours'),
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
