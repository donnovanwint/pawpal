import { Test, TestingModule } from '@nestjs/testing';
import { StandaloneAiService } from './standalone-ai.service';

describe('StandaloneAiService', () => {
  let service: StandaloneAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandaloneAiService],
    }).compile();

    service = module.get<StandaloneAiService>(StandaloneAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
