import Groq from 'groq-sdk';
import { JobAnalysis } from '@/types/job';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeJobDescriptionGroqq(jobDescription: string): Promise<JobAnalysis> {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
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

Respond ONLY with valid JSON in this exact format:
{
  "summary": "Brief summary here",
  "skills": ["skill1", "skill2", "skill3"]
}
Do not include any extra explanation.
`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from Groq');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return {
      summary: 'Unable to analyze job description at this time. Please check your Groq API configuration.',
      skills: ['Communication', 'Problem Solving', 'Technical Skills'],
    };
  }
}
