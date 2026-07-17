import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { GeneralInfo } from '@/components/template-builder/GeneralInfo';
import { InterviewStages } from '@/components/template-builder/InterviewStages';
import { SkillsCompetencies } from '@/components/template-builder/SkillsCompetencies';
import { EvaluationCriteria } from '@/components/template-builder/EvaluationCriteria';
import { AIBehavior } from '@/components/template-builder/AIBehavior';
import { ScoringRules } from '@/components/template-builder/ScoringRules';

export function InterviewTemplateBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(id);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    navigate('/interview-templates');
  };

  const tabs = [
    { id: 'general', label: 'General Info', component: GeneralInfo },
    { id: 'stages', label: 'Interview Stages', component: InterviewStages },
    { id: 'skills', label: 'Skills & Competencies', component: SkillsCompetencies },
    { id: 'evaluation', label: 'Evaluation Criteria', component: EvaluationCriteria },
    { id: 'behavior', label: 'AI Behavior', component: AIBehavior },
    { id: 'scoring', label: 'Scoring Rules', component: ScoringRules },
  ];

  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
  const isLastTab = currentIndex === tabs.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/interview-templates')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Interview Template' : 'Create Interview Template'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Configure your interview settings and evaluation criteria
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} loading={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Save Template'}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center flex-1">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-primary-600 dark:bg-primary-500 text-white'
                        : index < currentIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-dark-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">
                    {tab.label}
                  </span>
                </button>
                {index < tabs.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 dark:bg-dark-800 mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <Card>
        <CardHeader>
          <CardTitle>{tabs[currentIndex].label}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab}>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {activeTab === tab.id && <tab.component />}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-end space-x-3">
        {currentIndex > 0 && (
          <Button
            variant="outline"
            onClick={() => setActiveTab(tabs[currentIndex - 1].id)}
          >
            Previous
          </Button>
        )}
        {!isLastTab && (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
