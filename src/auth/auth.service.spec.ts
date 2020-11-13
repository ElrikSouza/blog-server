import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface Query {
  where: [{ email: string }, { username: string }];
}

describe('AuthService', () => {
  let service: AuthService;
  let jwt: JwtService;

  const _user = {
    _id: uuidv4(),
    email: 'example@example.com',
    username: 'yi',
    password: '$2b$04$N4GXrOJ18ar.GafMP00si.2xkElwFom6aqjWUp2v0I.ks16QndEVm',
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserIfCredentialsMatch', () => {
    it("should throw an Unauthorized exception if the credentials don't match", async () => {
      const result = service.getUserIfCredentialsMatch(
        _user.email,
        '123456789',
      );

      expect(result).rejects.toThrow(UnauthorizedException);
    });

    it("should throw a NotFoundException if the requested user doesn't exist", async () => {
      const result = service.getUserIfCredentialsMatch(
        'not_found@example.com',
        '12345678',
      );

      expect(result).rejects.toThrow(NotFoundException);
    });

    it('should return the user data if the credentials match', async () => {
      const user = await service.getUserIfCredentialsMatch(
        _user.email,
        '12345678',
      );

      expect(user).toEqual(_user);
    });
  });

  describe('login', () => {
    it('should return a valid jwt', async () => {
      const originalPayload = { email: 'test@example.com', _id: 'test_id' };
      const { token } = await service.login(originalPayload);
      const { email, _id } = await jwt.verifyAsync(token);

      expect({ email, _id }).toEqual(originalPayload);
    });
  });

  describe('registerUser', () => {
    it('should throw a ConflictException if the requested email or username are already in use', async () => {
      const registerPromise = service.registerUser({
        email: _user.email,
        username: _user.username,
        password: '12345678',
      });

      expect(registerPromise).rejects.toBeInstanceOf(ConflictException);
    });

    it('should create a new user if the requested email and username are available', async () => {
      const registerPromise = service.registerUser({
        email: 'example3@example.com',
        username: 'aaaaaaaaa',
        password: '12345678',
      });

      expect(registerPromise).resolves.not.toThrow();
    });
  });
});
