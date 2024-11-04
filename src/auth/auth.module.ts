import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IssuedTokenService } from './issued-token/issued-token.service';
import { IssuedTokenEntity } from './entites/issued-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([IssuedTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, IssuedTokenService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
