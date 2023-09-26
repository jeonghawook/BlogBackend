import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetUser, Public } from 'src/users/common/decorators';
import { Users } from 'src/users/users.entity';
import { CreatePostDTO } from './dtos/postDTO';
import { Posts } from './posts.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService,
    private uploadService:UploadService
    ) {}

  @Public()
  @Get('/main')
  async getPosts(): Promise<Posts[]> {
    return await this.postsService.getPosts();

  }

  @Public()
  @Get('/:userId/main')
  async getUserPosts(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    const getUserPost = await this.postsService.getUserPosts(userId);
  }

  @Public()
  @Get('/:postId')
  async getPostDetail(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<void> {
    const getPostDetail = await this.postsService.getOnePost(postId);
  }


  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile(
                  new ParseFilePipe({
            validators:[
                // new MaxFileSizeValidator({maxSize:1000}),
                new FileTypeValidator({fileType: 'image/*'})
            ]
        })
    )file:Express.Multer.File,
    @GetUser() user: Users,
    @Body() createPostDTO: CreatePostDTO,
  ): Promise<void> {
   const imageFile = await this.uploadService.upload(file.originalname,file.buffer,file.mimetype)
   console.log(imageFile)
   createPostDTO.images= [imageFile]
    await this.postsService.createPost(user, createPostDTO);
  }


  @Delete('/:postId')
  async deletePost(
    @GetUser() user: Users,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<void> {
    const deletePost = await this.postsService.deletePost(postId);
  }

  @Patch('/:postId')
  async editPost(
    @GetUser() user: Users,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDTO:CreatePostDTO
  ): Promise<void> {
    const editPost = await this.postsService.editPost(updatePostDTO,postId);
  }
}
