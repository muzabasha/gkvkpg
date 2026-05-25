import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic6Props { projectorMode?: boolean; }

export const Topic6_SampleMeanVector: React.FC<Topic6Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({ s1: true, s2: true, s3: true, s4: true });
  const tog = (id: string) => setOpen(p => ({ ...p, [id]: !p[id] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base md:text-lg';
  const fh = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">

      {/* SECTION 1 — STORY */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => tog('s1')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl"><Sparkles size={22} /></span>
            <div>
              <h3 className={`${fh} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Class Average Report Card</h3>
              <p className="text-xs text-brandDark-400 m-0">From individual observations to the sample mean vector.</p>
            </div>
          </div>
          {open.s1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s1 && (
          <div className={`p-6 ${fb} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                You have 60 students, each measured on <em>p</em> variables (height, weight, test scores, etc.). Each student is a random vector <MathText math="\mathbf{X}_i \in \mathbb{R}^p" />. The <strong>sample mean vector</strong> <MathText math="\bar{\mathbf{X}}" /> is the "class average report card" — a single vector summarizing the typical student by averaging each measurement across all 60 students.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                The key question: if we know the population distribution is <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, what is the distribution of this sample average? This is the multivariate Central Limit Theorem.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2 — MATH */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => tog('s2')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-xl"><Calculator size={22} /></span>
            <div>
              <h3 className={`${fh} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: Equations & Term Breakdown</h3>
              <p className="text-xs text-brandDark-400 m-0">Sample mean vector, its distribution, and the sample covariance matrix.</p>
            </div>
          </div>
          {open.s2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s2 && (
          <div className={`p-6 ${fb} space-y-8`}>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. Sample Mean Vector</span>
              <p>Given <MathText math="n" /> i.i.d. observations <MathText math="\mathbf{X}_1, \mathbf{X}_2, \ldots, \mathbf{X}_n" /> from <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, the sample mean vector is:</p>
              <MathText math="\bar{\mathbf{X}} = \frac{1}{n} \sum_{i=1}^{n} \mathbf{X}_i = \frac{1}{n}\begin{bmatrix} \sum_{i=1}^n X_{i1} \\ \sum_{i=1}^n X_{i2} \\ \vdots \\ \sum_{i=1}^n X_{ip} \end{bmatrix}" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="\mathbf{X}_i" />: The <MathText math="i" />-th observation — a <MathText math="p \times 1" /> column vector of all measurements for the <MathText math="i" />-th subject.</div>
                <div>• <MathText math="\sum_{i=1}^{n} \mathbf{X}_i" />: Vector addition — adds all <MathText math="n" /> observation vectors component-wise.</div>
                <div>• <MathText math="\frac{1}{n}" />: Scalar division — divides each component sum by <MathText math="n" /> to get the average.</div>
                <div>• <MathText math="\bar{X}_j = \frac{1}{n}\sum_{i=1}^n X_{ij}" />: The <MathText math="j" />-th component of <MathText math="\bar{\mathbf{X}}" /> is just the ordinary sample mean of the <MathText math="j" />-th variable.</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Distribution of the Sample Mean Vector</span>
              <p>Since each <MathText math="\mathbf{X}_i \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> i.i.d., the sample mean vector follows:</p>
              <MathText math="\bar{\mathbf{X}} \sim N_p\!\left(\boldsymbol{\mu},\; \frac{1}{n}\mathbf{\Sigma}\right)" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Derivation Logic:</div>
                <div>• <strong>Unbiasedness</strong>: <MathText math="E[\bar{\mathbf{X}}] = \frac{1}{n}\sum_{i=1}^n E[\mathbf{X}_i] = \frac{1}{n} \cdot n\boldsymbol{\mu} = \boldsymbol{\mu}" /> — the sample mean is an unbiased estimator of the population mean.</div>
                <div>• <strong>Covariance</strong>: <MathText math="\text{Cov}(\bar{\mathbf{X}}) = \text{Cov}\!\left(\frac{1}{n}\sum_i \mathbf{X}_i\right) = \frac{1}{n^2}\sum_i \text{Cov}(\mathbf{X}_i) = \frac{1}{n^2} \cdot n\mathbf{\Sigma} = \frac{\mathbf{\Sigma}}{n}" /> — uses independence of observations.</div>
                <div>• <strong>Normality</strong>: A linear combination of independent normal vectors is normal (reproductive property of MVN).</div>
                <div>• <strong>Interpretation of <MathText math="\frac{1}{n}\mathbf{\Sigma}" /></strong>: The covariance of the sample mean is the population covariance scaled down by <MathText math="n" />. Larger samples → smaller uncertainty about the mean → tighter distribution of <MathText math="\bar{\mathbf{X}}" /> around <MathText math="\boldsymbol{\mu}" />.</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Sample Covariance Matrix</span>
              <p>The <strong>sample covariance matrix</strong> is the unbiased estimator of <MathText math="\mathbf{\Sigma}" />:</p>
              <MathText math="\mathbf{S} = \frac{1}{n-1} \sum_{i=1}^{n} (\mathbf{X}_i - \bar{\mathbf{X}})(\mathbf{X}_i - \bar{\mathbf{X}})^T" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <MathText math="(\mathbf{X}_i - \bar{\mathbf{X}})" />: The deviation of the <MathText math="i" />-th observation from the sample mean — a <MathText math="p \times 1" /> vector.</div>
                <div>• <MathText math="(\mathbf{X}_i - \bar{\mathbf{X}})(\mathbf{X}_i - \bar{\mathbf{X}})^T" />: The outer product — a <MathText math="p \times p" /> rank-1 matrix capturing the squared deviations and cross-products for observation <MathText math="i" />.</div>
                <div>• <MathText math="\frac{1}{n-1}" />: Bessel's correction — dividing by <MathText math="n-1" /> (degrees of freedom) instead of <MathText math="n" /> makes <MathText math="\mathbf{S}" /> an unbiased estimator: <MathText math="E[\mathbf{S}] = \mathbf{\Sigma}" />.</div>
                <div>• <strong>Distribution</strong>: <MathText math="(n-1)\mathbf{S} \sim W_p(n-1, \mathbf{\Sigma})" /> — the Wishart distribution (multivariate generalization of chi-squared).</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. Independence of <MathText math="\bar{\mathbf{X}}" /> and <MathText math="\mathbf{S}" /></span>
              <p>A fundamental result: for MVN data, the sample mean vector and sample covariance matrix are <strong>independent</strong>:</p>
              <MathText math="\bar{\mathbf{X}} \perp \mathbf{S} \quad \text{when } \mathbf{X}_1, \ldots, \mathbf{X}_n \overset{\text{i.i.d.}}{\sim} N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" block />
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm text-emerald-800 dark:text-emerald-300 mt-3">
                <strong>Why this matters:</strong> This independence is the multivariate analog of the independence of the sample mean and sample variance in the univariate normal case. It is the foundation for constructing Hotelling's T² test statistic — the multivariate analog of the t-test.
              </div>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 3 — VISUAL ILLUSTRATION */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => tog('s3')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl"><BookOpen size={22} /></span>
            <div>
              <h3 className={`${fh} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Sampling Distribution of <MathText math="\bar{\mathbf{X}}" /></h3>
              <p className="text-xs text-brandDark-400 m-0">How the distribution of the sample mean shrinks with larger n.</p>
            </div>
          </div>
          {open.s3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s3 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* n=5 */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  {/* Population cloud (faint) */}
                  <ellipse cx="80" cy="80" rx="50" ry="35" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-20 80 80)" />
                  {/* Sampling distribution of mean (n=5) */}
                  <ellipse cx="80" cy="80" rx="28" ry="20" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2" transform="rotate(-20 80 80)" />
                  <circle cx="80" cy="80" r="4" fill="#ef4444" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">n = 5</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\bar{\mathbf{X}} \sim N_p\!\left(\boldsymbol{\mu}, \frac{\mathbf{\Sigma}}{5}\right)" />
                  <p className="mt-1">Large uncertainty — sample mean can be far from μ.</p>
                </div>
              </div>
              {/* n=20 */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="80" cy="80" rx="50" ry="35" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-20 80 80)" />
                  <ellipse cx="80" cy="80" rx="16" ry="11" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" transform="rotate(-20 80 80)" />
                  <circle cx="80" cy="80" r="4" fill="#3b82f6" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">n = 20</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\bar{\mathbf{X}} \sim N_p\!\left(\boldsymbol{\mu}, \frac{\mathbf{\Sigma}}{20}\right)" />
                  <p className="mt-1">Moderate uncertainty — mean is closer to μ on average.</p>
                </div>
              </div>
              {/* n=100 */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="80" cy="80" rx="50" ry="35" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-20 80 80)" />
                  <ellipse cx="80" cy="80" rx="7" ry="5" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2" transform="rotate(-20 80 80)" />
                  <circle cx="80" cy="80" r="4" fill="#10b981" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">n = 100</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\bar{\mathbf{X}} \sim N_p\!\left(\boldsymbol{\mu}, \frac{\mathbf{\Sigma}}{100}\right)" />
                  <p className="mt-1">Small uncertainty — sample mean is tightly concentrated around μ.</p>
                </div>
              </div>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400">
              <strong>Reading the diagram:</strong> The grey dashed ellipse is the population distribution <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> — fixed regardless of <MathText math="n" />. The colored ellipses show the sampling distribution of <MathText math="\bar{\mathbf{X}}" /> — it has the same center <MathText math="\boldsymbol{\mu}" /> and same shape (same eigenvectors) as the population, but is scaled down by <MathText math="1/n" />. As <MathText math="n \to \infty" />, the sampling distribution collapses to a point at <MathText math="\boldsymbol{\mu}" /> (consistency).
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 — WORKED EXAMPLE */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => tog('s4')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl"><HelpCircle size={22} /></span>
            <div>
              <h3 className={`${fh} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Computing <MathText math="\bar{\mathbf{X}}" /> and <MathText math="\mathbf{S}" /></h3>
              <p className="text-xs text-brandDark-400 m-0">Step-by-step numerical calculation.</p>
            </div>
          </div>
          {open.s4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s4 && (
          <div className={`p-6 ${fb} space-y-5`}>
            <p>Given <MathText math="n = 4" /> observations of <MathText math="(X_1, X_2)^T" />: <MathText math="(2,3), (4,5), (6,7), (8,9)" />.</p>
            <p><strong>Step 1 — Sample Mean Vector:</strong></p>
            <MathText math="\bar{\mathbf{X}} = \frac{1}{4}\begin{bmatrix}2+4+6+8\\3+5+7+9\end{bmatrix} = \begin{bmatrix}5\\6\end{bmatrix}" block />
            <p><strong>Step 2 — Deviation Vectors:</strong></p>
            <MathText math="\mathbf{X}_1 - \bar{\mathbf{X}} = \begin{bmatrix}-3\\-3\end{bmatrix},\quad \mathbf{X}_2 - \bar{\mathbf{X}} = \begin{bmatrix}-1\\-1\end{bmatrix},\quad \mathbf{X}_3 - \bar{\mathbf{X}} = \begin{bmatrix}1\\1\end{bmatrix},\quad \mathbf{X}_4 - \bar{\mathbf{X}} = \begin{bmatrix}3\\3\end{bmatrix}" block />
            <p><strong>Step 3 — Sample Covariance Matrix:</strong></p>
            <MathText math="\mathbf{S} = \frac{1}{3}\left[\begin{bmatrix}9&9\\9&9\end{bmatrix} + \begin{bmatrix}1&1\\1&1\end{bmatrix} + \begin{bmatrix}1&1\\1&1\end{bmatrix} + \begin{bmatrix}9&9\\9&9\end{bmatrix}\right] = \frac{1}{3}\begin{bmatrix}20&20\\20&20\end{bmatrix} = \begin{bmatrix}6.67&6.67\\6.67&6.67\end{bmatrix}" block />
            <p><strong>Step 4 — Distribution of <MathText math="\bar{\mathbf{X}}" /> (if population is MVN):</strong></p>
            <MathText math="\bar{\mathbf{X}} \sim N_2\!\left(\boldsymbol{\mu},\; \frac{\mathbf{\Sigma}}{4}\right)" block />
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm">
              <strong>Note:</strong> Again <MathText math="\rho = 1" /> because <MathText math="X_2 = X_1 + 1" /> exactly. In practice, real data will have <MathText math="\rho \in (-1, 1)" /> and a non-singular <MathText math="\mathbf{S}" />.
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Topic6_SampleMeanVector;
