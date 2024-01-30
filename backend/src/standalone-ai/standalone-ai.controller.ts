import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { getChatCompletionAnswerInputDTO } from './dto/standalone-ai.dto';
import { StandaloneAiService } from './standalone-ai.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/user/guards/role.enum';
import { RoleGuard } from 'src/user/guards/role.guard';
import { AllowedRoles } from 'src/user/guards/roles.decorator';

@Controller('ai-chat')
export class StandaloneAiController {
  constructor(private readonly standaloneAiService: StandaloneAiService) { }

  @Post(':chatId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client, Role.SuperAdmin)
  getChatCompletionMessage(@Req() req: any, @Param('chatId') chatId: string, @Body() data: getChatCompletionAnswerInputDTO) {
    return this.standaloneAiService.getAiModelAnswerWithChat(chatId, data);
  }

  @Get('/new')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @AllowedRoles(Role.Client, Role.SuperAdmin)
  createNewChat(@Body() body: { petId: string }, @Req() req: any) {
    console.log(req.user)
    console.log(body)
    const userId = req.user.id
    const username = req.user.firstName + ' ' + req.user.lastName;

    return this.standaloneAiService.createNewChat(body.petId, userId, username);
  }
}
