import React, { useState, useEffect } from 'react';
import { MathText } from '../../components/MathText';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  BookOpen,
  HelpCircle,
  Layers
} from 'lucide-react';
import {
  LineChart,
  Line,
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

const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52 text-sm"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top leading-relaxed">{meaning}</td>
  </tr>
);

export const Topic1_Wishart: React.FC<TopicProps> = ({ projectorMode }) => {
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
  const [df, setDf] = useState<number>(10);
  const [sigmaVal, setSigmaVal] = useState<number>(2.5);
  const [simData, setSimData] = useState<{ trial: number; s11: number; s22: number; s12: number }[]>([]);

  // Generate simulated Wishart samples (sums of squares of normal vectors)
  useEffect(() => {
    const trials = 50;
    const temp = [];
    for (let t = 1; t <= trials; t++) {
      let sumXX = 0;
      let sumYY = 0;
      let sumXY = 0;
      for (let i = 0; i < df; i++) {
        // Generate bivariate normal sample with var = sigmaVal, rho = 0.5
        const z1 = Math.random() - 0.5 + (Math.random() - 0.5); // quick normal approx
        const z2 = Math.random() - 0.5 + (Math.random() - 0.5);
        const x = z1 * Math.sqrt(sigmaVal);
        const y = (0.5 * z1 + Math.sqrt(0.75) * z2) * Math.sqrt(sigmaVal);
        sumXX += x * x;
        sumYY += y * y;
        sumXY += x * y;
      }
      temp.push({
        trial: t,
        s11: Number(sumXX.toFixed(2)),
        s22: Number(sumYY.toFixed(2)),
        s12: Number(sumXY.toFixed(2)),
      });
    }
    setSimData(temp);
  }, [df, sigmaVal]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
                SECTION 1 — Storytelling: The Pizza Kitchen Consistency Audit
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Generalizing chi-square variance spreads to matrix-level fluctuations.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Suppose you own a franchise of 10 pizza kitchens. You want to audit how consistent they are. If you only look at one variable, say "cooking time" (a single dimension), the variation of your kitchens follows a **Chi-Square distribution**. 
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                But you are measuring a vector: **[Cooking Time, Delivery Time, Fuel Consumed]ᵀ**. 
                Since they are bundled, you don't just have standard scalar variances. You have a whole 3x3 covariance matrix. Each week, as random orders arrive, the covariance matrix shifts slightly. The distribution describing how this whole covariance matrix fluctuates from week to week is the **Wishart Distribution**!
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If a single variable's variance follows a Chi-Square distribution, what does a matrix's variance follow?</li>
                <li>Why do we need a matrix-valued distribution instead of multiple independent univariate ones?</li>
                <li>How do degrees of freedom affect the predictability of our franchise's variance-covariance patterns?</li>
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
                SECTION 2 — Mathematical Modelling & Equations
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Anatomy of the Wishart distribution, expectation, and additive properties.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Formal Definition of Wishart Matrix
              </h4>

              <div className="space-y-3">
                <p>Let <MathText math="\mathbf{Z}_1, \mathbf{Z}_2, \dots, \mathbf{Z}_n" /> be independent, identically distributed multivariate normal random vectors following <MathText math="N_p(\mathbf{0}, \mathbf{\Sigma})" />. The random matrix <MathText math="\mathbf{M}" /> defined as the sum of outer products follows a Wishart distribution:</p>
                <Eq n="1.1" math="\mathbf{M} = \sum_{i=1}^n \mathbf{Z}_i \mathbf{Z}_i^T \;\sim\; W_p(n, \mathbf{\Sigma})" label="Wishart Distribution" />
                
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="W_p(n, \mathbf{\Sigma})" meaning="The p-dimensional Wishart distribution with n degrees of freedom and scale matrix Σ." />
                      <Term sym="n" meaning="Degrees of freedom. Represents the number of independent vector outer products summed." />
                      <Term sym="\mathbf{\Sigma}" meaning="The underlying scale matrix (p × p), representing the population covariance structure." />
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">Expectation and Variance Properties</span>
                <p>The expected value of a Wishart matrix is scaled by the degrees of freedom:</p>
                <Eq n="1.2" math="E[\mathbf{M}] = n\mathbf{\Sigma}" label="Expectation" />
                <p>If <MathText math="\mathbf{M}_1 \sim W_p(n_1, \mathbf{\Sigma})" /> and <MathText math="\mathbf{M}_2 \sim W_p(n_2, \mathbf{\Sigma})" /> are independent, then their sum is also Wishart:</p>
                <Eq n="1.3" math="\mathbf{M}_1 + \mathbf{M}_2 \;\sim\; W_p(n_1 + n_2, \mathbf{\Sigma})" label="Additive Property" />
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
              <p className="text-xs text-brandDark-400 m-0">Hands-on classroom tasks on Wishart degrees of freedom.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-6">
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-600 rounded text-xs font-bold uppercase">Level 1 — Teacher Do</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">Demonstrating Variance with Coin Flips</h4>
              <p className="text-sm">
                The teacher flips 5 sets of two coins, maps heads as positive vectors, and builds mini 2x2 sum-of-squares matrix clouds on the whiteboard to demonstrate how summation stabilizes covariance matrices.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">The Stabilizer Matrix Game</h4>
              <p className="text-sm">
                Collectively pool mock data of students' heights and foot spreads. Incrementally add student points to a pooled matrix to observe how values approach <MathText math="n\\mathbf{\\Sigma}" /> linearly.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-650 rounded text-xs font-bold uppercase">Level 3 — Groups Do</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">Wishart Summation Puzzle</h4>
              <p className="text-sm">
                Each group is handed two mock matrices generated from <MathText math="W_2(3, \\mathbf{\\Sigma})" /> and must calculate and prove that their sum belongs to <MathText math="W_2(6, \\mathbf{\\Sigma})" />.
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
              <Sparkles size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Portfolio Volatility Bounds
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Industrial risk estimation using Wishart distribution simulation bounds.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 space-y-6 text-sm">
            <div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-1">Project Scope</h4>
              <p>
                Quantitative risk systems use Wishart models to stress-test financial portfolios. By simulating the covariance matrix as a Wishart random matrix, analysts compute upper bounds of portfolio Value-at-Risk (VaR) under heavy market shifts.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left border border-brandDark-200 dark:border-brandDark-800">
                <thead>
                  <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="p-2 border">Milestone Description</th>
                    <th className="p-2 border">Cost (INR)</th>
                    <th className="p-2 border">Timeframe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Wishart Covariance Matrix Generator Code</td>
                    <td className="p-2 border">15,000</td>
                    <td className="p-2 border">Weeks 1-2</td>
                  </tr>
                  <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                    <td className="p-2 border">Monte Carlo Portfolio Stress Engine</td>
                    <td className="p-2 border">25,000</td>
                    <td className="p-2 border">Weeks 3-4</td>
                  </tr>
                </tbody>
              </table>
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
              <p className="text-xs text-brandDark-400 m-0">Traps and solutions mapped to Indian university frameworks.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Q1: Under what conditions does the Wishart distribution collapse to a univariate Chi-Square?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> When the dimension <MathText math="p = 1" />, the matrix scale <MathText math="\\mathbf{\\Sigma} = \\sigma^2" />, the Wishart matrix collapses to <MathText math="\\sigma^2 \\chi^2_n" />.
              </p>
            </div>
            <div>
              <h5 className="font-bold">Q2: What is the expected value of <MathText math="\\mathbf{M} \\sim W_p(n, \\mathbf{\\Sigma})" />?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> The expectation is <MathText math="E[\\mathbf{M}] = n\\mathbf{\\Sigma}" />.
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
              <p className="text-xs text-brandDark-400 m-0">Observe Wishart covariance matrix entries fluctuations live.</p>
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
                  <label className="text-xs font-bold block mb-1">Degrees of Freedom (n): {df}</label>
                  <input
                    type="range" min="3" max="50" step="1"
                    value={df} onChange={(e) => setDf(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Scale Variance (σ²): {sigmaVal}</label>
                  <input
                    type="range" min="0.5" max="5" step="0.1"
                    value={sigmaVal} onChange={(e) => setSigmaVal(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl h-64">
                <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">Simulated Wishart S₁₁ Element (50 samples)</h5>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={simData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="trial" stroke="#64748b" tick={{ fontSize: 9 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 9 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', fontSize: 10 }} />
                    <Line type="monotone" dataKey="s11" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
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
              <p className="text-xs text-brandDark-400 m-0">Generate Wishart random matrices in Base R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# Simulate Wishart Distribution in Base R
set.seed(42)

p <- 2          # Dimension
n <- 10         # Degrees of freedom
Sigma <- matrix(c(4, 2, 2, 9), nrow=2, byrow=TRUE)

# Generate multivariate normal variables
Z <- matrix(rnorm(n * p), ncol=p)
L <- chol(Sigma)
X <- Z %*% L

# Compute Wishart Matrix
M <- t(X) %*% X

cat("--- Simulated Scale Matrix Sigma ---\\n")
print(Sigma)
cat("\\n--- Generated Wishart Matrix M ~ W_p(n, Sigma) ---\\n")
print(M)
cat("\\n--- Expected Matrix (n * Sigma) ---\\n")
print(n * Sigma)
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          The Wishart distribution represents the multi-dimensional variance structure of independent normal samples. It is widely used in high-dimensional estimation, quantitative portfolio management, and state estimation filters.
        </p>
      </section>
    </div>
  );
};

export default Topic1_Wishart;
