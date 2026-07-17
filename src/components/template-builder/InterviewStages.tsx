import { useState } from 'react';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';

interface Stage {
  id: number;
  title: string;
  duration: number;
  weight: number;
  minQuestions: number;
  maxQuestions: number;
  instructions: string;
  expanded: boolean;
}

export function InterviewStages() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 1,
      title: 'Introduction',
      duration: 5,
      weight: 10,
      minQuestions: 2,
      maxQuestions: 4,
      instructions: 'Welcome the candidate and explain the interview process',
      expanded: true,
    },
    {
      id: 2,
      title: 'Technical Assessment',
      duration: 20,
      weight: 40,
      minQuestions: 5,
      maxQuestions: 8,
      instructions: 'Evaluate technical knowledge and problem-solving skills',
      expanded: false,
    },
    {
      id: 3,
      title: 'Behavioral Questions',
      duration: 15,
      weight: 30,
      minQuestions: 4,
      maxQuestions: 6,
      instructions: 'Assess soft skills, communication, and culture fit',
      expanded: false,
    },
    {
      id: 4,
      title: 'Closing',
      duration: 5,
      weight: 20,
      minQuestions: 2,
      maxQuestions: 3,
      instructions: 'Answer candidate questions and wrap up',
      expanded: false,
    },
  ]);

  const addStage = () => {
    const newStage: Stage = {
      id: Math.max(...stages.map(s => s.id)) + 1,
      title: 'New Stage',
      duration: 10,
      weight: 10,
      minQuestions: 2,
      maxQuestions: 5,
      instructions: '',
      expanded: true,
    };
    setStages([...stages, newStage]);
  };

  const removeStage = (id: number) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const updateStage = (id: number, updates: Partial<Stage>) => {
    setStages(stages.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const toggleExpanded = (id: number) => {
    setStages(stages.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const moveStage = (index: number, direction: 'up' | 'down') => {
    const newStages = [...stages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < stages.length) {
      [newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]];
      setStages(newStages);
    }
  };

  const totalWeight = stages.reduce((sum, stage) => sum + stage.weight, 0);
  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Duration: <span className="font-medium text-gray-900 dark:text-white">{totalDuration} minutes</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Weight: <span className={`font-medium ${totalWeight === 100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalWeight}%
            </span>
            {totalWeight !== 100 && <span className="ml-1 text-red-600 dark:text-red-400">(should be 100%)</span>}
          </p>
        </div>
        <Button onClick={addStage} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Stage
        </Button>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card key={stage.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-800"
              onClick={() => toggleExpanded(stage.id)}
            >
              <div className="flex items-center space-x-3">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stage.duration} min • {stage.weight}% weight • {stage.minQuestions}-{stage.maxQuestions} questions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveStage(index, 'up');
                  }}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-dark-700 rounded disabled:opacity-50"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveStage(index, 'down');
                  }}
                  disabled={index === stages.length - 1}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-dark-700 rounded disabled:opacity-50"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStage(stage.id);
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {stage.expanded && (
              <CardContent className="border-t border-gray-200 dark:border-dark-800">
                <div className="space-y-4">
                  <Input
                    label="Stage Title"
                    value={stage.title}
                    onChange={(e) => updateStage(stage.id, { title: e.target.value })}
                  />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      label="Duration (min)"
                      type="number"
                      min="1"
                      value={stage.duration}
                      onChange={(e) => updateStage(stage.id, { duration: parseInt(e.target.value) })}
                    />
                    <Input
                      label="Weight (%)"
                      type="number"
                      min="0"
                      max="100"
                      value={stage.weight}
                      onChange={(e) => updateStage(stage.id, { weight: parseInt(e.target.value) })}
                    />
                    <Input
                      label="Min Questions"
                      type="number"
                      min="1"
                      value={stage.minQuestions}
                      onChange={(e) => updateStage(stage.id, { minQuestions: parseInt(e.target.value) })}
                    />
                    <Input
                      label="Max Questions"
                      type="number"
                      min="1"
                      value={stage.maxQuestions}
                      onChange={(e) => updateStage(stage.id, { maxQuestions: parseInt(e.target.value) })}
                    />
                  </div>

                  <Textarea
                    label="Instructions"
                    placeholder="Provide guidance for this stage..."
                    value={stage.instructions}
                    onChange={(e) => updateStage(stage.id, { instructions: e.target.value })}
                    rows={3}
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
