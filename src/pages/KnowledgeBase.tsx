import { useState } from 'react';
import { Upload, Search, File, FileText, Trash2, Eye, Download, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
}

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Company Handbook 2024.pdf',
      type: 'PDF',
      category: 'Company Policies',
      size: '2.4 MB',
      uploadDate: '2024-06-15',
      status: 'ready',
    },
    {
      id: 2,
      name: 'Engineering Standards.docx',
      type: 'DOCX',
      category: 'Technical Documentation',
      size: '1.8 MB',
      uploadDate: '2024-06-20',
      status: 'ready',
    },
    {
      id: 3,
      name: 'Product Design Guidelines.pdf',
      type: 'PDF',
      category: 'Design Standards',
      size: '3.2 MB',
      uploadDate: '2024-06-22',
      status: 'ready',
    },
    {
      id: 4,
      name: 'Interview Best Practices.txt',
      type: 'TXT',
      category: 'Training Materials',
      size: '45 KB',
      uploadDate: '2024-07-01',
      status: 'ready',
    },
    {
      id: 5,
      name: 'Code Review Guidelines.pdf',
      type: 'PDF',
      category: 'Technical Documentation',
      size: '892 KB',
      uploadDate: '2024-07-05',
      status: 'processing',
    },
  ]);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(documents.map((d) => d.category)));

  const handleDelete = () => {
    if (!selectedDoc) return;
    setDocuments(documents.filter((d) => d.id !== selectedDoc.id));
    setShowDeleteDialog(false);
    setSelectedDoc(null);
  };

  const openDeleteDialog = (doc: Document) => {
    setSelectedDoc(doc);
    setShowDeleteDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge variant="success">Ready</Badge>;
      case 'processing':
        return <Badge variant="info">Processing</Badge>;
      case 'error':
        return <Badge variant="danger">Error</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <File className="w-8 h-8 text-red-500" />;
      case 'DOCX':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'TXT':
        return <FileText className="w-8 h-8 text-gray-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Knowledge Base
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage documents for AI interviewer reference
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {documents.length}
                </p>
              </div>
              <Database className="w-8 h-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {categories.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {documents.filter((d) => d.status === 'processing').length}
                </p>
              </div>
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ready</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {documents.filter((d) => d.status === 'ready').length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categories.map((cat) => ({ value: cat, label: cat })),
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={Database}
              title="No documents found"
              description="Upload documents to provide context and knowledge to your AI interviewer"
              action={{
                label: 'Upload Document',
                onClick: () => setShowUploadModal(true),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{getFileIcon(doc.type)}</div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {doc.name}
                  </h3>
                  <Badge variant="default" className="mb-3">
                    {doc.category}
                  </Badge>
                  <div className="w-full space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{doc.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span className="font-medium">{doc.uploadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteDialog(doc)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
        size="lg"
      >
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-dark-700'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              // Handle file drop
            }}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-900 dark:text-white font-medium mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Supported formats: PDF, DOCX, TXT (Max 10MB)
            </p>
            <Button variant="outline">Select Files</Button>
          </div>

          <Select
            label="Category"
            options={[
              { value: '', label: 'Select category...' },
              { value: 'policies', label: 'Company Policies' },
              { value: 'technical', label: 'Technical Documentation' },
              { value: 'design', label: 'Design Standards' },
              { value: 'training', label: 'Training Materials' },
              { value: 'other', label: 'Other' },
            ]}
          />

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowUploadModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1">Upload</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedDoc(null);
        }}
        onConfirm={handleDelete}
        title="Delete Document"
        description={`Are you sure you want to delete "${selectedDoc?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
