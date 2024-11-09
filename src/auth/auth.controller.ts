import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService, Token } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { UsersService } from 'src/users/users.service';

const refreshTokenCookieOptions = {
  expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: 'strict',
};

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
    const { password, tours, tourReviews, ...user } =
      await this.usersService.findById(id);

    return user;
  }

  @Post('login')
  async login(@Body() user: LoginDto, @Response() response): Promise<Token> {
    const token = await this.authService.login(user.email, user.password);

    await this.setRefreshTokenInCookie(response, token.refresh_token);

    return response.send(token);
  }

  @Post('register')
  // @ApiConsumes('multipart/form-data')
  async register(
    @Body() user: CreateUserDto,
    @Response({ passthrough: true }) response: any,
  ): Promise<Token> {
    console.log(user)
    const token = await this.authService.register(user);

    await this.setRefreshTokenInCookie(response, token.refresh_token);

    return token;
  }

  @Post('logout')
  @ApiBearerAuth()
  async logout(@Response({ passthrough: true }) res: any): Promise<any> {
    await res.clearCookie('refresh_token', refreshTokenCookieOptions);
    return { message: 'successfully logged out' };
  }

  @Post('refresh')
  async refresh(
    @Request() request,
    @Body() body: TokenRefreshDto,
    @Response({ passthrough: true }) response,
  ): Promise<Token> {
    let newToken: Token | null = null;


    if (request.cookies) {
      const cookieRefreshToken = request.cookies['refresh_token'];
      if (cookieRefreshToken) {
        try {
          newToken = await this.authService.refreshToken(cookieRefreshToken);
        } catch (error) {
          console.log(error)
          throw error;
        }
      }
    } else if (body.refresh_token) {
      try {
        newToken = await this.authService.refreshToken(body.refresh_token);
      } catch (error) {
        console.log(error)
        throw error;
      }
    }

    if (!newToken) {
      throw new BadRequestException('Refresh token is not provided');
    }

    await this.setRefreshTokenInCookie(response, newToken.refresh_token);

    return newToken;
  }

  async setRefreshTokenInCookie(@Response() response, refreshToken: string) {
    await response.cookie(
      'refresh_token',
      refreshToken,
      refreshTokenCookieOptions,
    );
  }
}
