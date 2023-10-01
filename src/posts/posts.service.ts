import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Users } from 'src/users/users.entity';
import { CreatePostDTO } from './dtos/postDTO';
import { DeleteResult } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async getPosts(): Promise<Posts[]> {
    return await this.postsRepository.getPosts();
  }

  async getFollowingPosts(userId:number):Promise<Posts[]>{
    return await this.postsRepository.getFollowingPosts(userId);
  }

  async getUserPosts(userId: number): Promise<Posts[]> {
    return await this.postsRepository.getUserPosts(userId);
  }

  async getOnePost(postId: number): Promise<Posts> {
    return await this.postsRepository.getOnePost(postId);
  }

  async createPost(user: Users, createPostDTO: CreatePostDTO): Promise<void> {
    return await this.postsRepository.createPost(user, createPostDTO);
  }
  async deletePost(postId: number): Promise<DeleteResult> {
    return await this.postsRepository.deletePost(postId);
  }
  async editPost(updatePostDTO: CreatePostDTO, postId: number): Promise<void> {
    const findPost = await this.postsRepository.getOnePost(postId);
    if (!findPost) {
      throw new Error('no post');
    }

    await this.postsRepository.editPost(updatePostDTO, findPost);
  }
}
