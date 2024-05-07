//https://rapidapi.com/truongvuhung102/api/chatgpt-best-price/
export const urlApiChat = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';

export let getOptions = (textPrompt) => {
    return {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '8df8d4e282msh07bd4823c13922ep1fe52cjsn5a9bbdcd57ea',
            'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: textPrompt,
                }
            ]
        }),
    }
};
