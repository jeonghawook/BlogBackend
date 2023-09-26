import { Body, Controller, HttpException, HttpStatus, Post, Delete, UseGuards, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, SignupDto, Tokens } from './dtos/users-dtos';
import { Users } from './users.entity';
import { GetUser, Public } from './common/decorators';
import { RTGuard } from './common/guards/rt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Public()
    @Post('/signup')
    async signup(@Body() signupDto: SignupDto): Promise<{ statusCode: number }> {
        try {
            await this.usersService.signup(signupDto)
            return { statusCode: HttpStatus.CREATED }
        } catch (err) {
            throw err
        }
    }

    @Public()
    @Post('/login')
    async signin(@Body() loginDto: LoginDto): Promise<Tokens> {
        try {

            return await this.usersService.login(loginDto);

        } catch (error) {

            throw error

        }
    }

    @Delete('/logout')
    async logout(@GetUser() user: Users): Promise<{ message: string }> {
        try {
            await this.usersService.logout(user);
            return { message: '로그아웃 되었습니다.' };

        } catch (error) {
            throw error
        }

    }
    @Public()
    @UseGuards(RTGuard)
    @Post('/refresh')
    async refreshToken(
        @GetUser('refreshToken') refreshToken: string,
        @GetUser() user: Users)
        : Promise<{ accessToken: string }> {
        try {

            const accessToken = await this.usersService.refreshToken(user, refreshToken);

            return { accessToken };
        }
        catch (error) {
            throw error;
        }
    }

    @Public()
    @Get("/login/google")	//restAPI만들기. 엔드포인트는 /login/google.
    @UseGuards(AuthGuard("google"))	//인증과정을 거쳐야하기때문에 UseGuards를 써주고 passport인증으로 AuthGuard를 써준다. 이름은 google로
      async loginGoogle(
      @Req() req: Request,
      @Res() res: Response	//Nest.js가 express를 기반으로 하기때문에 Request는 express에서 import한다.
    ) {
       //프로필을 받아온 다음, 로그인 처리해야하는 곳(auth.service.ts에서 선언해준다)
      this.usersService.OAuthLogin({req, res});
  
  }
}
