import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Candidates',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Active Jobs',
      value: '43',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Completion Rate',
      value: '87.3%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Avg. Interview Time',
      value: '32 min',
      change: '-3 min',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const recentCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      score: 92,
      status: 'completed',
      date: '2024-07-15',
      recommendation: 'Hire',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Data Analyst',
      score: 85,
      status: 'completed',
      date: '2024-07-15',
      recommendation: 'Hire',
    },
    {
      id: 3,
      name: 'Emma Williams',
      position: 'Marketing Manager',
      score: 78,
      status: 'completed',
      date: '2024-07-14',
      recommendation: 'Review',
    },
    {
      id: 4,
      name: 'David Brown',
      position: 'Product Designer',
      score: 65,
      status: 'completed',
      date: '2024-07-14',
      recommendation: 'Reject',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      position: 'Backend Developer',
      score: 88,
      status: 'in_progress',
      date: '2024-07-16',
      recommendation: '-',
    },
  ];

  const upcomingInterviews = [
    { id: 1, candidate: 'John Davis', position: 'DevOps Engineer', time: '2:00 PM Today' },
    { id: 2, candidate: 'Maria Garcia', position: 'HR Manager', time: '4:30 PM Today' },
    { id: 3, candidate: 'James Wilson', position: 'Sales Executive', time: '10:00 AM Tomorrow' },
    { id: 4, candidate: 'Anna Martinez', position: 'Finance Analyst', time: '2:00 PM Tomorrow' },
  ];

  const pipelineData = [
    { name: 'Jan', candidates: 245, hired: 32 },
    { name: 'Feb', candidates: 298, hired: 45 },
    { name: 'Mar', candidates: 352, hired: 58 },
    { name: 'Apr', candidates: 420, hired: 67 },
    { name: 'May', candidates: 398, hired: 61 },
    { name: 'Jun', candidates: 445, hired: 72 },
    { name: 'Jul', candidates: 389, hired: 54 },
  ];

  const scoreDistribution = [
    { name: '0-40', value: 45, color: '#ef4444' },
    { name: '41-60', value: 128, color: '#f59e0b' },
    { name: '61-80', value: 312, color: '#3b82f6' },
    { name: '81-100', value: 189, color: '#10b981' },
  ];

  const activityTimeline = [
    {
      id: 1,
      type: 'candidate',
      title: 'New candidate completed interview',
      description: 'Sarah Johnson - Senior Frontend Developer',
      time: '5 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      id: 2,
      type: 'template',
      title: 'Interview template published',
      description: 'Marketing Manager template is now live',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 3,
      type: 'job',
      title: 'New job posted',
      description: 'Senior Data Scientist position',
      time: '3 hours ago',
      icon: Briefcase,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 4,
      type: 'candidate',
      title: 'Candidate rejected',
      description: 'Low score on technical assessment',
      time: '5 hours ago',
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
    },
  ];

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Sarah
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your recruitment today
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate('/jobs')}>
            <Briefcase className="w-4 h-4 mr-2" />
            View Jobs
          </Button>
          <Button onClick={() => navigate('/interview-templates/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                  <span
                    className={
                      stat.trend === 'up'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-dark-700" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="candidates" fill="#3b82f6" name="Total Candidates" radius={[8, 8, 0, 0]} />
                <Bar dataKey="hired" fill="#10b981" name="Hired" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Candidates */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Candidates</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/candidates')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Candidate
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Position
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Score
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCandidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-gray-100 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800 cursor-pointer"
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {candidate.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.date}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        {candidate.position}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-12 h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
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
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(candidate.status)}</td>
                      <td className="py-3 px-4">
                        {getRecommendationBadge(candidate.recommendation)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityTimeline.map((activity) => (
                <div key={activity.id} className="flex space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-dark-800 h-fit`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Interviews</CardTitle>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {interview.candidate}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {interview.position}
                </p>
                <div className="flex items-center mt-3 text-sm text-primary-600 dark:text-primary-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {interview.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
