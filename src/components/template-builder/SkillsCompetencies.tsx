import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardContent } from '../ui/Card';
import { Switch } from '../ui/Switch';

interface Skill {
  id: number;
  name: string;
  weight: number;
  expectedLevel: string;
  required: boolean;
  priority: string;
  expanded: boolean;
}

export function SkillsCompetencies() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: 'React & Frontend Frameworks',
      weight: 25,
      expectedLevel: 'Expert',
      required: true,
      priority: 'high',
      expanded: true,
    },
    {
      id: 2,
      name: 'JavaScript/TypeScript',
      weight: 20,
      expectedLevel: 'Advanced',
      required: true,
      priority: 'high',
      expanded: false,
    },
    {
      id: 3,
      name: 'State Management',
      weight: 15,
      expectedLevel: 'Advanced',
      required: true,
      priority: 'medium',
      expanded: false,
    },
    {
      id: 4,
      name: 'Testing & Quality Assurance',
      weight: 15,
      expectedLevel: 'Intermediate',
      required: false,
      priority: 'medium',
      expanded: false,
    },
    {
      id: 5,
      name: 'Performance Optimization',
      weight: 10,
      expectedLevel: 'Intermediate',
      required: false,
      priority: 'low',
      expanded: false,
    },
  ]);

  const addSkill = () => {
    const newSkill: Skill = {
      id: Math.max(...skills.map(s => s.id)) + 1,
      name: 'New Skill',
      weight: 10,
      expectedLevel: 'Intermediate',
      required: false,
      priority: 'medium',
      expanded: true,
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const updateSkill = (id: number, updates: Partial<Skill>) => {
    setSkills(skills.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const toggleExpanded = (id: number) => {
    setSkills(skills.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const totalWeight = skills.reduce((sum, skill) => sum + skill.weight, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Weight: <span className={`font-medium ${totalWeight === 100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalWeight}%
            </span>
            {totalWeight !== 100 && <span className="ml-1 text-red-600 dark:text-red-400">(should be 100%)</span>}
          </p>
        </div>
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-800"
              onClick={() => toggleExpanded(skill.id)}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>{skill.name}</span>
                    {skill.required && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.weight}% weight • {skill.expectedLevel} • {skill.priority} priority
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkill(skill.id);
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {skill.expanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {skill.expanded && (
              <CardContent className="border-t border-gray-200 dark:border-dark-800">
                <div className="space-y-4">
                  <Input
                    label="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Weight (%)"
                      type="number"
                      min="0"
                      max="100"
                      value={skill.weight}
                      onChange={(e) => updateSkill(skill.id, { weight: parseInt(e.target.value) })}
                    />
                    <Select
                      label="Expected Level"
                      value={skill.expectedLevel}
                      onChange={(e) => updateSkill(skill.id, { expectedLevel: e.target.value })}
                      options={[
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Advanced', label: 'Advanced' },
                        { value: 'Expert', label: 'Expert' },
                      ]}
                    />
                    <Select
                      label="Priority"
                      value={skill.priority}
                      onChange={(e) => updateSkill(skill.id, { priority: e.target.value })}
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                        { value: 'critical', label: 'Critical' },
                      ]}
                    />
                  </div>

                  <Switch
                    label="This skill is required"
                    checked={skill.required}
                    onChange={(e) => updateSkill(skill.id, { required: e.target.checked })}
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
