import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // async createChatHistory(@Param('petId') petId: string, @Body() body: { chatHistory: string }, @Req() req: any): Promise<void> {
    // await this.chatService.createChat(petId,body.chatHistory, userId);
  @Post(':petId')
  async createChatHistory(@Param('petId') petId: string, @Req() req: any): Promise<void> {
    const userId = req.user.id;
    await this.chatService.createChat(petId, userId);
  }

  @Get('pet/:petId')
  async getChatsByPetId(@Param('petId') petId: string): Promise<any[]> {
    return this.chatService.getChatsByPetId(petId);
  }

  @Get(':chatId')
  async getChatById(@Param('chatId') chatId: string): Promise<Chat> {
    return this.chatService.getChatById(chatId);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  // @Patch(':chatId')
  // async updateChatHistory(@Param('chatId') chatId: string, @Body() body: { chatHistory: string }): Promise<void> {
  //   const chatUpdated = await this.chatService.updateChatHistory(chatId,'chat', body.chatHistory);

  //   if (!chatUpdated) {
  //     throw new NotFoundException(`Chat with ID ${chatId} not found`);
  //   }
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
