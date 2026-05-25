import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic2Props { projectorMode?: boolean; }

/* ─── Reusable sub-components ─────────────────────────────────────────────── */

/** Numbered equation block */
const Eq: React.FC<{ n: string; math: string; label?: string }> = ({ n, math, label }) => (
  <div className="my-4 flex items-center gap-3">
    <div className="flex-1 overflow-x-auto">
      <MathText math={math} block />
    </div>
    <span className="text-xs font-mono text-brandDark-400 dark:text-brandDark-500 whitespace-nowrap select-none">
      ({n}){label ? ` — ${label}` : ''}
    </span>
  </div>
);

/** Term row: renders the symbol as KaTeX + plain-text meaning */
const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-40">
      <MathText math={sym} />
    </td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top">{meaning}</td>
  </tr>
);

/** Section wrapper */
const Sec: React.FC<{
  id: string; open: boolean; toggle: () => void;
  icon: React.ReactNode; color: string; title: string; sub: string;
  children: React.ReactNode;
}> = ({ open, toggle, icon, color, title, sub, children }) => (
  <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
    <button onClick={toggle} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
      <div className="flex items-center gap-3">
        <span className={`p-2 rounded-xl ${color}`}>{icon}</span>
        <div>
          <h3 className="text-xl font-semibold m-0">{title}</h3>
          <p className="text-xs text-brandDark-400 m-0">{sub}</p>
        </div>
      </div>
      {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {open && <div className="p-6 space-y-6">{children}</div>}
  </section>
);

/* ─── Main component ───────────────────────────────────────────────────────── */
export const Topic2_MarginalJoint: React.FC<Topic2Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

  return (
    <div className="space-y-8 pb-16">

      {/* ── SECTION 1 ── Motivation ─────────────────────────────────────────── */}
      <Sec id="s1" open={open.s1} toggle={() => tog('s1')}
        icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        title="§1 — Motivation: The Weather Station" sub="Why we need both joint and marginal views">
        <div className={`${fb} space-y-4`}>
          <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
            <p className="italic text-brandDark-700 dark:text-brandDark-300">
              A weather station records three measurements every hour: Temperature <MathText math="X_1" />,
              Humidity <MathText math="X_2" />, and Wind Speed <MathText math="X_3" />. The <strong>joint distribution</strong> describes
              the probability of all three taking specific values simultaneously. A meteorologist who only
              cares about temperature "marginalises out" humidity and wind — summing over every possible
              combination of the other variables to get the standalone temperature distribution.
            </p>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Key intuitions</p>
            <ul className="list-disc pl-5 space-y-1 text-brandDark-600 dark:text-brandDark-400">
              <li><strong>Joint distribution</strong> — the complete picture; all variables together, all dependencies intact.</li>
              <li><strong>Marginal distribution</strong> — a "zoomed-in" view on one variable, averaging out all others.</li>
              <li><strong>Why it matters</strong> — in a 50-variable dataset you cannot visualise everything at once; marginals let you study each variable independently.</li>
            </ul>
          </div>
        </div>
      </Sec>

      {/* ── SECTION 2 ── Equations ──────────────────────────────────────────── */}
      <Sec id="s2" open={open.s2} toggle={() => tog('s2')}
        icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        title="§2 — Equations with Term-by-Term Breakdown" sub="Joint density, marginal density, sub-vector marginal, bivariate case">

        {/* ── 2.1 Joint PDF ── */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">2.1 Joint Probability Density Function</h4>
          <p className={fb}>For a random vector <MathText math="\mathbf{X} = (X_1, X_2, \ldots, X_p)^T" />, the joint density assigns a probability density to every simultaneous combination of values:</p>
          <Eq n="2.1" math="f_{\mathbf{X}}(\mathbf{x}) \;=\; f_{X_1,\, X_2,\, \ldots,\, X_p}(x_1,\, x_2,\, \ldots,\, x_p)" label="Joint PDF" />
          <p className={`${fb} text-sm`}>The joint density must satisfy the two axioms:</p>
          <Eq n="2.2" math="f_{\mathbf{X}}(\mathbf{x}) \;\geq\; 0 \quad \forall\, \mathbf{x} \in \mathbb{R}^p" label="Non-negativity" />
          <Eq n="2.3" math="\int_{\mathbb{R}^p} f_{\mathbf{X}}(\mathbf{x})\, d\mathbf{x} \;=\; 1" label="Total probability" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-40">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="f_{\mathbf{X}}(\mathbf{x})" meaning="The joint density evaluated at the point x — a scalar giving the 'height' of the probability surface at that location." />
                <Term sym="x_i" meaning={<>A specific realised value of the <MathText math="i" />-th random variable <MathText math="X_i" />.</>} />
                <Term sym="\mathbf{x} = (x_1,\ldots,x_p)^T" meaning={<>A specific point in <MathText math="\mathbb{R}^p" /> — one simultaneous realisation of all <MathText math="p" /> variables.</>} />
                <Term sym="\int_{\mathbb{R}^p}(\cdot)\,d\mathbf{x}" meaning={<>A <MathText math="p" />-fold integral over all of <MathText math="\mathbb{R}^p" />; ensures total probability equals 1.</>} />
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 2.2 Marginal of a single component ── */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">2.2 Marginal Density of a Single Component</h4>
          <p className={fb}>To obtain the marginal density of <MathText math="X_i" /> alone, integrate out (marginalise over) all other variables:</p>
          <Eq n="2.4" math="f_{X_i}(x_i) \;=\; \int_{-\infty}^{\infty}\!\cdots\!\int_{-\infty}^{\infty} f_{\mathbf{X}}(x_1,\ldots,x_p)\; dx_1\cdots dx_{i-1}\,dx_{i+1}\cdots dx_p" label="Marginal of X_i" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-40">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="f_{X_i}(x_i)" meaning={<>The marginal density of <MathText math="X_i" /> — the probability density of the <MathText math="i" />-th variable ignoring all others.</>} />
                <Term sym="\int_{-\infty}^{\infty}\!\cdots\!\int_{-\infty}^{\infty}(\cdot)" meaning={<>Integration over every possible combination of the remaining <MathText math="p-1" /> variables — "projects" the <MathText math="p" />-dimensional cloud onto the <MathText math="X_i" /> axis.</>} />
                <Term sym="dx_1\cdots dx_{i-1}\,dx_{i+1}\cdots dx_p" meaning={<>Differential elements for all variables except <MathText math="X_i" />; these are the variables being integrated out.</>} />
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 2.3 Marginal of a sub-vector ── */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">2.3 Marginal Density of a Sub-vector</h4>
          <p className={fb}>Partition <MathText math="\mathbf{X}" /> into <MathText math="\mathbf{X}_1 = (X_1,\ldots,X_q)^T" /> and <MathText math="\mathbf{X}_2 = (X_{q+1},\ldots,X_p)^T" />. The marginal of <MathText math="\mathbf{X}_1" /> is:</p>
          <Eq n="2.5" math="f_{\mathbf{X}_1}(\mathbf{x}_1) \;=\; \int_{\mathbb{R}^{p-q}} f_{\mathbf{X}_1,\,\mathbf{X}_2}(\mathbf{x}_1,\,\mathbf{x}_2)\; d\mathbf{x}_2" label="Sub-vector marginal" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-40">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{x}_1 \in \mathbb{R}^q" meaning={<>A specific realisation of the first sub-vector — the <MathText math="q" /> variables we care about.</>} />
                <Term sym="\int_{\mathbb{R}^{p-q}}(\cdot)\,d\mathbf{x}_2" meaning={<>Integration over the entire <MathText math="(p-q)" />-dimensional space of the nuisance variables <MathText math="\mathbf{X}_2" />.</>} />
                <Term sym="f_{\mathbf{X}_1,\mathbf{X}_2}(\mathbf{x}_1,\mathbf{x}_2)" meaning="The joint density of both sub-vectors — the starting point before marginalisation." />
              </tbody>
            </table>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-sm text-emerald-800 dark:text-emerald-300">
            <strong>Key property:</strong> For the multivariate normal, the marginal of any sub-vector is itself multivariate normal — obtained simply by reading off the corresponding entries of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />.
          </div>
        </div>

        {/* ── 2.4 Bivariate case ── */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">2.4 Bivariate Case — Explicit Marginals</h4>
          <p className={fb}>For two variables <MathText math="(X_1, X_2)" />, the marginals are obtained by single integration:</p>
          <Eq n="2.6" math="f_{X_1}(x_1) \;=\; \int_{-\infty}^{\infty} f_{X_1,\,X_2}(x_1,\,x_2)\; dx_2" label="Marginal of X₁" />
          <Eq n="2.7" math="f_{X_2}(x_2) \;=\; \int_{-\infty}^{\infty} f_{X_1,\,X_2}(x_1,\,x_2)\; dx_1" label="Marginal of X₂" />
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <strong>Critical insight:</strong> Knowing both marginals <MathText math="f_{X_1}" /> and <MathText math="f_{X_2}" /> does <em>not</em> uniquely determine the joint <MathText math="f_{X_1,X_2}" />. The joint contains additional information about the <strong>dependence structure</strong> (captured by the covariance/correlation). This is why we need the full joint distribution for multivariate analysis.
          </div>
        </div>
      </Sec>

      {/* ── SECTION 3 ── Illustration ───────────────────────────────────────── */}
      <Sec id="s3" open={open.s3} toggle={() => tog('s3')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§3 — Illustration: Marginalisation as Projection" sub="How integrating out a variable collapses a 2-D density to 1-D">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* SVG */}
          <div className="flex justify-center">
            <svg viewBox="0 0 340 310" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
              {/* Axes */}
              <line x1="50" y1="265" x2="310" y2="265" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a2g)" />
              <line x1="50" y1="265" x2="50" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a2g)" />
              <text x="315" y="269" fontSize="12" fill="#94a3b8" fontWeight="bold">X₁</text>
              <text x="36" y="16" fontSize="12" fill="#94a3b8" fontWeight="bold">X₂</text>
              {/* Axis tick labels */}
              <text x="46" y="280" fontSize="9" fill="#94a3b8">0</text>

              {/* Joint density contours — tilted ellipses (positive correlation) */}
              <ellipse cx="180" cy="155" rx="85" ry="48" fill="rgba(124,58,237,0.05)" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" transform="rotate(-28 180 155)" />
              <ellipse cx="180" cy="155" rx="55" ry="31" fill="rgba(124,58,237,0.09)" stroke="rgba(124,58,237,0.55)" strokeWidth="1.5" transform="rotate(-28 180 155)" />
              <ellipse cx="180" cy="155" rx="28" ry="16" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.80)" strokeWidth="2" transform="rotate(-28 180 155)" />
              <text x="240" y="108" fontSize="10" fill="#7c3aed" fontWeight="bold">f(x₁,x₂)</text>
              <text x="240" y="120" fontSize="9" fill="#7c3aed">Joint density</text>
              <text x="240" y="131" fontSize="9" fill="#7c3aed">Eq. (2.1)</text>

              {/* Projection dashes → X₁ axis (marginal of X₁) */}
              {[115, 155, 180, 205, 245].map(x => (
                <line key={x} x1={x} y1="265" x2={x} y2="210" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.55" />
              ))}
              {/* Marginal of X₁ — bell curve along bottom */}
              <path d="M 90,265 Q 120,235 150,225 Q 180,218 210,225 Q 240,235 270,265"
                fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="155" y="212" fontSize="9" fill="#3b82f6" fontWeight="bold">f(x₁) — Eq. (2.6)</text>
              <text x="155" y="222" fontSize="8" fill="#3b82f6">Marginal of X₁</text>

              {/* Projection dashes → X₂ axis (marginal of X₂) */}
              {[120, 148, 155, 162, 190].map(y => (
                <line key={y} x1="50" y1={y} x2="105" y2={y} stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.55" />
              ))}
              {/* Marginal of X₂ — bell curve along left */}
              <path d="M 50,90 Q 68,108 72,135 Q 74,155 72,175 Q 68,202 50,220"
                fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2.5" />
              <text x="4" y="86" fontSize="9" fill="#10b981" fontWeight="bold">f(x₂)</text>
              <text x="4" y="97" fontSize="8" fill="#10b981">Eq. (2.7)</text>

              {/* Mean point */}
              <circle cx="180" cy="155" r="5" fill="#ef4444" />
              <text x="185" y="168" fontSize="9" fill="#ef4444" fontWeight="bold">μ</text>

              <defs>
                <marker id="a2g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-4 text-sm">
            <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the diagram</h4>
            <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                <div><strong>Purple ellipses</strong> — contours of the joint density <MathText math="f(x_1,x_2)" /> (Eq. 2.1). Each ellipse is a level set where density is constant. The tilt reflects positive correlation.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                <div><strong>Blue curve (bottom)</strong> — marginal <MathText math="f_{X_1}(x_1)" /> (Eq. 2.6). Obtained by integrating the joint density down onto the <MathText math="X_1" /> axis. Dashed lines show the "collapsing" operation.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                <div><strong>Green curve (left)</strong> — marginal <MathText math="f_{X_2}(x_2)" /> (Eq. 2.7). Obtained by integrating the joint density onto the <MathText math="X_2" /> axis.</div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                <div><strong>Red dot</strong> — the mean vector <MathText math="\boldsymbol{\mu}" />, the centre of the joint distribution.</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                <strong>Notice:</strong> The tilt of the ellipse (non-zero covariance) is <em>lost</em> in both marginals — they are symmetric bell curves regardless of correlation. This is why marginals alone cannot reveal dependence.
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ── SECTION 4 ── Worked Example ─────────────────────────────────────── */}
      <Sec id="s4" open={open.s4} toggle={() => tog('s4')}
        icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        title="§4 — Worked Example: Bivariate Normal Marginals" sub="Deriving marginals from a bivariate normal joint density">
        <div className={`${fb} space-y-4`}>
          <p>Let <MathText math="(X_1, X_2)^T \sim N_2(\boldsymbol{\mu}, \mathbf{\Sigma})" /> with:</p>
          <Eq n="2.8" math="\boldsymbol{\mu} = \begin{bmatrix}\mu_1 \\ \mu_2\end{bmatrix}, \qquad \mathbf{\Sigma} = \begin{bmatrix}\sigma_1^2 & \rho\sigma_1\sigma_2 \\ \rho\sigma_1\sigma_2 & \sigma_2^2\end{bmatrix}" label="Parameters" />
          <p><strong>Result — marginal distributions:</strong></p>
          <Eq n="2.9" math="X_1 \;\sim\; N(\mu_1,\;\sigma_1^2)" label="Marginal of X₁" />
          <Eq n="2.10" math="X_2 \;\sim\; N(\mu_2,\;\sigma_2^2)" label="Marginal of X₂" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-40">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\rho" meaning="Pearson correlation coefficient — the off-diagonal element of Σ normalised by the product of standard deviations. Controls the tilt of the joint density ellipse." />
                <Term sym="\sigma_1^2,\;\sigma_2^2" meaning="Diagonal entries of Σ — the individual variances. These are the only parameters that survive marginalisation." />
                <Term sym="\rho\sigma_1\sigma_2" meaning="The covariance σ₁₂ — present in the joint density but integrated out when computing either marginal." />
              </tbody>
            </table>
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Why this works — the integration step</p>
            <p className="text-brandDark-600 dark:text-brandDark-400">Starting from the bivariate normal density and integrating over <MathText math="x_2" />, completing the square in <MathText math="x_2" /> and using the Gaussian integral <MathText math="\int_{-\infty}^{\infty} e^{-ax^2}\,dx = \sqrt{\pi/a}" />, the <MathText math="x_2" />-dependent terms integrate to 1, leaving exactly the univariate normal density in <MathText math="x_1" />.</p>
            <p className="text-primary-600 dark:text-primary-400 font-bold">For multivariate normal, marginals are obtained simply by reading off the corresponding entries of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />.</p>
          </div>
        </div>
      </Sec>

    </div>
  );
};

export default Topic2_MarginalJoint;
