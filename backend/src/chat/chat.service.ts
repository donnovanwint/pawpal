import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,) {
  }

  async createChat(petId: string, chatBaseHistory: any, userId?: string): Promise<Chat> {
    // chatHistory,
    // chat: '',
    
    const chat = this.chatRepository.create({
      chatBaseHistory: '', 
      chat: JSON.stringify(chatBaseHistory),
      userId: userId ?? 'NULL',
      pet: { id: petId },
    });

    return await this.chatRepository.save(chat);
  }

  findAll() {
    return `This action returns all chat`;
  }

  async getChatsByPetId(petId: string): Promise<Chat[]> {
    return this.chatRepository.find({
      where: {
        pet: { id: petId },
      },
    });
  }

  async getChatById(id: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: {
        id:id
      },
      relations: ['pet']
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    return chat; 
  }

  async updateChatHistory(chatId: string, newChat: Partial<Chat>): Promise<Chat> {
    let chat = await this.chatRepository.findOne({ where: { id: chatId } });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }
    Object.assign(chat, newChat);
    
    return await this.chatRepository.save(chat);
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
