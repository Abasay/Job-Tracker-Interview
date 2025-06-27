'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import JobForm from './JobForm';
import JobTable from './JobTable';
import JobAnalyzer from './JobAnalyser';
import { Briefcase } from 'lucide-react';

export default function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddJob = async (jobData: Partial<Job>) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const newJob = await response.json();
        setJobs([...jobs, newJob]);
      }
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  const handleEditJob = async (jobData: Partial<Job>) => {
    if (!editingJob) return;

    try {
      const response = await fetch(`/api/jobs/${editingJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(jobs.map((job) => (job.id === editingJob.id ? updatedJob : job)));
        setEditingJob(null);
        setJobToEdit(null);
      }
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job application?')) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const stats = {
    total: jobs.length - 1,
    applied: jobs.filter((job) => job.status === 'Applied').length,
    interviewing: jobs.filter((job) => job.status === 'Interviewing').length,
    offers: jobs.filter((job) => job.status === 'Offer').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Tracker</h1>
          <p className="text-gray-600">Manage your job applications and get AI-powered insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applied</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.applied}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interviewing</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.interviewing}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.offers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Job Analyzer */}
        <JobAnalyzer />

        {/* Job Form */}
        <JobForm
          onSubmit={editingJob ? handleEditJob : handleAddJob}
          onCancel={editingJob ? () => setEditingJob(null) : undefined}
          initialData={editingJob || undefined}
          isEditing={!!editingJob}
        />

        {/* Job Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Applications</h2>
          <JobTable jobs={jobs} onEdit={setEditingJob} onDelete={handleDeleteJob} />
        </div>
      </div>
    </div>
  );
}
