import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
    text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    };
};

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prompt = req.body.prompt;

    if (!prompt || prompt === '') {
        return new Response('Please send your prompt', { status:400 });
    }

    
}
