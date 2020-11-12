import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('The requested user does not exist.');
    }

    return user;
  }

  async addUser(user: User) {
    await this.usersRepository.insert(user);
  }

  async doesUserExist(email: string): Promise<boolean> {
    const count = await this.usersRepository.count({ where: { email } });

    return count > 0;
  }
}
