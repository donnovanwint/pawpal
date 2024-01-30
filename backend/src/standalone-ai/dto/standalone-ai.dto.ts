import { IsNotEmpty, IsString } from "class-validator";

export class getChatCompletionAnswerInputDTO {
    @IsString()
    @IsNotEmpty()
    message: string;
}

export class getChatCompletionAnswerOutputDTO {
    @IsString()
    @IsNotEmpty()
    aiMessage: string;
    
    static getInstance(aiMessage: any){
        const result = new getChatCompletionAnswerOutputDTO();
        result.aiMessage = aiMessage;
        return result;
    }
}