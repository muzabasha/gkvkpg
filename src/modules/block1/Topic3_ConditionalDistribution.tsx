import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';
import { Lab3_Conditional } from '../../components/labs/Lab3_Conditional';

interface Topic3Props { projectorMode?: boolean; }

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

export const Topic3_ConditionalDistribution: React.FC<Topic3Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true, s5: true });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

  return (
    <div className="space-y-8 pb-16">

      {/* §1 Motivation */}
      <Sec open={open.s1} toggle={() => tog('s1')}
        icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        title="§1 — Motivation: The Doctor's Diagnosis" sub="Conditional thinking in everyday decisions">
        <div className={`${fb} space-y-4`}>
          <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
            <p className="italic text-brandDark-700 dark:text-brandDark-300">
              A doctor measures Blood Pressure <MathText math="X_1" />, Cholesterol <MathText math="X_2" />, and Blood Sugar <MathText math="X_3" />.
              When a patient walks in with known blood pressure <MathText math="X_1 = 160\,\text{mmHg}" />, the question becomes:
              "Given this blood pressure, what is the distribution of cholesterol and blood sugar?"
              This is the <strong>conditional distribution</strong> — the joint density "sliced" at a known value.
            </p>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Independence vs. Dependence</p>
            <ul className="list-disc pl-5 space-y-1 text-brandDark-600 dark:text-brandDark-400">
              <li>If BP and cholesterol are <strong>independent</strong>, knowing BP tells you nothing new — the conditional equals the marginal.</li>
              <li>If they are <strong>dependent</strong>, knowing BP shifts and reshapes the distribution of cholesterol.</li>
              <li>Independence is the special case where the joint density <em>factorises</em> into a product of marginals.</li>
            </ul>
          </div>
        </div>
      </Sec>

      {/* §2 Equations */}
      <Sec open={open.s2} toggle={() => tog('s2')}
        icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        title="§2 — Equations with Term-by-Term Breakdown" sub="Conditional density, independence, conditional expectation and variance">

        {/* 3.1 Conditional density */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">3.1 Conditional Density</h4>
          <p className={fb}>Partition <MathText math="\mathbf{X} = (\mathbf{X}_1^T, \mathbf{X}_2^T)^T" />. The conditional density of <MathText math="\mathbf{X}_1" /> given <MathText math="\mathbf{X}_2 = \mathbf{x}_2" /> is:</p>
          <Eq n="3.1" math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) \;=\; \frac{f_{\mathbf{X}_1,\,\mathbf{X}_2}(\mathbf{x}_1,\,\mathbf{x}_2)}{f_{\mathbf{X}_2}(\mathbf{x}_2)}" label="Conditional density" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2)" meaning={<>The conditional density — probability density of <MathText math="\mathbf{X}_1 = \mathbf{x}_1" /> given we have observed <MathText math="\mathbf{X}_2 = \mathbf{x}_2" />.</>} />
                <Term sym="f_{\mathbf{X}_1,\mathbf{X}_2}(\mathbf{x}_1,\mathbf{x}_2)" meaning="The joint density evaluated at the specific pair — the numerator is the 'slice' of the joint at the observed x₂." />
                <Term sym="f_{\mathbf{X}_2}(\mathbf{x}_2)" meaning="The marginal density of X₂ at the observed value — the denominator normalises the slice so it integrates to 1." />
              </tbody>
            </table>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-3 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400">
            <strong>Geometric meaning:</strong> Take the joint density surface, cut it with a vertical hyperplane at <MathText math="\mathbf{X}_2 = \mathbf{x}_2" />, and rescale the cross-section to be a valid density.
          </div>
        </div>

        {/* 3.2 Independence */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">3.2 Independence of Random Vectors</h4>
          <p className={fb}><MathText math="\mathbf{X}_1" /> and <MathText math="\mathbf{X}_2" /> are <strong>independent</strong> if and only if:</p>
          <Eq n="3.2" math="f_{\mathbf{X}_1,\,\mathbf{X}_2}(\mathbf{x}_1,\,\mathbf{x}_2) \;=\; f_{\mathbf{X}_1}(\mathbf{x}_1)\cdot f_{\mathbf{X}_2}(\mathbf{x}_2) \quad \forall\,\mathbf{x}_1,\mathbf{x}_2" label="Independence criterion" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="f_{\mathbf{X}_1}(\mathbf{x}_1)\cdot f_{\mathbf{X}_2}(\mathbf{x}_2)" meaning="Product of marginals — the joint density factorises into a product, meaning the two sub-vectors carry no information about each other." />
                <Term sym="\forall\,\mathbf{x}_1,\mathbf{x}_2" meaning="The factorisation must hold for every point in the joint space — not just at the mean or at specific values." />
              </tbody>
            </table>
          </div>
          <p className={`${fb} text-sm`}>Consequences of independence:</p>
          <Eq n="3.3" math="f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2) \;=\; f_{\mathbf{X}_1}(\mathbf{x}_1)" label="Conditional = marginal under independence" />
          <Eq n="3.4" math="\mathbf{X}_1 \perp \mathbf{X}_2 \;\Longleftrightarrow\; \mathbf{\Sigma}_{12} = \mathbf{0} \quad \text{(for MVN only)}" label="MVN independence criterion" />
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <strong>Warning (Eq. 3.4):</strong> Zero covariance implies independence <em>only</em> for the multivariate normal. For general distributions, zero covariance does not guarantee independence.
          </div>
        </div>

        {/* 3.3 Conditional expectation and variance */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">3.3 Conditional Expectation and Variance</h4>
          <Eq n="3.5" math="E[\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2] \;=\; \int \mathbf{x}_1\; f_{\mathbf{X}_1 \mid \mathbf{X}_2}(\mathbf{x}_1 \mid \mathbf{x}_2)\; d\mathbf{x}_1" label="Conditional mean" />
          <Eq n="3.6" math="\text{Cov}(\mathbf{X}_1 \mid \mathbf{X}_2) \;=\; E\!\left[(\mathbf{X}_1 - E[\mathbf{X}_1|\mathbf{X}_2])(\mathbf{X}_1 - E[\mathbf{X}_1|\mathbf{X}_2])^T \mid \mathbf{X}_2\right]" label="Conditional covariance" />
          <Eq n="3.7" math="E[\mathbf{X}_1] \;=\; E_{\mathbf{X}_2}\!\left[E[\mathbf{X}_1 \mid \mathbf{X}_2]\right]" label="Law of Total Expectation" />
          <Eq n="3.8" math="\text{Cov}(\mathbf{X}_1) \;=\; E\!\left[\text{Cov}(\mathbf{X}_1|\mathbf{X}_2)\right] \;+\; \text{Cov}\!\left(E[\mathbf{X}_1|\mathbf{X}_2]\right)" label="Law of Total Variance" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="E[\mathbf{X}_1 \mid \mathbf{X}_2 = \mathbf{x}_2]" meaning="The conditional mean — the expected value of X₁ after observing X₂. This is a function of the observed value x₂." />
                <Term sym="E_{\mathbf{X}_2}[\cdot]" meaning="Expectation over the distribution of X₂ — averages the conditional mean over all possible values of X₂." />
                <Term sym="E[\text{Cov}(\mathbf{X}_1|\mathbf{X}_2)]" meaning="Average within-group variance — the expected conditional variance (unexplained variation)." />
                <Term sym="\text{Cov}(E[\mathbf{X}_1|\mathbf{X}_2])" meaning="Between-group variance — variance of the conditional mean (explained variation due to X₂)." />
              </tbody>
            </table>
          </div>
        </div>
      </Sec>

      {/* §3 Illustration */}
      <Sec open={open.s3} toggle={() => tog('s3')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§3 — Illustration: Slicing the Joint Density" sub="Conditional distribution as a vertical cross-section of the joint">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center">
            <svg viewBox="0 0 340 310" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
              {/* Axes */}
              <line x1="50" y1="265" x2="310" y2="265" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a3g)" />
              <line x1="50" y1="265" x2="50" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a3g)" />
              <text x="315" y="269" fontSize="12" fill="#94a3b8" fontWeight="bold">X₁</text>
              <text x="36" y="16" fontSize="12" fill="#94a3b8" fontWeight="bold">X₂</text>

              {/* Joint density contours */}
              <ellipse cx="180" cy="155" rx="90" ry="52" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.30)" strokeWidth="1.5" transform="rotate(-28 180 155)" />
              <ellipse cx="180" cy="155" rx="58" ry="33" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.50)" strokeWidth="1.5" transform="rotate(-28 180 155)" />
              <ellipse cx="180" cy="155" rx="30" ry="17" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.80)" strokeWidth="2" transform="rotate(-28 180 155)" />
              <text x="248" y="108" fontSize="9" fill="#7c3aed" fontWeight="bold">f(x₁,x₂) — Eq.(2.1)</text>

              {/* Conditioning line X₂ = x₂* */}
              <line x1="50" y1="128" x2="310" y2="128" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="7 4" />
              <text x="255" y="122" fontSize="10" fill="#ef4444" fontWeight="bold">X₂ = x₂*</text>
              <text x="255" y="133" fontSize="8" fill="#ef4444">conditioning event</text>

              {/* Conditional density bell curve along the slice */}
              <path d="M 90,128 Q 125,88 158,80 Q 180,76 202,80 Q 235,88 270,128"
                fill="rgba(59,130,246,0.18)" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="148" y="70" fontSize="9" fill="#3b82f6" fontWeight="bold">f(x₁|X₂=x₂*) — Eq.(3.1)</text>

              {/* Conditional mean marker */}
              <line x1="180" y1="128" x2="180" y2="76" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="180" cy="128" r="5" fill="#3b82f6" />
              <text x="184" y="145" fontSize="9" fill="#3b82f6">E[X₁|X₂=x₂*]</text>

              {/* Unconditional mean */}
              <circle cx="180" cy="155" r="5" fill="#ef4444" />
              <text x="184" y="168" fontSize="9" fill="#ef4444">μ₁ (unconditional)</text>

              {/* Shift arrow */}
              <line x1="180" y1="152" x2="180" y2="132" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#a3y)" />
              <text x="185" y="143" fontSize="8" fill="#f59e0b">shift due to ρ</text>

              <defs>
                <marker id="a3g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                <marker id="a3y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" /></marker>
              </defs>
            </svg>
          </div>
          <div className="space-y-4 text-sm">
            <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the diagram</h4>
            <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                <div><strong>Purple ellipses</strong> — contours of the joint density <MathText math="f(x_1,x_2)" /> (Eq. 2.1). Tilt reflects positive correlation.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                <div><strong>Red dashed line</strong> — the conditioning event <MathText math="X_2 = x_2^*" />. A horizontal slice through the joint density at a fixed value of <MathText math="X_2" />.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                <div><strong>Blue curve</strong> — the conditional density <MathText math="f(x_1|X_2=x_2^*)" /> (Eq. 3.1). The cross-section of the joint density along the red line, rescaled to integrate to 1. Notice it is <em>narrower</em> than the marginal — conditioning reduces uncertainty.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                <div><strong>Amber arrow</strong> — the shift in the conditional mean relative to the unconditional mean <MathText math="\mu_1" />. This shift is proportional to <MathText math="\rho" /> (Eq. 3.9 below).</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                <strong>Key insight:</strong> The conditional distribution is narrower than the marginal — conditioning on <MathText math="X_2" /> reduces uncertainty about <MathText math="X_1" />. This reduction in variance is quantified by the Schur complement (Eq. 3.10).
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* §4 Worked Example */}
      <Sec open={open.s4} toggle={() => tog('s4')}
        icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        title="§4 — Worked Example: Conditional Normal Distribution" sub="Explicit conditional mean and variance for bivariate normal">
        <div className={`${fb} space-y-4`}>
          <p>For <MathText math="(X_1, X_2)^T \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma})" />, the conditional distribution of <MathText math="X_1" /> given <MathText math="X_2 = x_2" /> is:</p>
          <Eq n="3.9" math="X_1 \mid X_2 = x_2 \;\sim\; N\!\left(\mu_{1|2},\;\sigma_{1|2}^2\right)" label="Conditional distribution" />
          <p>where the conditional mean and variance are:</p>
          <Eq n="3.10" math="\mu_{1|2} \;=\; \mu_1 \;+\; \frac{\sigma_{12}}{\sigma_2^2}(x_2 - \mu_2)" label="Conditional mean" />
          <Eq n="3.11" math="\sigma_{1|2}^2 \;=\; \sigma_1^2 \;-\; \frac{\sigma_{12}^2}{\sigma_2^2} \;=\; \sigma_1^2(1 - \rho^2)" label="Conditional variance (Schur complement)" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-44">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mu_1" meaning="The unconditional mean of X₁ — the starting point before any conditioning." />
                <Term sym="\frac{\sigma_{12}}{\sigma_2^2}" meaning="The regression coefficient of X₁ on X₂ — how much the conditional mean of X₁ shifts per unit increase in X₂." />
                <Term sym="(x_2 - \mu_2)" meaning="The deviation of the observed X₂ from its mean — the 'signal' we condition on. Zero deviation → no shift in the conditional mean." />
                <Term sym="\sigma_1^2 - \frac{\sigma_{12}^2}{\sigma_2^2}" meaning="The Schur complement — the conditional variance. Always ≤ σ₁² because conditioning always reduces (or maintains) variance." />
                <Term sym="\sigma_1^2(1-\rho^2)" meaning="Alternative form: the fraction of variance in X₁ not explained by X₂. When ρ=0, full variance remains; when |ρ|=1, variance collapses to 0." />
              </tbody>
            </table>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm">
            <strong>Numerical example:</strong> Let <MathText math="\mu_1 = 170\,\text{cm}" />, <MathText math="\mu_2 = 70\,\text{kg}" />, <MathText math="\sigma_1^2 = 100" />, <MathText math="\sigma_2^2 = 225" />, <MathText math="\sigma_{12} = 120" />. Observe weight <MathText math="x_2 = 80\,\text{kg}" />:
            <Eq n="3.12" math="\mu_{1|2} = 170 + \frac{120}{225}(80-70) = 170 + 5.33 = 175.33\,\text{cm}" label="Conditional mean (numerical)" />
            <Eq n="3.13" math="\sigma_{1|2}^2 = 100 - \frac{120^2}{225} = 100 - 64 = 36 \;\Rightarrow\; \sigma_{1|2} = 6\,\text{cm}" label="Conditional std dev (numerical)" />
            Knowing the person weighs 80 kg shifts our height estimate up by 5.33 cm and reduces height uncertainty from 10 cm to 6 cm.
          </div>
        </div>
      </Sec>


      {/* §5 — Virtual Interactive Laboratory */}
      <Sec open={open.s5} toggle={() => tog('s5')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§5 — Virtual Interactive Laboratory" sub="Animate the conditioning slice and watch the conditional distribution form">
        <Lab3_Conditional />
      </Sec>

    </div>
  );
};

export default Topic3_ConditionalDistribution;
