import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserCreateInput, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createTokenObject } from './auth-utils';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';

export type Token = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      // FIXME: Hash password using bcrypt or something
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(input: UserCreateInput): Promise<Token> {
    try {
      const user = await this.usersService.create(input);
      return this.createToken(user);
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Failed to register user');
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.usersService.findByEmail(email);
    if (user == undefined || user.password != password) {
      throw new HttpException(
        'Wrong password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.createToken(user);
  }

  createToken(user: UserEntity): Token {
    return createTokenObject(
      this.createAccessToken(user),
      this.createRefreshToken(user),
    );
  }

  createAccessToken(user: UserEntity): string {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  createRefreshToken(user: UserEntity): string {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
    });
  }
}
