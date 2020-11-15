import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

interface Query {
  where: [{ email: string }, { username: string }];
}

describe('AuthController', () => {
  let controller: AuthController;

  const _user = {
    _id: uuidv4(),
    email: 'example@example.com',
    username: 'test_user',
    //12345678
    password: '$2b$04$4fxMFK92C9dCCuCvQW5U9eHpx2CMq7T7nP/9Jgimn7DDP3NoVD1pC',
  };

  const mockRepository = {
    findOne: jest.fn(async ({ email }: { email: string }) => {
      if (email == _user.email) {
        return _user;
      }
    }),
    count: jest.fn(async ({ where: [{ email }, { username }] }: Query) => {
      if (email === _user.email || username === _user.username) {
        return 1;
      }
      return 0;
    }),
    insert: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
      imports: [JwtModule.register({ secret: 'test' })],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should accept valid requests', async () => {
      const result = await controller.login({
        email: _user.email,
        password: '12345678',
      });

      expect(result).toHaveProperty('token');
    });
  });

  describe('signUp', () => {
    it('should accept valid requests', async () => {
      const result = await controller.signUp({
        email: 'test@example.com',
        username: 'test_username',
        password: '12345678',
      });

      expect(result).toEqual({ message: 'User has been created' });
    });
  });
});
