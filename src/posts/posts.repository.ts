import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { CreatePostDTO } from './dtos/postDTO';
import { Posts } from './posts.entity';
import { DeleteResult, Repository, In } from 'typeorm';

@Injectable()
export class PostsRepository {
  constructor(@InjectRepository(Posts) private posts: Repository<Posts>) {}

  async getPosts(): Promise<Posts[]> {
    return await this.posts
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user', 'posts.userId = user.userId')
      .select(['posts', 'user.nickname'])
      .getMany(); // Use getMany() to retrieve an array of results
  }

  async getFollowingPosts(
    userId: number,
    following: number[],
  ): Promise<Posts[]> {
    return await this.posts.find({
      where: {
        userId: In(following),
      },
      order: {
        createdAt: 'DESC',
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
    console.log(user);
    console.log(createPostDTO);
    const {
      postDescription,
      location,
      ImageData,
      group,
      tags,
      images,
      category,
    } = createPostDTO;
    console.log(postDescription);
    const newPost = this.posts.create({
      postDescription,
      location,
      images,
      group,

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

  async syncStories(data, userId: number): Promise<void> {
    try {
      for (const postData of data.data) {
        const kakao_postId = postData.id;
        const postDescription = postData.content;
        const imagesData = postData.media;
        const largeImages = [];
        if (imagesData !== undefined) {
          console.log(imagesData.length);

       

          for (let i = 0; i < imagesData.length; i++) {
            const largeImageUrl = imagesData[i].large;
            largeImages.push(largeImageUrl);
          }
        }
        const kakaoPost = this.posts.create({
          kakao_postId,
          postDescription,
          images: largeImages,
          userId,
        });

        await this.posts.save(kakaoPost);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
