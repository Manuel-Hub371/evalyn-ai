import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Copy, Eye, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: number;
  name: string;
  department: string;
  experience: string;
  status: 'published' | 'draft';
  duration: number;
  stages: number;
  skills: number;
  createdDate: string;
  usedCount: number;
}

export function InterviewTemplates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: 'Senior Frontend Developer',
      department: 'Engineering',
      experience: 'Senior',
      status: 'published',
      duration: 45,
      stages: 5,
      skills: 8,
      createdDate: '2024-05-10',
      usedCount: 23,
    },
    {
      id: 2,
      name: 'Marketing Manager',
      department: 'Marketing',
      experience: 'Mid-level',
      status: 'published',
      duration: 40,
      stages: 4,
      skills: 6,
      createdDate: '2024-05-15',
      usedCount: 15,
    },
    {
      id: 3,
      name: 'Data Analyst',
      department: 'Analytics',
      experience: 'Mid-level',
      status: 'published',
      duration: 35,
      stages: 4,
      skills: 7,
      createdDate: '2024-06-01',
      usedCount: 18,
    },
    {
      id: 4,
      name: 'Product Designer',
      department: 'Design',
      experience: 'Senior',
      status: 'draft',
      duration: 50,
      stages: 6,
      skills: 9,
      createdDate: '2024-07-10',
      usedCount: 0,
    },
    {
      id: 5,
      name: 'DevOps Engineer',
      department: 'Engineering',
      experience: 'Senior',
      status: 'published',
      duration: 60,
      stages: 6,
      skills: 10,
      createdDate: '2024-04-20',
      usedCount: 31,
    },
    {
      id: 6,
      name: 'Sales Executive',
      department: 'Sales',
      experience: 'Mid-level',
      status: 'published',
      duration: 30,
      stages: 3,
      skills: 5,
      createdDate: '2024-06-05',
      usedCount: 12,
    },
  ]);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || template.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleDelete = () => {
    if (!selectedTemplate) return;
    setTemplates(templates.filter(t => t.id !== selectedTemplate.id));
    setShowDeleteDialog(false);
    setSelectedTemplate(null);
  };

  const handleDuplicate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Math.max(...templates.map(t => t.id)) + 1,
      name: `${template.name} (Copy)`,
      status: 'draft',
      usedCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setTemplates([...templates, newTemplate]);
    setShowDropdown(null);
  };

  const openDeleteDialog = (template: Template) => {
    setSelectedTemplate(template);
    setShowDeleteDialog(true);
    setShowDropdown(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const departments = Array.from(new Set(templates.map(t => t.department)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Interview Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage interview configurations
          </p>
        </div>
        <Button onClick={() => navigate('/interview-templates/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Template
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
                  placeholder="Search templates..."
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
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
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

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={FileText}
              title="No templates found"
              description="Create your first interview template to standardize your hiring process"
              action={{
                label: 'Create Template',
                onClick: () => navigate('/interview-templates/new'),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {template.department} • {template.experience}
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === template.id ? null : template.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    {showDropdown === template.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => navigate(`/interview-templates/${template.id}`)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View/Preview</span>
                        </button>
                        <button
                          onClick={() => navigate(`/interview-templates/${template.id}`)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDuplicate(template)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={() => openDeleteDialog(template)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  {getStatusBadge(template.status)}
                  {template.usedCount > 0 && (
                    <Badge variant="info">{template.usedCount} interviews</Badge>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {template.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Stages</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {template.stages}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Skills</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {template.skills}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-dark-800">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Created: {template.createdDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedTemplate(null);
        }}
        onConfirm={handleDelete}
        title="Delete Template"
        description={`Are you sure you want to delete "${selectedTemplate?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
