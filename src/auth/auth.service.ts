import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) { // FIXME: Hash password using bcrypt or something
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(userData: CreateUserDto) { // FIXME: Don't use external libraries in buisiness-logic
    try {
      const user = await this.usersService.create(userData);

      return { // TODO: Make separate function to return this map
        access_token: this.jwtService.sign({ id: user.id }),
        token_type: 'Bearer',
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Failed to register user');
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user == undefined || user.password != password) {
      throw new HttpException(
        'Wrong password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { username: user.username, sub: user.id };
    return { // TODO: Make separate function to return this map
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
    };
  }
}
