import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Users, Briefcase, Database, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const commands = [
  { id: 1, label: 'Dashboard', icon: BarChart3, href: '/dashboard', category: 'Navigation' },
  { id: 2, label: 'Jobs', icon: Briefcase, href: '/jobs', category: 'Navigation' },
  { id: 3, label: 'Interview Templates', icon: FileText, href: '/interview-templates', category: 'Navigation' },
  { id: 4, label: 'Knowledge Base', icon: Database, href: '/knowledge-base', category: 'Navigation' },
  { id: 5, label: 'Candidates', icon: Users, href: '/candidates', category: 'Navigation' },
  { id: 6, label: 'Settings', icon: Settings, href: '/settings', category: 'Navigation' },
  { id: 7, label: 'Create New Job', icon: Briefcase, href: '/jobs?action=new', category: 'Actions' },
  { id: 8, label: 'Create Interview Template', icon: FileText, href: '/interview-templates/new', category: 'Actions' },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!open) {
      setSearch('');
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }

      if (!open) return;

      if (e.key === 'Escape') {
        onOpenChange(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) {
          navigate(filtered[selected].href);
          onOpenChange(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selected, filtered, navigate, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-dark-900 rounded-lg shadow-2xl animate-slide-in">
        <div className="flex items-center border-b border-gray-200 dark:border-dark-800 px-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-600 dark:text-gray-400">
              No results found
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    navigate(cmd.href);
                    onOpenChange(false);
                  }}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors',
                    index === selected
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                  )}
                >
                  <cmd.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{cmd.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {cmd.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
