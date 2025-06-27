import { analyzeJobDescriptionGroqq } from '@/lib/groqqai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 });
    }

    const analysis = await analyzeJobDescriptionGroqq(jobDescription);
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze job description' }, { status: 500 });
  }
}
