import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { DbModule } from './db/db.module';
import { GlobalModule } from './global/global.module';
import { AsyncStorageMiddleware } from './global/middleware/async-storage/async-storage.middleware';
import { LoggerModule } from './logger/logger.module';
import { PetModule } from './pet/pet.module';
import { getConfig } from './services/app-config/configuration';
import { UserModule } from './user/user.module';
import { LlmAiModule } from './llm-ai/llm-ai.module';
import { StandaloneAiModule } from './standalone-ai/standalone-ai.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      cache: false,
      load: [getConfig],
    }),
    DbModule,
    UserModule,
    ConfigModule,
    LoggerModule,
    PetModule,
    ChatModule,
    StandaloneAiModule,
    LlmAiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncStorageMiddleware).forRoutes('*');
  }
}
