import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../configs/typeorm.config';
import { AtGuard } from 'src/users/common/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { InMemoryModule } from 'src/in-memory/in-memory.module';
import { PostsModule } from 'src/posts/posts.module';
import { CommentsModule } from 'src/comments/comments.module';
import { UploadModule } from 'src/upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { HttpLoggerMiddleware } from 'src/middleware/logger';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
      
    },
    ChatGateway,
    HttpLoggerMiddleware,
  ],
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://Hawook:8785@cluster0.olr8a.mongodb.net/?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => typeORMConfig(configService),
      inject: [ConfigService],
    }),
    InMemoryModule,
    PostsModule,
    CommentsModule,
    UploadModule,
    ChatModule,
    ConfigModule.forRoot(
      {isGlobal:true,
        envFilePath: '.env',
      },
      )
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   consumer.apply(HttpLoggerMiddleware).forRoutes('*')

  }
}
