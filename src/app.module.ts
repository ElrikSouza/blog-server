import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import * as Env from './env';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: Env.DB_CONN,
      entities: [User, Post],
    }),
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
