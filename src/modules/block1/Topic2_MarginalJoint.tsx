import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic2Props {
  projectorMode?: boolean;
}

export const Topic2_MarginalJoint: React.FC<Topic2Props> = ({ projectorMode = false }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true, sec2: true, sec3: true, sec4: true,
  });
  const toggle = (id: string) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const fontBody = projectorMode ? 'text-xl leading-relaxed' : 'text-base md:text-lg';
  const fontH3 = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">

      {/* SECTION 1 — STORY */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => toggle('sec1')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl"><Sparkles size={22} /></span>
            <div>
              <h3 className={`${fontH3} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Weather Station Analogy</h3>
              <p className="text-xs text-brandDark-400 m-0">From joint observations to individual summaries.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine a weather station recording three measurements every hour: Temperature (X₁), Humidity (X₂), and Wind Speed (X₃). The joint distribution describes the probability of all three taking specific values simultaneously — like "30°C, 80% humidity, 15 km/h wind" all at once.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                But sometimes a meteorologist only cares about temperature alone, ignoring humidity and wind. They "marginalize out" the other variables — summing (or integrating) over all possible values of humidity and wind to get the standalone temperature distribution.
              </p>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Key Intuitions:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Joint distribution</strong>: The complete picture — all variables together, capturing all dependencies.</li>
                <li><strong>Marginal distribution</strong>: A "zoomed-in" view on one variable, averaging out the influence of all others.</li>
                <li><strong>Why it matters</strong>: In a 50-variable dataset, you can't visualize everything at once. Marginals let you study each variable's behavior independently.</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2 — MATHEMATICAL MODELLING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => toggle('sec2')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-xl"><Calculator size={22} /></span>
            <div>
              <h3 className={`${fontH3} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: Equations & Term Breakdown</h3>
              <p className="text-xs text-brandDark-400 m-0">Joint density, marginal density, and their relationship.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec2 && (
          <div className={`p-6 ${fontBody} space-y-8`}>

            {/* A. Joint Distribution */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. Joint Probability Density Function</span>
              <p>For a random vector <MathText math="\mathbf{X} = (X_1, X_2, \ldots, X_p)^T" />, the <strong>joint density</strong> assigns a probability density to every simultaneous combination of values:</p>
              <MathText math="f_{\mathbf{X}}(\mathbf{x}) = f_{X_1, X_2, \ldots, X_p}(x_1, x_2, \ldots, x_p)" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="f_{\mathbf{X}}(\mathbf{x})" />: The joint density evaluated at the point <MathText math="\mathbf{x} = (x_1, \ldots, x_p)^T" />. This is a scalar value — the "height" of the probability surface at that point.</div>
                <div>• <MathText math="x_i" />: A specific realized value of the <MathText math="i" />-th random variable <MathText math="X_i" />.</div>
                <div>• The joint density must satisfy: <MathText math="\int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} f_{\mathbf{X}}(\mathbf{x})\, dx_1 \cdots dx_p = 1" /></div>
                <div>• For any region <MathText math="A \subseteq \mathbb{R}^p" />: <MathText math="P(\mathbf{X} \in A) = \int_A f_{\mathbf{X}}(\mathbf{x})\, d\mathbf{x}" /></div>
              </div>
            </div>

            {/* B. Marginal Distribution */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Marginal Density of a Single Component</span>
              <p>To obtain the marginal density of <MathText math="X_i" /> alone, integrate out (marginalize over) all other variables:</p>
              <MathText math="f_{X_i}(x_i) = \int_{-\infty}^{\infty} \cdots \int_{-\infty}^{\infty} f_{\mathbf{X}}(x_1, \ldots, x_p)\, dx_1 \cdots dx_{i-1}\, dx_{i+1} \cdots dx_p" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="f_{X_i}(x_i)" />: The marginal density of <MathText math="X_i" /> — the probability density of the <MathText math="i" />-th variable ignoring all others.</div>
                <div>• The multiple integral <MathText math="\int \cdots \int (\cdot)\, dx_1 \cdots dx_{i-1}\, dx_{i+1} \cdots dx_p" />: Sums (integrates) over every possible combination of the remaining <MathText math="p-1" /> variables, collapsing the <MathText math="p" />-dimensional density down to a 1-dimensional one.</div>
                <div>• <strong>Intuition</strong>: Think of "projecting" the full <MathText math="p" />-dimensional probability cloud onto the <MathText math="X_i" /> axis.</div>
              </div>
            </div>

            {/* C. Marginal of a Sub-vector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Marginal Density of a Sub-vector</span>
              <p>Partition <MathText math="\mathbf{X}" /> into two sub-vectors: <MathText math="\mathbf{X}_1 = (X_1, \ldots, X_q)^T" /> and <MathText math="\mathbf{X}_2 = (X_{q+1}, \ldots, X_p)^T" />. The marginal density of <MathText math="\mathbf{X}_1" /> is:</p>
              <MathText math="f_{\mathbf{X}_1}(\mathbf{x}_1) = \int_{\mathbb{R}^{p-q}} f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2)\, d\mathbf{x}_2" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <MathText math="\mathbf{x}_1 \in \mathbb{R}^q" />: A specific realization of the first sub-vector (the <MathText math="q" /> variables we care about).</div>
                <div>• <MathText math="\int_{\mathbb{R}^{p-q}} (\cdot)\, d\mathbf{x}_2" />: Integration over the entire <MathText math="(p-q)" />-dimensional space of the nuisance variables <MathText math="\mathbf{X}_2" />.</div>
                <div>• <strong>Key property</strong>: The marginal of a multivariate normal sub-vector is itself multivariate normal — a powerful closure property.</div>
              </div>
            </div>

            {/* D. Joint vs Marginal for Bivariate Case */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. Bivariate Case — Explicit Formula</span>
              <p>For two variables <MathText math="(X_1, X_2)" />, the marginals are obtained by single integration:</p>
              <MathText math="f_{X_1}(x_1) = \int_{-\infty}^{\infty} f_{X_1, X_2}(x_1, x_2)\, dx_2" block />
              <MathText math="f_{X_2}(x_2) = \int_{-\infty}^{\infty} f_{X_1, X_2}(x_1, x_2)\, dx_1" block />
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm text-amber-800 dark:text-amber-300 mt-3">
                <strong>Critical Insight:</strong> Knowing both marginals <MathText math="f_{X_1}" /> and <MathText math="f_{X_2}" /> does <em>not</em> uniquely determine the joint <MathText math="f_{X_1, X_2}" />. The joint contains additional information about the <strong>dependence structure</strong> (captured by the covariance/correlation). This is why we need the full joint distribution for multivariate analysis.
              </div>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 3 — VISUAL ILLUSTRATION */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => toggle('sec3')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl"><BookOpen size={22} /></span>
            <div>
              <h3 className={`${fontH3} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Projection onto Axes</h3>
              <p className="text-xs text-brandDark-400 m-0">How marginalization collapses a 2D density to 1D.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec3 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* SVG Illustration */}
              <div className="flex justify-center">
                <svg viewBox="0 0 320 300" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                  {/* Axes */}
                  <line x1="40" y1="260" x2="290" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
                  <line x1="40" y1="260" x2="40" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
                  <text x="295" y="264" fontSize="11" fill="#94a3b8">X₁</text>
                  <text x="28" y="16" fontSize="11" fill="#94a3b8">X₂</text>

                  {/* Joint density ellipse (contours) */}
                  <ellipse cx="165" cy="150" rx="70" ry="45" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" transform="rotate(-20 165 150)" />
                  <ellipse cx="165" cy="150" rx="45" ry="28" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.5" transform="rotate(-20 165 150)" />
                  <ellipse cx="165" cy="150" rx="22" ry="14" fill="rgba(124,58,237,0.2)" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" transform="rotate(-20 165 150)" />
                  <text x="200" y="120" fontSize="10" fill="#7c3aed" fontWeight="bold">Joint f(x₁,x₂)</text>

                  {/* Projection lines to X1 axis (marginal of X1) */}
                  <line x1="100" y1="260" x2="100" y2="200" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                  <line x1="165" y1="260" x2="165" y2="200" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                  <line x1="230" y1="260" x2="230" y2="200" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

                  {/* Marginal of X1 (bell curve on X1 axis) */}
                  <path d="M 80,260 Q 100,230 130,225 Q 165,218 200,225 Q 230,230 250,260" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="2" />
                  <text x="148" y="215" fontSize="9" fill="#3b82f6" fontWeight="bold">f(x₁) — marginal</text>

                  {/* Projection lines to X2 axis (marginal of X2) */}
                  <line x1="40" y1="110" x2="100" y2="110" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                  <line x1="40" y1="150" x2="100" y2="150" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                  <line x1="40" y1="190" x2="100" y2="190" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

                  {/* Marginal of X2 (bell curve on X2 axis) */}
                  <path d="M 40,80 Q 55,100 58,130 Q 60,150 58,170 Q 55,200 40,220" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2" />
                  <text x="2" y="75" fontSize="9" fill="#10b981" fontWeight="bold">f(x₂)</text>
                  <text x="2" y="86" fontSize="9" fill="#10b981" fontWeight="bold">marginal</text>

                  <defs>
                    <marker id="arrowGray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Annotation Legend */}
              <div className="space-y-4 text-sm">
                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the Diagram:</h4>
                <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Purple ellipses</strong>: Contours of the joint density <MathText math="f(x_1, x_2)" />. Each ellipse is a level set where the density is constant. The innermost ellipse has the highest density.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Blue curve (bottom)</strong>: The marginal <MathText math="f_{X_1}(x_1)" /> — obtained by projecting (integrating) the joint density down onto the <MathText math="X_1" /> axis. The dashed lines show this "collapsing" operation.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Green curve (left)</strong>: The marginal <MathText math="f_{X_2}(x_2)" /> — obtained by projecting the joint density onto the <MathText math="X_2" /> axis.</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-amber-800 dark:text-amber-300 text-xs">
                    <strong>Notice:</strong> The tilt of the ellipse (non-zero covariance) is <em>lost</em> in both marginals. The marginals are symmetric bell curves regardless of the correlation. This is why marginals alone cannot tell you about dependence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 — WORKED EXAMPLE */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => toggle('sec4')} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl"><HelpCircle size={22} /></span>
            <div>
              <h3 className={`${fontH3} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Bivariate Normal Marginals</h3>
              <p className="text-xs text-brandDark-400 m-0">Deriving marginals from a bivariate normal joint density.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec4 && (
          <div className={`p-6 ${fontBody} space-y-5`}>
            <p>Let <MathText math="(X_1, X_2)^T \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma})" /> with:</p>
            <MathText math="\boldsymbol{\mu} = \begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}, \quad \mathbf{\Sigma} = \begin{bmatrix} \sigma_1^2 & \rho\sigma_1\sigma_2 \\ \rho\sigma_1\sigma_2 & \sigma_2^2 \end{bmatrix}" block />

            <p><strong>Result:</strong> The marginal distribution of <MathText math="X_1" /> is:</p>
            <MathText math="X_1 \sim N(\mu_1,\, \sigma_1^2)" block />
            <p>and the marginal of <MathText math="X_2" /> is:</p>
            <MathText math="X_2 \sim N(\mu_2,\, \sigma_2^2)" block />

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
              <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Why this works — the integration step:</div>
              <div>Starting from the bivariate normal density and integrating over <MathText math="x_2" />:</div>
              <MathText math="f_{X_1}(x_1) = \int_{-\infty}^{\infty} \frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}} \exp\!\left(-\frac{Q}{2(1-\rho^2)}\right) dx_2" block />
              <div>where <MathText math="Q = \frac{(x_1-\mu_1)^2}{\sigma_1^2} - \frac{2\rho(x_1-\mu_1)(x_2-\mu_2)}{\sigma_1\sigma_2} + \frac{(x_2-\mu_2)^2}{\sigma_2^2}" />.</div>
              <div className="mt-2">Completing the square in <MathText math="x_2" /> and using the Gaussian integral <MathText math="\int_{-\infty}^{\infty} e^{-ax^2}\,dx = \sqrt{\pi/a}" />, the <MathText math="x_2" />-dependent terms integrate to 1, leaving exactly the univariate normal density in <MathText math="x_1" />.</div>
              <div className="mt-2 text-primary-600 dark:text-primary-400 font-bold">Key takeaway: For multivariate normal, marginals are obtained simply by reading off the corresponding entries of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />.</div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Topic2_MarginalJoint;
