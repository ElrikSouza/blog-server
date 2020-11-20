import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostQuery } from './dtos/post-query';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostIdUserIdPair } from './post-id-user-id-pair';
import { PostsDataService } from './posts-data/posts-data.service';
import { PostsPermissionsService } from './posts-permissions/posts-permissions.service';

@Injectable()
export class PostsService {
  constructor(
    private postsDataService: PostsDataService,
    private postsPermissionsService: PostsPermissionsService,
  ) {}

  async getAll(postQuery: PostQuery) {
    const posts = await this.postsDataService.findAll(postQuery);

    return posts;
  }

  async getOne(postId: string) {
    const post = await this.postsDataService.findOneOrFail(postId);

    return post;
  }

  async add(post: CreatePostDto, userId: string) {
    await this.postsDataService.add({
      ...post,
      _id: uuidv4(),
      user_id: userId,
    });
  }

  async update(
    postChanges: UpdatePostDto,
    { postId, userId }: PostIdUserIdPair,
  ) {
    await this.postsPermissionsService.assertUserHasPermission({
      postId,
      userId,
    });

    await this.postsDataService.update(postChanges, postId);
  }

  async deleteOne({ postId, userId }: PostIdUserIdPair) {
    await this.postsPermissionsService.assertUserHasPermission({
      postId,
      userId,
    });

    await this.postsDataService.remove(postId);
  }
}
