import { IsOptional, IsUUID } from 'class-validator';

export class PostQuery {
  @IsUUID()
  @IsOptional()
  userIdFilter?: string;
}
