import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentsRepository } from './comments.repository';
import { Comments } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/posts.entity';

@Module({
imports:[TypeOrmModule.forFeature([Comments,Posts])],
controllers:[CommentsController],
providers:[CommentsService,commentsRepository]
})
export class CommentsModule {}
