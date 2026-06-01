import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  BookOpen,
  HelpCircle,
  Layers,
  Film
} from 'lucide-react';
import { Lab3_Conditional } from '../../components/labs/Lab3_Conditional';

interface Topic3Props {
  projectorMode: boolean;
}

/* ── Numbered equation block ─────────────────────────────────────────────── */
const Eq: React.FC<{ n: string; math: string; label?: string }> = ({ n, math, label }) => (
  <div className="my-5 flex items-start gap-3">
    <div className="flex-1 overflow-x-auto">
      <MathText math={math} block />
    </div>
    <span className="mt-3 text-xs font-mono font-semibold text-brandDark-400 dark:text-brandDark-500 whitespace-nowrap select-none bg-brandDark-100 dark:bg-brandDark-800 border border-brandDark-200 dark:border-brandDark-700 rounded px-2 py-0.5 flex-shrink-0">
      ({n}){label ? ` — ${label}` : ''}
    </span>
  </div>
);

/* ── Term-table row ──────────────────────────────────────────────────────── */
const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52 text-sm"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top leading-relaxed">{meaning}</td>
  </tr>
);

export const Topic3_ConditionalDistribution: React.FC<Topic3Props> = ({ projectorMode }) => {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: true,
    sec7: true,
  });
  const [copied, setCopied] = useState<boolean>(false);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fontBody = projectorMode ? 'text-xl-readable leading-relaxed' : 'text-base md:text-lg-readable';
  const fontHeading3 = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">

      {/* SECTION 1 — STORY TELLING WITH FUNNY ANALOGY */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec1')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
              <Sparkles size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-blue-600 dark:text-blue-400`}>
                SECTION 1 — Storytelling: The Netflix Recommendation Engine
              </h3>
              <p className="text-xs text-brandDark-400 m-0">How conditional probability narrows down choices.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine sitting down on Friday night to choose a movie on Netflix. 
                Before you click anything, the system models your general mood: Action (<MathText math="X_1" />), Comedy (<MathText math="X_2" />), and Sci-Fi (<MathText math="X_3" />) as a joint distribution of potential choices.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                Suddenly, you click on "Interstellar" ($X_3 = 1$). 
                Instantly, your general probability pool collapses! 
                The system doesn't suggest romantic comedies anymore. It has "sliced" the joint distribution along your observed choice, leaving you with the **conditional distribution** of what you'll enjoy next, given your specific mood.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If your preference for Comedy is completely independent of Action, does clicking "The Avengers" affect your recommended sitcoms?</li>
                <li>How does "slicing" a 3D joint density mountain vertically at $X_3 = 1$ give us a narrower, more targeted normal distribution?</li>
                <li>Why does conditioning on an observation always reduce our mathematical uncertainty (Schur complement)?</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2 — MATHEMATICAL MODELLING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec2')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-xl">
              <Calculator size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-violet-600 dark:text-violet-400`}>
                SECTION 2 — Mathematical Anatomy &amp; Equations
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Conditional PDFs, independence criteria, and variance reduction formulas.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Slices of Joint Probability
              </h4>

              {/* A. Conditional PDF */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Conditional Density Function</span>
                <p>Partitioning a random vector into sub-vectors <MathText math="\mathbf{X}_1" /> and <MathText math="\mathbf{X}_2" />, the conditional density of <MathText math="\mathbf{X}_1" /> given <MathText math="\mathbf{X}_2 = \mathbf{x}_2" /> is:</p>
                <Eq n="3.1" math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) = \frac{f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2)}{f_{\mathbf{X}_2}(\mathbf{x}_2)}" label="Conditional PDF" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2)" meaning="The joint density - representing the height of the slice at the observed coordinate." />
                    <Term sym="f_{\mathbf{X}_2}(\mathbf{x}_2)" meaning="The marginal density of the conditioning event. Acts as a normalizing constant so the conditional slice integrates to exactly 1." />
                  </tbody></table>
                </div>
              </div>

              {/* B. Independence */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Statistical Independence Criterion</span>
                <p>Two random vectors are independent if their joint distribution factorizes perfectly into a product of their marginals:</p>
                <Eq n="3.2" math="f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2) = f_{\mathbf{X}_1}(\mathbf{x}_1) \cdot f_{\mathbf{X}_2}(\mathbf{x}_2) \quad \forall \mathbf{x}_1, \mathbf{x}_2" label="Independence Factorization" />
                <p>Under independence, the conditional collapses to the marginal:</p>
                <Eq n="3.3" math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) = f_{\mathbf{X}_1}(\mathbf{x}_1)" label="Conditional under Independence" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3 — ACTIVITY BASED LEARNING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec3')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
              <BookOpen size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-amber-600 dark:text-amber-400`}>
                SECTION 3 — Activity Based Learning (NEP 2020)
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Collaborative tasks on conditional slices and dependencies.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-6">
            {/* Level 1 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-600 rounded text-xs font-bold uppercase">Level 1 — Teacher Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Interactive Slicing Demonstration
              </h4>
              <p className="text-sm">
                The instructor draws a bivariate Gaussian ellipse on board and slices it vertically at a given coordinate. 
                Students see how this slice creates a narrow 1D normal curve, demonstrating variance reduction due to conditioning.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Dependent vs Independent Tables
              </h4>
              <p className="text-sm">
                Given discrete probability grids on board, collectively evaluate whether rows/columns satisfy the factorization condition ($f(x,y) = f_X(x) \cdot f_Y(y)$) to declare independence.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The Correlation Match Challenge (Groups of 3)
              </h4>
              <p className="text-sm">
                Groups match 4 conditional density profiles to different correlation coefficients ($\rho = 0.8$, $\rho = -0.5$, $\rho = 0$) and defend their solutions.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Independence Mathematical Proof
              </h4>
              <p className="text-sm">
                Show mathematically that if $f(x|y) = f(x)$, then $f(x,y) = f(x)f(y)$, confirming equivalence of conditional-marginal collapse and independence.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 — PROJECT BASED LEARNING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec4')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Film size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: recommendation Calibration
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Project architecture, timeline, costs, and risk tables.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 space-y-6 text-sm">
            <div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-1">
                Project Title: Collaborative Filtering & Conditional Recommendation Engine
              </h4>
              <p>
                <strong>Scope:</strong> Deploy a micro-service modeling user genre preference coordinates as a 3D joint distribution (Action, Comedy, Sci-Fi). Calculate real-time conditional means given active user watch history to display personalized content strips.
              </p>
            </div>

            {/* Cost & Budget Allocation Table */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Cost & Budget Estimation</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left border-collapse border border-brandDark-200 dark:border-brandDark-800">
                  <thead>
                    <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Item Description</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Unit Cost (INR)</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Quantity</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">AWS r6g.xlarge Memory-Optimized DB Node</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,500 / mo</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,500</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Redis Enterprise Cluster Instance</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">4,200 / mo</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">4,200</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">API Gateway &amp; Telemetry Routing Channels</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1,800 / mo</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1,800</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Monthly Operating Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">14,500 INR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Assessment Heatmap */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Risk Heatmap Matrix</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-red-500/15 border border-red-500/40 p-3 rounded-lg">
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Cold Start</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">New users have no prior watch vectors, creating singular joint matrices. Mitigation: Fall back to marginal population trends.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: API Spike</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">Heavy weekend user traffic spikes request rates. Mitigation: Cache conditional matrix coefficients in Redis.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Bias Shift</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Seasonal shifts in user tastes. Mitigation: Update the joint distribution weekly.</p>
                </div>
              </div>
            </div>

            {/* Gantt Timeline */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Gantt Chart Project Timeline</h5>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center">
                  <span className="w-24">Weeks 1-2:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Data Acquisition &amp; Redis Set</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-500 h-full text-[10px] text-white flex items-center pl-2">Joint Likelihood Modeling</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-500 h-full text-[10px] text-white flex items-center pl-2">Conditional Slicing Engine</div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRL & User Manual */}
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 text-sm mb-1">
                TRL Level 3 Demonstration Manual
              </h5>
              <p className="text-xs leading-normal">
                Open browser. Go to course sandbox dashboard. Click and observed user profiles. Toggle genre clicks. Verify that the recommendation vector shrinks and shifts toward the conditioned genre, indicating active Schur contraction.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 5 — MODEL 2 MARK QUESTIONS */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec5')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
              <HelpCircle size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-red-600 dark:text-red-400`}>
                SECTION 5 — Model 2-Mark Classroom Questions
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Conceptual and numerical questions with pitfalls explained.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-6 text-sm">
            {/* Question 1 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q1: Define the conditional density function <MathText math="f_{Y|X}(y|x)" /> for continuous random vectors.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> The conditional PDF is the ratio of their joint PDF to the marginal PDF of the conditioning variable, provided the marginal is positive:
                <MathText math="f_{Y \mid X}(y \mid x) = \frac{f(x,y)}{f_X(x)}, \qquad f_X(x) > 0" block />
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often divide by $f_Y(y)$ instead of $f_X(x)$. Always divide by the marginal of the variable that is *already observed* (the variable after the vertical bar).
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: State the condition under which the joint distribution equals the product of its marginals.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> This occurs if and only if the random vectors $X$ and $Y$ are statistically independent:
                <MathText math="f(x,y) = f_X(x) \cdot f_Y(y) \quad \forall (x,y)" block />
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Under independence, conditioning adds zero information: $f(y|x) = f_Y(y)$.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Why is the conditional variance <MathText math="\mathbf{\Sigma}_{1|2}" /> smaller than or equal to the marginal variance <MathText math="\mathbf{\Sigma}_{11}" /> in normal distributions?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Under normal distributions, the conditional variance is given by the Schur complement: <MathText math="\mathbf{\Sigma}_{1|2} = \mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" />. Because <MathText math="\mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" /> is positive semi-definite, it acts as a subtractive term, mathematically reducing uncertainty.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6 — VIRTUAL LABORATORY */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec6')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Layers size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-indigo-600 dark:text-indigo-400`}>
                SECTION 6 — Virtual Interactive Laboratory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Live interactive conditional slicing playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <p className="text-xs text-brandDark-500 mb-4 leading-normal">
              Below is the interactive conditional slicing dashboard. Slide the conditioning line along the horizontal axis to see how slicing a 2D Gaussian hill creates highly focused 1D normal distributions with smaller variances.
            </p>
            <Lab3_Conditional />
          </div>
        )}
      </section>

      {/* SECTION 7 — PRACTICAL COMPUTATIONS & R LANGUAGE SANDBOX */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec7')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 rounded-xl">
              <Calculator size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-primary-600 dark:text-primary-400`}>
                SECTION 7 — Practical Computations &amp; R Language Sandbox
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Base R script execution and conditional computations.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To cement theoretical concepts, this R script simulates joint observations of two variables and calculates the conditional mean and conditional variance when one variable is observed.
              </p>
              <p>
                This code runs out-of-the-box in standard R consoles or RStudio, fully compatible with **R version 4.3.3** on **Windows x86_64** without external package requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Code Card */}
              <div className="lg:col-span-7 bg-brandDark-950 border border-brandDark-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      R Script (Conditional Computations)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Calculate Conditional Mean and Variance in Bivariate Normal
set.seed(42)

# 1. Parameter Settings
mu <- c(50, 8)       # Mean vector (Height, Shoe Size)
Sigma <- matrix(c(25, 5.5, 5.5, 2.25), nrow = 2, byrow = TRUE)

# 2. Suppose we observe a Student's Height: X_observed = 60
X_obs <- 60

# 3. Calculate Conditional Parameters (Schur Complement Formulas)
# mu_cond = mu_Y + Sigma_YX * Sigma_XX^-1 * (X_obs - mu_X)
mu_cond <- mu[2] + Sigma[2,1] * (1/Sigma[1,1]) * (X_obs - mu[1])

# Sigma_cond = Sigma_YY - Sigma_YX * Sigma_XX^-1 * Sigma_XY
Sigma_cond <- Sigma[2,2] - Sigma[2,1] * (1/Sigma[1,1]) * Sigma[1,2]

cat("--- Observation Vector ---\\n")
cat("Observed Height Variable X1 =", X_obs, "\\n")
cat("\\n--- Marginal Parameters of Variable Y (Shoe Size) ---\\n")
cat("Marginal Mean mu_Y =", mu[2], "\\n")
cat("Marginal Variance Sigma_YY =", Sigma[2,2], "\\n")
cat("\\n--- Conditional Parameters of Y given X1 = 60 ---\\n")
cat("Conditional Mean mu_cond =", mu_cond, "\\n")
cat("Conditional Variance Sigma_cond =", Sigma_cond, "\\n")
`;
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brandDark-850 hover:bg-brandDark-800 text-brandDark-300 border border-brandDark-700'
                        }`}
                    >
                      <Sparkles size={12} />
                      {copied ? 'Copied!' : 'Copy R Code'}
                    </button>
                  </div>

                  <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950/50 p-4 rounded-xl overflow-x-auto border border-brandDark-850/80 leading-relaxed text-left">
                    {`# Calculate Conditional Mean and Variance in Bivariate Normal
