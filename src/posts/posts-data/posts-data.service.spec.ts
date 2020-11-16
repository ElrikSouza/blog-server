import { Test, TestingModule } from '@nestjs/testing';
import { PostsDataService } from './posts-data.service';

describe('PostsDataService', () => {
  let service: PostsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsDataService],
    }).compile();

    service = module.get<PostsDataService>(PostsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
