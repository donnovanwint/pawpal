import { ChatOpenAI } from '@langchain/openai';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/chat/entities/chat.entity';
import { PetService } from 'src/pet/pet.service';
import { ChatManager } from './dto/chat-manager';
import { getChatCompletionAnswerInputDTO, getChatCompletionAnswerOutputDTO } from './dto/standalone-ai.dto';

@Injectable()
export class StandaloneAiService {

    // chatManager: ChatManager; 
    private chat: ChatOpenAI;
    private tokenUsage: any;
    pet_info_initial: string = "You are the voice of a pet care chatbot called 'FurBuddy' Craft a welcoming and informative message for users, highlighting the key features of the service such as Instant Answers, Tailored Recommendations, Always Accessibility, and Interactive Guidance. Encourage users to ask about any pet-related questions, and ensure a friendly and helpful tone throughout the response."

    openAiStartSystemMessage: string = "You are the voice of a pet care chatbot called 'FurBuddy' Craft a welcoming and informative message for users, highlighting the key features of the service such as Instant Answers, Tailored Recommendations, Always Accessibility, and Interactive Guidance. Encourage users to ask about any pet-related questions, and ensure a friendly and helpful tone throughout the response."


    constructor(private readonly chatService: ChatService,
        private readonly petService: PetService,
        private chatManager: ChatManager
    ) {
        this.chat = new ChatOpenAI({
            temperature: 1,
            openAIApiKey: process.env.OPENAI_API_KEY ?? 'null',
            modelName: 'gpt-3.5-turbo',
            maxTokens: 50,
            maxConcurrency: 1,
            callbacks: [
                {
                    handleLLMEnd: (output) => {
                        this.tokenUsage = output.llmOutput?.tokenUsage
                        console.log(this.tokenUsage)
                    },
                },
            ],
        })
    }

    // async getAiModelAnswer(chatId: string, data: getChatCompletionAnswerInputDTO) {
    //     this.chatManager.addHumanMessage(data.message)
    //     const result = await this.chat.invoke(this.chatManager.chatBaseHistory);
    //     // const result = await this.chat.invoke(this.chatManager.chatManager);
    //     console.log(JSON.stringify(result))
    //     const aIMessage = result.content;
    //     // this.chatManager.addAiMessage(chatId ,aIMessage);
    //     this.updateChatToDB(chatId, 'chatBase', this.chatManager.chatBaseHistory);
    //     return getChatCompletionAnswerOutputDTO.getInstance(aIMessage)
    // }

    async getAiModelAnswerWithChat(chatId: string, data: getChatCompletionAnswerInputDTO) {
        await this.loadExistingChat(chatId)
        this.chatManager.addHumanMessage(data.message);
        await this.updateChatToDB(chatId, 'chat', this.chatManager.chat);
        const result = await this.chat.invoke(this.chatManager.chatBaseHistory);
        const aIMessage = JSON.stringify(result.content);
        this.chatManager.addAiMessage(aIMessage, this.tokenUsage);
        await this.updateChatToDB(chatId, 'chat', this.chatManager.chat);
        return getChatCompletionAnswerOutputDTO.getInstance(aIMessage)
    }

    async createNewChat(petId: string, userId: string, username: string) {
        this.chatManager.chatBaseHistory = [];
        this.chatManager.chat = [];
        this.chatManager.addSystemMessage(this.openAiStartSystemMessage);

        const pet = await this.petService.getPetById(petId);
        if (!pet) {
            throw new NotFoundException(`Pet with ID ${petId} not found`);
        }
        const endMessage: string = `Can we start with this line? \n\n Hi, I'm FurBuddy. How can I help you, ${username}? Let's talk about your furry friend, ${pet.name}.`;
        this.chatManager.addSystemMessage(`\n\nThis is the pet details,in which the user is interested to talk about:\n\n ` + JSON.stringify(pet) + `.\n\n`)
        this.chatManager.addSystemMessage(endMessage);
        const chat = await this.chatService.createChat(petId, this.chatManager.chat, userId);
        return chat ? (chat).id : 'Failed to start';
    }

    async loadExistingChat(id: string): Promise<Chat> {
        this.chatManager.chatBaseHistory = [];
        this.chatManager.chat = [];
        const chatResponse = await this.chatService.getChatById(id)
        let chat = JSON.parse(chatResponse.chat ?? '[]')
        if (chat.length > 0) {
            chat.forEach((chat: any) => {
                if (chat.role === 'system') {
                    this.chatManager.addSystemMessage(chat.text)
                } else if (chat.role === 'ai') {
                    this.chatManager.addAiMessage(chat.text, chat.tokenUsage)
                } else if (chat.role === 'user') {
                    this.chatManager.addHumanMessage(chat.text)
                }
            });
        }
        return chatResponse;
    }

    async updateChatToDB(chatId: string, type: string, chatHistory: any) {
        const chat = new Chat();
        chat.chat = JSON.stringify(chatHistory)
        if (chatHistory.length > 2) {
            const totalTokenUsage = chatHistory.reduce((total: any, message: any) => {
                if (message.tokenUsage && typeof message.tokenUsage.totalTokens === 'number') {
                    return total + message.tokenUsage.totalTokens;
                }
                return total;
            }, 0);
            if (totalTokenUsage > 1) chat.totalToken = totalTokenUsage;
        }

        return await this.chatService.updateChatHistory(chatId, chat);
    }

}