set.seed(42)

# 1. Parameter Settings
mu <- c(50, 8)       # Mean vector (Height, Shoe Size)
Sigma <- matrix(c(25, 5.5, 5.5, 2.25), nrow = 2, byrow = TRUE)

# 2. Suppose we observe a Student's Height: X_observed = 60
X_obs <- 60

# 3. Calculate Conditional Parameters (Schur Complement Formulas)
mu_cond <- mu[2] + Sigma[2,1] * (1/Sigma[1,1]) * (X_obs - mu[1])
Sigma_cond <- Sigma[2,2] - Sigma[2,1] * (1/Sigma[1,1]) * Sigma[1,2]`}
                  </pre>
                </div>
              </div>

              {/* Console Output Card */}
              <div className="lg:col-span-5 bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h5 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-sm mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={16} className="text-primary-500" />
                    Console Interpretations
                  </h5>
                  <div className="space-y-4 text-xs font-semibold text-left">
                    <div className="p-3 bg-brandDark-50 dark:bg-brandDark-950/40 border border-brandDark-200/50 dark:border-brandDark-850/80 rounded-xl space-y-1 text-left">
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Conditional Statistics:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`mu_cond:     [1] 10.2
Sigma_cond:  [1] 1.04`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1 font-normal">
                        <strong>Interpretation:</strong> The conditional mean of shoe size ($10.2$) is larger than its marginal average ($8.0$) because the student's height is taller than average ($60 &gt; 50$). Crucially, the conditional variance ($1.04$) is smaller than its marginal variance ($2.25$), illustrating Schur reduction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TOPIC WRAPPER */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-4 uppercase tracking-wider">
          Topic Summary and Industry Relevance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Key Insights &amp; Takeaways</h5>
            <ul className="list-disc pl-5 space-y-1.5 text-brandDark-200">
              <li>Conditioning collapses multi-dimensional distributions along observations.</li>
              <li>Conditional variance represents uncertainty after taking measurements.</li>
              <li>Under normality, conditioning on new parameters always shrinks standard errors.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Recommendation Systems:</strong> Conditioning genre distributions on active watch clicks to surface highly targeted movies (Netflix).
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Medical Diagnostics:</strong> Calibrating disease risk assessments by conditioning generic parameters on patient blood results.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic3_ConditionalDistribution;
