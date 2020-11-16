import { Test, TestingModule } from '@nestjs/testing';
import { PostsPermissionsService } from './posts-permissions.service';

describe('PostsPermissionsService', () => {
  let service: PostsPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsPermissionsService],
    }).compile();

    service = module.get<PostsPermissionsService>(PostsPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
