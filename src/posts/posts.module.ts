import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsPermissionsService } from './posts-permissions/posts-permissions.service';
import { PostsDataService } from './posts-data/posts-data.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsPermissionsService, PostsDataService],
})
export class PostsModule {}
