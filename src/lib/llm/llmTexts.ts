import { createStructuredOutputChainFromZod } from 'langchain/chains/openai_functions';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
	// PromptTemplate
} from 'langchain/prompts';
import { z } from 'zod';
// import type { UnauthorizedException } from "@propelauth/node";

const zExtractionSchema = z.object({
	shortS: z
		.array(
			z
				.string()
				.describe('Very short copywriting sentence with variations of 2 - 5 words per sentence for the video')
		)
		.describe('An array of 18 different very short sentences'),
	midS: z
		.array(z.string().describe('A short copywriting sentence for the video'))
		.describe('An array with at least 11 sentences with a word count of 5 - 10 words'),

	imgPrompts: z.array(
		z.string()
		.min(8)
		.describe('A description of an image in order to create an image for the video'),
	).describe("An array of different image descriptions for the video ")
	// videoPrompt: z
	// 	.string()
	// 	.describe('very short and simple words for a matching shutter stock video'),
	// musicPrompt: z.string().describe('very short description for a music prompt'),
});


// that people will use for advertisement
export default async function getTexts(userPrompt: string) {
	console.log(userPrompt, '<-- llm Text');
	const prompt = new ChatPromptTemplate({
		promptMessages: [
			SystemMessagePromptTemplate.fromTemplate(`
             - You create copywriting sentences based on the {inputText} for marketing videos. 
             - Your response is always in valid JSON format. Try to keep yourself short and answer in the laguage from the {inputText}.
             - Create all the copywriting sentences in the correct Schema and be creative with your words.
             - For the short Sentences in shortS array it is important to generate at least 18 sentences in the array for shortS with maximum of 5 words per sentence.
             - At least 11 sentences for midS with 6 - 10 words.
             - imgPrompts is an array of strings always in english that describes what an image would looks like. keep it precise to just the description of the image.
             `),
			HumanMessagePromptTemplate.fromTemplate('{inputText}'),
		],
		//    - musicPrompt is a string for a some music. example: Edo25 major g melodies that sound cinematic. Leading up to a crescendo that resolves in a 9th harmonic

		inputVariables: ['inputText'],
	});

	const llm = new ChatOpenAI({
		openAIApiKey: process.env.OPENAI_API_KEY,
		modelName: 'gpt-3.5-turbo-0613',
		temperature: 0.3,
		streaming: false,
	});

	const chain = createStructuredOutputChainFromZod(zExtractionSchema, {
		prompt,
		llm,
	});

	let res = null;

	// TODO FIX THIS mess...
	try {
		const response = await chain.call({
			inputText: userPrompt,
		});

		if (response) {
			res = response;
			// console.log(res, "response ??")
		}
	} catch (error) {
		// Handle any other errors
		console.log(error, 'err');
		alert('things broken ?');
		const response = await chain.call({
			inputText: userPrompt,
		});
		if (response) {
			res = response;
		} else {
			console.log(error);
		}
	}

	return res;
}
