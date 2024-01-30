import { Module } from '@nestjs/common';
import { StandaloneAiController } from './standalone-ai.controller';
import { StandaloneAiService } from './standalone-ai.service';
import { PetModule } from 'src/pet/pet.module';
import { ChatModule } from 'src/chat/chat.module';
import { ChatManager } from './dto/chat-manager';

@Module({
  imports: [PetModule, ChatModule],
  controllers: [StandaloneAiController],
  providers: [StandaloneAiService, ChatManager]
})
export class StandaloneAiModule {}
