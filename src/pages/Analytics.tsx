import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { useState } from 'react';
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
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, Users, Briefcase, Target, Clock, Award } from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('last30');

  const hiringTrends = [
    { month: 'Jan', candidates: 245, hired: 32, rejected: 180, reviewing: 33 },
    { month: 'Feb', candidates: 298, hired: 45, rejected: 210, reviewing: 43 },
    { month: 'Mar', candidates: 352, hired: 58, rejected: 245, reviewing: 49 },
    { month: 'Apr', candidates: 420, hired: 67, rejected: 295, reviewing: 58 },
    { month: 'May', candidates: 398, hired: 61, rejected: 280, reviewing: 57 },
    { month: 'Jun', candidates: 445, hired: 72, rejected: 310, reviewing: 63 },
    { month: 'Jul', candidates: 389, hired: 54, rejected: 275, reviewing: 60 },
  ];

  const avgScoresByDept = [
    { department: 'Engineering', avgScore: 82 },
    { department: 'Marketing', avgScore: 78 },
    { department: 'Sales', avgScore: 85 },
    { department: 'Design', avgScore: 80 },
    { department: 'Analytics', avgScore: 88 },
    { department: 'HR', avgScore: 75 },
  ];

  const completionRate = [
    { name: 'Completed', value: 873, color: '#10b981' },
    { name: 'Incomplete', value: 127, color: '#ef4444' },
  ];

  const failedCompetencies = [
    { name: 'Technical Depth', count: 45 },
    { name: 'Problem Solving', count: 38 },
    { name: 'Communication', count: 32 },
    { name: 'Experience', count: 28 },
    { name: 'Leadership', count: 22 },
  ];

  const interviewDuration = [
    { range: '0-20 min', count: 15 },
    { range: '20-40 min', count: 245 },
    { range: '40-60 min', count: 520 },
    { range: '60-80 min', count: 180 },
    { range: '80+ min', count: 40 },
  ];

  const kpiCards = [
    {
      title: 'Total Interviews',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Hire Rate',
      value: '18.2%',
      change: '+2.3%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Average Score',
      value: '76.4',
      change: '+1.8',
      trend: 'up',
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Avg Duration',
      value: '42 min',
      change: '-3 min',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Insights and trends from your hiring data
          </p>
        </div>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          options={[
            { value: 'last7', label: 'Last 7 days' },
            { value: 'last30', label: 'Last 30 days' },
            { value: 'last90', label: 'Last 90 days' },
            { value: 'thisYear', label: 'This year' },
            { value: 'allTime', label: 'All time' },
          ]}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    kpi.trend === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hiringTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-dark-700" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="candidates"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Total Candidates"
                />
                <Area
                  type="monotone"
                  dataKey="hired"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  name="Hired"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionRate}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionRate.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Scores by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Average Scores by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgScoresByDept} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-dark-700" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis dataKey="department" type="category" className="text-xs" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="avgScore" fill="#8b5cf6" name="Average Score" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Failed Competencies */}
        <Card>
          <CardHeader>
            <CardTitle>Most Failed Competencies</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={failedCompetencies}>
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
                <Bar dataKey="count" fill="#ef4444" name="Failed Count" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Interview Duration Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Duration Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interviewDuration}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-dark-700" />
              <XAxis dataKey="range" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" name="Number of Interviews" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
