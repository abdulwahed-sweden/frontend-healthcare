'use server';

/**
 * @fileOverview An AI agent that helps re-word messages to maximize clarity for a given audience.
 *
 * - clarifyMessage - A function that handles the message clarification process.
 * - ClarifyMessageInput - The input type for the clarifyMessage function.
 * - ClarifyMessageOutput - The return type for the clarifyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClarifyMessageInputSchema = z.object({
  message: z.string().describe('The original message to be clarified.'),
  audience: z
    .enum(['students', 'parents', 'medical professionals'])
    .describe('The target audience for the message.'),
});
export type ClarifyMessageInput = z.infer<typeof ClarifyMessageInputSchema>;

const ClarifyMessageOutputSchema = z.object({
  clarifiedMessage: z
    .string()
    .describe('The clarified message, re-worded for the specified audience.'),
  reasoning: z
    .string()
    .describe('Explanation of why the message was re-worded in this way.'),
});
export type ClarifyMessageOutput = z.infer<typeof ClarifyMessageOutputSchema>;

export async function clarifyMessage(input: ClarifyMessageInput): Promise<ClarifyMessageOutput> {
  return clarifyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clarifyMessagePrompt',
  input: {schema: ClarifyMessageInputSchema},
  output: {schema: ClarifyMessageOutputSchema},
  prompt: `You are an expert communication specialist, skilled at tailoring messages for different audiences.

You will receive a message and a target audience. Your task is to re-word the message to maximize clarity for that audience.
Consider what might confuse the audience and adapt your suggestion accordingly. Explain your reasoning for the changes.

Original Message: {{{message}}}
Target Audience: {{{audience}}}

Clarified Message: 
Reasoning: `,
});

const clarifyMessageFlow = ai.defineFlow(
  {
    name: 'clarifyMessageFlow',
    inputSchema: ClarifyMessageInputSchema,
    outputSchema: ClarifyMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
