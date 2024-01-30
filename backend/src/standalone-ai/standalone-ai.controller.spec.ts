import { Test, TestingModule } from '@nestjs/testing';
import { StandaloneAiController } from './standalone-ai.controller';
import { StandaloneAiService } from './standalone-ai.service';

describe('StandaloneAiController', () => {
  let controller: StandaloneAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandaloneAiController],
      providers: [StandaloneAiService],
    }).compile();

    controller = module.get<StandaloneAiController>(StandaloneAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
