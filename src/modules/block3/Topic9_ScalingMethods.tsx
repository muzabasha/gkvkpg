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
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface TopicProps {
  projectorMode: boolean;
}

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

export const Topic9_ScalingMethods: React.FC<TopicProps> = ({ projectorMode }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: true,
    sec7: true,
  });
  // Lab parameters
  const [stressFactor, setStressFactor] = useState<number>(0.2);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute mock metric stress value vs non-metric stress value
  const metricStress = stressFactor * 100;
  const nonMetricStress = stressFactor * 0.4 * 100; // non-metric generally achieves lower stress due to rank monotone mapping

  const chartData = [
    { name: 'Metric MDS Stress', stress: Number(metricStress.toFixed(1)), fill: '#ef4444' },
    { name: 'Non-Metric MDS Stress', stress: Number(nonMetricStress.toFixed(1)), fill: '#10b981' }
  ];

  const fontBody = projectorMode ? 'text-xl-readable leading-relaxed' : 'text-base md:text-lg-readable';
  const fontHeading3 = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">
      {/* SECTION 1 — STORY TELLING */}
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
                SECTION 1 — Storytelling: The Subjective Movie Preference Scale
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Why rank orders are better than precise metrics for human perceptions.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine you are running a streaming service. You want to map competing movies on a canvas. You ask users to rate movie similarities. 
                If you use **Metric Scaling**, you treat a "4 out of 10" similarity score as exactly twice as similar as a "2 out of 10". But human ratings are subjective and noisy!
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                Instead, we use **Non-Metric Scaling**. Non-metric scaling ignores the precise numeric values and focuses strictly on **rank orders** (e.g. Movie A is *more similar* to B than C). 
                By utilizing monotonic transformations, non-metric scaling builds highly accurate, robust maps of human preferences, completely bypassing rating noise!
              </p>
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
                SECTION 2 — Mathematical Modelling & Equations
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Monotone regression, Kruskal's Stress formulas, and metrics comparison.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. Non-Metric Monotonic Transformation</span>
                <p>Non-metric MDS fits a monotonic function $f$ mapping dissimilarities to optimal disparities <MathText math="\\hat{d}_{ij}" /> to preserve rank orders:</p>
                <Eq n="9.1" math="\hat{d}_{ij} = f(\delta_{ij}) \quad \text{where } \delta_{ij} < \delta_{kl} \Rightarrow \hat{d}_{ij} \le \hat{d}_{kl}" label="Monotonic Mapping" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Kruskal's Stress Formula</span>
                <p>The non-metric stress measures goodness-of-fit against these monotonic disparities:</p>
                <Eq n="9.2" math="\text{Stress} = \sqrt{ \frac{\sum_{i < j} (d_{ij} - \hat{d}_{ij})^2}{\sum_{i < j} d_{ij}^2} }" label="Kruskal's Stress" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3 — ACTIVE LEARNING */}
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
              <p className="text-xs text-brandDark-400 m-0">Detailed 4-level active collaborative learning.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-4 text-sm">
            <div className="p-4 bg-brandDark-50 dark:bg-brandDark-950 rounded-xl">
              <h5 className="font-bold">Level 1 — Teacher Do: Rank Comparison</h5>
              <p className="mt-1">
                The teacher places three mock boxes of varying weights. The teacher shows that while estimating exact weights in grams (metric) is hard and noisy, sorting the boxes from lightest to heaviest (non-metric) is incredibly easy and robust, explaining the power of non-metric rankings.
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
              <Activity size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Subjective Competing Map
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Non-metric scaling models for user feedback.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 text-sm">
            <p>
              Develop a competitive intelligence platform. Collect customer brand comparison rankings and map competitors using non-metric scaling to identify niches without rating noise.
            </p>
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
              <p className="text-xs text-brandDark-400 m-0">Traps and solutions explained.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Q1: Contrast metric and non-metric scaling.</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> Metric scaling preserves the exact numerical values of distances. Non-metric scaling focuses strictly on preserving the rank orders of similarities by applying monotonic transformations.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6 — VIRTUAL LAB */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec6')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-650 dark:text-indigo-400 rounded-xl">
              <Layers size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-indigo-600 dark:text-indigo-400`}>
                SECTION 6 — Virtual Interactive Laboratory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Observe Stress values for Metric vs Non-metric MDS algorithms live.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-brandDark-50 dark:bg-brandDark-950 rounded-xl space-y-4">
                <h5 className="font-bold text-xs uppercase text-brandDark-400">Controls</h5>
                <div>
                  <label className="text-xs font-bold block mb-1">Scale Dissimilarity Noise: {stressFactor}</label>
                  <input
                    type="range" min="0.05" max="0.5" step="0.05"
                    value={stressFactor} onChange={(e) => setStressFactor(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">Goodness-of-Fit (Stress %)</h5>
                  <div className="text-center py-2">
                    <span className="text-xs text-brandDark-400 font-bold uppercase">Non-Metric Optimization Benefit</span>
                    <strong className="text-2xl font-black text-emerald-600 block">{(metricStress - nonMetricStress).toFixed(1)}% Lower Stress</strong>
                  </div>
                </div>

                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="stress" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 7 — R SANDBOX */}
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
              <p className="text-xs text-brandDark-400 m-0">Fit non-metric MDS models in out-of-the-box R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# Non-Metric Multidimensional Scaling in R using MASS
library(MASS)

# Dissimilarity matrix
d_matrix <- as.dist(matrix(c(
  0, 2, 5,
  2, 0, 4,
  5, 4, 0
), nrow=3, byrow=TRUE))

# Fit non-metric MDS
fit <- isoMDS(d_matrix, k=2)

cat("--- Reconstructed Coordinates ---\\n")
print(fit$points)
cat("\\n--- Final Stress Value ---\\n")
print(fit$stress)
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          Scaling methods choose between numeric preserving (metric) or rank preserving (non-metric) rules. Monotonic transformations allow robust maps of subjective features, making them essential for market research.
        </p>
      </section>
    </div>
  );
};

export default Topic9_ScalingMethods;
