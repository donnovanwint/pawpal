export function formatConvHistory(messages: any) {
    return messages.map((message:any) => {
        if (message.role == 'user'){
            return `Human: ${message}`
        } else if(message.role == 'ai'){
            return `AI: ${message}`
        }else{
            return `System: ${message}`
        }
    }).join('\n')
}
