import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic5Props { projectorMode?: boolean; }

const Eq: React.FC<{ n: string; math: string; label?: string }> = ({ n, math, label }) => (
  <div className="my-4 flex items-center gap-3">
    <div className="flex-1 overflow-x-auto"><MathText math={math} block /></div>
    <span className="text-xs font-mono text-brandDark-400 dark:text-brandDark-500 whitespace-nowrap select-none">({n}){label ? ` — ${label}` : ''}</span>
  </div>
);
const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52"><MathText math={sym} /></td>
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

export const Topic5_MultivariateNormal: React.FC<Topic5Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

  return (
    <div className="space-y-8 pb-16">

      {/* §1 Motivation */}
      <Sec open={open.s1} toggle={() => tog('s1')}
        icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        title="§1 — Motivation: The Bell Tent in p Dimensions" sub="Extending the familiar bell curve to multiple correlated variables">
        <div className={`${fb} space-y-4`}>
          <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
            <p className="italic text-brandDark-700 dark:text-brandDark-300">
              The univariate normal is the classic bell curve. Now inflate it into a 3-D bell tent (for two variables), then a 4-D hypersurface (for three variables), and so on.
              The <strong>Multivariate Normal Distribution (MVN)</strong> is this generalisation — a single formula describing the joint behaviour of <MathText math="p" /> correlated normal variables simultaneously.
              It is the cornerstone of multivariate statistics, just as the univariate normal is the cornerstone of classical statistics.
            </p>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Why MVN is special</p>
            <ul className="list-disc pl-5 space-y-1 text-brandDark-600 dark:text-brandDark-400">
              <li>All marginal distributions are normal (Eq. 5.5).</li>
              <li>All conditional distributions are normal (Eq. 5.6–5.7).</li>
              <li>Any linear combination of MVN variables is univariate normal (Eq. 5.8).</li>
              <li>Zero covariance implies independence — unique to MVN (Eq. 5.9).</li>
              <li>Completely characterised by just two parameters: <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />.</li>
            </ul>
          </div>
        </div>
      </Sec>

      {/* §2 Equations */}
      <Sec open={open.s2} toggle={() => tog('s2')}
        icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        title="§2 — Equations with Term-by-Term Breakdown" sub="MVN density, Mahalanobis distance, marginals, conditionals, key properties">

        {/* 5.1 MVN density */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">5.1 The MVN Density Function</h4>
          <p className={fb}>A <MathText math="p" />-dimensional random vector <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> has density:</p>
          <Eq n="5.1" math="f(\mathbf{x}) \;=\; \frac{1}{(2\pi)^{p/2}\,|\mathbf{\Sigma}|^{1/2}} \exp\!\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right)" label="MVN density" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="(2\pi)^{p/2}" meaning="The p-dimensional generalisation of √(2π) from the univariate normal. Grows with dimension p." />
                <Term sym="|\mathbf{\Sigma}|^{1/2}" meaning="Square root of the determinant of Σ — the generalised standard deviation. Measures the 'volume' of the probability ellipsoid. Larger determinant → more spread-out distribution." />
                <Term sym="\frac{1}{(2\pi)^{p/2}|\mathbf{\Sigma}|^{1/2}}" meaning="The normalisation constant — ensures the density integrates to 1 over all of ℝᵖ." />
                <Term sym="(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})" meaning="The squared Mahalanobis distance — the multivariate generalisation of ((x−μ)/σ)². Measures how far x is from the mean, accounting for the covariance structure." />
                <Term sym="\mathbf{\Sigma}^{-1}" meaning="The precision matrix (inverse covariance). 'Whitens' the space — stretching directions of low variance and compressing directions of high variance." />
                <Term sym="\exp(-\tfrac{1}{2}\Delta^2)" meaning="Exponential decay. Density decreases as the Mahalanobis distance Δ increases. Contours of equal density are ellipsoids where Δ² = constant." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.2 Mahalanobis distance */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">5.2 Mahalanobis Distance</h4>
          <Eq n="5.2" math="\Delta(\mathbf{x},\boldsymbol{\mu}) \;=\; \sqrt{(\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})}" label="Mahalanobis distance" />
          <Eq n="5.3" math="\Delta^2 \;=\; (\mathbf{x}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu}) \;\sim\; \chi^2_p \quad \text{when } \mathbf{X}\sim N_p(\boldsymbol{\mu},\mathbf{\Sigma})" label="Chi-squared distribution of Δ²" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\Delta(\mathbf{x},\boldsymbol{\mu})" meaning="The Mahalanobis distance — a scale-invariant measure of how many 'standard deviations' x is from μ in the multivariate sense." />
                <Term sym="\mathbf{\Sigma}^{-1}" meaning="Accounts for the correlation structure — correlated variables are 'closer' in Mahalanobis space than in Euclidean space." />
                <Term sym="\chi^2_p" meaning="Chi-squared distribution with p degrees of freedom. When Σ = I, Δ² reduces to the sum of p squared standard normal variables." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.3 Marginals */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">5.3 Marginal Distributions</h4>
          <p className={fb}>Partition <MathText math="\mathbf{X} = (\mathbf{X}_1^T, \mathbf{X}_2^T)^T" /> with <MathText math="\mathbf{\Sigma} = \begin{bmatrix}\mathbf{\Sigma}_{11}&\mathbf{\Sigma}_{12}\\\mathbf{\Sigma}_{21}&\mathbf{\Sigma}_{22}\end{bmatrix}" />. Then:</p>
          <Eq n="5.4" math="\mathbf{X}_1 \;\sim\; N_q(\boldsymbol{\mu}_1,\;\mathbf{\Sigma}_{11})" label="Marginal of X₁" />
          <Eq n="5.5" math="\mathbf{X}_2 \;\sim\; N_{p-q}(\boldsymbol{\mu}_2,\;\mathbf{\Sigma}_{22})" label="Marginal of X₂" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{\Sigma}_{11}" meaning="The q×q upper-left block of Σ — the covariance matrix of X₁ alone. Obtained by extracting the first q rows and columns of Σ." />
                <Term sym="\mathbf{\Sigma}_{12} = \mathbf{\Sigma}_{21}^T" meaning="The q×(p−q) cross-covariance block — captures the linear relationships between X₁ and X₂." />
                <Term sym="\mathbf{\Sigma}_{22}" meaning="The (p−q)×(p−q) lower-right block — the covariance matrix of X₂ alone." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.4 Conditionals */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">5.4 Conditional Distributions</h4>
          <Eq n="5.6" math="\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2 \;\sim\; N_q\!\left(\boldsymbol{\mu}_{1|2},\;\mathbf{\Sigma}_{1|2}\right)" label="Conditional distribution" />
          <Eq n="5.7a" math="\boldsymbol{\mu}_{1|2} \;=\; \boldsymbol{\mu}_1 + \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}(\mathbf{x}_2 - \boldsymbol{\mu}_2)" label="Conditional mean" />
          <Eq n="5.7b" math="\mathbf{\Sigma}_{1|2} \;=\; \mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" label="Conditional covariance (Schur complement)" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}" meaning="The regression coefficient matrix of X₁ on X₂ — tells you how much X₁ shifts per unit change in X₂." />
                <Term sym="(\mathbf{x}_2 - \boldsymbol{\mu}_2)" meaning="The deviation of the observed X₂ from its mean — the 'information' we condition on." />
                <Term sym="\mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" meaning="The Schur complement of Σ₂₂ in Σ. Always ≼ Σ₁₁ (smaller in the PSD sense) — conditioning always reduces uncertainty." />
                <Term sym="\mathbf{\Sigma}_{1|2} \text{ independent of } \mathbf{x}_2" meaning="Crucial property: the conditional covariance does not depend on the observed value x₂ — only the conditional mean shifts with the observation." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.5 Key properties */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">5.5 Key Properties</h4>
          <Eq n="5.8" math="\mathbf{Y} = \mathbf{A}\mathbf{X}+\mathbf{b} \;\sim\; N_q(\mathbf{A}\boldsymbol{\mu}+\mathbf{b},\;\mathbf{A}\mathbf{\Sigma}\mathbf{A}^T)" label="Closure under linear transformation" />
          <Eq n="5.9" math="\mathbf{X}_1 \perp \mathbf{X}_2 \;\Longleftrightarrow\; \mathbf{\Sigma}_{12} = \mathbf{0} \quad \text{(MVN only)}" label="Independence ↔ zero covariance" />
          <Eq n="5.10" math="(\mathbf{X}-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{X}-\boldsymbol{\mu}) \;\sim\; \chi^2_p" label="Quadratic form distribution" />
        </div>
      </Sec>

      {/* §3 Illustration */}
      <Sec open={open.s3} toggle={() => tog('s3')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§3 — Illustration: Density Contours & Mahalanobis Ellipsoids" sub="Geometric anatomy of the MVN distribution">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center">
            <svg viewBox="0 0 340 310" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
              {/* Axes */}
              <line x1="40" y1="270" x2="315" y2="270" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a5g)" />
              <line x1="40" y1="270" x2="40" y2="18" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a5g)" />
              <text x="318" y="274" fontSize="11" fill="#94a3b8" fontWeight="bold">X₁</text>
              <text x="26" y="14" fontSize="11" fill="#94a3b8" fontWeight="bold">X₂</text>

              {/* Mahalanobis ellipsoids Δ²=1,4,9 */}
              <ellipse cx="178" cy="148" rx="32" ry="19" fill="rgba(124,58,237,0.22)" stroke="#7c3aed" strokeWidth="2.5" transform="rotate(-30 178 148)" />
              <text x="178" y="144" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Δ²=1</text>

              <ellipse cx="178" cy="148" rx="64" ry="38" fill="rgba(124,58,237,0.09)" stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="5 2" transform="rotate(-30 178 148)" />
              <text x="218" y="112" fontSize="8" fill="#7c3aed" fontWeight="bold">Δ²=4</text>

              <ellipse cx="178" cy="148" rx="96" ry="57" fill="rgba(124,58,237,0.04)" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 3" transform="rotate(-30 178 148)" />
              <text x="248" y="82" fontSize="8" fill="#7c3aed">Δ²=9</text>

              {/* Eq labels */}
              <text x="42" y="32" fontSize="8" fill="#7c3aed">Eq.(5.1) contours</text>
              <text x="42" y="42" fontSize="8" fill="#7c3aed">Eq.(5.2) Δ levels</text>

              {/* Mean vector */}
              <circle cx="178" cy="148" r="6" fill="#ef4444" stroke="white" strokeWidth="1.5" />
              <text x="184" y="162" fontSize="9" fill="#ef4444" fontWeight="bold">μ (Eq.4.1)</text>

              {/* Eigenvectors */}
              <line x1="178" y1="148" x2="232" y2="116" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#a5gr)" />
              <text x="234" y="112" fontSize="9" fill="#10b981" fontWeight="bold">v₁ (√λ₁)</text>
              <line x1="178" y1="148" x2="160" y2="114" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#a5y)" />
              <text x="118" y="110" fontSize="9" fill="#f59e0b" fontWeight="bold">v₂ (√λ₂)</text>

              {/* Sample point and Mahalanobis distance */}
              <circle cx="238" cy="98" r="5" fill="#3b82f6" />
              <line x1="178" y1="148" x2="238" y2="98" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="200" y="118" fontSize="8" fill="#3b82f6">Δ(x,μ) Eq.(5.2)</text>

              <defs>
                <marker id="a5g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                <marker id="a5gr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" /></marker>
                <marker id="a5y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" /></marker>
              </defs>
            </svg>
          </div>
          <div className="space-y-4 text-sm">
            <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the diagram</h4>
            <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                <div><strong>Red dot (μ)</strong> — the mean vector (Eq. 4.1) — centre of the distribution, peak of the density surface.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                <div><strong>Purple ellipses</strong> — Mahalanobis distance contours (Eq. 5.2) at <MathText math="\Delta^2 = 1, 4, 9" />. For <MathText math="p=2" />, these contain approximately 39%, 86%, and 99% of the probability mass.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                <div><strong>Green arrow (v₁)</strong> — first eigenvector of <MathText math="\mathbf{\Sigma}" /> — direction of maximum variance. Length proportional to <MathText math="\sqrt{\lambda_1}" />.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                <div><strong>Amber arrow (v₂)</strong> — second eigenvector — direction of minimum variance, orthogonal to v₁. Length proportional to <MathText math="\sqrt{\lambda_2}" />.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                <div><strong>Blue point & line</strong> — a specific observation <MathText math="\mathbf{x}" /> and its Mahalanobis distance <MathText math="\Delta(\mathbf{x},\boldsymbol{\mu})" /> (Eq. 5.2) to the mean.</div>
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* §4 Worked Example */}
      <Sec open={open.s4} toggle={() => tog('s4')}
        icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        title="§4 — Worked Example: Evaluating the MVN Density" sub="Numerical computation of f(x) and Δ²">
        <div className={`${fb} space-y-4`}>
          <p>Let <MathText math="p=2" />, <MathText math="\boldsymbol{\mu} = (0,0)^T" />, <MathText math="\mathbf{\Sigma} = \begin{bmatrix}4&2\\2&3\end{bmatrix}" />, evaluate at <MathText math="\mathbf{x} = (1,1)^T" />.</p>
          <p><strong>Step 1 — Determinant (Eq. 5.1 denominator):</strong></p>
          <Eq n="5.11" math="|\mathbf{\Sigma}| = 4\cdot3 - 2\cdot2 = 12 - 4 = 8" label="Determinant" />
          <p><strong>Step 2 — Inverse:</strong></p>
          <Eq n="5.12" math="\mathbf{\Sigma}^{-1} = \frac{1}{8}\begin{bmatrix}3&-2\\-2&4\end{bmatrix}" label="Precision matrix" />
          <p><strong>Step 3 — Mahalanobis distance squared (Eq. 5.2):</strong></p>
          <Eq n="5.13" math="\Delta^2 = \begin{bmatrix}1&1\end{bmatrix}\frac{1}{8}\begin{bmatrix}3&-2\\-2&4\end{bmatrix}\begin{bmatrix}1\\1\end{bmatrix} = \frac{1}{8}\begin{bmatrix}1&1\end{bmatrix}\begin{bmatrix}1\\2\end{bmatrix} = \frac{3}{8} = 0.375" label="Δ² numerical" />
          <p><strong>Step 4 — Density value (Eq. 5.1):</strong></p>
          <Eq n="5.14" math="f(\mathbf{x}) = \frac{1}{2\pi\sqrt{8}}\exp\!\left(-\frac{0.375}{2}\right) = \frac{1}{2\pi\cdot 2.828}\,e^{-0.1875} \approx \frac{0.829}{17.77} \approx 0.0467" label="Density value" />
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm">
            <strong>Interpretation:</strong> The point <MathText math="(1,1)^T" /> is only <MathText math="\Delta = \sqrt{0.375} \approx 0.61" /> Mahalanobis units from the mean — well inside the <MathText math="\Delta^2 = 1" /> contour. The density value 0.0467 is close to the peak density <MathText math="f(\boldsymbol{\mu}) = \frac{1}{2\pi\sqrt{8}} \approx 0.0563" />.
          </div>
        </div>
      </Sec>

    </div>
  );
};

export default Topic5_MultivariateNormal;
