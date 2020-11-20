import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostQuery } from '../dtos/post-query';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsDataService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async getOwnerId(postId: string): Promise<string | undefined> {
    const post = await this.postsRepository.findOne(
      { _id: postId },
      { select: ['user_id'] },
    );

    return post?.user_id;
  }

  async findAll(postQuery: PostQuery) {
    let query = this.postsRepository
      .createQueryBuilder('post')
      .select('post')
      .innerJoin('post.user', 'user')
      .addSelect(['user.username', 'user._id']);

    if (postQuery.userIdFilter) {
      query = query.where('user_id = :userId', {
        userId: postQuery.userIdFilter,
      });
    }

    return query.getMany();
  }

  async findOneById(postId: string): Promise<Post | undefined> {
    return this.postsRepository.findOne({ _id: postId });
  }

  async findOneOrFail(postId: string): Promise<Post> {
    const post = this.findOneById(postId);

    if (!post) {
      throw new NotFoundException('The requested post does not exist');
    }

    return post;
  }

  async add(post: Omit<Post, 'created_at' | 'updated_at'>) {
    await this.postsRepository.insert(post);
  }

  async update(post: UpdatePostDto, postId: string) {
    await this.postsRepository.update({ _id: postId }, post);
  }

  async remove(postId: string) {
    await this.postsRepository.delete({ _id: postId });
  }
}
