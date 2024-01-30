import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LlmAiService } from './llm-ai.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/user/guards/role.enum';
import { RoleGuard } from 'src/user/guards/role.guard';
import { AllowedRoles } from 'src/user/guards/roles.decorator';

@Controller('llm-ai')
export class LlmAiController {
  constructor(private readonly llmAiService: LlmAiService) { }

  @Post(':chatId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client, Role.SuperAdmin)
  answer(@Req() req: any, @Param('chatId') chatId: string, @Body() data: { message: string }) {
    return this.llmAiService.answerWithOpenAI(chatId, data.message)
  }
}
