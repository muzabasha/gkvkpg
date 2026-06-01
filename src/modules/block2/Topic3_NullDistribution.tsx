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
  Flame
} from 'lucide-react';
import {
  AreaChart,
  Area,
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

export const Topic3_NullDistribution: React.FC<TopicProps> = ({ projectorMode }) => {
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
  const [t2Val, setT2Val] = useState<number>(8.5);
  const [nVal, setNVal] = useState<number>(30);
  const [pVal, setPVal] = useState<number>(3);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate scaled F-statistic
  const fMultiplier = (nVal - pVal) / (pVal * (nVal - 1));
  const fStat = t2Val * fMultiplier;

  // Rough p-value calculation based on F-distribution approximation
  const df1 = pVal;
  const df2 = nVal - pVal;
  const pValue = Math.max(0.0001, Math.min(0.9999, 1 / (1 + Math.pow(fStat / df1, df2 / 2))));

  // Generate simple density grid for visual F-distribution approximation
  const densityData = [];
  for (let x = 0.1; x <= 10; x += 0.3) {
    // Simple density curve shape mimicking F-distribution
    const y = (Math.pow(x, df1 / 2 - 1) / Math.pow(1 + (df1 / df2) * x, (df1 + df2) / 2)) * 5;
    densityData.push({
      x: Number(x.toFixed(2)),
      density: Number(y.toFixed(4))
    });
  }

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
                SECTION 1 — Storytelling: The Clinical Drug Multi-Outcome Shift
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Standardizing Hotelling's T² to exact F-tests under the null.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine you are reviewing a new blood pressure medicine. You measure two health outcomes: **[Systolic Shift, Diastolic Shift]ᵀ**. 
                If the medicine does nothing (the null hypothesis $H_0$), the observed shift vector should hover near zero.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                By taking 30 patients, you calculate Hotelling's $T^2$ to measure how far away the patients' average shifted. But how do we define "extreme"? We can't use scalar t-tables because we have multiple variables! 
                By scaling the $T^2$ statistic by the patients ($n$) and dimensions ($p$), we transform it into a standard **F-distribution** shape, allowing us to find the exact p-value and prove the medicine's clinical efficacy!
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
              <p className="text-xs text-brandDark-400 m-0">Exact null distribution equations, degree adjustments, and Rao's U partition.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. Scaling Hotelling's T² to F-Distribution</span>
                <p>Under the null hypothesis <MathText math="H_0: \\boldsymbol{\\mu} = \\boldsymbol{\\mu}_0" />, the scaled <MathText math="T^2" /> statistic follows an exact F-distribution:</p>
                <Eq n="3.1" math="F = \frac{n-p}{p(n-1)} T^2 \;\sim\; F_{p, \, n-p}" label="F-distribution Transformation" />
                
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="p" meaning="Number of dimensions (variables measured simultaneously)." />
                      <Term sym="n - p" meaning="Denominator degrees of freedom. Reduces as number of dimensions p increases." />
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Rao's U Statistic</span>
                <p>Rao's $U$ statistic tests whether additional variables add information beyond a subset of baseline variables:</p>
                <Eq n="3.2" math="U = \frac{1 + T^2_{baseline} / (n-1)}{1 + T^2_{extended} / (n-1)}" label="Rao's U statistic" />
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
              <p className="text-xs text-brandDark-400 m-0">Hands-on tasks exploring significance boundaries.</p>
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
                Demonstration & Core Concepts
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Establish foundational intuition for Null Distribution.
              </p>
              <div className="text-sm space-y-2 mt-2 pl-3 border-l-2 border-brandDark-200 dark:border-brandDark-700">
                <p><strong>Step 1:</strong> The teacher introduces the mathematical formulation on the blackboard.</p>
                <p><strong>Step 2:</strong> Walk through a real-world scenario demonstrating how Null Distribution solves the problem.</p>
              </div>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Collaborative Matrix Building
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Guided formulation of Null Distribution components.
              </p>
              <p className="text-sm">
                <strong>Instructions:</strong> Teacher drafts the initial matrix/equation. Ask students for inputs to complete the missing parameters, discussing implications at each step.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Group Matching Challenge (10 groups of 6)
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Relate Null Distribution theory to practical outputs.
              </p>
              <p className="text-sm">
                <strong>Instructions:</strong> Group students. Show 4 visual plots and 4 equations/matrices. Groups must match them within 3 minutes and defend their solutions.
              </p>
              <p className="text-sm">
                <strong>Assessment Rubric:</strong> Correct mapping (40%), speed (30%), clarity of logical explanation (30%).
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Numerical Computation and Self-Reflection
              </h4>
              <p className="text-sm">
                <strong>Task:</strong> Compute a tiny 2x2 problem related to Null Distribution.
              </p>
              <p className="text-sm">
                <strong>Self-Evaluation Key:</strong> Check the final computed scalar/matrix against the expected outcome derived from theoretical formulas.
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
              <Flame size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Multi-variate Patient Sync Manual
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Clinical trial deployment milestones.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 text-sm">
            <p>
              Develop a quantitative pipeline that continuously gathers patient heart rate, blood pressure, and oxygen saturation. The system computes a rolling Hotelling's $T^2$ test to detect whether post-operative patients deviate significantly from stable homeostatic norms.
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
              <p className="text-xs text-brandDark-400 m-0">Classroom assessment and university prep.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Q1: Why is $T^2$ scaled to the F-distribution instead of using a standard Chi-Square directly?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> Since the sample covariance matrix <MathText math="\\mathbf{S}" /> fluctuates between samples, we must incorporate denominator degrees of freedom. Chi-Square assumes the population covariance <MathText math="\\mathbf{\\Sigma}" /> is known.
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
              <p className="text-xs text-brandDark-400 m-0">Visualize the scaled F-statistic and null rejection region.</p>
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
                  <label className="text-xs font-bold block mb-1">Hotelling's T²: {t2Val}</label>
                  <input
                    type="range" min="1" max="30" step="0.5"
                    value={t2Val} onChange={(e) => setT2Val(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Sample Size (n): {nVal}</label>
                  <input
                    type="range" min="10" max="100" step="5"
                    value={nVal} onChange={(e) => setNVal(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Dimensions (p): {pVal}</label>
                  <input
                    type="range" min="1" max="5" step="1"
                    value={pVal} onChange={(e) => setPVal(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">F-Distribution Scaled Output</h5>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-white dark:bg-brandDark-900 rounded-xl">
                      <span className="block text-[10px] text-brandDark-400 font-bold uppercase">Scaled F-Statistic</span>
                      <strong className="text-2xl font-black text-blue-600">{fStat.toFixed(3)}</strong>
                    </div>
                    <div className="p-3 bg-white dark:bg-brandDark-900 rounded-xl">
                      <span className="block text-[10px] text-brandDark-400 font-bold uppercase">Approx. p-Value</span>
                      <strong className="text-2xl font-black text-violet-600">{pValue.toFixed(4)}</strong>
                    </div>
                  </div>
                </div>

                <div className="h-40 text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={densityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis dataKey="x" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <ReferenceLine x={fStat} stroke="#ef4444" strokeWidth={2} label={{ value: 'F Obs', fill: '#ef4444', position: 'top', fontSize: 10 }} />
                      <Area type="monotone" dataKey="density" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.2)" />
                    </AreaChart>
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
              <p className="text-xs text-brandDark-400 m-0">Scale T² statistics using out-of-the-box R code.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# Scale Hotelling's T2 to F Distribution in R
set.seed(42)

n <- 35         # Number of observations
p <- 3          # Number of variables
T2 <- 8.45      # Calculated Hotelling T2

# Calculate scaled F-value
F_stat <- ((n - p) / (p * (n - 1))) * T2
p_value <- 1 - pf(F_stat, df1=p, df2=n-p)

cat("--- Hotelling's T2 Statistic ---\\n")
print(T2)
cat("\\n--- Scaled F-Statistic ---\\n")
print(as.numeric(F_stat))
cat("\\n--- Exact Null Hypothesis p-Value ---\\n")
print(as.numeric(p_value))
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          Under the null hypothesis, Hotelling's $T^2$ scales directly into an exact F-distribution, adjusting degrees of freedom to match dimensions and sample size. Rao's $U$ statistic serves as a partition test to verify the significance of additional features.
        </p>
      </section>
    </div>
  );
};

export default Topic3_NullDistribution;
