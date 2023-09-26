import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Comments } from './comments.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CommentDTO } from './dtos/commentDto';

@Injectable()
export class commentsRepository {
  constructor(
    @InjectRepository(Comments) private comments: Repository<Comments>,
  ) {}

  async findComment(commentId:number):Promise<Comments>{
    const comment = await this.comments.findOne({
        where: {commentId}
    })
    return comment
  }

  async getComments(postId: number): Promise<Comments[]> {
    return await this.comments.find({
      where: { postId: postId },
      order: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
    });
  }

  async createComment(
    postId: number,
    commentDto: CommentDTO,
    user: Users,
  ): Promise<void> {
    const { comment } = commentDto;
    const newComment = this.comments.create({
      postId,
      userId: user.userId,
      comment,
      nickname: user.nickname,
    });
    await this.comments.save(newComment);
   
  }

  async deleteComment(
    postId: number,
    commentId: number,
    user: Users,
  ): Promise<DeleteResult> {
    const deletedComment = await this.comments.delete({
    commentId,
      postId,
      userId: user.userId,
    });
    if(deletedComment.affected===0){
        throw new Error("comment deletion error")
    }
    return deletedComment
  }
  async editComment(
    commentDTO:CommentDTO,
    comments: Comments
  ): Promise<void> {
    const { comment } = commentDTO
    comments.comment=comment
    await this.comments.save(comments)

  }
}
