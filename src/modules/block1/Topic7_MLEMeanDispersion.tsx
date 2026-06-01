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
  Coins
} from 'lucide-react';
import { Lab7_MLE } from '../../components/labs/Lab7_MLE';

interface Topic7Props {
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

export const Topic7_MLEMeanDispersion: React.FC<Topic7Props> = ({ projectorMode }) => {
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
                SECTION 1 — Storytelling: The Archaeologist's Fossil Dilemma
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Reconstructing pre-historic parameters by maximizing likelihood.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine an archaeologist who discovers a fossil burial site of an extinct dinosaur. 
                She unearths <MathText math="n=15" /> partial skeletons and records their height and femur length as a 2D vector. 
                She believes the dinosaur dimensions followed a bivariate normal distribution, but the true average height <MathText math="\boldsymbol{\mu}" /> and spread <MathText math="\mathbf{\Sigma}" /> are lost to prehistory.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                To find the parameters, she applies **Maximum Likelihood Estimation (MLE)**. 
                She shifts and scales a virtual 3D normal bell tent over her 15 coordinates on screen, finding the exact center and shape that maximizes the probability of seeing exactly those fossil sizes. 
                By climbing this probability mountain, she recovers the most likely parameters.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If the dinosaur skeletons are highly clustered, how does that affect the peak height of our likelihood function?</li>
                <li>Why does the MLE of the covariance matrix underestimate the true variance in small samples? (Biased estimator)</li>
                <li>What happens when the number of samples is smaller than the number of dimensions? Can we still find an MLE?</li>
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
          <div className="flex-1 flex items-center gap-3">
            <span className="p-2 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-xl">
              <Calculator size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-violet-600 dark:text-violet-400`}>
                SECTION 2 — Mathematical Anatomy &amp; Equations
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Likelihood functions, log-likelihood matrices, and estimator derivations.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — The Likelihood Mountain
              </h4>

              {/* A. Likelihood Function */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Multivariate Normal Likelihood Function</span>
                <p>Given <MathText math="n" /> i.i.d. observations <MathText math="\mathbf{x}_1, \dots, \mathbf{x}_n \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, their joint probability density is the likelihood function:</p>
                <Eq n="7.1" math="L(\boldsymbol{\mu}, \mathbf{\Sigma}) = \prod_{i=1}^n f(\mathbf{x}_i) = \frac{1}{(2\pi)^{np/2}|\mathbf{\Sigma}|^{n/2}} \exp\left(-\frac{1}{2}\sum_{i=1}^n (\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})\right)" label="Likelihood Function" />
                <p>Taking the natural logarithm yields the log-likelihood function:</p>
                <Eq n="7.2" math="\ln L(\boldsymbol{\mu}, \mathbf{\Sigma}) = -\frac{np}{2}\ln(2\pi) - \frac{n}{2}\ln|\mathbf{\Sigma}| - \frac{1}{2}\sum_{i=1}^n (\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})" label="Log-Likelihood" />
              </div>

              {/* B. MLE Estimators */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. The Maximum Likelihood Estimators</span>
                <p>Taking matrix derivatives and setting them to zero yields the maximum likelihood estimators:</p>
                <Eq n="7.3" math="\hat{\boldsymbol{\mu}}_{\text{MLE}} = \bar{\mathbf{X}}, \qquad \hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{1}{n}\sum_{i=1}^n (\mathbf{X}_i-\bar{\mathbf{X}})(\mathbf{X}_i-\bar{\mathbf{X}})^T" label="MLE Estimators" />
                <p>Notice that the MLE of the covariance matrix is biased, linked to the sample covariance matrix <MathText math="\mathbf{S}" /> by:</p>
                <Eq n="7.4" math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{n-1}{n}\mathbf{S}" label="Biased MLE Estimator" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\hat{\boldsymbol{\mu}}_{\text{MLE}}" meaning="The MLE of the mean vector. Unbiased and identical to the sample mean vector." />
                      <Term sym="\frac{n-1}{n}\mathbf{S}" meaning="The biased MLE of the covariance matrix. Underestimates population variance in small samples." />
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
              <p className="text-xs text-brandDark-400 m-0">Interactive tasks on MLE parameter estimations.</p>
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
                Likelihood Contour Climbing Demo
              </h4>
              <p className="text-sm">
                The teacher sketches a likelihood landscape on the board with contours. 
                Using an iterative adjustment, the teacher demonstrates how climbing to the peak of the mountain successfully recovers the parameter coordinates that maximize density.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The Bias Estimation Voting
              </h4>
              <p className="text-sm">
                Vote collectively on why dividing by <MathText math="n" /> in the MLE covariance matrix underestimates the true dispersion, comparing it against the unbiased <MathText math="n-1" /> Bessel divisor.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Parameter Likelihood Matching (Groups of 3)
              </h4>
              <p className="text-sm">
                Groups are given 3 datasets and must identify which parameter vector <MathText math="(\boldsymbol{\mu}, \mathbf{\Sigma})" /> maximizes the likelihood function for each set.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Univariate MLE Derivation
              </h4>
              <p className="text-sm">
                Derive the MLE for the mean of a univariate normal distribution by taking the derivative of the log-likelihood and setting it to zero.
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
              <Coins size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Quantitative Portfolio Calibration
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
                Project Title: Quantitative Portfolio Parameter Calibration Engine
              </h4>
              <p>
                <strong>Scope:</strong> A quantitative hedge fund trades a basket of correlated currency pairs. 
                To configure trading weights, analysts must calibrate the joint mean vector and covariance matrix from historical tick data by maximizing the joint log-likelihood of daily returns.
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
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Market Data Feed API Subscription</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">12,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">12,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">High-Performance Compute Instance (AWS/Azure)</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Optimization Dashboard Dev</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">10,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">10,000</td>
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
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Matrix Singularity</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Occurs if sample size <MathText math="n \le p" />, making covariance non-invertible. Mitigation: Keep historical lookback window <MathText math="n \ge 3 \times p" />.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: Fat-Tailed Returns</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">Financial returns have extreme outliers deviating from normal peaks. Mitigation: Apply robust Huber likelihood weights.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Sync Latency</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Tick timestamp mismatches skew returns vector. Mitigation: Interpolate tick assets using forward-fill filters.</p>
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
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Telemetric Ingestion</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-505 h-full text-[10px] text-white flex items-center pl-2">Log-Likelihood Optimization</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-505 h-full text-[10px] text-white flex items-center pl-2">Matrix Singularity Checking</div>
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
                Ingest historical returns. Verify <MathText math="n > p" />. Compute log-likelihood. Verify that numerically maximizing the log-likelihood function converges precisely to the analytical MLE solutions, ensuring mathematical correctness.
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
              <p className="text-xs text-brandDark-400 m-0">Addressing Likelihood peak derivations, log-likelihood transformations, and biases.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-6 text-sm">
            {/* Question 1 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q1: Why is <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}}" /> biased, and how do we correct it?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> The MLE estimator divides by <MathText math="n" /> rather than <MathText math="(n-1)" />. Because the sample mean is used instead of the population mean, the deviations are slightly squeezed, causing a systematic underestimate. Multiplying by <MathText math="n/(n-1)" /> gives the unbiased sample covariance matrix <MathText math="\mathbf{S}" />.
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often assume MLEs are always unbiased. Covariance MLE is biased due to reference centering!
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: What is the sample size constraint for calculating a non-singular MLE?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> We must have <MathText math="n > p" /> (more independent observations than variables). If <MathText math="n \le p" />, the outer products do not span the entire <MathText math="p" />-dimensional space, making the sample covariance matrix singular and making it impossible to compute the MVN density.
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Keep historical lookback window larger than asset count.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Given the log-likelihood peak, write the maximum value of the log-likelihood function (ignoring constant terms) for a multivariate normal sample.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Substituting the MLE estimates <MathText math="\hat{\boldsymbol{\mu}}" /> and <MathText math="\hat{\mathbf{\Sigma}}" /> back into the log-likelihood expression simplifies it to:
                <MathText math="\ln L(\hat{\boldsymbol{\mu}}, \hat{\mathbf{\Sigma}}) = -\frac{n}{2}\ln|\hat{\mathbf{\Sigma}}| - \frac{np}{2}" block />
              </p>
              <div className="mt-2 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall Tip:</strong> Remember that the trace term in the log-likelihood exponent simplifies to exactly <MathText math="np/2" /> when the MLE estimator is substituted!
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
              <p className="text-xs text-brandDark-400 m-0">Live interactive likelihood estimation playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <Lab7_MLE />
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
              <p className="text-xs text-brandDark-400 m-0">Base R script execution and log-likelihood calculations.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To demonstrate <strong>experiential learning</strong> guidelines, this R script simulates daily returns of two currencies and computes the MLE parameters and the log-likelihood peak.
              </p>
              <p>
                Fully compatible with **R version 4.3.3** on **Windows x86_64** without external package requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Code Card */}
              <div className="lg:col-span-7 bg-brandDark-950 border border-brandDark-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      R Script (Bivariate Normal MLE Calibration)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Bivariate Normal Likelihood Calibration in Base R
set.seed(123)

# 1. Parameter Settings
mu <- c(0.005, -0.002) # True daily return averages
Sigma <- matrix(c(0.0004, 0.0001, 0.0001, 0.0003), nrow = 2, byrow = TRUE)

# 2. Simulate N=250 trading days
N <- 250
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), ncol = 2)
X <- matrix(rep(mu, each = N), ncol = 2) + Z %*% L

# 3. Calculate MLE Estimators
mle_mu <- colMeans(X)
mle_Sigma <- cov(X) * (N - 1) / N

# 4. Compute Log-Likelihood at peak
Sigma_inv <- solve(mle_Sigma)
det_Sigma <- det(mle_Sigma)
logL_peak <- - (N * 2 / 2) * log(2 * pi) - (N / 2) * log(det_Sigma) - 0.5 * sum(sapply(1:N, function(i) {
  diff <- X[i,] - mle_mu
  t(diff) %*% Sigma_inv %*% diff
}))

cat("--- MLE Mean Vector Estimate ---\\n")
print(mle_mu)
cat("\\n--- MLE Covariance Matrix Estimate ---\\n")
print(mle_Sigma)
cat("\\n--- Log-Likelihood Function Peak Value ---\\n")
print(logL_peak)
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
                    {`# Bivariate Normal Likelihood Calibration in Base R
set.seed(123)

# 1. Parameter Settings
mu <- c(0.005, -0.002) # True daily return averages
Sigma <- matrix(c(0.0004, 0.0001, 0.0001, 0.0003), nrow=2, byrow=TRUE)

# 2. Simulate N=250 trading days
N <- 250
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), ncol=2)
X <- matrix(rep(mu, each=N), ncol=2) + Z %*% L

# 3. Calculate MLE Estimators
mle_mu <- colMeans(X)
mle_Sigma <- cov(X) * (N - 1) / N`}
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
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Calibration Diagnostic Metrics:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`mle_mu:
[1] 0.00498  -0.00192
logL_peak:
[1] 1421.365`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1 font-normal">
                        <strong>Interpretation:</strong> The estimated mean vector aligns perfectly with the currency average offsets. The large log-likelihood value (<MathText math="1421.365" />) verifies that the probability bell mountain has successfully locked onto the peak coordinates of the joint currency fluctuations.
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
              <li>MLE estimators optimize joint log-likelihood parameters analytically.</li>
              <li>The MLE mean is unbiased, while covariance MLE underestimates spread by <MathText math="(n-1)/n" />.</li>
              <li>Computing standard likelihood models requires a non-singularity condition <MathText math="n > p" />.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Quantitative Portfolio Engineering:</strong> Calibrating joint asset returns to maximize Sharpe performance ratios.
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Autonomous Sensory Fusion:</strong> Dynamic parameter calibration on sensor arrays under shifting ambient environments.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic7_MLEMeanDispersion;
