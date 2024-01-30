    import { StringOutputParser } from '@langchain/core/output_parsers';
    import { PromptTemplate } from '@langchain/core/prompts';
    import { ChatOpenAI } from '@langchain/openai';
    import { Injectable } from '@nestjs/common';
    import { ChatService } from 'src/chat/chat.service';
    import { PetService } from 'src/pet/pet.service';
    
    @Injectable()
    export class LlmAiService {

        convoHistory: string[] = [];
    
        llm: ChatOpenAI;
        private tokenUsage: any;
        answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about {} based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@scrimba.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
        context: {context}
        question: {question}
        answer:`
        answerTemplate2 = `You are a helpful and enthusiastic pet care chatbot called 'FurBuddy'. who can answer a given question about pet information provided. highlighting the key features of the service such as Tailored Recommendations and Interactive Guidance. Encourage users to ask about any pet-related questions, and ensure a friendly and helpful tone throughout the response.
        \npet details provided by Human: {pet_details}
        \npet Conversation History: {chat_history}
        \nquestion: {question}
        \nanswer:
        `
        // Previous Conversation: {chat}
        constructor(private chatService: ChatService) {
            this.llm = new ChatOpenAI({
                openAIApiKey: process.env.OPENAI_API_KEY,
                modelName: 'gpt-3.5-turbo',
                temperature: 0.5,
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
        
        async answerWithOpenAI(chatId:string , humanMessage: string) {
            this.convoHistory.push("Human: "+ humanMessage);
            
            const chain = PromptTemplate.fromTemplate(this.answerTemplate2).pipe(this.llm).pipe(new StringOutputParser())
            const chat_details = await this.chatService.getChatById(chatId)
            const response = await chain.invoke({pet_details:JSON.stringify(chat_details.pet), chat_history :JSON.stringify(this.convoHistory), question: humanMessage})
            this.convoHistory.push("AI: "+ response);
            // console.log(chat_details) 
            // console.log(response)
            return response;
            // const answer = 
        }
    }
    