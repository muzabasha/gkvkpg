import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic5Props { projectorMode?: boolean; }

export const Topic5_MultivariateNormal: React.FC<Topic5Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({ s1: true, s2: true, s3: true, s4: true, s5: true });
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
              <h3 className={`${fh} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Bell Tent in p Dimensions</h3>
              <p className="text-xs text-brandDark-400 m-0">Extending the familiar bell curve to multiple dimensions.</p>
            </div>
          </div>
          {open.s1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s1 && (
          <div className={`p-6 ${fb} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                You know the univariate normal distribution — the classic bell curve. Now imagine inflating that bell curve into a 3D bell tent (for two variables), then a 4D hypersurface (for three variables), and so on. The Multivariate Normal Distribution (MVN) is this generalization: a single mathematical formula that describes the joint behavior of <em>p</em> correlated normal variables simultaneously.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                It is the most important distribution in multivariate statistics — just as the univariate normal is the cornerstone of classical statistics. Almost every multivariate test (Hotelling's T², MANOVA, discriminant analysis) assumes or derives from the MVN.
              </p>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Why MVN is Special:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>All marginal distributions are normal.</li>
                <li>All conditional distributions are normal.</li>
                <li>Any linear combination of MVN variables is univariate normal.</li>
                <li>Zero covariance implies independence (unique to MVN).</li>
                <li>Completely characterized by just two parameters: <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />.</li>
              </ul>
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
              <h3 className={`${fh} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: The MVN Density</h3>
              <p className="text-xs text-brandDark-400 m-0">Full density formula with every term decoded.</p>
            </div>
          </div>
          {open.s2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s2 && (
          <div className={`p-6 ${fb} space-y-8`}>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. The MVN Density Function</span>
              <p>A <MathText math="p" />-dimensional random vector <MathText math="\mathbf{X}" /> follows the multivariate normal distribution <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> if its density is:</p>
              <MathText math="f(\mathbf{x}) = \frac{1}{(2\pi)^{p/2} |\mathbf{\Sigma}|^{1/2}} \exp\!\left(-\frac{1}{2}(\mathbf{x} - \boldsymbol{\mu})^T \mathbf{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})\right)" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Decoding Every Term:</div>
                <div>• <MathText math="(2\pi)^{p/2}" />: The <MathText math="p" />-dimensional generalization of the <MathText math="\sqrt{2\pi}" /> normalization constant from the univariate normal. Grows with dimension.</div>
                <div>• <MathText math="|\mathbf{\Sigma}|^{1/2}" />: The square root of the determinant of <MathText math="\mathbf{\Sigma}" />, called the <strong>generalized standard deviation</strong>. It measures the "volume" of the probability ellipsoid. A larger determinant means a more spread-out distribution.</div>
                <div>• <MathText math="\frac{1}{(2\pi)^{p/2} |\mathbf{\Sigma}|^{1/2}}" />: The <strong>normalization constant</strong> ensuring the density integrates to 1 over all of <MathText math="\mathbb{R}^p" />.</div>
                <div>• <MathText math="(\mathbf{x} - \boldsymbol{\mu})^T \mathbf{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})" />: The <strong>Mahalanobis distance squared</strong> — the multivariate generalization of the standardized squared deviation <MathText math="\left(\frac{x-\mu}{\sigma}\right)^2" />. It measures how far <MathText math="\mathbf{x}" /> is from the mean, accounting for the covariance structure.</div>
                <div>• <MathText math="\mathbf{\Sigma}^{-1}" />: The <strong>precision matrix</strong> (inverse covariance). It "whitens" the space — stretching directions of low variance and compressing directions of high variance — so that the Mahalanobis distance is a true Euclidean distance in the whitened space.</div>
                <div>• <MathText math="\exp(-\frac{1}{2} \cdot \Delta^2)" />: The exponential decay. Density decreases as the Mahalanobis distance <MathText math="\Delta" /> increases. Contours of equal density are ellipsoids where <MathText math="\Delta^2 = c" /> (constant).</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Mahalanobis Distance</span>
              <p>The <strong>Mahalanobis distance</strong> from <MathText math="\mathbf{x}" /> to the mean <MathText math="\boldsymbol{\mu}" /> is:</p>
              <MathText math="\Delta(\mathbf{x}, \boldsymbol{\mu}) = \sqrt{(\mathbf{x} - \boldsymbol{\mu})^T \mathbf{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})}" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• When <MathText math="\mathbf{\Sigma} = \mathbf{I}" /> (identity): Mahalanobis distance reduces to ordinary Euclidean distance.</div>
                <div>• When <MathText math="\mathbf{\Sigma} = \sigma^2\mathbf{I}" />: Reduces to <MathText math="\|\mathbf{x} - \boldsymbol{\mu}\| / \sigma" /> — standardized Euclidean distance.</div>
                <div>• <strong>Scale invariance</strong>: Mahalanobis distance is unchanged by linear transformations of the data — it is a true geometric distance in the probability space.</div>
                <div>• <strong>Distribution</strong>: If <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, then <MathText math="\Delta^2 \sim \chi^2_p" /> (chi-squared with <MathText math="p" /> degrees of freedom).</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Marginal Distributions of MVN</span>
              <p>Partition <MathText math="\mathbf{X} = (\mathbf{X}_1^T, \mathbf{X}_2^T)^T" /> with <MathText math="\boldsymbol{\mu} = (\boldsymbol{\mu}_1^T, \boldsymbol{\mu}_2^T)^T" /> and <MathText math="\mathbf{\Sigma} = \begin{bmatrix}\mathbf{\Sigma}_{11} & \mathbf{\Sigma}_{12} \\ \mathbf{\Sigma}_{21} & \mathbf{\Sigma}_{22}\end{bmatrix}" />. Then:</p>
              <MathText math="\mathbf{X}_1 \sim N_{q}(\boldsymbol{\mu}_1,\, \mathbf{\Sigma}_{11})" block />
              <MathText math="\mathbf{X}_2 \sim N_{p-q}(\boldsymbol{\mu}_2,\, \mathbf{\Sigma}_{22})" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <MathText math="\mathbf{\Sigma}_{11}" />: The <MathText math="q \times q" /> upper-left block of <MathText math="\mathbf{\Sigma}" /> — the covariance matrix of <MathText math="\mathbf{X}_1" /> alone.</div>
                <div>• <MathText math="\mathbf{\Sigma}_{12} = \mathbf{\Sigma}_{21}^T" />: The <MathText math="q \times (p-q)" /> cross-covariance block — captures the linear relationships between <MathText math="\mathbf{X}_1" /> and <MathText math="\mathbf{X}_2" />.</div>
                <div>• <strong>Key result</strong>: Marginals of MVN are MVN. No integration needed — just extract the relevant sub-vector of <MathText math="\boldsymbol{\mu}" /> and sub-matrix of <MathText math="\mathbf{\Sigma}" />.</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. Conditional Distributions of MVN</span>
              <p>The conditional distribution of <MathText math="\mathbf{X}_1" /> given <MathText math="\mathbf{X}_2 = \mathbf{x}_2" /> is:</p>
              <MathText math="\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2 \;\sim\; N_q\!\left(\boldsymbol{\mu}_{1|2},\; \mathbf{\Sigma}_{1|2}\right)" block />
              <p className="mt-3">where the conditional mean and covariance are:</p>
              <MathText math="\boldsymbol{\mu}_{1|2} = \boldsymbol{\mu}_1 + \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}(\mathbf{x}_2 - \boldsymbol{\mu}_2)" block />
              <MathText math="\mathbf{\Sigma}_{1|2} = \mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="\mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}" />: The <strong>regression coefficient matrix</strong> of <MathText math="\mathbf{X}_1" /> on <MathText math="\mathbf{X}_2" />. Tells you how much <MathText math="\mathbf{X}_1" /> shifts per unit change in <MathText math="\mathbf{X}_2" />.</div>
                <div>• <MathText math="(\mathbf{x}_2 - \boldsymbol{\mu}_2)" />: The deviation of the observed <MathText math="\mathbf{X}_2" /> from its mean — the "information" we condition on.</div>
                <div>• <MathText math="\mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" />: The <strong>Schur complement</strong> of <MathText math="\mathbf{\Sigma}_{22}" /> in <MathText math="\mathbf{\Sigma}" />. Always <MathText math="\preceq \mathbf{\Sigma}_{11}" /> (smaller in the positive semi-definite sense) — conditioning always reduces uncertainty.</div>
                <div>• <strong>Crucial property</strong>: <MathText math="\mathbf{\Sigma}_{1|2}" /> does not depend on the observed value <MathText math="\mathbf{x}_2" /> — only the conditional mean shifts with the observation.</div>
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
              <h3 className={`${fh} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Density Contours & Mahalanobis Ellipsoids</h3>
              <p className="text-xs text-brandDark-400 m-0">Geometric anatomy of the MVN distribution.</p>
            </div>
          </div>
          {open.s3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s3 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <svg viewBox="0 0 320 300" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                  {/* Axes */}
                  <line x1="40" y1="260" x2="290" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag5)" />
                  <line x1="40" y1="260" x2="40" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag5)" />
                  <text x="295" y="264" fontSize="11" fill="#94a3b8">X₁</text>
                  <text x="28" y="16" fontSize="11" fill="#94a3b8">X₂</text>

                  {/* Mahalanobis ellipsoids: Δ²=1,4,9 */}
                  <ellipse cx="165" cy="145" rx="30" ry="18" fill="rgba(124,58,237,0.25)" stroke="#7c3aed" strokeWidth="2" transform="rotate(-30 165 145)" />
                  <text x="155" y="143" fontSize="8" fill="#7c3aed" fontWeight="bold">Δ²=1</text>

                  <ellipse cx="165" cy="145" rx="60" ry="36" fill="rgba(124,58,237,0.10)" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 2" transform="rotate(-30 165 145)" />
                  <text x="200" y="115" fontSize="8" fill="#7c3aed">Δ²=4</text>

                  <ellipse cx="165" cy="145" rx="90" ry="54" fill="rgba(124,58,237,0.04)" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-30 165 145)" />
                  <text x="230" y="90" fontSize="8" fill="#7c3aed">Δ²=9</text>

                  {/* Mean vector */}
                  <circle cx="165" cy="145" r="5" fill="#ef4444" />
                  <text x="170" y="158" fontSize="9" fill="#ef4444" fontWeight="bold">μ</text>

                  {/* Principal axes (eigenvectors) */}
                  <line x1="165" y1="145" x2="218" y2="114" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ag5g)" />
                  <text x="220" y="110" fontSize="9" fill="#10b981" fontWeight="bold">v₁ (λ₁)</text>
                  <line x1="165" y1="145" x2="148" y2="112" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#ag5y)" />
                  <text x="118" y="108" fontSize="9" fill="#f59e0b" fontWeight="bold">v₂ (λ₂)</text>

                  {/* Point x and Mahalanobis distance */}
                  <circle cx="220" cy="100" r="4" fill="#3b82f6" />
                  <line x1="165" y1="145" x2="220" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="195" y="118" fontSize="8" fill="#3b82f6">Δ(x,μ)</text>

                  <defs>
                    <marker id="ag5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                    <marker id="ag5g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" /></marker>
                    <marker id="ag5y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" /></marker>
                  </defs>
                </svg>
              </div>
              <div className="space-y-4 text-sm">
                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Anatomy of the MVN Geometry:</h4>
                <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Red dot (μ)</strong>: The mean vector — center of the distribution, peak of the density surface.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Purple ellipses</strong>: Mahalanobis distance contours at <MathText math="\Delta^2 = 1, 4, 9" />. Each ellipse contains approximately 39%, 86%, and 99% of the probability mass (for <MathText math="p=2" />).</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Green arrow (v₁)</strong>: First eigenvector of <MathText math="\mathbf{\Sigma}" /> — direction of maximum variance. Length proportional to <MathText math="\sqrt{\lambda_1}" />.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Amber arrow (v₂)</strong>: Second eigenvector — direction of minimum variance, orthogonal to v₁. Length proportional to <MathText math="\sqrt{\lambda_2}" />.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Blue point & line</strong>: A specific observation <MathText math="\mathbf{x}" /> and its Mahalanobis distance <MathText math="\Delta(\mathbf{x}, \boldsymbol{\mu})" /> to the mean.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 — PROPERTIES */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => tog('s4')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl"><HelpCircle size={22} /></span>
            <div>
              <h3 className={`${fh} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Key Properties & Reproductive Property</h3>
              <p className="text-xs text-brandDark-400 m-0">Linear transformations, independence, and closure.</p>
            </div>
          </div>
          {open.s4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s4 && (
          <div className={`p-6 ${fb} space-y-5`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-3 text-sm">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">1. Linear Transformation</div>
                <p>If <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> and <MathText math="\mathbf{Y} = \mathbf{A}\mathbf{X} + \mathbf{b}" />:</p>
                <MathText math="\mathbf{Y} \sim N_q(\mathbf{A}\boldsymbol{\mu} + \mathbf{b},\; \mathbf{A}\mathbf{\Sigma}\mathbf{A}^T)" block />
                <p className="text-brandDark-600 dark:text-brandDark-400">MVN is closed under linear transformations — any linear function of an MVN vector is also MVN.</p>
              </div>
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-3 text-sm">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">2. Sum of Independent MVN</div>
                <p>If <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}_1, \mathbf{\Sigma}_1)" /> and <MathText math="\mathbf{Y} \sim N_p(\boldsymbol{\mu}_2, \mathbf{\Sigma}_2)" /> independently:</p>
                <MathText math="\mathbf{X} + \mathbf{Y} \sim N_p(\boldsymbol{\mu}_1 + \boldsymbol{\mu}_2,\; \mathbf{\Sigma}_1 + \mathbf{\Sigma}_2)" block />
              </div>
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-3 text-sm">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">3. Quadratic Form (Chi-squared)</div>
                <p>If <MathText math="\mathbf{X} \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />:</p>
                <MathText math="(\mathbf{X} - \boldsymbol{\mu})^T \mathbf{\Sigma}^{-1} (\mathbf{X} - \boldsymbol{\mu}) \sim \chi^2_p" block />
                <p className="text-brandDark-600 dark:text-brandDark-400">The Mahalanobis distance squared follows a chi-squared distribution with <MathText math="p" /> degrees of freedom.</p>
              </div>
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-3 text-sm">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">4. Independence ↔ Zero Covariance</div>
                <p>For MVN only: <MathText math="\mathbf{X}_1 \perp \mathbf{X}_2 \Leftrightarrow \mathbf{\Sigma}_{12} = \mathbf{0}" /></p>
                <p className="text-brandDark-600 dark:text-brandDark-400">This equivalence is unique to the normal distribution. For general distributions, uncorrelated does not imply independent.</p>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Topic5_MultivariateNormal;
