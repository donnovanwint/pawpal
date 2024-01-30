import { Module } from '@nestjs/common';
import { LlmAiService } from './llm-ai.service';
import { LlmAiController } from './llm-ai.controller';
import { PetModule } from 'src/pet/pet.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [PetModule, ChatModule],
  controllers: [LlmAiController],
  providers: [LlmAiService]
})
export class LlmAiModule {}
