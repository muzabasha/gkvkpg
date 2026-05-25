import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TopicDependency } from './components/TopicDependency';
import { HumanFeedback } from './components/HumanFeedback';
import { Topic1_RandomVector } from './modules/block1/Topic1_RandomVector';
import { useClassroomProgress } from './data/progressStore';
import { SYLLABUS, COURSE_OUTCOMES } from './data/syllabus';
import { 
  CheckCircle, 
  Lock,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    state,
    setTopic,
    toggleCompleteTopic,
    submitFeedback,
    toggleProjectorMode,
    toggleDarkMode,
  } = useClassroomProgress();

  // Route control: 'home' | 'topic' | 'analytics' | 'graph'
  const [viewMode, setViewMode] = useState<'home' | 'topic' | 'analytics' | 'graph'>('home');

  // Handle switching topic from sidebar
  const handleSelectTopic = (topicId: string) => {
    setTopic(topicId);
    setViewMode('topic');
  };

  const handleGoHome = () => {
    setViewMode('home');
  };

  // Find current topic metadata if active
  let activeTopic = null;
  if (viewMode === 'topic') {
    for (const block of SYLLABUS) {
      for (const unit of block.units) {
        const found = unit.topics.find(t => t.id === state.currentTopicId);
        if (found) {
          activeTopic = found;
          break;
        }
      }
    }
  }

  // Pre-requisites Mapping status for classroom diagnostic
  const [prereqChecked, setPrereqChecked] = useState<Record<string, boolean>>({
    'Matrix Multiplication': true,
    'Univariate Normal': true,
    'Vector Calculus': false,
    'Basic Integration': true
  });

  const togglePrereq = (name: string) => {
    setPrereqChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brandDark-50 dark:bg-brandDark-950 font-sans transition-colors duration-250 select-none">
      
      {/* Sidebar Navigation */}
      <Sidebar
        currentTopicId={state.currentTopicId}
        completedTopics={state.completedTopics}
        setTopic={handleSelectTopic}
        onViewDashboard={() => setViewMode('analytics')}
        onViewGraph={() => setViewMode('graph')}
        showDashboard={viewMode === 'analytics'}
        showGraph={viewMode === 'graph'}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header bar controls */}
        <Header
          currentTopicId={state.currentTopicId}
          completedTopics={state.completedTopics}
          toggleCompleteTopic={toggleCompleteTopic}
          projectorMode={state.projectorMode}
          toggleProjectorMode={toggleProjectorMode}
          darkMode={state.darkMode}
          toggleDarkMode={toggleDarkMode}
          showDashboard={viewMode === 'analytics'}
          showGraph={viewMode === 'graph'}
          onHomeClick={handleGoHome}
        />

        {/* Content Viewer Area */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-brandDark-50/70 dark:bg-brandDark-950/40">
          
          {/* 1. SUBJECT OVERVIEW / HOME PAGE */}
          {viewMode === 'home' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Splash Hero Banner */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-700 text-white shadow-lg overflow-hidden">
                <div className="relative z-10 max-w-xl space-y-3">
                  <span className="px-3 py-1 bg-white/20 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    Postgraduate Science/Engineering Curriculum
                  </span>
                  <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight m-0">
                    Multivariate Analysis
                  </h1>
                  <p className="text-primary-100 text-sm leading-relaxed">
                    Welcome to the interactive classroom delivery interface. Deliver multi-dimensional statistical models, principal components, MANOVA, and discriminant functions to a classroom of 60 students.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSelectTopic('b1-u1-t1')}
                      className="px-6 py-3 bg-white text-primary-700 font-extrabold text-sm rounded-xl hover:shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02]"
                    >
                      Initialize Course: Block 1 Topic 1
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                {/* Background decorative vector bubbles */}
                <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 pointer-events-none" />
                <div className="absolute right-12 bottom-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Course Outcomes Mappings Grid */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brandDark-800 dark:text-brandDark-200">
                  Course Outcomes (COs) Mappings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COURSE_OUTCOMES.map((co) => (
                    <div 
                      key={co.id}
                      className="p-5 bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl shadow-sm flex gap-4"
                    >
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 font-black text-sm flex-shrink-0">
                        {co.id}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-brandDark-400 font-bold block uppercase tracking-wider">Target Objective</span>
                        <p className="text-sm font-semibold text-brandDark-700 dark:text-brandDark-300 m-0 leading-normal">
                          {co.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisite Mapping Interface */}
              <div className="p-6 bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <ClipboardList className="text-primary-500" size={20} />
                  <h3 className="text-lg font-bold text-brandDark-800 dark:text-brandDark-200 m-0">
                    Prerequisite Mapping Diagnostic (NEP 2020)
                  </h3>
                </div>
                <p className="text-xs text-brandDark-400 mb-4 leading-normal">
                  Toggle key baseline competencies below based on classroom diagnostics to configure adaptiveness for the 60-student strength.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(prereqChecked).map(([name, checked]) => (
                    <button
                      key={name}
                      onClick={() => togglePrereq(name)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center flex flex-col items-center justify-center gap-2 transition-all ${
                        checked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400'
                          : 'bg-brandDark-50 border-brandDark-200 text-brandDark-500 hover:bg-brandDark-100 dark:bg-brandDark-950 dark:border-brandDark-800'
                      }`}
                    >
                      <CheckCircle size={18} className={checked ? 'text-emerald-500' : 'text-brandDark-300 dark:text-brandDark-800'} />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. LEARNING ANALYTICS DASHBOARD */}
          {viewMode === 'analytics' && (
            <AnalyticsDashboard completedTopics={state.completedTopics} />
          )}

          {/* 3. DEPENDENCY GRAPH */}
          {viewMode === 'graph' && (
            <TopicDependency
              currentTopicId={state.currentTopicId}
              completedTopics={state.completedTopics}
              setTopic={handleSelectTopic}
            />
          )}

          {/* 4. ACTIVE TOPIC RENDERING INTERFACE */}
          {viewMode === 'topic' && activeTopic && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Dynamic Module Component Switch */}
              {activeTopic.id === 'b1-u1-t1' ? (
                <Topic1_RandomVector projectorMode={state.projectorMode} />
              ) : (
                <div className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-4">
                  <div className="h-16 w-16 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brandDark-900 dark:text-white leading-tight">
                    Content Lock: Awaiting HIL Approval
                  </h3>
                  <p className="text-sm text-brandDark-500 leading-relaxed">
                    Under the <strong>NEP 2020 Recursive Content Generation Flow</strong>, topic content is created sequentially. Please review and submit your approval on <strong>Topic 1</strong> to unlock the generation pipelines for <em>{activeTopic.title}</em>.
                  </p>
                  <button
                    onClick={() => handleSelectTopic('b1-u1-t1')}
                    className="px-5 py-2 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-primary-700 transition-colors"
                  >
                    Go Back to Topic 1
                  </button>
                </div>
              )}

              {/* Quality Review & HIL Feedback Drawer */}
              <HumanFeedback
                topicId={state.currentTopicId}
                feedbackState={state.feedbackLogs}
                onSubmitFeedback={submitFeedback}
              />
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
export default App;
