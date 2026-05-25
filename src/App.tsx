import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TopicDependency } from './components/TopicDependency';
import { HumanFeedback } from './components/HumanFeedback';
import { Topic1_RandomVector } from './modules/block1/Topic1_RandomVector';
import { Topic2_MarginalJoint } from './modules/block1/Topic2_MarginalJoint';
import { Topic3_ConditionalDistribution } from './modules/block1/Topic3_ConditionalDistribution';
import { Topic4_ExpectationCovariance } from './modules/block1/Topic4_ExpectationCovariance';
import { Topic5_MultivariateNormal } from './modules/block1/Topic5_MultivariateNormal';
import { Topic6_SampleMeanVector } from './modules/block1/Topic6_SampleMeanVector';
import { Topic7_MLEMeanDispersion } from './modules/block1/Topic7_MLEMeanDispersion';
import { Topic8_HypothesisTests } from './modules/block1/Topic8_HypothesisTests';

import { useClassroomProgress } from './data/progressStore';
import { SYLLABUS, COURSE_OUTCOMES } from './data/syllabus';
import {
  CheckCircle,
  Lock,
  ArrowRight,
  ClipboardList,
  User,
  ExternalLink,
  Globe,
  RefreshCw,
  Award,
  Sparkles,
  MapPin,
  Flame,
  BookOpen
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
  const [homeTab, setHomeTab] = useState<'syllabus' | 'resource-person'>('syllabus');
  const [iframeKey, setIframeKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

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
        isOpen={sidebarOpen}
        currentTopicId={state.currentTopicId}
        completedTopics={state.completedTopics}
        setTopic={handleSelectTopic}
        onViewDashboard={() => setViewMode('analytics')}
        onViewGraph={() => setViewMode('graph')}
        showDashboard={viewMode === 'analytics'}
        showGraph={viewMode === 'graph'}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">

        {/* Header bar controls */}
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
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

              {/* Home Screen Premium Tab Navigation */}
              <div className="flex border-b border-brandDark-200 dark:border-brandDark-800 gap-6 mt-4">
                <button
                  onClick={() => setHomeTab('syllabus')}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${homeTab === 'syllabus'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-extrabold'
                    : 'border-transparent text-brandDark-500 hover:text-brandDark-700 dark:text-brandDark-400 dark:hover:text-brandDark-200'
                    }`}
                >
                  <ClipboardList size={16} />
                  Syllabus Blueprint & Diagnostics
                </button>
                <button
                  onClick={() => setHomeTab('resource-person')}
                  className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${homeTab === 'resource-person'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-extrabold'
                    : 'border-transparent text-brandDark-500 hover:text-brandDark-700 dark:text-brandDark-400 dark:hover:text-brandDark-200'
                    }`}
                >
                  <User size={16} />
                  Resource Person
                </button>
              </div>

              {/* Tab Content 1: Syllabus Blueprint */}
              {homeTab === 'syllabus' && (
                <div className="space-y-8 animate-fadeIn">
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
                          className={`p-3 rounded-xl border text-xs font-bold text-center flex flex-col items-center justify-center gap-2 transition-all ${checked
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

              {/* Tab Content 2: Resource Person Details & Embedded Lovable App */}
              {homeTab === 'resource-person' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Bio Card */}
                  <div className="p-6 md:p-8 bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-3xl shadow-md space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brandDark-150 dark:border-brandDark-800/80">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 bg-gradient-to-tr from-primary-600 to-indigo-650 text-white rounded-2xl flex items-center justify-center shadow-md shadow-primary-500/10 flex-shrink-0">
                          <User size={32} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-2xl font-extrabold text-brandDark-900 dark:text-white m-0">
                              Dr. Syed Muzamil Basha
                            </h2>
                            <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900/50 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Sparkles size={10} className="animate-pulse" /> Mapped Instructor
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1 mb-0 uppercase tracking-wider">
                            Professor & Academician • REVA University
                          </p>
                          <div className="flex items-center gap-4 text-xs text-brandDark-400 dark:text-brandDark-500 mt-2">
                            <span className="flex items-center gap-1"><MapPin size={12} /> Bangalore, India</span>
                            <span className="flex items-center gap-1"><Globe size={12} /> Global Portfolio</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIframeKey(prev => prev + 1)}
                          className="p-2.5 bg-brandDark-50 hover:bg-brandDark-100 dark:bg-brandDark-950 dark:hover:bg-brandDark-800 text-brandDark-600 dark:text-brandDark-300 border border-brandDark-200 dark:border-brandDark-800 rounded-xl transition-all flex items-center gap-1 text-xs font-bold"
                          title="Refresh Embedded Portal"
                        >
                          <RefreshCw size={14} />
                          Reload Portal
                        </button>
                        <a
                          href="https://scholar-sparkle-web.lovable.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all rounded-xl flex items-center gap-1.5 text-xs font-bold"
                        >
                          Launch Portal
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-brandDark-50/50 dark:bg-brandDark-950/20 border border-brandDark-200 dark:border-brandDark-800/40 rounded-2xl flex items-start gap-3 hover:scale-[1.01] transition-all">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                          <Award size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brandDark-450 uppercase tracking-widest block">Scopus Publications</span>
                          <strong className="text-xl font-black text-brandDark-800 dark:text-brandDark-100 block mt-0.5">65+ High Impact</strong>
                          <span className="text-[10px] text-brandDark-400">Indexed Journals & Proceedings</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brandDark-50/50 dark:bg-brandDark-950/20 border border-brandDark-200 dark:border-brandDark-800/40 rounded-2xl flex items-start gap-3 hover:scale-[1.01] transition-all">
                        <div className="p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brandDark-450 uppercase tracking-widest block">Textbooks Published</span>
                          <strong className="text-xl font-black text-brandDark-800 dark:text-brandDark-100 block mt-0.5">25+ Written</strong>
                          <span className="text-[10px] text-brandDark-400">Undergraduate & Postgrad level</span>
                        </div>
                      </div>

                      <div className="p-4 bg-brandDark-50/50 dark:bg-brandDark-950/20 border border-brandDark-200 dark:border-brandDark-800/40 rounded-2xl flex items-start gap-3 hover:scale-[1.01] transition-all">
                        <div className="p-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-450 rounded-xl">
                          <Flame size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-brandDark-450 uppercase tracking-widest block">Intellectual Property</span>
                          <strong className="text-xl font-black text-brandDark-800 dark:text-brandDark-100 block mt-0.5">Global Patents</strong>
                          <span className="text-[10px] text-brandDark-400">International and Indian filings</span>
                        </div>
                      </div>
                    </div>

                    {/* Research Pillars */}
                    <div>
                      <span className="text-[10px] font-bold text-brandDark-450 uppercase tracking-widest block mb-2">Research Specializations</span>
                      <div className="flex flex-wrap gap-2">
                        {['Artificial Intelligence', 'Natural Language Processing (NLP)', 'Blockchain Technology', 'Internet of Things (IoT)', 'Multivariate Systems'].map((pillar) => (
                          <span key={pillar} className="px-3 py-1 bg-brandDark-100 dark:bg-brandDark-850 border border-brandDark-200 dark:border-brandDark-800 text-brandDark-700 dark:text-brandDark-300 rounded-lg text-xs font-bold">
                            {pillar}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Embed Browser container */}
                  <div className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-3xl overflow-hidden shadow-lg flex flex-col h-[750px]">
                    {/* Mock browser header */}
                    <div className="px-4 py-3 bg-brandDark-50 dark:bg-brandDark-950 border-b border-brandDark-200 dark:border-brandDark-850 flex items-center justify-between gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>

                      {/* Browser address bar */}
                      <div className="flex-1 max-w-xl bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-lg py-1 px-3 flex items-center gap-2 text-xs text-brandDark-500 font-semibold select-all justify-center">
                        <Globe size={12} className="text-brandDark-400" />
                        <span className="truncate">https://scholar-sparkle-web.lovable.app/</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-brandDark-405">
                        <span className="hidden sm:inline px-2 py-0.5 bg-brandDark-200/50 dark:bg-brandDark-800/50 border border-brandDark-300 dark:border-brandDark-700 rounded text-[9px] uppercase tracking-wider">Live Embed</span>
                      </div>
                    </div>

                    {/* Embedding iframe */}
                    <div className="flex-1 w-full bg-white relative">
                      <iframe
                        key={iframeKey}
                        src="https://scholar-sparkle-web.lovable.app/"
                        title="Dr. Syed Muzamil Basha Academic Portfolio"
                        className="w-full h-full border-none"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    </div>
                  </div>
                </div>
              )}

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
              {(() => {
                switch (activeTopic.id) {
                  case 'b1-u1-t1':
                    return <Topic1_RandomVector projectorMode={state.projectorMode} />;
                  case 'b1-u1-t2':
                    return <Topic2_MarginalJoint projectorMode={state.projectorMode} />;
                  case 'b1-u1-t3':
                    return <Topic3_ConditionalDistribution projectorMode={state.projectorMode} />;
                  case 'b1-u1-t4':
                    return <Topic4_ExpectationCovariance projectorMode={state.projectorMode} />;
                  case 'b1-u1-t5':
                    return <Topic5_MultivariateNormal projectorMode={state.projectorMode} />;
                  case 'b1-u1-t6':
                    return <Topic6_SampleMeanVector projectorMode={state.projectorMode} />;
                  case 'b1-u1-t7':
                    return <Topic7_MLEMeanDispersion projectorMode={state.projectorMode} />;
                  case 'b1-u1-t8':
                    return <Topic8_HypothesisTests projectorMode={state.projectorMode} />;
                  default:
                    return (
                      <div className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12 space-y-4">
                        <div className="h-16 w-16 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
                          <Lock size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-brandDark-900 dark:text-white leading-tight">Content Lock: Awaiting HIL Approval</h3>
                        <p className="text-sm text-brandDark-500 leading-relaxed">Under the <strong>NEP 2020 Recursive Content Generation Flow</strong>, topic content is created sequentially. Please review and submit your approval on <strong>Topic 1</strong> to unlock the generation pipelines for <em>{activeTopic.title}</em>.</p>
                        <button onClick={() => handleSelectTopic('b1-u1-t1')} className="px-5 py-2 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-primary-7 00 transition-colors">Go Back to Topic 1</button>
                      </div>
                    );
                }
              })()}

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
