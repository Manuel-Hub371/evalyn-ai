import { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Switch } from '../ui/Switch';

export function GeneralInfo() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-level',
    duration: 45,
    language: 'English',
    difficulty: 'medium',
    description: '',
    isActive: true,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Job Title"
          placeholder="e.g., Senior Frontend Developer"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          required
        />
        <Input
          label="Department"
          placeholder="e.g., Engineering"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          value={formData.experienceLevel}
          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
          options={[
            { value: 'Entry-level', label: 'Entry-level' },
            { value: 'Junior', label: 'Junior' },
            { value: 'Mid-level', label: 'Mid-level' },
            { value: 'Senior', label: 'Senior' },
            { value: 'Lead', label: 'Lead / Principal' },
            { value: 'Executive', label: 'Executive' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Interview Duration (minutes)"
          type="number"
          min="15"
          max="120"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          required
        />
        <Select
          label="Interview Language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          options={[
            { value: 'English', label: 'English' },
            { value: 'Spanish', label: 'Spanish' },
            { value: 'French', label: 'French' },
            { value: 'German', label: 'German' },
            { value: 'Chinese', label: 'Chinese' },
            { value: 'Japanese', label: 'Japanese' },
          ]}
        />
        <Select
          label="Difficulty Level"
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
            { value: 'expert', label: 'Expert' },
          ]}
        />
      </div>

      <Textarea
        label="Position Description"
        placeholder="Describe the role, responsibilities, and what you're looking for in candidates..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={6}
        helperText="This helps the AI understand the context and ask relevant questions"
      />

      <div className="pt-4 border-t border-gray-200 dark:border-dark-800">
        <Switch
          label="Activate template for use"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
      </div>
    </div>
  );
}
