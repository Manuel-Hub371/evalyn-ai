import { Download, FileText, Calendar, TrendingUp, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useState } from 'react';

export function Reports() {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('all');

  const reports = [
    {
      id: 1,
      name: 'Weekly Hiring Report',
      description: 'Summary of interviews and hiring decisions for the past week',
      date: '2024-07-15',
      type: 'Weekly',
      icon: Calendar,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      id: 2,
      name: 'Candidate Performance Analysis',
      description: 'Detailed breakdown of candidate scores and competencies',
      date: '2024-07-15',
      type: 'Custom',
      icon: TrendingUp,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      id: 3,
      name: 'Department Hiring Statistics',
      description: 'Hiring metrics grouped by department',
      date: '2024-07-10',
      type: 'Monthly',
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
    {
      id: 4,
      name: 'Interview Template Effectiveness',
      description: 'Analysis of which templates yield the best candidates',
      date: '2024-07-08',
      type: 'Quarterly',
      icon: FileText,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    },
    {
      id: 5,
      name: 'Job Opening Pipeline Report',
      description: 'Status of all active job postings and candidate flow',
      date: '2024-07-05',
      type: 'Weekly',
      icon: Briefcase,
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    },
  ];

  const quickStats = [
    { label: 'Total Reports', value: '47', change: '+8 this month' },
    { label: 'Generated This Week', value: '12', change: '+3 from last week' },
    { label: 'Scheduled Reports', value: '8', change: '5 weekly, 3 monthly' },
    { label: 'Custom Reports', value: '15', change: 'Created by users' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and download hiring reports
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              options={[
                { value: 'last7', label: 'Last 7 days' },
                { value: 'last30', label: 'Last 30 days' },
                { value: 'last90', label: 'Last 90 days' },
                { value: 'thisYear', label: 'This year' },
                { value: 'custom', label: 'Custom range' },
              ]}
            />
            <Select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              options={[
                { value: 'all', label: 'All Reports' },
                { value: 'Weekly', label: 'Weekly' },
                { value: 'Monthly', label: 'Monthly' },
                { value: 'Quarterly', label: 'Quarterly' },
                { value: 'Custom', label: 'Custom' },
              ]}
            />
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports
          .filter((report) => reportType === 'all' || report.type === reportType)
          .map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <report.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Weekly Hiring Summary',
                frequency: 'Every Monday at 9:00 AM',
                recipients: '3 recipients',
              },
              {
                name: 'Monthly Performance Report',
                frequency: 'First day of each month',
                recipients: '5 recipients',
              },
              {
                name: 'Quarterly Analytics',
                frequency: 'Every quarter',
                recipients: '2 recipients',
              },
            ].map((scheduled, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {scheduled.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {scheduled.frequency} • {scheduled.recipients}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
