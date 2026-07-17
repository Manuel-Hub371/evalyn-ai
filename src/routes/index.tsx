import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Jobs } from '@/pages/Jobs';
import { InterviewTemplates } from '@/pages/InterviewTemplates';
import { InterviewTemplateBuilder } from '@/pages/InterviewTemplateBuilder';
import { KnowledgeBase } from '@/pages/KnowledgeBase';
import { Candidates } from '@/pages/Candidates';
import { CandidateDetail } from '@/pages/CandidateDetail';
import { Reports } from '@/pages/Reports';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="interview-templates" element={<InterviewTemplates />} />
        <Route path="interview-templates/new" element={<InterviewTemplateBuilder />} />
        <Route path="interview-templates/:id" element={<InterviewTemplateBuilder />} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/:id" element={<CandidateDetail />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings/*" element={<Settings />} />
      </Route>
    </Routes>
  );
}
