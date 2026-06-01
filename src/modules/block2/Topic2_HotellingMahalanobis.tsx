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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
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

const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52 text-sm"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top leading-relaxed">{meaning}</td>
  </tr>
);

export const Topic2_HotellingMahalanobis: React.FC<TopicProps> = ({ projectorMode }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: true,
    sec7: true,
  });
  // Lab simulator parameters
  const [targetX, setTargetX] = useState<number>(3);
  const [targetY, setTargetY] = useState<number>(3);
  const [covXY, setCovXY] = useState<number>(0.8);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Math variables
  const varianceX = 4;
  const varianceY = 4;
  const det = varianceX * varianceY - covXY * covXY;
  const inv11 = varianceY / det;
  const inv12 = -covXY / det;
  const inv22 = varianceX / det;

  // Calculate Mahalanobis Distance squared
  const mahalanobisSq = targetX * (inv11 * targetX + inv12 * targetY) + targetY * (inv12 * targetX + inv22 * targetY);
  const euclideanSq = targetX * targetX + targetY * targetY;

  const samplePoints = [
    { x: targetX, y: targetY, name: 'Target Point' },
    { x: 0, y: 0, name: 'Origin (Mean)' }
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
                SECTION 1 — Storytelling: The Facial Recognition Biometric Lock
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Why Euclidean distance fails in correlated feature spaces.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine you are building a facial biometric login system for a smartphone. The system measures two highly correlated features: **[Eye Width ($X_1$), Bridge Height ($X_2$)]ᵀ**. Since people with wide eyes tend to have wider bridge heights, these features scale together (positive covariance).
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                If a hacker tries to bypass your system, their dimensions might lie slightly away from your registered average. Standard Euclidean distance measures a straight line. But a straight line ignores the fact that $X_1$ and $X_2$ *should* scale together! 
                **Mahalanobis Distance** stretches and squeezes the coordinate plane along the direction of covariance, measuring how many "standard deviations" away a point is from the registered pattern, keeping the smartphone safe!
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
              <p className="text-xs text-brandDark-400 m-0">Rigorous distance equations, Hotelling's T² formulations, and quadratic forms.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. Mahalanobis Distance</span>
                <p>The squared Mahalanobis distance between a vector <MathText math="\mathbf{x}" /> and a mean vector <MathText math="\boldsymbol{\mu}" /> with covariance <MathText math="\mathbf{\Sigma}" /> is defined as:</p>
                <Eq n="2.1" math="D^2 = (\mathbf{x} - \boldsymbol{\mu})^T \mathbf{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})" label="Mahalanobis Distance Squared" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Hotelling's T² Statistic</span>
                <p>Hotelling's $T^2$ generalizes the univariate t-statistic to high dimensions to test whether a sample mean vector <MathText math="\bar{\mathbf{x}}" /> equals a hypothesized mean <MathText math="\boldsymbol{\mu}_0" />:</p>
                <Eq n="2.2" math="T^2 = n (\bar{\mathbf{x}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{x}} - \boldsymbol{\mu}_0)" label="Hotelling's T²" />
                
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\mathbf{S}" meaning="The sample covariance matrix (p × p) which replaces the population Σ." />
                      <Term sym="n" meaning="Sample size. Scales the statistic linearly just like univariate t-tests." />
                    </tbody>
                  </table>
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
              <p className="text-xs text-brandDark-400 m-0">Detailed 4-level active collaborative learning.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-6 text-sm">
            <div className="p-4 bg-brandDark-50 dark:bg-brandDark-950 rounded-xl">
              <h5 className="font-bold">Level 1 — Teacher Do: Ellipse Chalk Drawing</h5>
              <p className="mt-1">
                The instructor draws a stretched, tilted ellipse on the chalkboard representing correlated bivariate outcomes. By placing two test dots at equal physical distance (Euclidean) from the center, the teacher shows why one dot is statistically "closer" than the other based on contour paths.
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
                SECTION 4 — Project Based Learning: Industrial Defect Identifier
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Project scope, budget profiles, and risk tables.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Project Goal</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                Deploy an IoT computer vision system on an assembly line. Measure multiple correlated features (width, thickness, weight) of processed items and apply Mahalanobis distance thresholds to filter out defective items instantly.
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
              <p className="text-xs text-brandDark-400 m-0">Conceptual and numeric assessment questions.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Q1: Under what conditions does the Mahalanobis distance equal the Euclidean distance?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> When the covariance matrix is the Identity Matrix (<MathText math="\\mathbf{\\Sigma} = \\mathbf{I}" />), meaning all variables are uncorrelated and have unit variance.
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
            <span className="p-2 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Layers size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-indigo-600 dark:text-indigo-400`}>
                SECTION 6 — Virtual Interactive Laboratory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Compare Mahalanobis vs Euclidean distances in real-time.</p>
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
                  <label className="text-xs font-bold block mb-1">Target X Position: {targetX}</label>
                  <input
                    type="range" min="-5" max="5" step="0.1"
                    value={targetX} onChange={(e) => setTargetX(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Target Y Position: {targetY}</label>
                  <input
                    type="range" min="-5" max="5" step="0.1"
                    value={targetY} onChange={(e) => setTargetY(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Covariance (σ_XY): {covXY}</label>
                  <input
                    type="range" min="-1.8" max="1.8" step="0.1"
                    value={covXY} onChange={(e) => setCovXY(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">Distance Matrix Comparison</h5>
                  <div className="grid grid-cols-2 gap-4 text-center py-6">
                    <div className="p-4 bg-white dark:bg-brandDark-900 rounded-xl shadow-sm">
                      <span className="block text-xs text-brandDark-400 font-bold uppercase">Euclidean Distance Squared</span>
                      <strong className="text-3xl font-extrabold text-blue-600">{euclideanSq.toFixed(3)}</strong>
                    </div>
                    <div className="p-4 bg-white dark:bg-brandDark-900 rounded-xl shadow-sm">
                      <span className="block text-xs text-brandDark-400 font-bold uppercase">Mahalanobis Distance Squared</span>
                      <strong className="text-3xl font-extrabold text-violet-600">{mahalanobisSq.toFixed(3)}</strong>
                    </div>
                  </div>
                </div>

                <div className="h-44 text-xs font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis type="number" dataKey="x" domain={[-6, 6]} stroke="#64748b" />
                      <YAxis type="number" dataKey="y" domain={[-6, 6]} stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', fontSize: 10 }} />
                      <ReferenceLine x={0} stroke="#64748b" strokeDasharray="3 3" />
                      <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
                      <Scatter name="Points" data={samplePoints} fill="#8b5cf6" />
                    </ScatterChart>
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
              <p className="text-xs text-brandDark-400 m-0">Compute distances out-of-the-box in Base R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# Compute Mahalanobis Distance in Base R
set.seed(42)

# Define dataset of 5 observations, 2 features
X <- matrix(c(
  170, 60,
  175, 65,
  168, 58,
  180, 72,
  162, 52
), ncol=2, byrow=TRUE)

# Test observation
x_test <- c(174, 61)

# Parameters
mu <- colMeans(X)
S <- cov(X)

# Compute Mahalanobis Distance squared manually
diff <- x_test - mu
D2 <- t(diff) %*% solve(S) %*% diff

cat("--- Sample Covariance Matrix S ---\\n")
print(S)
cat("\\n--- Squared Mahalanobis Distance ---\\n")
print(as.numeric(D2))
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          Mahalanobis distance accounts for variance scales and correlations between dimensions by utilizing the inverse covariance matrix. Hotelling's $T^2$ applies this distance to test hypotheses regarding multivariate sample mean shifts.
        </p>
      </section>
    </div>
  );
};

export default Topic2_HotellingMahalanobis;
