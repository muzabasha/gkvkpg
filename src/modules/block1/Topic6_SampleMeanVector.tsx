import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic6Props { projectorMode?: boolean; }

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

export const Topic6_SampleMeanVector: React.FC<Topic6Props> = ({ projectorMode = false }) => {
  const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
  const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

  return (
    <div className="space-y-8 pb-16">

      {/* §1 Motivation */}
      <Sec open={open.s1} toggle={() => tog('s1')}
        icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        title="§1 — Motivation: The Class Average Report Card" sub="From individual observations to the sampling distribution of the mean">
        <div className={`${fb} space-y-4`}>
          <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
            <p className="italic text-brandDark-700 dark:text-brandDark-300">
              You have 60 students, each measured on <MathText math="p" /> variables. Each student is a random vector <MathText math="\mathbf{X}_i \in \mathbb{R}^p" />.
              The <strong>sample mean vector</strong> <MathText math="\bar{\mathbf{X}}" /> is the "class average report card" — a single vector summarising the typical student.
              The key question: if the population is <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, what is the distribution of this sample average?
              This is the multivariate Central Limit Theorem.
            </p>
          </div>
        </div>
      </Sec>

      {/* §2 Equations */}
      <Sec open={open.s2} toggle={() => tog('s2')}
        icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
        title="§2 — Equations with Term-by-Term Breakdown" sub="Sample mean vector, its distribution, sample covariance, independence result">

        {/* 6.1 Sample mean vector */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">6.1 Sample Mean Vector</h4>
          <p className={fb}>Given <MathText math="n" /> i.i.d. observations <MathText math="\mathbf{X}_1, \ldots, \mathbf{X}_n \sim N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />:</p>
          <Eq n="6.1" math="\bar{\mathbf{X}} \;=\; \frac{1}{n}\sum_{i=1}^{n}\mathbf{X}_i \;=\; \frac{1}{n}\begin{bmatrix}\sum_{i=1}^n X_{i1}\\\sum_{i=1}^n X_{i2}\\\vdots\\\sum_{i=1}^n X_{ip}\end{bmatrix}" label="Sample mean vector" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="\mathbf{X}_i" meaning="The i-th observation — a p×1 column vector of all measurements for the i-th subject." />
                <Term sym="\sum_{i=1}^{n}\mathbf{X}_i" meaning="Vector addition — adds all n observation vectors component-wise." />
                <Term sym="\frac{1}{n}" meaning="Scalar division — divides each component sum by n to get the average." />
                <Term sym="\bar{X}_j = \frac{1}{n}\sum_{i=1}^n X_{ij}" meaning="The j-th component of X̄ is the ordinary sample mean of the j-th variable." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 6.2 Distribution of sample mean */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">6.2 Distribution of the Sample Mean Vector</h4>
          <Eq n="6.2" math="\bar{\mathbf{X}} \;\sim\; N_p\!\left(\boldsymbol{\mu},\;\frac{1}{n}\mathbf{\Sigma}\right)" label="Sampling distribution" />
          <p className={`${fb} text-sm`}>Derivation of the two parameters:</p>
          <Eq n="6.3" math="E[\bar{\mathbf{X}}] \;=\; \frac{1}{n}\sum_{i=1}^n E[\mathbf{X}_i] \;=\; \frac{1}{n}\cdot n\boldsymbol{\mu} \;=\; \boldsymbol{\mu}" label="Unbiasedness" />
          <Eq n="6.4" math="\text{Cov}(\bar{\mathbf{X}}) \;=\; \text{Cov}\!\left(\frac{1}{n}\sum_i\mathbf{X}_i\right) \;=\; \frac{1}{n^2}\sum_i\text{Cov}(\mathbf{X}_i) \;=\; \frac{1}{n^2}\cdot n\mathbf{\Sigma} \;=\; \frac{\mathbf{\Sigma}}{n}" label="Covariance of X̄" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="E[\bar{\mathbf{X}}] = \boldsymbol{\mu}" meaning="Unbiasedness — the sample mean is an unbiased estimator of the population mean." />
                <Term sym="\frac{\mathbf{\Sigma}}{n}" meaning="The covariance of X̄ is the population covariance scaled down by n. Larger samples → smaller uncertainty about the mean → tighter distribution of X̄ around μ." />
                <Term sym="\frac{1}{n^2}\sum_i\text{Cov}(\mathbf{X}_i)" meaning="Uses independence of observations — covariances between different X_i are zero, so only the n diagonal terms survive." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 6.3 Sample covariance */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">6.3 Sample Covariance Matrix</h4>
          <Eq n="6.5" math="\mathbf{S} \;=\; \frac{1}{n-1}\sum_{i=1}^{n}(\mathbf{X}_i - \bar{\mathbf{X}})(\mathbf{X}_i - \bar{\mathbf{X}})^T" label="Sample covariance (unbiased)" />
          <Eq n="6.6" math="E[\mathbf{S}] \;=\; \mathbf{\Sigma}" label="Unbiasedness of S" />
          <Eq n="6.7" math="(n-1)\mathbf{S} \;\sim\; W_p(n-1,\;\mathbf{\Sigma})" label="Wishart distribution" />
          <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
            <table className="w-full text-sm">
              <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
              </tr></thead>
              <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                <Term sym="(\mathbf{X}_i - \bar{\mathbf{X}})" meaning="The deviation of the i-th observation from the sample mean — a p×1 vector." />
                <Term sym="(\mathbf{X}_i-\bar{\mathbf{X}})(\mathbf{X}_i-\bar{\mathbf{X}})^T" meaning="The outer product — a p×p rank-1 matrix capturing the squared deviations and cross-products for observation i." />
                <Term sym="\frac{1}{n-1}" meaning="Bessel's correction — dividing by n−1 (degrees of freedom) instead of n makes S an unbiased estimator of Σ." />
                <Term sym="W_p(n-1,\mathbf{\Sigma})" meaning="The Wishart distribution — the multivariate generalisation of the chi-squared distribution. The distribution of (n−1)S." />
              </tbody>
            </table>
          </div>
        </div>

        {/* 6.4 Independence */}
        <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
          <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">6.4 Independence of <MathText math="\bar{\mathbf{X}}" /> and <MathText math="\mathbf{S}" /></h4>
          <Eq n="6.8" math="\bar{\mathbf{X}} \;\perp\; \mathbf{S} \quad \text{when } \mathbf{X}_1,\ldots,\mathbf{X}_n \overset{\text{i.i.d.}}{\sim} N_p(\boldsymbol{\mu},\mathbf{\Sigma})" label="Independence result" />
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm text-emerald-800 dark:text-emerald-300">
            <strong>Why this matters (Eq. 6.8):</strong> This independence is the multivariate analog of the independence of the sample mean and sample variance in the univariate normal case. It is the foundation for constructing Hotelling's T² test statistic (Topic 8) — the multivariate analog of the t-test.
          </div>
        </div>
      </Sec>

      {/* §3 Illustration */}
      <Sec open={open.s3} toggle={() => tog('s3')}
        icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§3 — Illustration: Sampling Distribution Shrinks with n" sub="How Cov(X̄) = Σ/n contracts as sample size grows">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: 5, rx: 38, ry: 26, color: '#ef4444', label: 'Large uncertainty' },
              { n: 20, rx: 20, ry: 14, color: '#3b82f6', label: 'Moderate uncertainty' },
              { n: 100, rx: 9, ry: 6, color: '#10b981', label: 'Tight concentration' },
            ].map(({ n, rx, ry, color, label }) => (
              <div key={n} className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 180 180" className="w-44 h-44 border border-brandDark-100 dark:border-brandDark-800 rounded-xl bg-brandDark-50/30">
                  <line x1="20" y1="90" x2="165" y2="90" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="90" y1="15" x2="90" y2="165" stroke="#94a3b8" strokeWidth="1" />
                  <text x="168" y="94" fontSize="10" fill="#94a3b8">μ₁</text>
                  <text x="78" y="12" fontSize="10" fill="#94a3b8">μ₂</text>
                  {/* Population cloud */}
                  <ellipse cx="90" cy="90" rx="55" ry="38" fill="rgba(148,163,184,0.08)" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-20 90 90)" />
                  {/* Sampling distribution of mean */}
                  <ellipse cx="90" cy="90" rx={rx} ry={ry} fill={`${color}22`} stroke={color} strokeWidth="2.5" transform="rotate(-20 90 90)" />
                  <circle cx="90" cy="90" r="5" fill={color} />
                  <text x="90" y="172" textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">n = {n}</text>
                  <text x="90" y="162" textAnchor="middle" fontSize="8" fill="#94a3b8">{label}</text>
                </svg>
                <div className="text-center text-xs text-brandDark-600 dark:text-brandDark-400 space-y-1">
                  <MathText math={`\\bar{\\mathbf{X}} \\sim N_p\\!\\left(\\boldsymbol{\\mu},\\;\\frac{\\mathbf{\\Sigma}}{${n}}\\right)`} />
                  <p>Eq. (6.2) with n = {n}.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400">
            <strong>Reading the diagram:</strong> The grey dashed ellipse is the population distribution <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" /> — fixed regardless of <MathText math="n" />. The coloured ellipses show the sampling distribution of <MathText math="\bar{\mathbf{X}}" /> (Eq. 6.2) — same centre <MathText math="\boldsymbol{\mu}" />, same shape (same eigenvectors), but scaled down by <MathText math="1/n" />. As <MathText math="n \to \infty" />, the sampling distribution collapses to a point at <MathText math="\boldsymbol{\mu}" /> (consistency).
          </div>
        </div>
      </Sec>

      {/* §4 Worked Example */}
      <Sec open={open.s4} toggle={() => tog('s4')}
        icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
        title="§4 — Worked Example: Computing X̄ and S" sub="Step-by-step numerical calculation">
        <div className={`${fb} space-y-4`}>
          <p>Given <MathText math="n = 4" /> observations of <MathText math="(X_1, X_2)^T" />: <MathText math="(2,3),\,(4,5),\,(6,7),\,(8,9)" />.</p>
          <p><strong>Step 1 — Sample mean vector (Eq. 6.1):</strong></p>
          <Eq n="6.9" math="\bar{\mathbf{X}} = \frac{1}{4}\begin{bmatrix}2+4+6+8\\3+5+7+9\end{bmatrix} = \begin{bmatrix}5\\6\end{bmatrix}" label="Sample mean" />
          <p><strong>Step 2 — Deviation vectors:</strong></p>
          <Eq n="6.10" math="\mathbf{X}_1-\bar{\mathbf{X}}=\begin{bmatrix}-3\\-3\end{bmatrix},\quad \mathbf{X}_2-\bar{\mathbf{X}}=\begin{bmatrix}-1\\-1\end{bmatrix},\quad \mathbf{X}_3-\bar{\mathbf{X}}=\begin{bmatrix}1\\1\end{bmatrix},\quad \mathbf{X}_4-\bar{\mathbf{X}}=\begin{bmatrix}3\\3\end{bmatrix}" label="Deviations" />
          <p><strong>Step 3 — Sample covariance matrix (Eq. 6.5):</strong></p>
          <Eq n="6.11" math="\mathbf{S} = \frac{1}{3}\!\left[\begin{bmatrix}9&9\\9&9\end{bmatrix}+\begin{bmatrix}1&1\\1&1\end{bmatrix}+\begin{bmatrix}1&1\\1&1\end{bmatrix}+\begin{bmatrix}9&9\\9&9\end{bmatrix}\right] = \frac{1}{3}\begin{bmatrix}20&20\\20&20\end{bmatrix} = \begin{bmatrix}6.67&6.67\\6.67&6.67\end{bmatrix}" label="Sample covariance" />
          <p><strong>Step 4 — Sampling distribution (Eq. 6.2):</strong></p>
          <Eq n="6.12" math="\bar{\mathbf{X}} \sim N_2\!\left(\boldsymbol{\mu},\;\frac{\mathbf{\Sigma}}{4}\right)" label="Distribution of X̄" />
        </div>
      </Sec>

    </div>
  );
};

export default Topic6_SampleMeanVector;
