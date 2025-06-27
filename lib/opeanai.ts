import OpenAI from 'openai';
import { JobAnalysis } from '@/types/job';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeJobDescriptionOpenAi(jobDescription: string): Promise<JobAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a career advisor helping job seekers analyze job descriptions. Provide a concise summary and suggest relevant skills.',
        },
        {
          role: 'user',
          content: `Please analyze this job description and provide:
1. A brief summary (2-3 sentences)
2. The top 3 skills a candidate should highlight in their resume

Job Description:
${jobDescription}

Please respond in JSON format:
{
  "summary": "Brief summary here",
  "skills": ["skill1", "skill2", "skill3"]
}`,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return {
      summary: 'Unable to analyze job description at this time. Please check your OpenAI API configuration.',
      skills: ['Communication', 'Problem Solving', 'Technical Skills'],
    };
  }
}
