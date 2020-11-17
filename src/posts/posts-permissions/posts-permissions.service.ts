import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostIdUserIdPair } from '../post-id-user-id-pair';
import { PostsDataService } from '../posts-data/posts-data.service';

@Injectable()
export class PostsPermissionsService {
  constructor(private postsData: PostsDataService) {}

  async assertUserHasPermission({ userId, postId }: PostIdUserIdPair) {
    const ownerId = await this.postsData.getOwnerId(postId);

    if (!ownerId) {
      throw new NotFoundException('The requested post does not exist.');
    }

    if (ownerId !== userId) {
      throw new ForbiddenException(
        'This user does not have permission to modify this post.',
      );
    }
  }
}
