import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(2, 55)
  @IsString()
  username: string;

  @Length(8, 100)
  @IsString()
  password: string;
}
