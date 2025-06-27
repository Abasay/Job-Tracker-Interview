import { Job } from '@/types/job';
import fs from 'fs';
import path from 'path';

const JOBS_FILE = path.join(process.cwd(), 'data', 'jobs.json');

function ensureDataDir() {
  const dataDir = path.dirname(JOBS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function getJobs(): Job[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(JOBS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading jobs:', error);
    return [];
  }
}

export function saveJobs(jobs: Job[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Error saving jobs:', error);
    throw new Error('Failed to save jobs');
  }
}

export function addJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Job {
  const jobs = getJobs();
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
}

export function updateJob(id: string, updates: Partial<Omit<Job, 'id' | 'createdAt'>>): Job | null {
  const jobs = getJobs();
  const index = jobs.findIndex((job) => job.id === id);

  if (index === -1) {
    return null;
  }

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveJobs(jobs);
  return jobs[index];
}

export function deleteJob(id: string): boolean {
  const jobs = getJobs();
  const initialLength = jobs.length;
  const filteredJobs = jobs.filter((job) => job.id !== id);

  if (filteredJobs.length === initialLength) {
    return false;
  }

  saveJobs(filteredJobs);
  return true;
}
