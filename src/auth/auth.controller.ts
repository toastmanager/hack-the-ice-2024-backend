import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService, Token } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@Request() req: any) {
    return req.user as UserEntity; // FIXME: use Dto or something like that
  }

  @Post('login')
  async login(@Body() user: LoginDto, @Response() response): Promise<Token> {
    const token = await this.authService.login(user.email, user.password);

    await response.cookie('refresh_token', token.refresh_token, {
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return response.send(token);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<Token> {
    return await this.authService.register(user);
  }

  @Post('logout')
  async logout(@Request() req: any): Promise<void> {
    return req.logout();
  }

  @Post('refresh')
  async refresh(
    @Request() request,
    @Body() body: TokenRefreshDto,
  ): Promise<Token> {
    const cookieRefreshToken = request.cookie['refresh_token'];
    if (cookieRefreshToken) {
      return await this.authService.refreshToken(cookieRefreshToken);
    }
    return await this.authService.refreshToken(body.refresh_token);
  }
}
