import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsPermissionsService } from './posts-permissions/posts-permissions.service';
import { PostsDataService } from './posts-data/posts-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsPermissionsService, PostsDataService],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
