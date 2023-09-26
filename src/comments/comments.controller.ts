import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetUser, Public } from 'src/users/common/decorators';
import { Users } from 'src/users/users.entity';
import { CommentDTO } from './dtos/commentDto';
import { Comments } from './comments.entity';

@Controller('posts/:postId/:comments')
export class CommentsController {

    constructor(private commentsService:CommentsService){}

    @Public()
    @Get('/')
    async getComments(
        @Param('postId',) postId:number,
    ):Promise<Comments[]>{
       return await this.commentsService.getComments(postId)
    }

    @Post()
    async createComment(
        @Param('postId',ParseIntPipe) postId:number,
        @GetUser() user:Users,
        @Body() commentDto:CommentDTO,

    ):Promise<void>{
        await this.commentsService.createComment(postId,commentDto,user)
    }

    @Delete('/:commentId')
    async deleteComment(
        @GetUser() user:Users,
        @Param('postId',ParseIntPipe) postId:number,
        @Param('commentId',ParseIntPipe) commentId:number,

    ):Promise<void>{
        await this.commentsService.deleteComment(postId,commentId,user)
    }

    @Patch('/:commentId')
    async editComment(
        @GetUser() user:Users,
        @Param('postId',ParseIntPipe) postId:number,
        @Param('commentId',ParseIntPipe) commentId:number,
        @Body() commentDTO: CommentDTO
    ):Promise<void>{
        await this.commentsService.editComment(user,postId,commentId,commentDTO)
    }
    
    
    
}
