import { Test, TestingModule } from '@nestjs/testing';
import { LlmAiController } from './llm-ai.controller';
import { LlmAiService } from './llm-ai.service';

describe('LlmAiController', () => {
  let controller: LlmAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmAiController],
      providers: [LlmAiService],
    }).compile();

    controller = module.get<LlmAiController>(LlmAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
