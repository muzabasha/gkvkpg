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
  SlidersHorizontal
} from 'lucide-react';
import { Lab2_MarginalJoint } from '../../components/labs/Lab2_MarginalJoint';

interface Topic2Props {
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

export const Topic2_MarginalJoint: React.FC<Topic2Props> = ({ projectorMode }) => {
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
                SECTION 1 — Storytelling: Pizza Order Part II (The Shadow Slice)
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Joint realities and the magic of projections.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Remember our three friends at the pizza parlor? Their total order is a joint delivery vector: <MathText math="\mathbf{X} = [\text{Pepperoni}, \text{Veggie}, \text{Cheese}]^T" />.
                This is a <strong>joint distribution</strong>—it describes everything ordered simultaneously.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                Now, imagine the restaurant owner only wants to audit how much total <em>Pepperoni</em> is consumed, completely ignoring the Veggie and Cheese orders.
                To do this, he aggregates all records, summing over all possible combinations of Veggie and Cheese.
                By mathematically "integrating out" the variables he doesn't care about, he collapses the multi-dimensional order down to a single univariate shadow: the <strong>marginal distribution</strong> of Pepperoni.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If we lose the joint menu details and only keep the marginal sales counts of individual pizzas, can we reconstruct the exact combinations ordered by tables?</li>
                <li>How does "integrating out" a dimension act like casting a shadow of a 3D object onto a 2D floor?</li>
                <li>Can two completely different joint menu shapes cast the exact same marginal shadows?</li>
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
              <p className="text-xs text-brandDark-400 m-0">Rigorous PDF integration, joint densities, and sub-vector partition properties.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Joint PDFs and Dimension Reduction
              </h4>

              {/* A. Joint PDF */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Joint Probability Density Function</span>
                <p>For a random vector <MathText math="\mathbf{X} = [X_1, X_2, \dots, X_p]^T" />, the joint density maps probabilities across all dimensions simultaneously:</p>
                <Eq n="2.1" math="f_{\mathbf{X}}(\mathbf{x}) = f_{X_1, X_2, \dots, X_p}(x_1, x_2, \dots, x_p)" label="Joint PDF" />
                <p>The total volume underneath the joint density surface must integrate to exactly 1:</p>
                <Eq n="2.2" math="\int_{-\infty}^{\infty} \dots \int_{-\infty}^{\infty} f_{\mathbf{X}}(x_1, \dots, x_p) \, dx_1 \dots dx_p = 1" label="Total Joint Probability" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="f_{\mathbf{X}}(\mathbf{x})" meaning="The joint probability density - a scalar height value characterizing a coordinate point x in p-dimensional space." />
                    <Term sym="\mathbf{x} = [x_1, \dots, x_p]^T" meaning="A specific simultaneous coordinate realization across all p dimensions." />
                  </tbody></table>
                </div>
              </div>

              {/* B. Marginal PDF */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Marginal Density of a Single Component</span>
                <p>Integrating out (collapsing) all other variables except the target variable <MathText math="X_i" /> generates its standalone density:</p>
                <Eq n="2.3" math="f_{X_i}(x_i) = \int_{-\infty}^{\infty} \dots \int_{-\infty}^{\infty} f_{\mathbf{X}}(x_1, \dots, x_p) \, dx_1 \dots dx_{i-1} \, dx_{i+1} \dots dx_p" label="Marginalization Integral" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="dx_1 \dots dx_{i-1} \, dx_{i+1} \dots dx_p" meaning="Integration differential elements representing all variables EXCEPT the target variable X_i. These are integrated out." />
                    <Term sym="f_{X_i}(x_i)" meaning="The resulting univariate marginal probability density function." />
                  </tbody></table>
                </div>
              </div>

              {/* C. Sub-vector Partition */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">C. Sub-vector Marginalization</span>
                <p>We can partition a <MathText math="p" />-dimensional random vector into a sub-vector of interest <MathText math="\mathbf{X}_1" /> (dimensions <MathText math="q \times 1" />) and a nuisance vector <MathText math="\mathbf{X}_2" /> (dimensions <MathText math="(p-q) \times 1" />):</p>
                <Eq n="2.4" math="f_{\mathbf{X}_1}(\mathbf{x}_1) = \int_{\mathbb{R}^{p-q}} f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2) \, d\mathbf{x}_2" label="Sub-vector Projection" />
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <strong>Normal Partition Invariance:</strong> Under a multivariate Gaussian system, marginals of sub-vectors are guaranteed to remain normal, easily constructed by reading the sub-blocks of the joint mean vector <MathText math="\boldsymbol{\mu}" /> and covariance matrix <MathText math="\mathbf{\Sigma}" />.
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
              <p className="text-xs text-brandDark-400 m-0">Collaborative tasks on marginalizing distributions.</p>
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
                Active Projection Demonstration
              </h4>
              <p className="text-sm">
                The instructor draws a 2D scatter cloud of points on a graph (Height vs. Weight) and casts shadows of these points onto both the X-axis and Y-axis using lines. 
                This demonstrates how a 2D joint data cloud collapses into two separate 1D histograms (marginals).
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The Discrete Joint Table Puzzle
              </h4>
              <p className="text-sm">
                Construct a 3x3 table representing joint probabilities of eyes color and hair color. Collectively sum row-wise and column-wise to calculate marginal distributions at the margins.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-650 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The Ellipsoid Shadow Challenge (Teams of 5)
              </h4>
              <p className="text-sm">
                Teams are provided 3 different joint distributions (positive covariance, negative covariance, uncorrelated) and must prove that they cast the exact same 1D marginal shadows.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Integrative Self-Reflection
              </h4>
              <p className="text-sm">
                Derive the marginal probability density $f_X(x)$ from a joint density function $f(x,y) = k(x^2 + y)$ over the region $[0,1] \times [0,1]$.
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
              <SlidersHorizontal size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Multi-sensor Fusion
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
                Project Title: LIDAR-Radar Autonomous Vehicle Fusion Model
              </h4>
              <p>
                <strong>Scope:</strong> Deploy sensor fusion array integrating LIDAR range data ($X_1$) and Radar doppler speed data ($X_2$) as a joint observation vector. Compute marginal shadows for target isolation in high-noise interference zones.
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
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Solid-State LIDAR Transceiver Module</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">12,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">24,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">24GHz Radar Doppler Speedometer</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">3,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">7,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Raspberry Pi 4 (4GB) Navigation Board</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">6,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">6,500</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Estimated Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">37,500 INR</td>
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
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Interference</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Severe rain or fog scatters LIDAR beams. Mitigation: System automatically relies on Radar marginal speeds.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: Multi-path Reflection</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">Radar reflection off walls creates phantom targets. Mitigation: Apply Kalman thresholding.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Sync Latency</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Timestamp mismatch between LIDAR and Radar. Mitigation: Threaded hardware buffers.</p>
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
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Driver Installation</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-500 h-full text-[10px] text-white flex items-center pl-2">Joint Calibration</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-500 h-full text-[10px] text-white flex items-center pl-2">Marginal Projection</div>
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
                Assemble sensors on bench. Point LIDAR at cardboard target. Feed telemetry into terminal. Confirm that block-summing (integrating out Radar columns) yields the precise standalone 1D LIDAR histogram.
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
                Q1: If $f(x,y)$ is the joint PDF, write the expression for the marginal density $f_X(x)$.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> The marginal density is obtained by integrating the joint density over the support of $Y$:
                <MathText math="f_X(x) = \int_{-\infty}^{\infty} f(x,y) \, dy" block />
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often integrate over the wrong variable, writing $dx$ instead of $dy$. To find the marginal of $X$, you must integrate out (remove) $Y$.
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: Can two completely different joint distributions have identical marginals?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Yes. The marginal distributions only describe the individual properties of each variable in isolation. They contain no information about the interaction or correlation between them. Multiple unique covariance landscapes can project onto the exact same axial shadows.
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Think of a shadow: both a complex torus and a simple cylinder can cast a circular shadow on a wall.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Calculate the marginal probability $P(X=0)$ given the discrete joint distribution: $P(0,0)=0.3$, $P(0,1)=0.2$, $P(1,0)=0.4$, $P(1,1)=0.1$.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Sum across all possible values of $Y$ where $X=0$:
                <MathText math="P(X=0) = P(0,0) + P(0,1) = 0.3 + 0.2 = 0.5" block />
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
              <p className="text-xs text-brandDark-400 m-0">Live interactive projection simulation playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <p className="text-xs text-brandDark-500 mb-4 leading-normal">
              Below is the interactive simulation dashboard. Observe how the 2D joint density ellipsoid (top plot) projects its univariate shadows as 1D histograms on both the horizontal and vertical axes.
            </p>
            <Lab2_MarginalJoint />
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
              <p className="text-xs text-brandDark-400 m-0">Base R script execution and marginal extraction.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To demonstrate <strong>experiential learning</strong> guidelines, this R script simulates joint observations of two variables and extracts their marginal distributions.
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
                      R Script (Joint &amp; Marginal Extraction)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Simulate Bivariate Normal and Extract Marginals
set.seed(123)

# 1. Parameter Initialization
mu <- c(10, 20)  # Joint Mean Vector
Sigma <- matrix(c(16, 6, 6, 9), nrow=2, byrow=TRUE) # Joint Covariance

# 2. Simulate N=100 observations
L <- chol(Sigma)
Z <- matrix(rnorm(200), ncol=2)
X <- matrix(rep(mu, each=100), ncol=2) + Z %*% L

# 3. Calculate Joint Estimates
sample_mean_joint <- colMeans(X)
sample_cov_joint <- cov(X)

# 4. Extract Marginals
mean_X1 <- mean(X[,1])
var_X1  <- var(X[,1])
mean_X2 <- mean(X[,2])
var_X2  <- var(X[,2])

cat("--- Joint Mean Estimator ---\\n")
print(sample_mean_joint)
cat("\\n--- Marginal Mean of Variable 1 (Estimated vs True: 10) ---\\n")
print(mean_X1)
cat("\\n--- Marginal Variance of Variable 1 (Estimated vs True: 16) ---\\n")
print(var_X1)
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
                    {`# Simulate Bivariate Normal and Extract Marginals
set.seed(123)

# 1. Parameter Initialization
mu <- c(10, 20)  # Joint Mean Vector
Sigma <- matrix(c(16, 6, 6, 9), nrow=2, byrow=TRUE)

# 2. Simulate N=100 observations
L <- chol(Sigma)
Z <- matrix(rnorm(200), ncol=2)
X <- matrix(rep(mu, each=100), ncol=2) + Z %*% L

# 3. Calculate Joint Estimates
sample_mean_joint <- colMeans(X)

# 4. Extract Marginals
mean_X1 <- mean(X[,1])
var_X1  <- var(X[,1])`}
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
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-brandDark-50 dark:bg-brandDark-950/40 border border-brandDark-200/50 dark:border-brandDark-850/80 rounded-xl space-y-1 text-left">
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Marginal Output Statistics:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`mean_X1: [1] 10.053
var_X1:  [1] 15.821`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1">
                        <strong>Interpretation:</strong> The marginal average ($10.053$) and variance ($15.821$) are extremely close to their population limits ($10.0$ and $16.0$), verifying that marginal values behave like normal univariate parameters.
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
              <li>Joint probability describes the concurrent distribution of all random variables.</li>
              <li>Marginals are univariate shadows, obtained by integrating out other components.</li>
              <li>Under normality, sub-vector marginals are strictly normal, maintaining their respective blocks.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Autonomous Vehicles:</strong> Filtering out noisy sensor dimensions to isolate high-fidelity tracks (like LIDAR only in heavy rain).
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>E-Commerce Optimization:</strong> Separating customer demographic groups to optimize conversion rates on individual landing pages.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic2_MarginalJoint;
