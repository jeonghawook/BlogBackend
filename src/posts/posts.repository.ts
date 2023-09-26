import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { CreatePostDTO } from './dtos/postDTO';
import { Posts } from './posts.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PostsRepository {
  constructor(@InjectRepository(Posts) private posts: Repository<Posts>) {}

  async getPosts(): Promise<Posts[]> {
    return await this.posts.find({
      order: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
    });
  }

  async getUserPosts(userId: number): Promise<Posts[]> {
    return await this.posts.find({ where: { userId } });
  }

  async getOnePost(postId: number): Promise<Posts> {
    return await this.posts.findOne({ where: { postId } });
  }

  async createPost(user: Users, createPostDTO: CreatePostDTO): Promise<void> {
    const {
      postDescription,
      location,
      ImageData,
      group,
      tags,
      images,
      category,
    } = createPostDTO;
    const newPost = this.posts.create({
      postDescription,
      location,
      images,
      group,
      tags,
      ImageData,
      category,
      userId: user.userId,
    });
    await this.posts.save(newPost);
  }

  async deletePost(postId: number): Promise<DeleteResult> {
    const deletePost = await this.posts.delete({
      postId,
    });
    if (deletePost.affected === 0) {
      throw new Error('post deletion error');
    }
    return deletePost;
  }

  async editPost(updatePostDTO: CreatePostDTO, findPost: Posts): Promise<void> {
    const {
      postDescription,
      location,
      images,
      group,
      tags,
      ImageData,
      category,
    } = updatePostDTO;
    // findPost.postDescription = postDescription
    // findPost.location=location
    // findPost.images=images
    // findPost.group=group
    // findPost.tags=tags
    // findPost.ImageData=ImageData
    // findPost.category=category
    Object.assign(findPost, {
      postDescription,
      location,
      images,
      group,
      tags,
      ImageData,
      category,
    });
    await this.posts.save(findPost);
  }
}
