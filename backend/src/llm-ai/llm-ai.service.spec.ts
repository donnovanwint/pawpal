import { Test, TestingModule } from '@nestjs/testing';
import { LlmAiService } from './llm-ai.service';

describe('LlmAiService', () => {
  let service: LlmAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmAiService],
    }).compile();

    service = module.get<LlmAiService>(LlmAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
