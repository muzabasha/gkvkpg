import React from 'react';
import { SYLLABUS } from '../data/syllabus';
import type { Topic } from '../data/syllabus';
import { Sun, Moon, Monitor, CheckCircle } from 'lucide-react';

interface HeaderProps {
  currentTopicId: string;
  completedTopics: string[];
  toggleCompleteTopic: (id: string) => void;
  projectorMode: boolean;
  toggleProjectorMode: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showDashboard: boolean;
  showGraph: boolean;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTopicId,
  completedTopics,
  toggleCompleteTopic,
  projectorMode,
  toggleProjectorMode,
  darkMode,
  toggleDarkMode,
  showDashboard,
  showGraph,
  onHomeClick,
}) => {
  // Find current topic metadata
  let currentTopic: Topic | null = null;
  let currentBlockTitle = '';
  let currentUnitTitle = '';

  for (const block of SYLLABUS) {
    for (const unit of block.units) {
      const found = unit.topics.find(t => t.id === currentTopicId);
      if (found) {
        currentTopic = found;
        currentBlockTitle = block.title;
        currentUnitTitle = unit.title;
        break;
      }
    }
  }

  const isCompleted = currentTopic ? completedTopics.includes(currentTopic.id) : false;

  return (
    <header className="sticky top-0 bg-white/95 dark:bg-brandDark-900/95 backdrop-blur-md border-b border-brandDark-200 dark:border-brandDark-800 px-6 py-4 flex items-center justify-between z-10 transition-colors">
      <div className="flex-1 min-w-0 pr-4">
        {showDashboard ? (
          <div>
            <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">
              Overview
            </span>
            <h2 className="text-2xl font-extrabold text-brandDark-900 dark:text-white leading-none mt-1 mb-0">
              Learning Analytics Dashboard
            </h2>
          </div>
        ) : showGraph ? (
          <div>
            <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">
              Visualization
            </span>
            <h2 className="text-2xl font-extrabold text-brandDark-900 dark:text-white leading-none mt-1 mb-0">
              Topic Dependency Graph
            </h2>
          </div>
        ) : currentTopic ? (
          <div>
            <div className="flex items-center gap-1.5 text-xs text-brandDark-400 dark:text-brandDark-500 font-medium truncate mb-1">
              <button 
                onClick={onHomeClick}
                className="hover:text-primary-500 transition-colors"
              >
                Syllabus
              </button>
              <span>/</span>
              <span className="truncate max-w-[150px]">{currentBlockTitle.split(':')[0]}</span>
              <span>/</span>
              <span className="truncate max-w-[200px]">{currentUnitTitle.split(':')[0]}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-brandDark-900 dark:text-white truncate leading-none mt-1 mb-0">
              {currentTopic.title}
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-extrabold text-brandDark-900 dark:text-white leading-none">
              Multivariate Analysis
            </h2>
          </div>
        )}
      </div>

      {/* Classroom Quick Controls */}
      <div className="flex items-center gap-2.5">
        {/* Projector Mode Toggle */}
        <button
          onClick={toggleProjectorMode}
          title={projectorMode ? "Disable Projector Size Scaling" : "Optimize Text Sizes for Classroom Projector"}
          className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
            projectorMode
              ? 'bg-amber-500 border-amber-600 text-white font-semibold'
              : 'border-brandDark-200 dark:border-brandDark-800 text-brandDark-600 dark:text-brandDark-300 hover:bg-brandDark-100 dark:hover:bg-brandDark-850'
          }`}
        >
          <Monitor size={18} />
          {projectorMode && <span className="ml-1.5 text-xs font-bold uppercase tracking-wider hidden md:inline">Projector: ON</span>}
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode (Anti-Glare)"}
          className="p-2.5 rounded-xl border border-brandDark-200 dark:border-brandDark-800 text-brandDark-600 dark:text-brandDark-300 hover:bg-brandDark-100 dark:hover:bg-brandDark-850 flex items-center justify-center transition-all"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Completion Marker (Only visible when viewing a topic) */}
        {currentTopic && !showDashboard && !showGraph && (
          <button
            onClick={() => currentTopic && toggleCompleteTopic(currentTopic.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-600 text-white'
                : 'border-brandDark-200 dark:border-brandDark-800 text-brandDark-600 dark:text-brandDark-300 hover:bg-brandDark-100 dark:hover:bg-brandDark-850'
            }`}
          >
            <CheckCircle size={15} />
            <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Completed'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
