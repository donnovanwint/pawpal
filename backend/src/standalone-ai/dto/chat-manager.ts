import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ChatManager {
    chatBaseHistory: BaseMessage[];
    chat: any[];

    constructor() {
        this.chatBaseHistory = [];
    }

    addSystemMessage(systemMessage: string) {
        this.chatBaseHistory.push(new SystemMessage(systemMessage));
        this.chat.push({ 'role': 'system', 'text': systemMessage });
    }

    addAiMessage(aiMessage: string, tokenUsage?: string) {
        this.chatBaseHistory.push(new AIMessage(aiMessage));
        this.chat.push({ 'role': 'ai', 'text': aiMessage, 'tokenUsage': tokenUsage });
    }

    addHumanMessage(humanMessage: string) {
        this.chatBaseHistory.push(new HumanMessage(humanMessage));
        this.chat.push({ 'role': 'user', 'text': humanMessage });
    }
}