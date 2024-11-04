import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateInput, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  comparePasswords,
  createTokenObject,
  encodePassword,
} from './auth-utils';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';
import * as crypto from 'crypto';
import { IssuedTokenService } from './issued-token/issued-token.service';

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
    private issuedTokenService: IssuedTokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await comparePasswords(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(input: UserCreateInput): Promise<Token> {
    try {
      input.password = await encodePassword(input.password);
      const user = await this.usersService.create(input);
      return await this.createToken(user);
    } catch (err) {
      throw new ForbiddenException('Failed to register user');
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.usersService.findByEmail(email);
    if ((await this.validateUser(email, password)) == null) {
      throw new HttpException(
        'Wrong password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.createToken(user);
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const tokenInIssuedTable = await this.issuedTokenService.findByTokenId(
        payload.jti,
      );
      if (tokenInIssuedTable != undefined) {
        throw new UnauthorizedException('invalid token');
      }
      await this.issuedTokenService.create(payload.jti);

      return this.createToken(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async createToken(user: UserEntity): Promise<Token> {
    return createTokenObject(
      await this.createAccessToken(user),
      await this.createRefreshToken(user),
    );
  }

  async createAccessToken(user: UserEntity): Promise<string> {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: UserEntity): Promise<string> {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    let newUUUID = crypto.randomUUID();
    while (
      (await this.issuedTokenService.findByTokenId(newUUUID)) != undefined
    ) {
      newUUUID = crypto.randomUUID();
    }
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
      jwtid: crypto.randomUUID(),
    });
  }
}
