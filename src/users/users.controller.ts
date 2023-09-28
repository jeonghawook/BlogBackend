import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Delete,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  GoogleRequestDTO,
  LoginDto,
  SignupDto,
  Tokens,
} from './dtos/users-dtos';
import { Users } from './users.entity';
import { GetUser, Public } from './common/decorators';
import { RTGuard } from './common/guards/rt.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<{ statusCode: number }> {
    try {
      await this.usersService.signup(signupDto);
      return { statusCode: HttpStatus.CREATED };
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @Post('/login')
  async signin(@Body() loginDto: LoginDto): Promise<Tokens> {
    try {
      return await this.usersService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/logout')
  async logout(@GetUser() user: Users): Promise<{ message: string }> {
    try {
      await this.usersService.logout(user);
      return { message: '로그아웃 되었습니다.' };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(RTGuard)
  @Post('/refresh')
  async refreshToken(
    @GetUser('refreshToken') refreshToken: string,
    @GetUser() user: Users,
  ): Promise<{ accessToken: string }> {
    try {
      const accessToken = await this.usersService.refreshToken(
        user,
        refreshToken,
      );

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('/login/:socialLogin') 
  @UseGuards(AuthGuard('socialLogin')) 
  async socialLogin() {}


  @Get('/:socialLogin/callback')
  @UseGuards(AuthGuard('socialLogin'))
  async socialLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const { email, fullName } = req.user;
    console.log(email, fullName);
    const tokens = await this.usersService.socialLogin(fullName, email);
    return tokens;
  }
}
