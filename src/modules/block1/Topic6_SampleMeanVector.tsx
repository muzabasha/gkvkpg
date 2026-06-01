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
  ShoppingBag
} from 'lucide-react';
import { Lab6_SampleMean } from '../../components/labs/Lab6_SampleMean';

interface Topic6Props {
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

export const Topic6_SampleMeanVector: React.FC<Topic6Props> = ({ projectorMode }) => {
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
                SECTION 1 — Storytelling: The Quality Control Factory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Sampling coffee bean bags as random vectors.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine managing a coffee packaging factory. Each sack of coffee is evaluated on three parameters: Weight (<MathText math="X_1" />), Moisture Content (<MathText math="X_2" />), and Caffeine Level (<MathText math="X_3" />). 
                Each sack represents a 3D random vector <MathText math="\mathbf{X}_i" />.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                To check quality, we sample <MathText math="n=30" /> sacks and calculate their average vector, the **sample mean vector** <MathText math="\bar{\mathbf{X}}" />.
                If we repeat this sampling process every morning, we realize the sample averages themselves vary day by day! 
                This fluctuation is captured by the sampling distribution of the mean, shrinking in spread as our sample size grows.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If the population variance of moisture is high, how many bags do we need to sample to get a highly reliable average?</li>
                <li>How does the Central Limit Theorem guarantee that our sample average vector behaves normally, even if the underlying coffee quality distributions are highly skewed?</li>
                <li>Why does the covariance matrix of the sample mean shrink by a factor of exactly <MathText math="1/n" />?</li>
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
              <p className="text-xs text-brandDark-400 m-0">The sample mean vector, its variance scale down, and sample covariance.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Sample Mean Estimators and Wishart Spreads
              </h4>

              {/* A. Sample Mean Vector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Sample Mean Vector</span>
                <p>Given <MathText math="n" /> independent and identically distributed observations <MathText math="\mathbf{X}_1, \dots, \mathbf{X}_n \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />:</p>
                <Eq n="6.1" math="\bar{\mathbf{X}} = \frac{1}{n}\sum_{i=1}^n \mathbf{X}_i = \frac{1}{n} \begin{bmatrix} \sum X_{i1} \\ \sum X_{i2} \\ \vdots \\ \sum X_{ip} \end{bmatrix}" label="Sample Mean Vector" />
                <p>The expectation and covariance of the sample mean vector are:</p>
                <Eq n="6.2" math="E[\bar{\mathbf{X}}] = \boldsymbol{\mu}, \qquad \text{Cov}(\bar{\mathbf{X}}) = \frac{1}{n}\mathbf{\Sigma}" label="Sampling Distribution" />
              </div>

              {/* B. Sample Covariance Matrix */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. The Sample Covariance Matrix</span>
                <p>The unbiased sample covariance matrix uses Bessel's correction factor <MathText math="(n-1)" /> to adjust degrees of freedom:</p>
                <Eq n="6.3" math="\mathbf{S} = \frac{1}{n-1}\sum_{i=1}^n (\mathbf{X}_i - \bar{\mathbf{X}})(\mathbf{X}_i - \bar{\mathbf{X}})^T" label="Unbiased Sample Covariance" />
                <p>The scaled sample covariance matrix follows a **Wishart distribution**, which generalizes the univariate chi-squared distribution:</p>
                <Eq n="6.4" math="(n-1)\mathbf{S} \sim W_p(n-1, \mathbf{\Sigma})" label="Wishart Distribution" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\frac{1}{n}\mathbf{\Sigma}" meaning="The covariance of the sample mean. Shows that variance contracts linearly with the sample size n." />
                      <Term sym="W_p(n-1, \mathbf{\Sigma})" meaning="The Wishart distribution - the distribution of sums of outer products of independent normal vectors." />
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
              <p className="text-xs text-brandDark-400 m-0">Hands-on tasks on sampling distributions and mean vectors.</p>
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
                Demonstrating Sample Variance Shrinkage
              </h4>
              <p className="text-sm">
                The teacher draws 3 distributions of <MathText math="\bar{\mathbf{X}}" /> corresponding to <MathText math="n=5" />, <MathText math="n=20" />, and <MathText math="n=100" />. 
                This visually demonstrates how the covariance ellipsoid shrinks toward a tight point as the sample size increases.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The CLT Convergence Race
              </h4>
              <p className="text-sm">
                Vote on whether different skewed non-normal population shapes will converge to a perfect normal contour when taking average vectors of sample size 10 vs 50.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Unbiasedness Proof Audit (Groups of 3)
              </h4>
              <p className="text-sm">
                Groups must write out the algebraic proof showing that the expected value of the sample mean vector <MathText math="E[\bar{\mathbf{X}}]" /> is exactly equal to the population mean vector <MathText math="\boldsymbol{\mu}" />, using expectation linearity.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Sample Covariance Calculation
              </h4>
              <p className="text-sm">
                Given a small dataset of 3 observations: <MathText math="[[1, 2], [3, 4], [5, 6]]^T" />, calculate the sample covariance matrix using Bessel's divisor <MathText math="(n-1)" />.
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
              <ShoppingBag size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: E-Commerce Cohort Vector Evaluation
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
                Project Title: E-Commerce A/B Testing Vector Evaluation Model
              </h4>
              <p>
                <strong>Scope:</strong> Monitor performance of product landing pages by recording a 2D vector for each user session: Conversion Status (<MathText math="X_1" />) and Order Value (<MathText math="X_2" />). 
                To compare cohorts, developers collect samples of size <MathText math="n=1000" />, compute the sample mean vector <MathText math="\bar{\mathbf{X}}" />, and model their sampling distribution as <MathText math="\bar{\mathbf{X}} \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma}/1000)" />.
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
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Server Infrastructure & Cloud Analytics Database</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">15,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">15,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">A/B Testing Software Suite Subscription</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">5,000 / mo</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">3</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">15,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Analytical Console Dashboard Dev</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">10,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">10,000</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Estimated Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">40,000 INR</td>
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
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Data Sparsity</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Low conversion events deform sample covariance. Mitigation: Set minimum routing allocations to 20%.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: Seasonality</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">User behavior shifts during holiday sales. Mitigation: Segment samples into holiday vs weekday clusters.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Adblockers</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Analytical trackers are blocked at client side. Mitigation: Route telemetry through server-side analytics proxy.</p>
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
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Event Tracker Setup</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-505 h-full text-[10px] text-white flex items-center pl-2">Cohort Data Ingestion</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-505 h-full text-[10px] text-white flex items-center pl-2">Multivariate CLT Testing</div>
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
                Load synthetic user cohort data into analytical console. Route 1000 simulated sessions. Confirm that calculating column averages matches the sample mean vector, and that variance contracts by exactly <MathText math="1/n" />, demonstrating mathematical convergence.
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
              <p className="text-xs text-brandDark-400 m-0">Resolving CLT queries, Bessel corrections, and joint distributions.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-6 text-sm">
            {/* Question 1 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q1: Why do we divide by <MathText math="(n-1)" /> instead of <MathText math="n" /> in the sample covariance matrix?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Dividing by <MathText math="n" /> would systematically underestimate the population covariance because the deviations are measured from the sample mean <MathText math="\bar{\mathbf{X}}" /> rather than the true population mean <MathText math="\boldsymbol{\mu}" />. Bessel's correction <MathText math="(n-1)" /> adjusts for this lost degree of freedom, making the estimator unbiased: <MathText math="E[\mathbf{S}] = \mathbf{\Sigma}" />.
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often calculate sample covariance using population mean, which fails to represent true degree loss.
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: Does the Central Limit Theorem apply to random vectors?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Absolutely! The multivariate CLT states that under mild conditions, the sample mean vector <MathText math="\bar{\mathbf{X}}" /> converges in distribution to a multivariate normal <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma}/n)" /> as <MathText math="n" /> increases, regardless of the underlying population distribution shape.
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Normal convergence speeds up with symmetric, light-tailed populations.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: If <MathText math="n=25" /> observations are drawn from <MathText math="N_2(\boldsymbol{\mu}, \mathbf{\Sigma})" />, write down the distribution of <MathText math="(n-1)\mathbf{S}" /> and the sample mean vector <MathText math="\bar{\mathbf{X}}" />.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> The scaled sample covariance matrix follows a Wishart distribution: 
                <MathText math="(n-1)\mathbf{S} \sim W_2(24, \mathbf{\Sigma})" block />
                The sample mean vector is distributed as:
                <MathText math="\bar{\mathbf{X}} \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma}/25)" block />
              </p>
              <div className="mt-2 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall Tip:</strong> Remember that the Wishart degree of freedom is exactly <MathText math="n-1" />, not <MathText math="n" />, due to centering around the sample mean vector!
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
              <p className="text-xs text-brandDark-400 m-0">Live interactive sampling mean vector playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <Lab6_SampleMean />
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
              <p className="text-xs text-brandDark-400 m-0">Simulating sample statistics and contraction limits in base R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                Under <strong>NEP 2020 experiential learning</strong>, this pure base R script simulates cohorts of sessions to verify the sample mean vector's convergence properties and Wishart covariance distributions.
              </p>
              <p>
                Fully compatible with **R version 4.3.3** on **Windows x86_64**, requiring no packages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Code Card */}
              <div className="lg:col-span-7 bg-brandDark-950 border border-brandDark-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      R Script (Sample Mean Contracting Telemetry)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Simulate Sample Mean Vectors and Verify Contracting Covariance
set.seed(42)

# 1. Initialize Bivariate Normal Parameters
mu <- c(0.15, 120)    # Mean vector: c(Conversion Rate, Order Value in INR)
Sigma <- matrix(c(0.12, 1.2, 1.2, 400), nrow = 2, byrow = TRUE)

# 2. Simulate N=1000 user sessions
N <- 1000
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), nrow = N, ncol = 2)
X <- matrix(rep(mu, each = N), nrow = N) + Z %*% L

# 3. Compute empirical estimators
sample_mean <- colMeans(X)
sample_cov <- cov(X)

# 4. Show expected covariance of sample mean (Sigma / N)
mean_cov_theoretical <- Sigma / N
mean_cov_empirical <- sample_cov / N

cat("--- Simulated Sample Mean Vector ---\\n")
print(sample_mean)
cat("\\n--- Simulated Sample Covariance ---\\n")
print(sample_cov)
cat("\\n--- Covariance Matrix of Sample Mean (Theoretical Sigma/1000) ---\\n")
print(mean_cov_theoretical)
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
                    {`# Simulate Sample Mean Vectors and Verify Contracting Covariance
set.seed(42)

# 1. Initialize Bivariate Normal Parameters
mu <- c(0.15, 120)    # Conversion, Order Value
Sigma <- matrix(c(0.12, 1.2, 1.2, 400), nrow=2, byrow=TRUE)

# 2. Simulate N=1000 user sessions
N <- 1000
L <- chol(Sigma)
Z <- matrix(rnorm(N * 2), nrow=N)
X <- matrix(rep(mu, each=N), nrow=N) + Z %*% L

# 3. Compute empirical estimates
sample_mean <- colMeans(X)
sample_cov <- cov(X)
mean_cov_theoretical <- Sigma / N`}
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
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Empirical Sample Statistics:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`sample_mean:
[1] 0.152  120.45
theoretical Sigma/1000 (diagonal):
[1] 0.00012  0.4000`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1 font-normal">
                        <strong>Interpretation:</strong> The simulated mean vector matches our population settings closely. Crucially, the covariance matrix of the sample mean shrinks to tiny fractions (e.g. order value variance drops from <MathText math="400" /> to just <MathText math="0.4" />), demonstrating how large sample sizes lock down our averages with extreme precision.
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
              <li>The sample mean vector aggregates parameters into a vector unbiased estimate of <MathText math="\boldsymbol{\mu}" />.</li>
              <li>Expectation covariance contracts linearly by a factor of <MathText math="1/n" />, sharpening contours.</li>
              <li>Symmetric sample covariance matrix matches degrees of freedom on Wishart distributions.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>E-Commerce Optimization:</strong> A/B test vector comparison to optimize conversion rate and order value concurrently.
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Industrial Quality Control:</strong> Sampling multiple metrics (density, weight, temperature) on products to trigger factory alignment.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic6_SampleMeanVector;
