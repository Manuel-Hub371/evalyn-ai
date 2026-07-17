import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const candidate = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    interviewDate: '2024-07-15',
    score: 92,
    duration: 45,
    status: 'completed',
    recommendation: 'Hire',
  };

  const competencyScores = [
    { name: 'Technical Knowledge', score: 95, color: 'bg-blue-500' },
    { name: 'Problem Solving', score: 92, color: 'bg-green-500' },
    { name: 'Communication', score: 88, color: 'bg-purple-500' },
    { name: 'Experience & Background', score: 90, color: 'bg-orange-500' },
  ];

  const qaTranscript = [
    {
      question: 'Can you explain how React\'s virtual DOM works?',
      answer:
        'The virtual DOM is a lightweight representation of the actual DOM. When state changes, React creates a new virtual DOM tree and compares it with the previous one using a diffing algorithm. It then calculates the minimal set of changes needed and applies only those changes to the real DOM, making updates more efficient.',
      score: 95,
    },
    {
      question: 'How would you optimize the performance of a large React application?',
      answer:
        'I would use several strategies: code splitting with React.lazy and Suspense, memoization with React.memo and useMemo, virtualization for long lists, lazy loading images, and analyzing bundle size with tools like webpack-bundle-analyzer. I\'d also implement proper caching strategies and use React DevTools Profiler to identify bottlenecks.',
      score: 92,
    },
    {
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      answer:
        'I led the migration of a legacy jQuery codebase to React for a large e-commerce platform. The main challenges were maintaining feature parity during migration, training the team, and ensuring no disruption to users. We solved this by creating a hybrid approach, migrating page by page, implementing comprehensive tests, and maintaining detailed documentation throughout the process.',
      score: 90,
    },
  ];

  const strengths = [
    'Excellent understanding of React fundamentals and advanced patterns',
    'Strong problem-solving abilities with practical real-world examples',
    'Clear and articulate communication style',
    'Demonstrated leadership experience in complex projects',
    'Up-to-date knowledge of modern frontend technologies',
  ];

  const weaknesses = [
    'Could provide more detail on testing strategies',
    'Limited experience with certain state management libraries',
  ];

  const timeline = [
    { time: '00:00 - 05:00', event: 'Introduction & Icebreaker', stage: 'Introduction' },
    { time: '05:00 - 25:00', event: 'Technical Assessment', stage: 'Technical' },
    { time: '25:00 - 40:00', event: 'Behavioral Questions', stage: 'Behavioral' },
    { time: '40:00 - 45:00', event: 'Candidate Questions & Closing', stage: 'Closing' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/candidates')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {candidate.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {candidate.position} • {candidate.department}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>Send Email</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {candidate.score}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
              <Badge variant="success" className="mt-3">
                {candidate.recommendation}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interview Date</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {new Date(candidate.interviewDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {candidate.duration} minutes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
              <Badge variant="success">{candidate.status}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {candidate.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {candidate.phone}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {candidate.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competency Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Competency Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competencyScores.map((competency) => (
              <div key={competency.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {competency.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {competency.score}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${competency.color} rounded-full transition-all`}
                    style={{ width: `${competency.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="transcript">
        <TabsList>
          <TabsTrigger value="transcript">Interview Transcript</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Questions & Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qaTranscript.map((qa, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Q{index + 1}: {qa.question}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {qa.answer}
                        </p>
                      </div>
                      <Badge variant={qa.score >= 90 ? 'success' : qa.score >= 70 ? 'info' : 'warning'}>
                        {qa.score}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Interview Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.event}
                        </h4>
                        <Badge variant="default">{item.stage}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {strength}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {weakness}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
