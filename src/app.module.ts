import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import * as Env from './env';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: Env.DB_CONN,
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
