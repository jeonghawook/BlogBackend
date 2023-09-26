import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { commentsRepository } from './comments.repository';
import { Users } from 'src/users/users.entity';
import { CommentDTO } from './dtos/commentDto';
import { DeleteResult } from 'typeorm';
import { Comments } from './comments.entity';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: commentsRepository,
   // private postsRepository: PostsRepository,
  ) {}

  async getComments(postId: number): Promise<Comments[]> {
    return await this.commentsRepository.getComments(postId);
  }
  async createComment(
    postId: number,
    commentDto: CommentDTO,
    user: Users,
  ): Promise<void> {
    await this.commentsRepository.createComment(postId, commentDto, user);
  }
  async deleteComment(
    postId: number,
    commentId: number,
    user: Users,
  ): Promise<DeleteResult> {
    //    const post = await this.postsRepository.getOnePost(postId)
    //    if(!post){
    //     throw new NotFoundException('존재하지 않는 글입니다')
    //    }
    const comment = await this.commentsRepository.findComment(commentId);

    if (!comment) {
      throw new NotFoundException('존재하지 않는 댓글입니다');
    }
    if (comment.userId !== user.userId) {
      throw new ForbiddenException('권한이 존재하지 않습니다');
    }
    return await this.commentsRepository.deleteComment(postId, commentId, user);
  }
  async editComment(
    user: Users,
    postId: number,
    commentId: number,
    commentDTO: CommentDTO,
  ): Promise<void> {
    const comment = await this.commentsRepository.findComment(commentId);
    if (!comment) {
      throw new NotFoundException('존재하지 않는 댓글입니다');
    }
    if (comment.userId !== user.userId) {
      throw new ForbiddenException('권한이 존재하지 않습니다');
    }

    await this.commentsRepository.editComment(commentDTO, comment);
  }
}
