import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic4Props { projectorMode?: boolean; }

export const Topic4_ExpectationCovariance: React.FC<Topic4Props> = ({ projectorMode = false }) => {
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
              <h3 className={`${fh} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Classroom Report Card</h3>
              <p className="text-xs text-brandDark-400 m-0">Expectation as the center, covariance as the spread and relationship.</p>
            </div>
          </div>
          {open.s1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s1 && (
          <div className={`p-6 ${fb} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                A class of 60 students each has three scores: Math (X₁), Physics (X₂), and Chemistry (X₃). The <strong>expectation vector</strong> is the class average report card — a single vector summarizing the "typical" student. The <strong>covariance matrix</strong> tells you how the scores vary together: do students who score high in Math also tend to score high in Physics? Or is there no relationship?
              </p>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Why Both Are Needed:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>The mean vector alone tells you where the data is centered, but not how spread out or correlated it is.</li>
                <li>The covariance matrix alone tells you the shape and orientation of the data cloud, but not where it is located.</li>
                <li>Together, they completely characterize a multivariate normal distribution.</li>
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
              <h3 className={`${fh} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: Equations & Term Breakdown</h3>
              <p className="text-xs text-brandDark-400 m-0">Expectation vector, covariance matrix, and their properties.</p>
            </div>
          </div>
          {open.s2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s2 && (
          <div className={`p-6 ${fb} space-y-8`}>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. Expectation of a Random Vector</span>
              <p>The <strong>mean vector</strong> is defined component-wise as the expectation of each element:</p>
              <MathText math="E[\mathbf{X}] = \boldsymbol{\mu} = \begin{bmatrix} E[X_1] \\ E[X_2] \\ \vdots \\ E[X_p] \end{bmatrix} = \int_{\mathbb{R}^p} \mathbf{x}\, f_{\mathbf{X}}(\mathbf{x})\, d\mathbf{x}" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="E[X_i] = \int_{-\infty}^{\infty} x_i\, f_{X_i}(x_i)\, dx_i" />: The scalar expected value of the <MathText math="i" />-th component — the probability-weighted average of all possible values of <MathText math="X_i" />.</div>
                <div>• <MathText math="\int_{\mathbb{R}^p} \mathbf{x}\, f_{\mathbf{X}}(\mathbf{x})\, d\mathbf{x}" />: The vector-valued integral — each component of <MathText math="\mathbf{x}" /> is integrated against the joint density. This is the <em>center of mass</em> of the probability distribution in <MathText math="p" />-dimensional space.</div>
                <div>• <strong>Linearity</strong>: <MathText math="E[\mathbf{A}\mathbf{X} + \mathbf{b}] = \mathbf{A}E[\mathbf{X}] + \mathbf{b}" /> for any constant matrix <MathText math="\mathbf{A}" /> and vector <MathText math="\mathbf{b}" />.</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Variance-Covariance Matrix</span>
              <p>The <strong>covariance matrix</strong> (also called the dispersion matrix) is defined as:</p>
              <MathText math="\mathbf{\Sigma} = \text{Cov}(\mathbf{X}) = E\!\left[(\mathbf{X} - \boldsymbol{\mu})(\mathbf{X} - \boldsymbol{\mu})^T\right]" block />
              <p className="mt-3">Expanding the outer product, the <MathText math="(i,j)" />-th entry is:</p>
              <MathText math="\sigma_{ij} = \text{Cov}(X_i, X_j) = E[(X_i - \mu_i)(X_j - \mu_j)]" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Structural Properties:</div>
                <div>• <strong>Diagonal entries</strong> <MathText math="\sigma_{ii} = \text{Var}(X_i) \geq 0" />: The variance of each individual variable. Always non-negative.</div>
                <div>• <strong>Off-diagonal entries</strong> <MathText math="\sigma_{ij} = \sigma_{ji}" />: The covariance between <MathText math="X_i" /> and <MathText math="X_j" />. Can be positive, negative, or zero.</div>
                <div>• <strong>Symmetry</strong>: <MathText math="\mathbf{\Sigma} = \mathbf{\Sigma}^T" /> — because <MathText math="\text{Cov}(X_i, X_j) = \text{Cov}(X_j, X_i)" />.</div>
                <div>• <strong>Positive semi-definiteness</strong>: <MathText math="\mathbf{a}^T \mathbf{\Sigma} \mathbf{a} \geq 0" /> for all vectors <MathText math="\mathbf{a} \in \mathbb{R}^p" />. This means all eigenvalues of <MathText math="\mathbf{\Sigma}" /> are non-negative.</div>
                <div>• <strong>Computational shortcut</strong>: <MathText math="\mathbf{\Sigma} = E[\mathbf{X}\mathbf{X}^T] - \boldsymbol{\mu}\boldsymbol{\mu}^T" /></div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Covariance Under Linear Transformation</span>
              <p>If <MathText math="\mathbf{Y} = \mathbf{A}\mathbf{X} + \mathbf{b}" /> where <MathText math="\mathbf{A}" /> is a <MathText math="q \times p" /> constant matrix and <MathText math="\mathbf{b}" /> is a constant vector:</p>
              <MathText math="E[\mathbf{Y}] = \mathbf{A}\boldsymbol{\mu} + \mathbf{b}" block />
              <MathText math="\text{Cov}(\mathbf{Y}) = \mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <MathText math="\mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" />: The "sandwich" formula. The matrix <MathText math="\mathbf{A}" /> rotates and scales the covariance structure. This is the foundation of PCA (choosing <MathText math="\mathbf{A}" /> to diagonalize <MathText math="\mathbf{\Sigma}" />).</div>
                <div>• The constant shift <MathText math="\mathbf{b}" /> does not affect the covariance — shifting data does not change its spread or correlations.</div>
                <div>• <strong>Special case</strong>: For a scalar linear combination <MathText math="Y = \mathbf{a}^T\mathbf{X}" />, <MathText math="\text{Var}(Y) = \mathbf{a}^T\mathbf{\Sigma}\mathbf{a}" />.</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. Correlation Matrix</span>
              <p>The <strong>correlation matrix</strong> standardizes the covariance matrix to remove scale effects:</p>
              <MathText math="\mathbf{R} = \mathbf{D}^{-1/2}\,\mathbf{\Sigma}\,\mathbf{D}^{-1/2}, \quad \mathbf{D} = \text{diag}(\sigma_1^2, \sigma_2^2, \ldots, \sigma_p^2)" block />
              <p className="mt-2">The <MathText math="(i,j)" />-th entry of <MathText math="\mathbf{R}" /> is the Pearson correlation coefficient:</p>
              <MathText math="\rho_{ij} = \frac{\sigma_{ij}}{\sigma_i \sigma_j} \in [-1, 1]" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <MathText math="\mathbf{D}^{-1/2} = \text{diag}(1/\sigma_1, \ldots, 1/\sigma_p)" />: Divides each variable by its standard deviation, making all variables dimensionless and on the same scale.</div>
                <div>• Diagonal entries of <MathText math="\mathbf{R}" /> are always 1 (a variable is perfectly correlated with itself).</div>
                <div>• <MathText math="\mathbf{R}" /> is also symmetric and positive semi-definite.</div>
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
              <h3 className={`${fh} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Anatomy of the Covariance Matrix</h3>
              <p className="text-xs text-brandDark-400 m-0">How diagonal and off-diagonal entries shape the data cloud.</p>
            </div>
          </div>
          {open.s3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s3 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Case 1: Uncorrelated */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="80" cy="80" rx="45" ry="45" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" />
                  <ellipse cx="80" cy="80" rx="28" ry="28" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1.5" />
                  <circle cx="80" cy="80" r="4" fill="#ef4444" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">ρ = 0 (circle)</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\mathbf{\Sigma} = \begin{bmatrix} \sigma^2 & 0 \\ 0 & \sigma^2 \end{bmatrix}" />
                  <p className="mt-1">Equal variances, zero covariance → circular contours, axes-aligned.</p>
                </div>
              </div>
              {/* Case 2: Positive correlation */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="80" cy="80" rx="55" ry="25" fill="rgba(124,58,237,0.1)" stroke="#7c3aed" strokeWidth="2" transform="rotate(-35 80 80)" />
                  <ellipse cx="80" cy="80" rx="35" ry="15" fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="1.5" transform="rotate(-35 80 80)" />
                  <circle cx="80" cy="80" r="4" fill="#ef4444" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">ρ &gt; 0 (tilted ↗)</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\mathbf{\Sigma} = \begin{bmatrix} \sigma_1^2 & +\sigma_{12} \\ +\sigma_{12} & \sigma_2^2 \end{bmatrix}" />
                  <p className="mt-1">Positive covariance → ellipse tilts toward upper-right diagonal.</p>
                </div>
              </div>
              {/* Case 3: Negative correlation */}
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 160 160" className="w-40 h-40 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="80" x2="145" y2="80" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="80" y1="15" x2="80" y2="145" stroke="#94a3b8" strokeWidth="1" />
                  <ellipse cx="80" cy="80" rx="55" ry="25" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" transform="rotate(35 80 80)" />
                  <ellipse cx="80" cy="80" rx="35" ry="15" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" transform="rotate(35 80 80)" />
                  <circle cx="80" cy="80" r="4" fill="#3b82f6" />
                  <text x="80" y="155" textAnchor="middle" fontSize="9" fill="#94a3b8">ρ &lt; 0 (tilted ↘)</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400">
                  <MathText math="\mathbf{\Sigma} = \begin{bmatrix} \sigma_1^2 & -\sigma_{12} \\ -\sigma_{12} & \sigma_2^2 \end{bmatrix}" />
                  <p className="mt-1">Negative covariance → ellipse tilts toward lower-right diagonal.</p>
                </div>
              </div>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400">
              <strong>Reading the ellipses:</strong> The red dot marks the mean vector <MathText math="\boldsymbol{\mu}" />. The size of the ellipse along each axis is proportional to the standard deviation <MathText math="\sigma_i" />. The tilt angle is determined by the sign and magnitude of the covariance <MathText math="\sigma_{12}" />. The principal axes of the ellipse are the eigenvectors of <MathText math="\mathbf{\Sigma}" />, and the axis lengths are <MathText math="\sqrt{\lambda_1}" /> and <MathText math="\sqrt{\lambda_2}" />.
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
              <h3 className={`${fh} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Computing E[X] and Cov(X)</h3>
              <p className="text-xs text-brandDark-400 m-0">Step-by-step from data to matrix.</p>
            </div>
          </div>
          {open.s4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {open.s4 && (
          <div className={`p-6 ${fb} space-y-5`}>
            <p>Given <MathText math="n = 3" /> observations of a bivariate random vector <MathText math="(X_1, X_2)^T" />:</p>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse mx-auto">
                <thead>
                  <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="border border-brandDark-300 dark:border-brandDark-700 px-4 py-2">Obs.</th>
                    <th className="border border-brandDark-300 dark:border-brandDark-700 px-4 py-2"><MathText math="X_1" /></th>
                    <th className="border border-brandDark-300 dark:border-brandDark-700 px-4 py-2"><MathText math="X_2" /></th>
                  </tr>
                </thead>
                <tbody>
                  {[['1', '2', '4'], ['2', '4', '6'], ['3', '6', '8']].map(r => (
                    <tr key={r[0]}>
                      {r.map((c, i) => <td key={i} className="border border-brandDark-200 dark:border-brandDark-800 px-4 py-2 text-center">{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p><strong>Step 1 — Sample Mean Vector:</strong></p>
            <MathText math="\bar{\mathbf{x}} = \frac{1}{3}\begin{bmatrix}2+4+6\\4+6+8\end{bmatrix} = \begin{bmatrix}4\\6\end{bmatrix}" block />
            <p><strong>Step 2 — Sample Covariance Matrix:</strong></p>
            <MathText math="\mathbf{S} = \frac{1}{n-1}\sum_{i=1}^{n}(\mathbf{x}_i - \bar{\mathbf{x}})(\mathbf{x}_i - \bar{\mathbf{x}})^T" block />
            <MathText math="= \frac{1}{2}\left[\begin{bmatrix}-2\\-2\end{bmatrix}\begin{bmatrix}-2&-2\end{bmatrix} + \begin{bmatrix}0\\0\end{bmatrix}\begin{bmatrix}0&0\end{bmatrix} + \begin{bmatrix}2\\2\end{bmatrix}\begin{bmatrix}2&2\end{bmatrix}\right] = \begin{bmatrix}4&4\\4&4\end{bmatrix}" block />
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm">
              <strong>Observation:</strong> The covariance matrix has <MathText math="\sigma_{12} = 4 = \sigma_1 \sigma_2" />, giving <MathText math="\rho = 1" /> — perfect positive correlation. This makes sense because <MathText math="X_2 = X_1 + 2" /> exactly (a deterministic linear relationship). The matrix is singular (determinant = 0), meaning the data lies on a 1D line in 2D space.
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Topic4_ExpectationCovariance;
