import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RtStrategy } from './strategies/refreshtoken.st';
import { AtStrategy } from './strategies/accesstoken.st';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { GoogleStrategy } from './strategies/googleLogin.st';
import { KakaoStrategy } from './strategies/kakaoLogin.st';
import { PostsService } from 'src/posts/posts.service';
import { PostsRepository } from 'src/posts/posts.repository';
import { Posts } from 'src/posts/posts.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users,Posts])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
    KakaoStrategy,
    PostsService,
    PostsRepository
  ],
})
export class UsersModule {}
