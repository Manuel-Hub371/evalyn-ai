import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Select } from '../ui/Select';
import { Slider } from '../ui/Slider';
import { Switch } from '../ui/Switch';
import { Textarea } from '../ui/Textarea';

export function AIBehavior() {
  const [config, setConfig] = useState({
    interviewStyle: 'professional',
    questionStyle: 'mixed',
    followUpDepth: 2,
    challengeLevel: 'mid',
    thinkingTime: 30,
    hintsAllowed: true,
    interruptions: 'moderate',
    tone: 'neutral',
    pace: 'medium',
    encouragement: true,
    customInstructions: '',
  });

  return (
    <div className="space-y-6">
      {/* Interview Style */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Overall Style
              </label>
              <div className="space-y-2">
                {[
                  { value: 'professional', label: 'Professional', desc: 'Formal and businesslike' },
                  { value: 'friendly', label: 'Friendly', desc: 'Warm and conversational' },
                  { value: 'formal', label: 'Formal', desc: 'Strict and structured' },
                  { value: 'relaxed', label: 'Relaxed', desc: 'Casual and comfortable' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      config.interviewStyle === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="interviewStyle"
                      value={option.value}
                      checked={config.interviewStyle === option.value}
                      onChange={(e) => setConfig({ ...config, interviewStyle: e.target.value })}
                      className="mt-0.5 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Question Style
              </label>
              <div className="space-y-2">
                {[
                  { value: 'technical', label: 'Technical', desc: 'Focus on hard skills' },
                  { value: 'behavioral', label: 'Behavioral', desc: 'Focus on soft skills' },
                  { value: 'scenario', label: 'Scenario-based', desc: 'Situational questions' },
                  { value: 'mixed', label: 'Mixed', desc: 'Balanced approach' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      config.questionStyle === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="questionStyle"
                      value={option.value}
                      checked={config.questionStyle === option.value}
                      onChange={(e) => setConfig({ ...config, questionStyle: e.target.value })}
                      className="mt-0.5 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interaction Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Slider
            label="Follow-up Question Depth"
            min={0}
            max={5}
            value={config.followUpDepth}
            onChange={(e) => setConfig({ ...config, followUpDepth: parseInt(e.target.value) })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Challenge Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['junior', 'mid', 'senior', 'lead'].map((level) => (
                <button
                  key={level}
                  onClick={() => setConfig({ ...config, challengeLevel: level })}
                  className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                    config.challengeLevel === level
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Thinking Time (seconds)"
            min={10}
            max={120}
            value={config.thinkingTime}
            onChange={(e) => setConfig({ ...config, thinkingTime: parseInt(e.target.value) })}
          />

          <Select
            label="Interruption Handling"
            value={config.interruptions}
            onChange={(e) => setConfig({ ...config, interruptions: e.target.value })}
            options={[
              { value: 'strict', label: 'Strict - Discourage interruptions' },
              { value: 'moderate', label: 'Moderate - Allow some interruptions' },
              { value: 'flexible', label: 'Flexible - Welcome interruptions' },
            ]}
          />

          <div className="space-y-3">
            <Switch
              label="Allow hints when candidate struggles"
              checked={config.hintsAllowed}
              onChange={(e) => setConfig({ ...config, hintsAllowed: e.target.checked })}
            />
            <Switch
              label="Provide encouragement during interview"
              checked={config.encouragement}
              onChange={(e) => setConfig({ ...config, encouragement: e.target.checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Style */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select
            label="Tone"
            value={config.tone}
            onChange={(e) => setConfig({ ...config, tone: e.target.value })}
            options={[
              { value: 'neutral', label: 'Neutral' },
              { value: 'warm', label: 'Warm & Supportive' },
              { value: 'direct', label: 'Direct & Concise' },
              { value: 'encouraging', label: 'Encouraging' },
            ]}
          />

          <Select
            label="Interview Pace"
            value={config.pace}
            onChange={(e) => setConfig({ ...config, pace: e.target.value })}
            options={[
              { value: 'slow', label: 'Slow - More time between questions' },
              { value: 'medium', label: 'Medium - Standard pace' },
              { value: 'fast', label: 'Fast - Quick transitions' },
            ]}
          />
        </CardContent>
      </Card>

      {/* Custom Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            label="Additional Instructions for AI Interviewer"
            placeholder="Add any specific instructions or guidelines for how the AI should conduct interviews..."
            value={config.customInstructions}
            onChange={(e) => setConfig({ ...config, customInstructions: e.target.value })}
            rows={6}
            helperText="These instructions will guide the AI's behavior during interviews"
          />
        </CardContent>
      </Card>
    </div>
  );
}
