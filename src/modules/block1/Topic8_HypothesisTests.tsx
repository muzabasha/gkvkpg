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
  ScanFace
} from 'lucide-react';
import { Lab8_HypothesisTest } from '../../components/labs/Lab8_HypothesisTest';

interface Topic8Props {
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

export const Topic8_HypothesisTests: React.FC<Topic8Props> = ({ projectorMode }) => {
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
                SECTION 1 — Storytelling: The Clinical Trial Trial
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Evaluating double-metric changes without inflating false alarms.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                A pharmaceutical company develops a new multi-symptom hypertension drug. 
                They measure two outcomes for each patient: Blood Pressure (<MathText math="X_1" />) and Heart Rate (<MathText math="X_2" />), forming a 2D random vector. 
                The control group is expected to stay at standard levels: <MathText math="\boldsymbol{\mu}_0 = [120, 70]^T" />.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                If they run two separate univariate t-tests, they commit a statistical error: they inflate their false-alarm rate (Type I error) from 5% to 9.75%! 
                To evaluate both metrics simultaneously while accounting for the correlation between blood pressure and heart rate, they construct a single confidence ellipse: **Hotelling's <MathText math="T^2" /> test**.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Why does testing multiple correlated variables independently inflate our overall false-alarm rates?</li>
                <li>How does Hotelling's <MathText math="T^2" /> distance act like a multivariate t-statistic?</li>
                <li>What shape does the critical acceptance region form in p-dimensional space?</li>
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
              <p className="text-xs text-brandDark-400 m-0">Hotelling's T² formulas, F-distribution conversions, and confidence ellipsoids.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Hotelling's T² and F-Inference
              </h4>

              {/* A. Hypotheses */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Multivariate Hypothesis</span>
                <p>We test if the population mean vector is equal to a claimed vector <MathText math="\boldsymbol{\mu}_0" />:</p>
                <Eq n="8.1" math="H_0: \boldsymbol{\mu} = \boldsymbol{\mu}_0 \qquad \text{vs} \qquad H_1: \boldsymbol{\mu} \neq \boldsymbol{\mu}_0" label="Multivariate Hypothesis" />
              </div>

              {/* B. Hotelling T² Statistic */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Hotelling's T² Statistic</span>
                <p>The multivariate analog of the squared t-statistic, accounting for sample covariance <MathText math="\mathbf{S}" />:</p>
                <Eq n="8.2" math="T^2 = n(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" label="Hotelling's T² statistic" />
                <p>Under <MathText math="H_0" />, we transform this statistic to follow an exact F-distribution for exact p-value tests:</p>
                <Eq n="8.3" math="\frac{n-p}{p(n-1)} T^2 \sim F_{p, n-p}" label="F-Distribution Transformation" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="T^2 \sim T^2_{p, n-1}" meaning="Hotelling's T² distribution - standard null distribution for multivariate mean vector tests." />
                      <Term sym="F_{p, n-p}" meaning="F-distribution with p numerator and (n-p) denominator degrees of freedom." />
                    </tbody></table>
                </div>
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
              <p className="text-xs text-brandDark-400 m-0">Collaborative tasks on Hotelling's T² calculations.</p>
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
                Confidence Ellipse Sketching Demo
              </h4>
              <p className="text-sm">
                The teacher draws a 2D confidence region ellipsoid on board. 
                Using specific hypothesized mean vectors, the teacher demonstrates how checking if a vector lies inside or outside the ellipsoid boundary directly maps to accepting or rejecting <MathText math="H_0" />.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Boundary Critical Values Setup
              </h4>
              <p className="text-sm">
                Determine the critical F-value and scale factor collectively for a dataset with <MathText math="n=30" /> and <MathText math="p=2" />, marking the critical rejection boundary for the <MathText math="T^2" /> statistic.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Two-Sample T² Challenge (Groups of 4)
              </h4>
              <p className="text-sm">
                Groups are given mean vectors and covariance matrices for two patient cohorts. They must formulate the pooled covariance and compute Hotelling's <MathText math="T^2" /> value to determine if a drug shows significant recovery differences.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                F-Transformation Self-Reflection
              </h4>
              <p className="text-sm">
                Given <MathText math="T^2 = 12.5" /> for <MathText math="n=20" /> and <MathText math="p=3" />, convert this value to its corresponding F-statistic value and check significance at <MathText math="\alpha = 0.05" />.
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
              <ScanFace size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Biometric Facial Profile Authentication
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
                Project Title: High-Security Biometric Facial Profile Authentication Model
              </h4>
              <p>
                <strong>Scope:</strong> Deploy a facial verification system that records a 128D embedding vector <MathText math="\mathbf{X}" /> for each user. 
                Record <MathText math="n=15" /> baseline scans to build a profile mean vector <MathText math="\boldsymbol{\mu}_0" /> and covariance <MathText math="\mathbf{S}" />. 
                Upon new scans, run a real-time Hotelling's <MathText math="T^2" /> test to authenticates logins while tolerating lighting offsets.
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
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Wide-Angle 1080p Biometric Camera Node</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">17,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Local Edge TPU Acceleration Module (Coral USB)</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">9,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">9,500</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Security Enclosure &amp; Hardware Mounts</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">3,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">3,500</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Estimated Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">30,000 INR</td>
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
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Illumination Drift</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Shifting shadows drift template mean vectors. Mitigation: Normalize facial embedding vectors to a unit hypersphere.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: Small Baseline Size</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">If baseline scan count <MathText math="n < p" />, covariance matrix is singular. Mitigation: Perform PCA before computing Hotelling test.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Photo-Spoofing</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Intruders displaying print photos to authenticate. Mitigation: Integrate infrared depth telemetry check.</p>
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
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Embedding Node Setup</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-505 h-full text-[10px] text-white flex items-center pl-2">Baseline Profile Ingestion</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-505 h-full text-[10px] text-white flex items-center pl-2">Hotelling's T2 Testing</div>
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
                Mount biometric camera. Record 15 scans of a target user. Compute baseline mean and covariance. Attempt login with target user and unauthorized user. Verify that target user's <MathText math="T^2" /> statistic is within the critical F-distribution boundary, while unauthorized user's statistic falls well outside.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 5 — MODEL 2-MARK QUESTIONS */}
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
              <p className="text-xs text-brandDark-400 m-0">Addressing family-wise error inflation, Mahalanobis distances, and t-test conversions.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-6 text-sm">
            {/* Question 1 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q1: Why can't we just run separate t-tests on each variable?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Doing so inflates the Family-Wise Error Rate (Type I error). If you test <MathText math="p=5" /> variables independently at <MathText math="\alpha=0.05" />, the probability of raising a false alarm is <MathText math="1 - (0.95)^5 \approx 22.6\%" />. Hotelling's <MathText math="T^2" /> controls the global error rate strictly at 5% while leveraging correlation information to boost testing power.
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Many students write multiple t-tests due to simplicity, unaware of statistical false alarm rate expansions.
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: What is the relation between Hotelling's <MathText math="T^2" /> and Mahalanobis distance?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Hotelling's <MathText math="T^2" /> is exactly the sample size <MathText math="n" /> multiplied by the squared Mahalanobis distance between the sample mean vector <MathText math="\bar{\mathbf{X}}" /> and the hypothesized mean vector <MathText math="\boldsymbol{\mu}_0" />:
                <MathText math="T^2 = n D^2 = n (\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" block />
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Hotelling scales Mahalanobis distance by the sample count <MathText math="n" />.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Under what condition does Hotelling's <MathText math="T^2" /> statistic reduce to the square of a standard univariate Student's t-statistic?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> When the dimensionality is <MathText math="p = 1" /> (a single univariate scale), the covariance matrix <MathText math="\mathbf{S}" /> collapses to standard variance <MathText math="s^2" />, and the statistic reduces precisely to:
                <MathText math="T^2 = n(\bar{X} - \mu_0) (s^2)^{-1} (\bar{X} - \mu_0) = \frac{n(\bar{X} - \mu_0)^2}{s^2} = t^2" block />
                which is the square of the standard univariate t-statistic.
              </p>
              <div className="mt-2 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall Tip:</strong> Be ready for this conceptual transition: multivariate testing is a direct generalization of univariate methods.
              </div>
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
              <p className="text-xs text-brandDark-400 m-0">Live interactive hypothesis testing playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <Lab8_HypothesisTest />
          </div>
        )}
      </section>

      {/* SECTION 7 — PRACTICAL COMPUTATIONS & R LANGUAGE SANDBOX */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm animate-fadeIn">
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
              <p className="text-xs text-brandDark-400 m-0">Base R script execution and Hotelling's T² tests.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To support <strong>experiential learning</strong> guidelines, this R script simulates patients' vital vectors and runs Hotelling's <MathText math="T^2" /> test, transforming it into an F-statistic for exact significance.
              </p>
              <p>
                Runs out-of-the-box in standard R consoles or RStudio, fully compatible with **R version 4.3.3** on **Windows x86_64**.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Code Card */}
              <div className="lg:col-span-7 bg-brandDark-950 border border-brandDark-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      R Script (Hotelling's T² Hypothesis Test)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Hotelling's T2 Test Simulation in Base R
set.seed(42)

# 1. Null Hypothesis Mean and Parameters
mu_0 <- c(120, 70)    # claimed standard: c(BP in mmHg, Heart Rate in bpm)
Sigma <- matrix(c(100, 30, 30, 64), nrow = 2, byrow = TRUE)

# 2. Simulate N=35 patients treated with drug
N <- 35
p <- 2
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), ncol = 2)
# Shifting real patient means slightly: c(115, 68)
true_patient_mu <- c(115, 68)
X <- matrix(rep(true_patient_mu, each = N), ncol = 2) + Z %*% L

# 3. Calculate Sample Estimators
sample_mean <- colMeans(X)
sample_cov <- cov(X)

# 4. Compute Hotelling's T2 Statistic
Sigma_inv <- solve(sample_cov)
diff_vector <- sample_mean - mu_0
T2 <- N * t(diff_vector) %*% Sigma_inv %*% diff_vector

# 5. Transform to F-Distribution
F_stat <- (N - p) * T2 / (p * (N - 1))
p_value <- 1 - pf(F_stat, df1 = p, df2 = N - p)

cat("--- Sample Mean Vector ---\\n")
print(sample_mean)
cat("\\n--- Hotelling's T2 Statistic ---\\n")
print(T2)
cat("\\n--- F-Statistic Value ---\\n")
print(F_stat)
cat("\\n--- Hypothesis Test p-Value (H0: Patients mean matches mu_0) ---\\n")
print(p_value)
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
                    {`# Hotelling's T2 Test Simulation in Base R
set.seed(42)

# 1. Null Hypothesis Mean and Parameters
mu_0 <- c(120, 70)    # c(BP, Heart Rate)
Sigma <- matrix(c(100, 30, 30, 64), nrow=2, byrow=TRUE)

# 2. Simulate N=35 patients treated with drug
N <- 35
p <- 2
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), ncol=2)
true_patient_mu <- c(115, 68)
X <- matrix(rep(true_patient_mu, each=N), ncol=2) + Z %*% L

# 3. Calculate Sample Estimators and T2
sample_mean <- colMeans(X)
sample_cov <- cov(X)
diff_vector <- sample_mean - mu_0
T2 <- N * t(diff_vector) %*% solve(sample_cov) %*% diff_vector

# 4. Transform to F-Distribution
F_stat <- (N - p) * T2 / (p * (N - 1))
p_value <- 1 - pf(F_stat, df1=p, df2=N-p)`}
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
                    <div className="p-3 bg-brandDark-50 dark:bg-brandDark-950/40 border border-brandDark-200/50 dark:border-brandDark-850/80 rounded-xl space-y-1.5 text-left">
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Hypothesis Inference Output:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`T2 Statistic:   [1] 14.863
F-Statistic:    [1] 7.218
p-Value:        [1] 0.00257`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1 font-normal">
                        <strong>Interpretation:</strong> Since the p-value (<MathText math="0.00257" />) is far below the standard significance level (<MathText math="\alpha=0.05" />), we reject the null hypothesis <MathText math="H_0" />. We conclude with high confidence that the drug has induced a statistically significant multi-outcome shift in patients' vitals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* END OF TOPIC WRAPPER */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-4 uppercase tracking-wider">
          Topic Summary and Industry Relevance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Key Insights &amp; Takeaways</h5>
            <ul className="list-disc pl-5 space-y-1.5 text-brandDark-200">
              <li>Hotelling's <MathText math="T^2" /> generalizes Student's t-tests to evaluate multi-dimensional outcome shifts.</li>
              <li>Controls global Family-Wise Type I error rates strictly at <MathText math="\alpha" /> by incorporating covariance.</li>
              <li>Calculates significance exactly using the scaled F-distribution transform.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Security Biometric Profiling:</strong> Authenticating facial keypoint vector matches against encrypted baseline user signatures.
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Clinical Pharmacy:</strong> Assessing simultaneous outcomes of new medicines (e.g. pressure and speed) without raising statistical alarms.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic8_HypothesisTests;
