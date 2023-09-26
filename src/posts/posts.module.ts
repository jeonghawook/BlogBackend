import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { UploadService } from 'src/upload/upload.service';

@Module({
imports:[TypeOrmModule.forFeature([Posts])],
controllers:[PostsController],
providers:[PostsService,PostsRepository,UploadService]

})
export class PostsModule {}
