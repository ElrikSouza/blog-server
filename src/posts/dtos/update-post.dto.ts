import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Length(1, 65)
  title: string;

  @IsOptional()
  @IsString()
  @Length(1, 3000)
  body: string;
}
