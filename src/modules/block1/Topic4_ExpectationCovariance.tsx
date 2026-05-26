import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';
import { Lab4_ExpectationCovariance } from '../../components/labs/Lab4_ExpectationCovariance';

interface Topic4Props { projectorMode?: boolean; }

const Eq: React.FC<{ n: string; math: string; label?: string }> = ({ n, math, label }) => (
  <div className="my-4 flex items-center gap-3">
    <div className="flex-1 overflow-x-auto"><MathText math={math} block /></div>
    <span className="text-xs font-mono text-brandDark-400 dark:text-brandDark-500 whitespace-nowrap select-none">({n}){label ? ` — ${label}` : ''}</span>
  </div>
);
const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-44"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top">{meaning}</td>
  </tr>
);
const Sec: React.FC<{ open: boolean; toggle: () => void; icon: React.ReactNode; color: string; title: string; sub: string; children: React.ReactNode }> =
  ({ open, toggle, icon, color, title, sub, children }) => (
    <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={toggle} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-xl ${color}`}>{icon}</span>
          <div><h3 className="text-xl font-semibold m-0">{title}</h3><p className="text-xs text-brandDark-400 m-0">{sub}</p></div>
        </div>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="p-6 space-y-6">{children}</div>}
    </section>
  );

export const Topic4_ExpectationCovariance: React.FC<Topic4Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true, s5: true });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

  return (
    <div className="space-y-8 pb-16">

      {/* §1 Motivation */}
      <Sec open={open.s1} toggle={() => tog('s1')}
        icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        title="§1 — Motivation: The Classroom Report Card" sub="Expectation as the centre, covariance as the spread and relationship">
        <div className={`${fb} space-y-4`}>
          <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
            <p className="italic text-brandDark-700 dark:text-brandDark-300">
              A class of 60 students each has three scores: Math <MathText math="X_1" />, Physics <MathText math="X_2" />, Chemistry <MathText math="X_3" />.
              The <strong>expectation vector</strong> is the class average report card — a single vector summarising the "typical" student.
              The <strong>covariance matrix</strong> tells you how scores vary together: do students who score high in Math also tend to score high in Physics?
            </p>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Why both are needed</p>
            <ul className="list-disc pl-5 space-y-1 text-brandDark-600 dark:text-brandDark-400">
              <li>The mean vector alone tells you where the data is centred, but not how spread out or correlated it is.</li>
              <li>The covariance matrix alone tells you the shape and orientation of the data cloud, but not where it is located.</li>
              <li>Together, they completely characterise a multivariate normal distribution.</li>
            </ul>
          </div>
        </div>
      </Sec>

      {/* §2 Equations */}
      <Sec open={open.s2} toggle={() => tog('s2')}
        icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        title="§2 — Equations with Term-by-Term Breakdown" sub="Mean vector, covariance matrix, linear transformation, correlation matrix">

        {/* 4.1 Mean vector */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">4.1 Expectation (Mean Vector)</h4>
          <Eq n="4.1" math="E[\mathbf{X}] \;=\; \boldsymbol{\mu} \;=\; \begin{bmatrix}E[X_1]\\E[X_2]\\\vdots\\E[X_p]\end{bmatrix} \;=\; \int_{\mathbb{R}^p} \mathbf{x}\; f_{\mathbf{X}}(\mathbf{x})\; d\mathbf{x}" label="Mean vector" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-44">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="E[\mathbf{X}]" meaning="The expectation operator applied to the entire random vector — returns a vector of the same dimension p." />
                <Term sym="\boldsymbol{\mu}" meaning="The mean vector — a p×1 column vector of scalar expected values, one per variable." />
                <Term sym="E[X_i] = \int x_i f_{X_i}(x_i)\,dx_i" meaning="The scalar expected value of the i-th component — the probability-weighted average of all possible values of X_i." />
                <Term sym="\int_{\mathbb{R}^p} \mathbf{x}\,f_{\mathbf{X}}(\mathbf{x})\,d\mathbf{x}" meaning="The vector-valued integral — each component of x is integrated against the joint density. This is the centre of mass of the probability distribution in p-dimensional space." />
              </tbody>
            </table>
          </div>
          <p className={`${fb} text-sm`}>Linearity of expectation (key property):</p>
          <Eq n="4.2" math="E[\mathbf{A}\mathbf{X} + \mathbf{b}] \;=\; \mathbf{A}\,E[\mathbf{X}] + \mathbf{b}" label="Linearity" />
        </div>

        {/* 4.2 Covariance matrix */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">4.2 Variance-Covariance Matrix</h4>
          <Eq n="4.3" math="\mathbf{\Sigma} \;=\; \text{Cov}(\mathbf{X}) \;=\; E\!\left[(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^T\right]" label="Covariance matrix (definition)" />
          <p className={`${fb} text-sm`}>The <MathText math="(i,j)" />-th entry is:</p>
          <Eq n="4.4" math="\sigma_{ij} \;=\; \text{Cov}(X_i,X_j) \;=\; E\!\left[(X_i-\mu_i)(X_j-\mu_j)\right]" label="(i,j)-th entry" />
          <p className={`${fb} text-sm`}>Computational shortcut:</p>
          <Eq n="4.5" math="\mathbf{\Sigma} \;=\; E[\mathbf{X}\mathbf{X}^T] \;-\; \boldsymbol{\mu}\boldsymbol{\mu}^T" label="Computational form" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-44">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="(\mathbf{X}-\boldsymbol{\mu})" meaning="The deviation vector — how far a particular observation falls from the class centre of mass. A p×1 column vector." />
                <Term sym="(\mathbf{X}-\boldsymbol{\mu})^T" meaning="The transpose — turns the column deviation vector into a row vector." />
                <Term sym="(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^T" meaning="The outer product — yields a symmetric p×p matrix of deviation products (not a scalar dot product)." />
                <Term sym="\sigma_{ii} = \text{Var}(X_i) \geq 0" meaning="Diagonal entries — the variance of each individual variable. Always non-negative." />
                <Term sym="\sigma_{ij} = \sigma_{ji}" meaning="Off-diagonal entries — the covariance between X_i and X_j. Positive: they scale together; negative: one rises as the other falls; zero: no linear dependency." />
                <Term sym="\mathbf{\Sigma} = \mathbf{\Sigma}^T" meaning="Symmetry — covariance is commutative: Cov(X_i,X_j) = Cov(X_j,X_i)." />
                <Term sym="\mathbf{a}^T\mathbf{\Sigma}\mathbf{a} \geq 0" meaning="Positive semi-definiteness — for all vectors a ∈ ℝᵖ. Equivalently, all eigenvalues of Σ are non-negative." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 4.3 Linear transformation */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">4.3 Covariance Under Linear Transformation</h4>
          <p className={fb}>If <MathText math="\mathbf{Y} = \mathbf{A}\mathbf{X} + \mathbf{b}" /> where <MathText math="\mathbf{A}" /> is a <MathText math="q \times p" /> constant matrix:</p>
          <Eq n="4.6" math="E[\mathbf{Y}] \;=\; \mathbf{A}\boldsymbol{\mu} + \mathbf{b}" label="Mean of linear transform" />
          <Eq n="4.7" math="\text{Cov}(\mathbf{Y}) \;=\; \mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" label="Covariance of linear transform (sandwich formula)" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-44">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" meaning="The 'sandwich' formula. Matrix A rotates and scales the covariance structure. This is the foundation of PCA (choosing A to diagonalise Σ)." />
                <Term sym="\mathbf{b}" meaning="The constant shift — does not affect the covariance. Shifting data does not change its spread or correlations." />
                <Term sym="\mathbf{a}^T\mathbf{\Sigma}\mathbf{a}" meaning="Special case: for a scalar linear combination Y = aᵀX, Var(Y) = aᵀΣa." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 4.4 Correlation matrix */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">4.4 Correlation Matrix</h4>
          <Eq n="4.8" math="\mathbf{R} \;=\; \mathbf{D}^{-1/2}\,\mathbf{\Sigma}\,\mathbf{D}^{-1/2}, \qquad \mathbf{D} = \text{diag}(\sigma_1^2,\sigma_2^2,\ldots,\sigma_p^2)" label="Correlation matrix" />
          <Eq n="4.9" math="\rho_{ij} \;=\; \frac{\sigma_{ij}}{\sigma_i\,\sigma_j} \;\in\; [-1,\,1]" label="Pearson correlation coefficient" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-44">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{D}^{-1/2}" meaning="Diagonal matrix with entries 1/σ_i — divides each variable by its standard deviation, making all variables dimensionless and on the same scale." />
                <Term sym="\rho_{ij}" meaning="The (i,j)-th entry of R — the Pearson correlation coefficient, a scale-free measure of linear association bounded in [-1,1]." />
                <Term sym="\mathbf{R}_{ii} = 1" meaning="Diagonal entries of R are always 1 — a variable is perfectly correlated with itself." />
              </tbody>
            </table>
          </div>
        </div>
      </Sec>

      {/* §3 Illustration */}
      <Sec open={open.s3} toggle={() => tog('s3')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§3 — Illustration: How Σ Shapes the Data Cloud" sub="Three cases: ρ=0, ρ>0, ρ<0">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ρ = 0 */}
            <div className="flex flex-col items-center gap-3">
              <svg viewBox="0 0 180 180" className="w-44 h-44 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                <line x1="20" y1="90" x2="165" y2="90" stroke="#94a3b8" strokeWidth="1" />
                <line x1="90" y1="15" x2="90" y2="165" stroke="#94a3b8" strokeWidth="1" />
                <text x="168" y="94" fontSize="10" fill="#94a3b8">X₁</text>
                <text x="78" y="12" fontSize="10" fill="#94a3b8">X₂</text>
                <ellipse cx="90" cy="90" rx="52" ry="52" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="2" />
                <ellipse cx="90" cy="90" rx="32" ry="32" fill="rgba(59,130,246,0.13)" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="90" cy="90" r="5" fill="#ef4444" />
                <text x="90" y="172" textAnchor="middle" fontSize="9" fill="#3b82f6" fontWeight="bold">ρ = 0</text>
                <text x="90" y="162" textAnchor="middle" fontSize="8" fill="#94a3b8">Circular contours</text>
              </svg>
              <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400 space-y-1">
                <MathText math="\mathbf{\Sigma} = \begin{bmatrix}\sigma^2 & 0 \\ 0 & \sigma^2\end{bmatrix}" />
                <p>Equal variances, zero covariance → circular contours, axes-aligned. Eq. (4.3) off-diagonal = 0.</p>
              </div>
            </div>
            {/* ρ > 0 */}
            <div className="flex flex-col items-center gap-3">
              <svg viewBox="0 0 180 180" className="w-44 h-44 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                <line x1="20" y1="90" x2="165" y2="90" stroke="#94a3b8" strokeWidth="1" />
                <line x1="90" y1="15" x2="90" y2="165" stroke="#94a3b8" strokeWidth="1" />
                <text x="168" y="94" fontSize="10" fill="#94a3b8">X₁</text>
                <text x="78" y="12" fontSize="10" fill="#94a3b8">X₂</text>
                <ellipse cx="90" cy="90" rx="62" ry="28" fill="rgba(124,58,237,0.08)" stroke="#7c3aed" strokeWidth="2" transform="rotate(-38 90 90)" />
                <ellipse cx="90" cy="90" rx="40" ry="18" fill="rgba(124,58,237,0.14)" stroke="#7c3aed" strokeWidth="1.5" transform="rotate(-38 90 90)" />
                <circle cx="90" cy="90" r="5" fill="#ef4444" />
                {/* Major axis arrow */}
                <line x1="90" y1="90" x2="138" y2="62" stroke="#10b981" strokeWidth="2" markerEnd="url(#a4g)" />
                <text x="140" y="58" fontSize="8" fill="#10b981">v₁</text>
                <text x="90" y="172" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="bold">ρ &gt; 0</text>
                <text x="90" y="162" textAnchor="middle" fontSize="8" fill="#94a3b8">Tilts ↗ (upper-right)</text>
                <defs>
                  <marker id="a4g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" /></marker>
                </defs>
              </svg>
              <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400 space-y-1">
                <MathText math="\mathbf{\Sigma} = \begin{bmatrix}\sigma_1^2 & +\sigma_{12} \\ +\sigma_{12} & \sigma_2^2\end{bmatrix}" />
                <p>Positive covariance → ellipse tilts toward upper-right diagonal. Eq. (4.4) σ₁₂ &gt; 0.</p>
              </div>
            </div>
            {/* ρ < 0 */}
            <div className="flex flex-col items-center gap-3">
              <svg viewBox="0 0 180 180" className="w-44 h-44 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                <line x1="20" y1="90" x2="165" y2="90" stroke="#94a3b8" strokeWidth="1" />
                <line x1="90" y1="15" x2="90" y2="165" stroke="#94a3b8" strokeWidth="1" />
                <text x="168" y="94" fontSize="10" fill="#94a3b8">X₁</text>
                <text x="78" y="12" fontSize="10" fill="#94a3b8">X₂</text>
                <ellipse cx="90" cy="90" rx="62" ry="28" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="2" transform="rotate(38 90 90)" />
                <ellipse cx="90" cy="90" rx="40" ry="18" fill="rgba(239,68,68,0.14)" stroke="#ef4444" strokeWidth="1.5" transform="rotate(38 90 90)" />
                <circle cx="90" cy="90" r="5" fill="#3b82f6" />
                <text x="90" y="172" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="bold">ρ &lt; 0</text>
                <text x="90" y="162" textAnchor="middle" fontSize="8" fill="#94a3b8">Tilts ↘ (lower-right)</text>
              </svg>
              <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400 space-y-1">
                <MathText math="\mathbf{\Sigma} = \begin{bmatrix}\sigma_1^2 & -\sigma_{12} \\ -\sigma_{12} & \sigma_2^2\end{bmatrix}" />
                <p>Negative covariance → ellipse tilts toward lower-right diagonal. Eq. (4.4) σ₁₂ &lt; 0.</p>
              </div>
            </div>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400">
            <strong>Reading the ellipses:</strong> The coloured dot marks the mean vector <MathText math="\boldsymbol{\mu}" /> (Eq. 4.1). The size of the ellipse along each axis is proportional to the standard deviation <MathText math="\sigma_i" />. The tilt angle is determined by the sign and magnitude of <MathText math="\sigma_{12}" /> (Eq. 4.4). The principal axes of the ellipse are the eigenvectors of <MathText math="\mathbf{\Sigma}" /> (Eq. 4.7 with A = eigenvector matrix), and the axis lengths are <MathText math="\sqrt{\lambda_1}" /> and <MathText math="\sqrt{\lambda_2}" />.
          </div>
        </div>
      </Sec>

      {/* §4 Worked Example */}
      <Sec open={open.s4} toggle={() => tog('s4')}
        icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        title="§4 — Worked Example: Computing E[X] and Cov(X)" sub="Step-by-step from data to matrix">
        <div className={`${fb} space-y-4`}>
          <p>Given <MathText math="n = 3" /> observations of a bivariate random vector <MathText math="(X_1, X_2)^T" />: <MathText math="(2,4),\,(4,6),\,(6,8)" />.</p>
          <p><strong>Step 1 — Sample mean vector (Eq. 4.1):</strong></p>
          <Eq n="4.10" math="\bar{\mathbf{x}} = \frac{1}{3}\begin{bmatrix}2+4+6\\4+6+8\end{bmatrix} = \begin{bmatrix}4\\6\end{bmatrix}" label="Sample mean" />
          <p><strong>Step 2 — Deviation vectors:</strong></p>
          <Eq n="4.11" math="\mathbf{x}_1 - \bar{\mathbf{x}} = \begin{bmatrix}-2\\-2\end{bmatrix},\quad \mathbf{x}_2 - \bar{\mathbf{x}} = \begin{bmatrix}0\\0\end{bmatrix},\quad \mathbf{x}_3 - \bar{\mathbf{x}} = \begin{bmatrix}2\\2\end{bmatrix}" label="Deviations" />
          <p><strong>Step 3 — Sample covariance matrix (Eq. 4.3 with divisor n−1):</strong></p>
          <Eq n="4.12" math="\mathbf{S} = \frac{1}{2}\!\left[\begin{bmatrix}4&4\\4&4\end{bmatrix}+\begin{bmatrix}0&0\\0&0\end{bmatrix}+\begin{bmatrix}4&4\\4&4\end{bmatrix}\right] = \begin{bmatrix}4&4\\4&4\end{bmatrix}" label="Sample covariance" />
          <p><strong>Step 4 — Correlation matrix (Eq. 4.8–4.9):</strong></p>
          <Eq n="4.13" math="\rho_{12} = \frac{4}{\sqrt{4}\cdot\sqrt{4}} = \frac{4}{4} = 1.0" label="Pearson correlation" />
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm">
            <strong>Observation:</strong> <MathText math="\rho = 1" /> because <MathText math="X_2 = X_1 + 2" /> exactly — a deterministic linear relationship. The matrix is singular (determinant = 0), meaning the data lies on a 1-D line in 2-D space. In practice, real data will have <MathText math="\rho \in (-1,1)" /> and a non-singular <MathText math="\mathbf{S}" />.
          </div>
        </div>
      </Sec>

      {/* §5 — Virtual Interactive Laboratory */}
      <Sec open={open.s5} toggle={() => tog('s5')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§5 — Virtual Interactive Laboratory" sub="Watch the sample mean converge and the covariance matrix build observation by observation">
        <Lab4_ExpectationCovariance />
      </Sec>

    </div>
  );
};

export default Topic4_ExpectationCovariance;
