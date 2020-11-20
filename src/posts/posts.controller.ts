import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from '../auth/user-id.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostQuery } from './dtos/post-query';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  public async getAll(@Query(ValidationPipe) postQuery: PostQuery) {
    const posts = await this.postsService.getAll(postQuery);

    return { posts };
  }

  @Get(':id')
  public async getOne(@Param('id', ParseUUIDPipe) postId: string) {
    const post = await this.postsService.getOne(postId);

    return { post };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async addOne(
    @UserId() userId: string,
    @Body(new ValidationPipe({ whitelist: true })) post: CreatePostDto,
  ) {
    await this.postsService.add(post, userId);

    return { message: 'The requested post has been created' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateOne(
    @Param('id', ParseUUIDPipe) postId: string,
    @UserId() userId: string,
    @Body(new ValidationPipe({ whitelist: true })) postChanges: UpdatePostDto,
  ) {
    await this.postsService.update(postChanges, { postId, userId });

    return { message: 'The requested post has been updated' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteOne(
    @Param('id', ParseUUIDPipe) postId: string,
    @UserId() userId: string,
  ) {
    await this.postsService.deleteOne({ postId, userId });

    return { message: 'The requested post has been deleted' };
  }
}
