'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/types/job';
import { Plus, X } from 'lucide-react';

interface JobFormProps {
  onSubmit: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  initialData?: Partial<Job>;
  isEditing?: boolean;
}

export default function JobForm({ onSubmit, onCancel, initialData, isEditing }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    applicationLink: initialData?.applicationLink || '',
    status: initialData?.status || ('Applied' as const),
  });

  useEffect(() => {
    if (initialData)
      setFormData({
        title: initialData?.title || '',
        company: initialData?.company || '',
        applicationLink: initialData?.applicationLink || '',
        status: initialData?.status || ('Applied' as const),
      });
  }, [isEditing]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      company: '',
      applicationLink: '',
      status: 'Applied',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
        </h2>
        {onCancel && (
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tech Corp"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Link *</label>
            <input
              type="url"
              required
              value={formData.applicationLink}
              onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-[40px] hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {isEditing ? 'Update Application' : 'Add Application'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-[40px] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
