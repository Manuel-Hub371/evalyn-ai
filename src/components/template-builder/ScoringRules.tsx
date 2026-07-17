import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Slider } from '../ui/Slider';
import { Switch } from '../ui/Switch';

export function ScoringRules() {
  const [config, setConfig] = useState({
    passingScore: 70,
    autoRecommend: true,
    hireThreshold: 85,
    reviewThreshold: 60,
    competencyWeights: {
      technical: 40,
      problemSolving: 25,
      communication: 20,
      experience: 15,
    },
  });

  const totalWeight =
    config.competencyWeights.technical +
    config.competencyWeights.problemSolving +
    config.competencyWeights.communication +
    config.competencyWeights.experience;

  return (
    <div className="space-y-6">
      {/* Overall Scoring */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Scoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            label="Passing Score (0-100)"
            type="number"
            min="0"
            max="100"
            value={config.passingScore}
            onChange={(e) => setConfig({ ...config, passingScore: parseInt(e.target.value) })}
            helperText="Minimum score required to pass the interview"
          />

          <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Score Scale Reference
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">90-100</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Exceptional</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">80-89</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Strong</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">70-79</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Adequate</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">60-69</span>
                <span className="text-orange-600 dark:text-orange-400 font-medium">Below Average</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">0-59</span>
                <span className="text-red-600 dark:text-red-400 font-medium">Insufficient</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automatic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Automatic Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Switch
            label="Enable automatic hire/reject recommendations"
            checked={config.autoRecommend}
            onChange={(e) => setConfig({ ...config, autoRecommend: e.target.checked })}
          />

          {config.autoRecommend && (
            <div className="space-y-6 pl-6">
              <Input
                label="Hire Threshold"
                type="number"
                min="0"
                max="100"
                value={config.hireThreshold}
                onChange={(e) =>
                  setConfig({ ...config, hireThreshold: parseInt(e.target.value) })
                }
                helperText="Scores above this will result in 'Hire' recommendation"
              />

              <Input
                label="Review Threshold"
                type="number"
                min="0"
                max="100"
                value={config.reviewThreshold}
                onChange={(e) =>
                  setConfig({ ...config, reviewThreshold: parseInt(e.target.value) })
                }
                helperText="Scores between this and hire threshold result in 'Review' recommendation"
              />

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Recommendation Logic
                </h4>
                <div className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <p>• Score ≥ {config.hireThreshold}: <strong>Hire</strong></p>
                  <p>
                    • Score {config.reviewThreshold}-{config.hireThreshold - 1}: <strong>Review</strong>
                  </p>
                  <p>• Score &lt; {config.reviewThreshold}: <strong>Reject</strong></p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Competency Weights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Competency Weights</CardTitle>
            <span
              className={`text-sm font-medium ${
                totalWeight === 100
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              Total: {totalWeight}%
              {totalWeight !== 100 && ' (should be 100%)'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Slider
            label="Technical Knowledge"
            min={0}
            max={100}
            value={config.competencyWeights.technical}
            onChange={(e) =>
              setConfig({
                ...config,
                competencyWeights: {
                  ...config.competencyWeights,
                  technical: parseInt(e.target.value),
                },
              })
            }
          />

          <Slider
            label="Problem Solving"
            min={0}
            max={100}
            value={config.competencyWeights.problemSolving}
            onChange={(e) =>
              setConfig({
                ...config,
                competencyWeights: {
                  ...config.competencyWeights,
                  problemSolving: parseInt(e.target.value),
                },
              })
            }
          />

          <Slider
            label="Communication"
            min={0}
            max={100}
            value={config.competencyWeights.communication}
            onChange={(e) =>
              setConfig({
                ...config,
                competencyWeights: {
                  ...config.competencyWeights,
                  communication: parseInt(e.target.value),
                },
              })
            }
          />

          <Slider
            label="Experience & Background"
            min={0}
            max={100}
            value={config.competencyWeights.experience}
            onChange={(e) =>
              setConfig({
                ...config,
                competencyWeights: {
                  ...config.competencyWeights,
                  experience: parseInt(e.target.value),
                },
              })
            }
          />

          <div className="pt-4 border-t border-gray-200 dark:border-dark-800">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Visual Weight Distribution</span>
            </div>
            <div className="flex h-6 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${config.competencyWeights.technical}%` }}
              >
                {config.competencyWeights.technical > 10 && `${config.competencyWeights.technical}%`}
              </div>
              <div
                className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${config.competencyWeights.problemSolving}%` }}
              >
                {config.competencyWeights.problemSolving > 10 &&
                  `${config.competencyWeights.problemSolving}%`}
              </div>
              <div
                className="bg-purple-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${config.competencyWeights.communication}%` }}
              >
                {config.competencyWeights.communication > 10 &&
                  `${config.competencyWeights.communication}%`}
              </div>
              <div
                className="bg-orange-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${config.competencyWeights.experience}%` }}
              >
                {config.competencyWeights.experience > 10 &&
                  `${config.competencyWeights.experience}%`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
