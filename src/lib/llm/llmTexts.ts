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
				.describe('Very short copywriting sentence with variations of 3 - 5 words for the template')
		)
		.describe('An array of 8 very short sentences'),
	longS: z
		.array(
			z.string().describe('A copywriting sentence for the template with a maximum of 12 words')
		)
		.min(2)
		.describe(
			'An array with exactly 3 entries of sentences with a word count of 8 up to max 12 words'
		),

	midS: z
		.array(z.string().describe('A short copywriting sentence for the template'))
		.describe('An array with at least 4 sentences with a word count of 4 - 8 words'),

	imgPrompts: z
		.string()
		.min(8)
		.describe('A description of an image in order to create an image for the template'),
	videoPrompt: z.string().describe('very short and simple words for a matching shutter stock video'),
	musicPrompt: z.string().describe('very short description for a music prompt'),
});

export default async function getTexts(userPrompt: string) {
	console.log(userPrompt, 'usr prmtp..  llm text get');
	const prompt = new ChatPromptTemplate({
		promptMessages: [
			SystemMessagePromptTemplate.fromTemplate(`
             - You create copywriting sentences based on the {inputText} for marketing videos that people will use for advertisement. 
             - Your response is always in valid JSON format. Try to keep yourself short and answer in the laguage from the {inputText}.
             - Create all the copywriting sentences in the correct Schema and try not to repeat yourself!
             - Create 2 sentences for the longS array with minimum 10 words and maximum of 15 words.
             - For the short Sentences in shortS array it is important to generate at least 6 sentences in the array for shortS with maximum of 5 words per sentence.
             - At least 5 sentences for midS with 6 - 10 words.
             - imgPrompts is a string always in english that describes what an image for such a video looks like. keep it precise to just the description of the image.
             - musicPrompt is a string for a some music. example: Edo25 major g melodies that sound cinematic. Leading up to a crescendo that resolves in a 9th harmonic
             `),
			HumanMessagePromptTemplate.fromTemplate('{inputText}'),
		],
		inputVariables: ['inputText'],
	});
	// console.log(prompt, "prmtp..  llm text get")

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
		console.log('here??');
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
