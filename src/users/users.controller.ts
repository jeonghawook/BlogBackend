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
  Redirect,
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
import { google } from './common/guards/gg.guard';
import { PostsService } from 'src/posts/posts.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

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

  @Public()
  @UseGuards(RTGuard)
  @Post('/refresh')
  async refreshToken(
    @GetUser('refreshToken') refreshToken: string,
    @GetUser() user: Users,
  ): Promise<{ accessToken: string }> {
    console.log('checking');
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
  @Get('/login/google') // /:socialLogin으로 병합할수잇을까?
  @UseGuards(google) //AuthGuard만 dynamic하게 바꿔주면된다.흠.
  async googlelLogin() {}

  @Public()
  @Get('/google/callback')
  @UseGuards(google)
  async googleLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const { email, fullName } = req.user;
    console.log(email, fullName);
    const { tokens, userId } = await this.usersService.socialLogin(
      fullName,
      email,
    );
    return tokens;
  }

  @Public()
  @Get('/login/kakao') // /:socialLogin으로 병합할수잇을까?
  @UseGuards(AuthGuard('kakao')) //AuthGuard만 dynamic하게 바꿔주면된다.흠.
  async kakaoLogin() {}

  @Public()
  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))

  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { email, fullName, kakaoToken } = req.user;
    console.log(email);

    const { tokens, userId } = await this.usersService.socialLogin(
      fullName,
      email,
    );
    await this.postsService.insertStories(kakaoToken, userId);
    

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.refreshToken);
res.redirect('https://cacaocom.vercel.app/socialLogin')
  }
}
