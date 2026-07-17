import { useState } from 'react';
import { Search, Filter, Download, Eye, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  interviewDate: string;
  score: number;
  status: 'completed' | 'in_progress' | 'scheduled' | 'cancelled';
  recommendation: 'Hire' | 'Review' | 'Reject' | '-';
  duration: number;
}

export function Candidates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [recommendationFilter, setRecommendationFilter] = useState('all');

  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      interviewDate: '2024-07-15',
      score: 92,
      status: 'completed',
      recommendation: 'Hire',
      duration: 45,
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      position: 'Data Analyst',
      department: 'Analytics',
      interviewDate: '2024-07-15',
      score: 85,
      status: 'completed',
      recommendation: 'Hire',
      duration: 38,
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.williams@email.com',
      position: 'Marketing Manager',
      department: 'Marketing',
      interviewDate: '2024-07-14',
      score: 78,
      status: 'completed',
      recommendation: 'Review',
      duration: 42,
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@email.com',
      position: 'Product Designer',
      department: 'Design',
      interviewDate: '2024-07-14',
      score: 65,
      status: 'completed',
      recommendation: 'Reject',
      duration: 35,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      position: 'Backend Developer',
      department: 'Engineering',
      interviewDate: '2024-07-16',
      score: 0,
      status: 'in_progress',
      recommendation: '-',
      duration: 0,
    },
    {
      id: 6,
      name: 'John Davis',
      email: 'john.davis@email.com',
      position: 'DevOps Engineer',
      department: 'Engineering',
      interviewDate: '2024-07-16',
      score: 0,
      status: 'scheduled',
      recommendation: '-',
      duration: 0,
    },
  ]);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesRecommendation =
      recommendationFilter === 'all' || candidate.recommendation === recommendationFilter;
    return matchesSearch && matchesStatus && matchesRecommendation;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="warning">Scheduled</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'Hire':
        return <Badge variant="success">Hire</Badge>;
      case 'Review':
        return <Badge variant="warning">Review</Badge>;
      case 'Reject':
        return <Badge variant="danger">Reject</Badge>;
      default:
        return <Badge variant="default">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Candidates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage interview candidates
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'completed', label: 'Completed' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
            <Select
              value={recommendationFilter}
              onChange={(e) => setRecommendationFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Recommendations' },
                { value: 'Hire', label: 'Hire' },
                { value: 'Review', label: 'Review' },
                { value: 'Reject', label: 'Reject' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      {filteredCandidates.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={UsersIcon}
              title="No candidates found"
              description="No candidates match your current filters"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-800">
                  <tr className="border-b border-gray-200 dark:border-dark-700">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Candidate
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Position
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Interview Date
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Score
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Recommendation
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-gray-100 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {candidate.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {candidate.position}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.department}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 dark:text-white">
                        {new Date(candidate.interviewDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-6">
                        {candidate.score > 0 ? (
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  candidate.score >= 80
                                    ? 'bg-green-500'
                                    : candidate.score >= 60
                                    ? 'bg-blue-500'
                                    : candidate.score >= 40
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${candidate.score}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                              {candidate.score}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(candidate.status)}</td>
                      <td className="py-4 px-6">{getRecommendationBadge(candidate.recommendation)}</td>
                      <td className="py-4 px-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/candidates/${candidate.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
