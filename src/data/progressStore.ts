import { useState, useEffect } from 'react';

export interface FeedbackLog {
  rating: number;
  comments: string;
  approved: boolean;
  reviewedAt: string;
}

export interface ProgressState {
  currentTopicId: string;
  completedTopics: string[];
  feedbackLogs: Record<string, FeedbackLog>;
  projectorMode: boolean;
  darkMode: boolean;
}

const DEFAULT_STATE: ProgressState = {
  currentTopicId: 'b1-u1-t1',
  completedTopics: [],
  feedbackLogs: {},
  projectorMode: false,
  darkMode: true, // Default to dark mode for modern high-contrast aesthetics
};

const KEY = 'mva_classroom_progress';

export const getProgressState = (): ProgressState => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading progress state', e);
  }
  return DEFAULT_STATE;
};

export const saveProgressState = (state: ProgressState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving progress state', e);
  }
};

export const useClassroomProgress = () => {
  const [state, setState] = useState<ProgressState>(getProgressState);

  useEffect(() => {
    saveProgressState(state);
    
    // Apply dark mode class to html element
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const setTopic = (topicId: string) => {
    setState(prev => ({ ...prev, currentTopicId: topicId }));
  };

  const toggleCompleteTopic = (topicId: string) => {
    setState(prev => {
      const isCompleted = prev.completedTopics.includes(topicId);
      const completedTopics = isCompleted
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics };
    });
  };

  const submitFeedback = (topicId: string, rating: number, comments: string, approved: boolean) => {
    setState(prev => ({
      ...prev,
      feedbackLogs: {
        ...prev.feedbackLogs,
        [topicId]: {
          rating,
          comments,
          approved,
          reviewedAt: new Date().toISOString(),
        }
      },
      // Automatically complete topic if approved
      completedTopics: approved && !prev.completedTopics.includes(topicId)
        ? [...prev.completedTopics, topicId]
        : prev.completedTopics
    }));
  };

  const toggleProjectorMode = () => {
    setState(prev => ({ ...prev, projectorMode: !prev.projectorMode }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return {
    state,
    setTopic,
    toggleCompleteTopic,
    submitFeedback,
    toggleProjectorMode,
    toggleDarkMode,
  };
};
