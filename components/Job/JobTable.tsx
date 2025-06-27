'use client';

import { Job } from '@/types/job';
import { Edit, Trash2, ExternalLink, Edit2Icon } from 'lucide-react';

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interviewing: 'bg-yellow-100 text-yellow-800',
  Rejected: 'bg-red-100 text-red-800',
  Offer: 'bg-green-100 text-green-800',
};

export default function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No job applications yet. Add your first application above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{job.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[job.status]}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <a
                      href={job.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 bg-blue-100 h-7 w-7  flex justify-center p-1.5 rounded-full cursor-pointer"
                      title="View Application"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onEdit(job)}
                      className="text-gray-600 hover:text-gray-900 bg-gray-100 h-7 w-7  flex justify-center p-1.5 rounded-full cursor-pointer"
                      title="Edit"
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-red-600 rounded-full hover:text-red-900 bg-red-100 h-7 w-7  flex justify-center p-1.5 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
