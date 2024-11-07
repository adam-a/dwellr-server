import OpenAI from 'openai';

import env from '../environment';
import { PostMetadata } from '../Types/posts';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const generatePostMetadata = async (transcript: string): Promise<PostMetadata> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          "Fill in the values for the JSON object given (for each key) ONLY using the user's response. You are designed to output JSON with format { includesParking?: boolean; leaseAvailabilityDate?: Date; lengthOfLeaseInMonths?: number; petsAllowed?: boolean; price?: number; sqft?: number; generatedDescription?: string; bedroomCount?: number; bathroomCount?: number; furnished?: boolean; kitchen?: boolean; appliances?: string; amenities?: string; yard?: boolean; location?: string; utilitiesIncluded?: boolean; };. For appliances and amenities, it'll be a comma separated string (NOT A LIST) -- Example: 'washing machine, dryer, washer'. For Yes/No answers just type 'true' or 'false'. If you can't find the answer, just omit those keys. If there are digits involved, input only the number (integer). For leaseAvailabilityDate, use format of MM/DD/YYYY. For generatedDescription, generate a short 50 word description of the apartment",
      },
      {
        role: 'user',
        content: transcript,
      },
    ],
    response_format: { type: 'json_object' },
    model: 'gpt-4-1106-preview',
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error('Invalid content retrieved from API');
  }

  const postMetadata: PostMetadata = JSON.parse(content);
  console.log(postMetadata);
  return postMetadata;
};
