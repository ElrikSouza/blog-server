import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Token } from './token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUserIfCredentialsMatch(
    email: string,
    password: string,
  ): Promise<User> {
    const userData = await this.usersService.findOneByEmailOrFail(email);
    const doPasswordsMatch = await compare(password, userData.password);

    if (!doPasswordsMatch) {
      throw new UnauthorizedException('Wrong password.');
    }

    return userData;
  }

  async login({ email, _id }: Pick<User, '_id' | 'email'>): Promise<Token> {
    const token = await this.jwtService.signAsync({ email, _id });

    return { token };
  }

  async registerUser(user: Omit<User, '_id'>): Promise<void> {
    const doesUserExist = await this.usersService.doesUserExist(user);

    if (doesUserExist) {
      throw new ConflictException('This user already exists');
    }

    const passwordHash = await hash(user.password, 12);

    await this.usersService.addUser({
      ...user,
      password: passwordHash,
      _id: uuidv4(),
    });
  }
}
