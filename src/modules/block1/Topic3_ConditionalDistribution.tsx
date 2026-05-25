import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic3Props {
  projectorMode?: boolean;
}

export const Topic3_ConditionalDistribution: React.FC<Topic3Props> = ({ projectorMode = false }) => {
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
              <h3 className={`${fontH3} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Doctor's Diagnosis</h3>
              <p className="text-xs text-brandDark-400 m-0">Conditional thinking in everyday decisions.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                A doctor measures three things for each patient: Blood Pressure (X₁), Cholesterol (X₂), and Blood Sugar (X₃). The joint distribution describes all three together. But when a patient walks in and the doctor already knows their blood pressure is high (X₁ = 160 mmHg), the question changes: "Given this blood pressure, what is the distribution of cholesterol and blood sugar?"
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                This is the conditional distribution — the joint distribution "sliced" at a known value of one variable. The slice is no longer the full ellipsoid; it's a cross-section through it.
              </p>
            </div>
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Independence vs. Dependence:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If blood pressure and cholesterol are <strong>independent</strong>, knowing BP tells you nothing new about cholesterol — the conditional equals the marginal.</li>
                <li>If they are <strong>dependent</strong> (correlated), knowing BP shifts and reshapes the distribution of cholesterol.</li>
                <li>Independence is the special case where the joint density <em>factorizes</em> into a product of marginals.</li>
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
              <p className="text-xs text-brandDark-400 m-0">Conditional density formula and independence criterion.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec2 && (
          <div className={`p-6 ${fontBody} space-y-8`}>

            {/* A. Conditional Density */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. Conditional Density of X given Y</span>
              <p>Partition the random vector as <MathText math="\mathbf{X} = (\mathbf{X}_1^T, \mathbf{X}_2^T)^T" />. The conditional density of <MathText math="\mathbf{X}_1" /> given <MathText math="\mathbf{X}_2 = \mathbf{x}_2" /> is:</p>
              <MathText math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) = \frac{f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2)}{f_{\mathbf{X}_2}(\mathbf{x}_2)}" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                <div>• <MathText math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2)" />: The conditional density — the probability density of <MathText math="\mathbf{X}_1" /> taking value <MathText math="\mathbf{x}_1" />, given that we have observed <MathText math="\mathbf{X}_2 = \mathbf{x}_2" />.</div>
                <div>• <MathText math="f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2)" />: The joint density evaluated at the specific pair <MathText math="(\mathbf{x}_1, \mathbf{x}_2)" /> — the numerator is the "slice" of the joint at the observed <MathText math="\mathbf{x}_2" />.</div>
                <div>• <MathText math="f_{\mathbf{X}_2}(\mathbf{x}_2)" />: The marginal density of <MathText math="\mathbf{X}_2" /> at the observed value — the denominator normalizes the slice so it integrates to 1.</div>
                <div>• <strong>Geometric meaning</strong>: Take the joint density surface, cut it with a vertical hyperplane at <MathText math="\mathbf{X}_2 = \mathbf{x}_2" />, and rescale the cross-section to be a valid density.</div>
              </div>
            </div>

            {/* B. Independence */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Independence of Random Vectors</span>
              <p><MathText math="\mathbf{X}_1" /> and <MathText math="\mathbf{X}_2" /> are <strong>independent</strong> if and only if their joint density factorizes:</p>
              <MathText math="f_{\mathbf{X}_1, \mathbf{X}_2}(\mathbf{x}_1, \mathbf{x}_2) = f_{\mathbf{X}_1}(\mathbf{x}_1) \cdot f_{\mathbf{X}_2}(\mathbf{x}_2) \quad \text{for all } \mathbf{x}_1, \mathbf{x}_2" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Consequences of Independence:</div>
                <div>• The conditional equals the marginal: <MathText math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) = f_{\mathbf{X}_1}(\mathbf{x}_1)" /> — knowing <MathText math="\mathbf{X}_2" /> gives no information about <MathText math="\mathbf{X}_1" />.</div>
                <div>• For multivariate normal: independence <MathText math="\Leftrightarrow" /> zero covariance. That is, <MathText math="\mathbf{X}_1 \perp \mathbf{X}_2 \Leftrightarrow \mathbf{\Sigma}_{12} = \mathbf{0}" />.</div>
                <div>• <strong>Warning</strong>: Zero covariance implies independence <em>only</em> for the multivariate normal. For general distributions, zero covariance does not guarantee independence.</div>
              </div>
            </div>

            {/* C. Conditional Mean and Variance */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Conditional Expectation and Variance</span>
              <p>The conditional expectation of <MathText math="\mathbf{X}_1" /> given <MathText math="\mathbf{X}_2 = \mathbf{x}_2" />:</p>
              <MathText math="E[\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2] = \int \mathbf{x}_1\, f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2)\, d\mathbf{x}_1" block />
              <p className="mt-4">The conditional covariance matrix:</p>
              <MathText math="\text{Cov}(\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2) = E\!\left[(\mathbf{X}_1 - E[\mathbf{X}_1|\mathbf{X}_2])(\mathbf{X}_1 - E[\mathbf{X}_1|\mathbf{X}_2])^T \mid \mathbf{X}_2 = \mathbf{x}_2\right]" block />
              <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                <div>• <strong>Law of Total Expectation</strong>: <MathText math="E[\mathbf{X}_1] = E_{\mathbf{X}_2}[E[\mathbf{X}_1 \mid \mathbf{X}_2]]" /> — the unconditional mean is the average of conditional means.</div>
                <div>• <strong>Law of Total Variance</strong>: <MathText math="\text{Cov}(\mathbf{X}_1) = E[\text{Cov}(\mathbf{X}_1|\mathbf{X}_2)] + \text{Cov}(E[\mathbf{X}_1|\mathbf{X}_2])" /> — total variance = average within-group variance + between-group variance.</div>
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
              <h3 className={`${fontH3} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Slicing the Joint Density</h3>
              <p className="text-xs text-brandDark-400 m-0">Conditional distribution as a vertical cross-section.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec3 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <svg viewBox="0 0 320 300" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                  {/* Axes */}
                  <line x1="40" y1="260" x2="290" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag2)" />
                  <line x1="40" y1="260" x2="40" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag2)" />
                  <text x="295" y="264" fontSize="11" fill="#94a3b8">X₁</text>
                  <text x="28" y="16" fontSize="11" fill="#94a3b8">X₂</text>

                  {/* Joint density ellipses */}
                  <ellipse cx="165" cy="150" rx="80" ry="50" fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" transform="rotate(-25 165 150)" />
                  <ellipse cx="165" cy="150" rx="50" ry="32" fill="rgba(124,58,237,0.10)" stroke="rgba(124,58,237,0.55)" strokeWidth="1.5" transform="rotate(-25 165 150)" />
                  <ellipse cx="165" cy="150" rx="25" ry="16" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.75)" strokeWidth="1.5" transform="rotate(-25 165 150)" />

                  {/* Conditioning line: X2 = x2* */}
                  <line x1="40" y1="130" x2="290" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="245" y="125" fontSize="10" fill="#ef4444" fontWeight="bold">X₂ = x₂*</text>

                  {/* Conditional density cross-section (bell curve along X1 at X2=x2*) */}
                  <path d="M 80,130 Q 110,90 145,82 Q 165,78 185,82 Q 220,90 250,130" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2.5" />
                  <text x="148" y="72" fontSize="9" fill="#3b82f6" fontWeight="bold">f(x₁|X₂=x₂*)</text>

                  {/* Conditional mean marker */}
                  <line x1="165" y1="130" x2="165" y2="78" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="165" cy="130" r="4" fill="#3b82f6" />
                  <text x="168" y="145" fontSize="9" fill="#3b82f6">E[X₁|X₂=x₂*]</text>

                  <defs>
                    <marker id="ag2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                </svg>
              </div>

              <div className="space-y-4 text-sm">
                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the Diagram:</h4>
                <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Purple ellipses</strong>: Contours of the joint density <MathText math="f(x_1, x_2)" />. The tilt reflects positive correlation between <MathText math="X_1" /> and <MathText math="X_2" />.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Red dashed line</strong>: The conditioning event <MathText math="X_2 = x_2^*" /> — a horizontal slice through the joint density at a fixed value of <MathText math="X_2" />.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                    <div><strong>Blue curve</strong>: The conditional density <MathText math="f(x_1 | X_2 = x_2^*)" /> — the cross-section of the joint density along the red line, rescaled to integrate to 1. Notice it is shifted right (the conditional mean is higher than the unconditional mean) because of positive correlation.</div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs">
                    <strong>Key insight:</strong> The conditional distribution is narrower than the marginal — conditioning on <MathText math="X_2" /> reduces uncertainty about <MathText math="X_1" />. This reduction in variance is quantified by the Schur complement formula.
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
              <h3 className={`${fontH3} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Conditional Normal</h3>
              <p className="text-xs text-brandDark-400 m-0">Explicit conditional mean and variance for bivariate normal.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {openSections.sec4 && (
          <div className={`p-6 ${fontBody} space-y-5`}>
            <p>For <MathText math="(X_1, X_2)^T \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma})" />, the conditional distribution of <MathText math="X_1" /> given <MathText math="X_2 = x_2" /> is:</p>
            <MathText math="X_1 \mid X_2 = x_2 \;\sim\; N\!\left(\mu_1 + \frac{\sigma_{12}}{\sigma_2^2}(x_2 - \mu_2),\;\; \sigma_1^2 - \frac{\sigma_{12}^2}{\sigma_2^2}\right)" block />

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-3">
              <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Decoding Each Term:</div>
              <div>• <strong>Conditional Mean</strong> <MathText math="\mu_{1|2} = \mu_1 + \frac{\sigma_{12}}{\sigma_2^2}(x_2 - \mu_2)" />:</div>
              <div className="pl-4 space-y-1 text-brandDark-600 dark:text-brandDark-400">
                <div>— <MathText math="\mu_1" />: The unconditional mean of <MathText math="X_1" /> (starting point).</div>
                <div>— <MathText math="\frac{\sigma_{12}}{\sigma_2^2}" />: The regression coefficient of <MathText math="X_1" /> on <MathText math="X_2" /> — how much <MathText math="X_1" /> shifts per unit change in <MathText math="X_2" />.</div>
                <div>— <MathText math="(x_2 - \mu_2)" />: The deviation of the observed <MathText math="X_2" /> from its mean — the "signal" we condition on.</div>
                <div>— If <MathText math="\sigma_{12} = 0" /> (independence): <MathText math="\mu_{1|2} = \mu_1" /> — conditioning changes nothing.</div>
              </div>
              <div>• <strong>Conditional Variance</strong> <MathText math="\sigma_{1|2}^2 = \sigma_1^2 - \frac{\sigma_{12}^2}{\sigma_2^2}" />:</div>
              <div className="pl-4 space-y-1 text-brandDark-600 dark:text-brandDark-400">
                <div>— <MathText math="\sigma_1^2" />: The unconditional variance of <MathText math="X_1" />.</div>
                <div>— <MathText math="\frac{\sigma_{12}^2}{\sigma_2^2} = \rho^2 \sigma_1^2" />: The variance <em>explained</em> by knowing <MathText math="X_2" />. This is always non-negative, so conditioning always reduces (or maintains) variance.</div>
                <div>— <strong>Schur complement</strong>: This formula is the scalar version of the matrix Schur complement <MathText math="\mathbf{\Sigma}_{11} - \mathbf{\Sigma}_{12}\mathbf{\Sigma}_{22}^{-1}\mathbf{\Sigma}_{21}" />, which appears in the multivariate case.</div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm">
              <strong>Numerical Example:</strong> Let <MathText math="\mu_1 = 170\text{ cm}" />, <MathText math="\mu_2 = 70\text{ kg}" />, <MathText math="\sigma_1^2 = 100" />, <MathText math="\sigma_2^2 = 225" />, <MathText math="\sigma_{12} = 120" />. If we observe weight <MathText math="x_2 = 80\text{ kg}" />:
              <MathText math="\mu_{1|2} = 170 + \frac{120}{225}(80 - 70) = 170 + 5.33 = 175.33\text{ cm}" block />
              <MathText math="\sigma_{1|2}^2 = 100 - \frac{120^2}{225} = 100 - 64 = 36 \implies \sigma_{1|2} = 6\text{ cm}" block />
              Knowing the person weighs 80 kg shifts our height estimate up by 5.33 cm and reduces height uncertainty from 10 cm to 6 cm.
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Topic3_ConditionalDistribution;
