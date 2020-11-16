import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 65)
  title: string;

  @Length(1, 3000)
  body: string;
}
