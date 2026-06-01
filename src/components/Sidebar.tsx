import React, { useState } from 'react';
import { SYLLABUS } from '../data/syllabus';
import type { Topic } from '../data/syllabus';
import { BookOpen, Search, CheckCircle, Circle, Lock, Award, Users, BarChart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentTopicId: string;
  completedTopics: string[];
  setTopic: (id: string) => void;
  onViewDashboard: () => void;
  onViewGraph: () => void;
  showDashboard: boolean;
  showGraph: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentTopicId,
  completedTopics,
  setTopic,
  onViewDashboard,
  onViewGraph,
  showDashboard,
  showGraph,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({
    'block-1': true, // Open Block 1 by default
    'block-2': false,
    'block-3': false,
  });

  // Toggle block accordion
  const toggleBlock = (blockId: string) => {
    setExpandedBlocks(prev => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  // Calculate syllabus completion percentage
  const totalTopics = SYLLABUS.reduce(
    (count, block) => count + block.units.reduce((uCount, unit) => uCount + unit.topics.length, 0),
    0
  );
  const completedCount = completedTopics.length;
  const completionPercentage = Math.round((completedCount / totalTopics) * 100);

  // Check if topic is locked based on prerequisites
  const isTopicLocked = () => {
    return false; // Completely unlock all topics for navigability and auditing
  };

  // Flattened topics for searching
  const allTopics: { topic: Topic; blockTitle: string; unitTitle: string }[] = [];
  SYLLABUS.forEach(block => {
    block.units.forEach(unit => {
      unit.topics.forEach(topic => {
        allTopics.push({ topic, blockTitle: block.title, unitTitle: unit.title });
      });
    });
  });

  const filteredTopics = allTopics.filter(item =>
    item.topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      className={`h-screen sticky top-0 bg-white dark:bg-brandDark-900 border-r border-brandDark-200 dark:border-brandDark-800 flex flex-col z-20 transition-all duration-300 ease-in-out select-none ${isOpen ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full overflow-hidden border-r-0'
        }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-brandDark-200 dark:border-brandDark-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-100 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-brandDark-900 dark:text-white leading-none">
              MVA Class
            </h1>
            <span className="text-xs font-semibold text-brandDark-400 dark:text-brandDark-500 uppercase tracking-wider">
              Multivariate Analysis
            </span>
          </div>
        </div>

        {/* Classroom Badge */}
        <div className="flex items-center gap-2 mt-3 px-3 py-1.5 bg-brandDark-50 dark:bg-brandDark-950/50 rounded-lg text-sm font-medium text-brandDark-600 dark:text-brandDark-300 border border-brandDark-200/50 dark:border-brandDark-800/30">
          <Users size={16} className="text-primary-500" />
          <span>Active Strength: <strong className="text-primary-600 dark:text-primary-400">60 Students</strong></span>
        </div>
      </div>

      {/* Classroom Progress Section */}
      <div className="p-5 border-b border-brandDark-200 dark:border-brandDark-800 bg-brandDark-50/50 dark:bg-brandDark-950/20">
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span className="text-brandDark-500 dark:text-brandDark-400">Syllabus Progress</span>
          <span className="text-primary-600 dark:text-primary-400">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-brandDark-200 dark:bg-brandDark-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-primary-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-brandDark-400 mt-2 font-medium">
          <span>{completedCount} of {totalTopics} Topics Completed</span>
          <span className="flex items-center gap-0.5"><Award size={10} /> NEP 2020 Aligned</span>
        </div>
      </div>

      {/* Quick Dash buttons */}
      <div className="px-4 py-3 flex gap-2 border-b border-brandDark-100 dark:border-brandDark-800 bg-white dark:bg-brandDark-900">
        <button
          onClick={onViewDashboard}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${showDashboard
              ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-950/30 dark:border-primary-800 dark:text-primary-300'
              : 'border-brandDark-200 dark:border-brandDark-800 hover:bg-brandDark-50 dark:hover:bg-brandDark-850 text-brandDark-600 dark:text-brandDark-300'
            }`}
        >
          <BarChart size={14} />
          Analytics
        </button>
        <button
          onClick={onViewGraph}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${showGraph
              ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-950/30 dark:border-primary-800 dark:text-primary-300'
              : 'border-brandDark-200 dark:border-brandDark-800 hover:bg-brandDark-50 dark:hover:bg-brandDark-850 text-brandDark-600 dark:text-brandDark-300'
            }`}
        >
          <Users size={14} />
          Dependencies
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-brandDark-200 dark:border-brandDark-800 flex items-center gap-2">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-brandDark-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 text-sm bg-brandDark-100 dark:bg-brandDark-950 border border-brandDark-200 dark:border-brandDark-850 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:text-white"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Curriculum List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {searchTerm ? (
          // Search results view
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-brandDark-400 dark:text-brandDark-500 uppercase tracking-wider mb-2">
              Search Results ({filteredTopics.length})
            </h4>
            {filteredTopics.map(({ topic }) => {
              const active = topic.id === currentTopicId && !showDashboard && !showGraph;
              const completed = completedTopics.includes(topic.id);
              const locked = isTopicLocked();

              return (
                <button
                  key={topic.id}
                  disabled={locked}
                  onClick={() => setTopic(topic.id)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${active
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                      : locked
                        ? 'opacity-50 cursor-not-allowed text-brandDark-400'
                        : 'hover:bg-brandDark-100 dark:hover:bg-brandDark-850 text-brandDark-700 dark:text-brandDark-300'
                    }`}
                >
                  <span className="mt-0.5">
                    {completed ? (
                      <CheckCircle size={16} className={active ? 'text-white' : 'text-emerald-500'} />
                    ) : locked ? (
                      <Lock size={16} />
                    ) : (
                      <Circle size={16} className={active ? 'text-white' : 'text-brandDark-400'} />
                    )}
                  </span>
                  <div className="text-xs leading-tight">
                    <div className="font-semibold">{topic.title}</div>
                    <div className={active ? 'text-primary-100' : 'text-[10px] text-brandDark-400'}>
                      {topic.coMapped.join(', ')}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // Normal block accordion view
          SYLLABUS.map(block => (
            <div key={block.id} className="border-b border-brandDark-100 dark:border-brandDark-800 pb-3 last:border-0">
              <button
                onClick={() => toggleBlock(block.id)}
                className="w-full flex items-center justify-between font-bold text-sm text-brandDark-800 dark:text-brandDark-200 py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
              >
                <span className="truncate max-w-[210px]">{block.title}</span>
                <span className="text-xs font-normal text-brandDark-400">
                  {expandedBlocks[block.id] ? 'Collapse' : 'Expand'}
                </span>
              </button>

              {expandedBlocks[block.id] && (
                <div className="mt-2 pl-1 space-y-3">
                  {block.units.map(unit => (
                    <div key={unit.id} className="space-y-1">
                      <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-brandDark-400 dark:text-brandDark-500 pl-2">
                        {unit.title.split(':')[0]}
                      </h5>
                      <div className="space-y-1 mt-1">
                        {unit.topics.map(topic => {
                          const active = topic.id === currentTopicId && !showDashboard && !showGraph;
                          const completed = completedTopics.includes(topic.id);
                          const locked = isTopicLocked();

                          return (
                            <button
                              key={topic.id}
                              disabled={locked}
                              onClick={() => setTopic(topic.id)}
                              className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${active
                                  ? 'bg-primary-600 text-white font-medium shadow-sm shadow-primary-500/10'
                                  : locked
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'hover:bg-brandDark-100 dark:hover:bg-brandDark-850 text-brandDark-700 dark:text-brandDark-300'
                                }`}
                            >
                              <span className="mt-0.5 flex-shrink-0">
                                {completed ? (
                                  <CheckCircle size={15} className={active ? 'text-white' : 'text-emerald-500'} />
                                ) : locked ? (
                                  <Lock size={14} className="text-brandDark-400" />
                                ) : (
                                  <Circle size={15} className={active ? 'text-white' : 'text-brandDark-400'} />
                                )}
                              </span>
                              <div className="text-[13px] leading-snug">
                                <span className={active ? 'text-white font-medium' : 'text-brandDark-700 dark:text-brandDark-300'}>
                                  {topic.title}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
