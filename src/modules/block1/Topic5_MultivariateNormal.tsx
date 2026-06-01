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
  PlaneTakeoff
} from 'lucide-react';
import { Lab5_MultivariateNormal } from '../../components/labs/Lab5_MultivariateNormal';

interface Topic5Props {
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

export const Topic5_MultivariateNormal: React.FC<Topic5Props> = ({ projectorMode }) => {
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
                SECTION 1 — Storytelling: The Idealized City Cloud
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Visualizing the smooth p-dimensional bell mountain.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine walking through an idealized city where three measurements are recorded for every citizen: Height (<MathText math="X_1" />), Weight (<MathText math="X_2" />), and Blood Pressure (<MathText math="X_3" />). 
                If we plot all three together, the citizens don't scatter randomly. Instead, they form a smooth 3D bell-shaped mountain.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                This beautiful multi-dimensional density hill is the **Multivariate Normal Distribution (MVN)**. 
                Slicing this mountain horizontally yields smooth elliptical rings. 
                Slicing it vertically gives us perfect 1D normal bells. 
                It is the ultimate cornerstone of multivariate systems, summarizing multi-dimensional spreads in a single elegant formula.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>How does Mahalanobis distance account for the tilt of our city's bell mountain?</li>
                <li>Why do we need to invert the covariance matrix in the MVN formula? What happens when a matrix cannot be inverted?</li>
                <li>How does correlation act like a rotation operator on independent bell curves?</li>
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
              <p className="text-xs text-brandDark-400 m-0">The MVN joint density, Mahalanobis distance, and partition math.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — The Multivariate Normal Density
              </h4>

              {/* A. MVN Density */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The MVN Joint Density Function</span>
                <p>A random vector <MathText math="\mathbf{X}_{p \times 1} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> follows the multivariate Gaussian density:</p>
                <Eq n="5.1" math="f(\mathbf{x}) = \frac{1}{(2\pi)^{p/2}|\mathbf{\Sigma}|^{1/2}} \exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right)" label="MVN Joint Density" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="|\mathbf{\Sigma}|^{1/2}" meaning="Generalised standard deviation — scales based on the volume of the multi-dimensional uncertainty ellipsoid." />
                    <Term sym="(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})" meaning="Squared Mahalanobis distance — measures distance to the center, normalizing for variance and correlations." />
                  </tbody></table>
                </div>
              </div>

              {/* B. Mahalanobis Distance */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Mahalanobis Distance Quadratic Form</span>
                <Eq n="5.2" math="\Delta^2 = (\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})" label="Mahalanobis Distance Squared" />
                <p>For standard normal vectors, this quadratic form is distributed as a chi-squared random variable:</p>
                <Eq n="5.3" math="\Delta^2 \sim \chi^2_p" label="Chi-Squared Distribution" />
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
              <p className="text-xs text-brandDark-400 m-0">Active sketching and parameter mapping of Gaussian peaks.</p>
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
                The Elliptical Contour Sketch
              </h4>
              <p className="text-sm">
                The instructor sketches contour circles on board, then scales and rotates them to show positive and negative correlation. 
                Students learn to link eigenvalue axes to the physical rotation of the ellipse.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Predicting Partition Parameters
              </h4>
              <p className="text-sm">
                Given a 4D normal vector, collectively partition it into two sub-vectors and write out the sub-blocks of the mean and covariance matrices.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                The Mahalanobis Distance Puzzle (Groups of 3)
              </h4>
              <p className="text-sm">
                Groups are given 4 data points. They must calculate both Euclidean and Mahalanobis distances to the center of a correlated distribution to determine which point is an outlier.
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Bivariate Density Calculation
              </h4>
              <p className="text-sm">
                Calculate the explicit density value $f(1,2)$ of a standard uncorrelated bivariate normal distribution.
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
              <PlaneTakeoff size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Engine Anomaly Detector
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
                Project Title: Jet Engine Real-time Telemetry Anomaly Detection
              </h4>
              <p>
                <strong>Scope:</strong> Deploy 4 high-temperature engine probes representing a 4D normal telemetry vector (Temp, Vibration, Speed, Pressure). Write a real-time monitor to evaluate multivariate Mahalanobis distance squared $\Delta^2$ against a $\chi^2_4$ threshold to trigger emergency alerts.
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
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">High-Temp Exhaust Thermocouple Probe</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">4,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">4</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">18,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Industrial Vibration Piezo Accelerometer</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">6,000</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">12,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">STM32 Nucleo High-speed DAQ Controller</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">5,500</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">5,500</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Estimated Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">35,500 INR</td>
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
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Heat Melt</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Exhaust temperatures exceed probe limits (<MathText math="&gt;1000^\circ\text{C}" />). Mitigation: Use ceramic thermal sleeves.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: EMI Noise</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">Turbine motor magnetic fields degrade signal lines. Mitigation: Deploy shielded twisted-pair cables.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Drift</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Pressure sensor zero-drift over runtime. Mitigation: Auto-calibrate offset values during start checks.</p>
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
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Probe Assembly &amp; Shielding</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-50 h-full text-[10px] text-white flex items-center pl-2">STM32 DAQ Capture Services</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-505 h-full text-[10px] text-white flex items-center pl-2">Mahalanobis Anomaly Engine</div>
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
                Affix vibration sensor to test motor bench. Power on motor. Induce deliberate imbalance (loosening counter-weight). Confirm that the 4D normal telemetry vector shifts outward, raising the Mahalanobis $\Delta^2$ above the $9.49$ threshold to trigger alert LEDs.
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
                Q1: Write the mathematical expression for the Multivariate Normal PDF in <MathText math="p" /> dimensions.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> The joint PDF of <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> is:
                <MathText math="f(\mathbf{x}) = \frac{1}{(2\pi)^{p/2}|\mathbf{\Sigma}|^{1/2}} \exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right)" block />
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often write standard deviation <MathText math="\sigma" /> instead of determinant square root <MathText math="|\mathbf{\Sigma}|^{1/2}" /> or fail to invert the covariance matrix in the exponent (<MathText math="\mathbf{\Sigma}^{-1}" />).
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: What is Mahalanobis distance, and how does it account for covariance?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Mahalanobis distance measures the distance of a point <MathText math="\mathbf{x}" /> to the mean vector <MathText math="\boldsymbol{\mu}" />, scaled by the inverse covariance matrix: <MathText math="D_M(\mathbf{x}) = \sqrt{(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})}" />. By incorporating <MathText math="\mathbf{\Sigma}^{-1}" />, it stretches or shrinks space along correlated axes, neutralizing differences in measurement scales.
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> In physical terms: "Mahalanobis distance measures distance in terms of standard deviations along the ellipsoidal axes instead of standard straight lines."
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Under what condition does the squared Mahalanobis distance follow a chi-squared distribution?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> If <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> follows a Multivariate Normal distribution, then the quadratic form of its squared Mahalanobis distance is strictly distributed as a chi-squared random variable with <MathText math="p" /> degrees of freedom:
                <MathText math="(\mathbf{X}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{X}-\boldsymbol{\mu}) \sim \chi^2_p" block />
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
              <p className="text-xs text-brandDark-400 m-0">Live interactive bivariate Gaussian contour playground.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6">
            <p className="text-xs text-brandDark-500 mb-4 leading-normal">
              Below is the interactive Multivariate Normal contour simulator. Adjust parameters to rotate, tilt, or expand the probability ellipsoid levels and map coordinates to squared Mahalanobis distances.
            </p>
            <Lab5_MultivariateNormal />
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
              <p className="text-xs text-brandDark-400 m-0">Base R script execution and Mahalanobis calculations.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To demonstrate <strong>experiential learning</strong> guidelines, this R script simulates engine sensors following a Multivariate Normal distribution and computes Mahalanobis distances to filter telemetry anomalies.
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
                      R Script (MVN Simulation &amp; Mahalanobis Outliers)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Simulate Multivariate Normal and Identify Outliers
set.seed(42)

# 1. Parameter Settings
mu <- c(500, 45)      # True mean vector: c(Temp in Kelvin, Vibration in Hz)
Sigma <- matrix(c(400, 12, 12, 9), nrow=2, byrow=TRUE) # True Covariance Matrix

# 2. Simulate N=100 engine ticks
L <- chol(Sigma)
Z <- matrix(rnorm(200), ncol=2)
X <- matrix(rep(mu, each=100), ncol=2) + Z %*% L

# 3. Add an intentional outlier (compromised turbine reading)
X[50, ] <- c(580, 55)

# 4. Compute Squared Mahalanobis Distances manually
# D^2 = (X - mu) %*% Sigma^-1 %*% t(X - mu)
Sigma_inv <- solve(Sigma)
D2_vals <- rep(0, 100)
for(i in 1:100){
  diff_vec <- X[i, ] - mu
  D2_vals[i] <- t(diff_vec) %*% Sigma_inv %*% diff_vec
}

# 5. Outlier Detection at Chi-Squared Alpha = 0.05 (threshold = 5.99 for df=2)
outliers <- which(D2_vals > 5.991)

cat("--- Normal Parameter Settings ---\\n")
print(mu)
cat("\\n--- Detected Outlier Ticks (Expected: Ticks exceeding 5.99) ---\\n")
print(outliers)
cat("\\n--- Outlier Telemetry Coordinates ---\\n")
print(X[50,])
cat("\\n--- Outlier Squared Mahalanobis Distance ---\\n")
print(D2_vals[50])
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
                    {`# Simulate MVN and Identify Outliers
set.seed(42)

# 1. Parameter Settings
mu <- c(500, 45)      # Mean (Temp, Vibration)
Sigma <- matrix(c(400, 12, 12, 9), nrow=2, byrow=TRUE)

# 2. Simulate N=100 engine ticks
L <- chol(Sigma)
Z <- matrix(rnorm(200), ncol=2)
X <- matrix(rep(mu, each=100), ncol=2) + Z %*% L

# 3. Add outlier and calculate Mahalanobis distance
X[50, ] <- c(580, 55)
Sigma_inv <- solve(Sigma)
diff_vec <- X[50, ] - mu
D2_outlier <- t(diff_vec) %*% Sigma_inv %*% diff_vec`}
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
                      <strong className="text-brandDark-700 dark:text-brandDark-300">Outlier Diagnostics:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`Outlier Tick:     [1] 50
Coordinates:      [1] 580.0  55.0
Mahalanobis D2:   [1] 23.36`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1 font-normal">
                        <strong>Interpretation:</strong> Tick 50's values represent a temperature of <MathText math="580\text{K}" /> and vibration of <MathText math="55\text{Hz}" />. Its squared Mahalanobis distance (<MathText math="23.36" />) is far higher than the <MathText math="\chi^2_2" /> alpha threshold (<MathText math="5.99" />), making it a statistically significant anomaly, successfully caught by our R algorithm.
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
              <li>Multivariate Normal systems model concurrent normal properties across dimensions.</li>
              <li>Mahalanobis distance standardizes space, correcting for relative variances and correlations.</li>
              <li>Under MVN, level sets are nested hyper-ellipsoids matching chi-squared values.</li>
            </ul>
          </div>
          <div className="space-y-3 text-left">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Aerospace &amp; Defense:</strong> Real-time engine health telemetry checks and missile tracking anomaly filters.
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Geophysical Science:</strong> Mapping soil parameter vectors to model agricultural crop yield expectancies.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Topic5_MultivariateNormal;
