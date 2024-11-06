import {
  BadRequestException,
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
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@Request() req: any) {
    const { id } = req.user;
    const { password, tours, tourReviews, ...user} = await this.usersService.findById(id);

    return user;
  }

  @Post('login')
  async login(@Body() user: LoginDto, @Response() response): Promise<Token> {
    const token = await this.authService.login(user.email, user.password);

    await this.setRefreshTokenInCookie(response, token.refresh_token);

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
    @Response() response,
  ): Promise<Token> {
    let newToken: Token | null = null;

    if (request.cookies) {
      const cookieRefreshToken = request.cookies['refresh_token'];
      if (cookieRefreshToken) {
        newToken = await this.authService.refreshToken(cookieRefreshToken);
      }
    }

    if (body && body.refresh_token) {
      newToken = await this.authService.refreshToken(body.refresh_token);
    }

    if (newToken === null) {
      throw new BadRequestException('Refresh token is not provided');
    }

    await this.setRefreshTokenInCookie(response, newToken.refresh_token);

    return response.send(newToken);
  }

  async setRefreshTokenInCookie(@Response() response, refreshToken: string) {
    await response.cookie('refresh_token', refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'strict',
    });
  }
}
