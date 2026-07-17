import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';

interface Criterion {
  id: number;
  name: string;
  subCriteria: string[];
  expanded: boolean;
}

export function EvaluationCriteria() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: 1,
      name: 'Technical Knowledge',
      subCriteria: ['Accuracy', 'Depth of Understanding', 'Practical Examples', 'Best Practices'],
      expanded: true,
    },
    {
      id: 2,
      name: 'Problem Solving',
      subCriteria: ['Analytical Thinking', 'Creative Solutions', 'Logical Reasoning', 'Decision Making'],
      expanded: false,
    },
    {
      id: 3,
      name: 'Communication',
      subCriteria: ['Clarity', 'Confidence', 'Professionalism', 'Structure', 'Active Listening'],
      expanded: false,
    },
    {
      id: 4,
      name: 'Experience & Background',
      subCriteria: ['Relevant Projects', 'Industry Knowledge', 'Tool Proficiency', 'Learning Ability'],
      expanded: false,
    },
  ]);

  const addCriterion = () => {
    const newCriterion: Criterion = {
      id: Math.max(...criteria.map(c => c.id)) + 1,
      name: 'New Criterion',
      subCriteria: ['Sub-criterion 1'],
      expanded: true,
    };
    setCriteria([...criteria, newCriterion]);
  };

  const removeCriterion = (id: number) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id: number, updates: Partial<Criterion>) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const toggleExpanded = (id: number) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c));
  };

  const addSubCriterion = (criterionId: number) => {
    setCriteria(criteria.map(c => {
      if (c.id === criterionId) {
        return { ...c, subCriteria: [...c.subCriteria, `New sub-criterion ${c.subCriteria.length + 1}`] };
      }
      return c;
    }));
  };

  const removeSubCriterion = (criterionId: number, index: number) => {
    setCriteria(criteria.map(c => {
      if (c.id === criterionId) {
        return { ...c, subCriteria: c.subCriteria.filter((_, i) => i !== index) };
      }
      return c;
    }));
  };

  const updateSubCriterion = (criterionId: number, index: number, value: string) => {
    setCriteria(criteria.map(c => {
      if (c.id === criterionId) {
        const newSubCriteria = [...c.subCriteria];
        newSubCriteria[index] = value;
        return { ...c, subCriteria: newSubCriteria };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Define competencies and evaluation criteria for this position
        </p>
        <Button onClick={addCriterion} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Criterion
        </Button>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion) => (
          <Card key={criterion.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-800"
              onClick={() => toggleExpanded(criterion.id)}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {criterion.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {criterion.subCriteria.length} sub-criteria
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCriterion(criterion.id);
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {criterion.expanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {criterion.expanded && (
              <CardContent className="border-t border-gray-200 dark:border-dark-800">
                <div className="space-y-4">
                  <Input
                    label="Criterion Name"
                    value={criterion.name}
                    onChange={(e) => updateCriterion(criterion.id, { name: e.target.value })}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sub-Criteria
                      </label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addSubCriterion(criterion.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {criterion.subCriteria.map((subCrit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={subCrit}
                            onChange={(e) => updateSubCriterion(criterion.id, index, e.target.value)}
                            placeholder={`Sub-criterion ${index + 1}`}
                          />
                          <button
                            onClick={() => removeSubCriterion(criterion.id, index)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">
          Industry Flexibility
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          These criteria can be customized for any industry: technology, education, healthcare, finance, retail, manufacturing, and more. Add or modify criteria to match your organization's specific needs.
        </p>
      </div>
    </div>
  );
}
