'use client';

import { useState } from 'react';
import { JobAnalysis } from '@/types/job';
import { Brain, Loader, Lightbulb, FileText, ComputerIcon } from 'lucide-react';

export default function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze job description. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ComputerIcon className="w-6 h-6 " />
        <h2 className="text-xl font-bold text-gray-800">AI Job Analysis</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to get AI-powered insights..."
            className="w-full h-32 px-5 py-5 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !jobDescription.trim()}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-[40px] hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <ComputerIcon className="w-4 h-4" />}
          {isLoading ? 'Analyzing...' : 'Analyze Job'}
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 " />
                <h3 className="font-bold ">Job Summary</h3>
              </div>
              <p className="text-blue-700 italic">{analysis.summary}</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 " />
                <h3 className="font-bold ">Recommended Skills to Highlight</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-200 text-green-900 text-sm font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
