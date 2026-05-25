import React, { useState, useEffect } from 'react';
import type { FeedbackLog } from '../data/progressStore';
import { MessageSquare, Star, CheckCircle, Send, AlertTriangle } from 'lucide-react';

interface HumanFeedbackProps {
  topicId: string;
  feedbackState: Record<string, FeedbackLog>;
  onSubmitFeedback: (topicId: string, rating: number, comments: string, approved: boolean) => void;
}

export const HumanFeedback: React.FC<HumanFeedbackProps> = ({
  topicId,
  feedbackState,
  onSubmitFeedback,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Load existing feedback if available
  const existingFeedback = feedbackState[topicId];

  useEffect(() => {
    if (existingFeedback) {
      setRating(existingFeedback.rating);
      setComments(existingFeedback.comments);
      setApproved(existingFeedback.approved);
    } else {
      setRating(5);
      setComments('');
      setApproved(true);
    }
    setIsSuccess(false);
  }, [topicId, existingFeedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback(topicId, rating, comments, approved);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="mt-8 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden bg-white dark:bg-brandDark-900 shadow-sm transition-all duration-300">
      {/* Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left border-none outline-none hover:bg-brandDark-50 dark:hover:bg-brandDark-850 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 rounded-lg">
            <MessageSquare size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-brandDark-900 dark:text-white m-0">
              Human-in-the-Loop Review Interface
            </h4>
            <p className="text-xs text-brandDark-500 dark:text-brandDark-400 m-0">
              {existingFeedback 
                ? `Last reviewed on ${new Date(existingFeedback.reviewedAt).toLocaleDateString()} (${existingFeedback.approved ? 'Approved' : 'Needs Revision'})`
                : 'Review content quality, rate clarity, and unlock subsequent units.'}
            </p>
          </div>
        </div>
        
        <span className="text-xs font-bold uppercase tracking-wider text-primary-500">
          {isOpen ? 'Collapse Reviewer' : 'Expand Reviewer'}
        </span>
      </button>

      {/* Expandable Form */}
      {isOpen && (
        <div className="p-5 border-t border-brandDark-100 dark:border-brandDark-800 bg-brandDark-50/20 dark:bg-brandDark-950/10">
          {existingFeedback && (
            <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl flex items-start gap-3">
              <CheckCircle size={18} className="text-emerald-500 mt-0.5" />
              <div>
                <h5 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 m-0">
                  Current Status: {existingFeedback.approved ? 'APPROVED' : 'REVISION REQUESTED'}
                </h5>
                <p className="text-xs text-emerald-700 dark:text-emerald-500/80 m-0 mt-0.5 italic">
                  "{existingFeedback.comments || 'No written comments provided'}"
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brandDark-500 dark:text-brandDark-400 mb-1.5">
                Instructional Quality & Engagement Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform text-amber-400 focus:outline-none"
                  >
                    <Star
                      size={24}
                      fill={star <= rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </button>
                ))}
                <span className="text-sm font-semibold text-brandDark-500 dark:text-brandDark-400 ml-2">
                  ({rating} / 5 Stars)
                </span>
              </div>
            </div>

            {/* Approval Decision */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brandDark-500 dark:text-brandDark-400 mb-1.5">
                Content Approval
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-brandDark-700 dark:text-brandDark-300">
                  <input
                    type="radio"
                    checked={approved === true}
                    onChange={() => setApproved(true)}
                    className="accent-primary-500"
                  />
                  <span>Approve & Unlock Next Topic</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-brandDark-700 dark:text-brandDark-300">
                  <input
                    type="radio"
                    checked={approved === false}
                    onChange={() => setApproved(false)}
                    className="accent-primary-500"
                  />
                  <span>Request Revisions</span>
                </label>
              </div>
            </div>

            {/* Comments Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brandDark-500 dark:text-brandDark-400 mb-1.5">
                Review Comments & Suggestions for AI Refinement
              </label>
              <textarea
                rows={3}
                className="w-full p-3 text-sm bg-white dark:bg-brandDark-950 border border-brandDark-200 dark:border-brandDark-850 rounded-xl focus:outline-none focus:border-primary-500 dark:text-white"
                placeholder="Enter feedback details, clarification requests, or additional activities to generate..."
                value={comments}
                onChange={e => setComments(e.target.value)}
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-brandDark-400 flex items-center gap-1.5 font-medium">
                <AlertTriangle size={14} className="text-amber-500" />
                NEP 2020 Quality Assurance Flow
              </span>
              
              <button
                type="submit"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all ${
                  isSuccess
                    ? 'bg-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/10'
                }`}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle size={14} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default HumanFeedback;
