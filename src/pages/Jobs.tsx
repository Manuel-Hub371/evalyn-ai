import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Textarea } from '@/components/ui/Textarea';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  department: string;
  employmentType: string;
  experience: string;
  status: 'active' | 'draft' | 'closed';
  candidates: number;
  template: string;
  createdDate: string;
  description: string;
}

export function Jobs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      employmentType: 'Full-time',
      experience: 'Senior',
      status: 'active',
      candidates: 45,
      template: 'Frontend Developer Template',
      createdDate: '2024-06-15',
      description: 'Looking for an experienced frontend developer proficient in React.',
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      employmentType: 'Full-time',
      experience: 'Mid-level',
      status: 'active',
      candidates: 28,
      template: 'Marketing Manager Template',
      createdDate: '2024-06-20',
      description: 'Seeking a creative marketing professional to lead campaigns.',
    },
    {
      id: 3,
      title: 'Data Analyst',
      department: 'Analytics',
      employmentType: 'Full-time',
      experience: 'Mid-level',
      status: 'active',
      candidates: 32,
      template: 'Data Analyst Template',
      createdDate: '2024-06-18',
      description: 'Data-driven professional needed for business intelligence.',
    },
    {
      id: 4,
      title: 'Product Designer',
      department: 'Design',
      employmentType: 'Contract',
      experience: 'Senior',
      status: 'draft',
      candidates: 0,
      template: 'Product Designer Template',
      createdDate: '2024-07-10',
      description: 'Talented designer to shape product experiences.',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      employmentType: 'Full-time',
      experience: 'Senior',
      status: 'closed',
      candidates: 67,
      template: 'DevOps Template',
      createdDate: '2024-05-01',
      description: 'Infrastructure expert to manage cloud deployments.',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    employmentType: 'Full-time',
    experience: 'Mid-level',
    template: '',
    description: '',
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleCreate = () => {
    const newJob: Job = {
      id: Math.max(...jobs.map(j => j.id)) + 1,
      ...formData,
      status: 'draft',
      candidates: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setJobs([...jobs, newJob]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedJob) return;
    setJobs(jobs.map(job => job.id === selectedJob.id ? { ...job, ...formData } : job));
    setShowEditModal(false);
    setSelectedJob(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedJob) return;
    setJobs(jobs.filter(job => job.id !== selectedJob.id));
    setShowDeleteDialog(false);
    setSelectedJob(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      employmentType: 'Full-time',
      experience: 'Mid-level',
      template: '',
      description: '',
    });
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      experience: job.experience,
      template: job.template,
      description: job.description,
    });
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const openDeleteDialog = (job: Job) => {
    setSelectedJob(job);
    setShowDeleteDialog(true);
    setShowDropdown(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const departments = Array.from(new Set(jobs.map(j => j.department)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage open positions and job postings
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
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
                { value: 'active', label: 'Active' },
                { value: 'draft', label: 'Draft' },
                { value: 'closed', label: 'Closed' },
              ]}
            />
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Departments' },
                ...departments.map(dept => ({ value: dept, label: dept })),
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={Briefcase}
              title="No jobs found"
              description="Create your first job posting to start interviewing candidates"
              action={{
                label: 'Create Job',
                onClick: () => setShowCreateModal(true),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {job.department}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === job.id ? null : job.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    {showDropdown === job.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => navigate(`/candidates?job=${job.id}`)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Candidates</span>
                        </button>
                        <button
                          onClick={() => openEditModal(job)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openDeleteDialog(job)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    {getStatusBadge(job.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Employment</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {job.employmentType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {job.experience}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Candidates</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {job.candidates}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-dark-800">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Template: {job.template}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Created: {job.createdDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Create New Job"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g., Senior Frontend Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Department"
            placeholder="e.g., Engineering"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Employment Type"
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Internship', label: 'Internship' },
              ]}
            />
            <Select
              label="Experience Level"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              options={[
                { value: 'Entry-level', label: 'Entry-level' },
                { value: 'Mid-level', label: 'Mid-level' },
                { value: 'Senior', label: 'Senior' },
                { value: 'Lead', label: 'Lead' },
              ]}
            />
          </div>
          <Input
            label="Interview Template"
            placeholder="Select or enter template name"
            value={formData.template}
            onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            required
          />
          <Textarea
            label="Job Description"
            placeholder="Describe the position and responsibilities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} className="flex-1">
              Create Job
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Job Modal */}
      <Modal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedJob(null);
          resetForm();
        }}
        title="Edit Job"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g., Senior Frontend Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Department"
            placeholder="e.g., Engineering"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Employment Type"
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Internship', label: 'Internship' },
              ]}
            />
            <Select
              label="Experience Level"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              options={[
                { value: 'Entry-level', label: 'Entry-level' },
                { value: 'Mid-level', label: 'Mid-level' },
                { value: 'Senior', label: 'Senior' },
                { value: 'Lead', label: 'Lead' },
              ]}
            />
          </div>
          <Input
            label="Interview Template"
            placeholder="Select or enter template name"
            value={formData.template}
            onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            required
          />
          <Textarea
            label="Job Description"
            placeholder="Describe the position and responsibilities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedJob(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedJob(null);
        }}
        onConfirm={handleDelete}
        title="Delete Job"
        description={`Are you sure you want to delete "${selectedJob?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
