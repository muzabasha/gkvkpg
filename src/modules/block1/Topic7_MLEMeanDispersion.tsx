import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic7Props { projectorMode?: boolean; }

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

export const Topic7_MLEMeanDispersion: React.FC<Topic7Props> = ({ projectorMode = false }) => {
    const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true });
    const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
    const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

    return (
        <div className="space-y-8 pb-16">

            {/* §1 Motivation */}
            <Sec open={open.s1} toggle={() => tog('s1')}
                icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                title="§1 — Motivation: Fitting the Best Bell Tent" sub="MLE as finding the distribution that best explains the observed data">
                <div className={`${fb} space-y-4`}>
                    <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
                        <p className="italic text-brandDark-700 dark:text-brandDark-300">
                            You have 60 students' measurements and believe they come from a multivariate normal distribution.
                            But you don't know the true mean <MathText math="\boldsymbol{\mu}" /> or covariance <MathText math="\mathbf{\Sigma}" />.
                            <strong> Maximum Likelihood Estimation (MLE)</strong> asks: "Which values of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" /> make the observed data most probable?"
                            Think of it as positioning and shaping a bell tent over your data cloud — MLE finds the exact centre and shape that maximises the probability of seeing exactly the data you collected.
                        </p>
                    </div>
                </div>
            </Sec>

            {/* §2 Equations */}
            <Sec open={open.s2} toggle={() => tog('s2')}
                icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
                title="§2 — Equations with Term-by-Term Breakdown" sub="Likelihood, log-likelihood, MLE of μ and Σ, bias analysis">

                {/* 7.1 Likelihood */}
                <div className="space-y-3">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">7.1 The Likelihood Function</h4>
                    <p className={fb}>For <MathText math="n" /> i.i.d. observations <MathText math="\mathbf{x}_1,\ldots,\mathbf{x}_n" /> from <MathText math="N_p(\boldsymbol{\mu},\mathbf{\Sigma})" />, the likelihood is the joint density viewed as a function of the parameters:</p>
                    <Eq n="7.1" math="L(\boldsymbol{\mu},\mathbf{\Sigma}) \;=\; \prod_{i=1}^{n} \frac{1}{(2\pi)^{p/2}|\mathbf{\Sigma}|^{1/2}} \exp\!\left(-\frac{1}{2}(\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})\right)" label="Likelihood function" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="L(\boldsymbol{\mu},\mathbf{\Sigma})" meaning="A function of the unknown parameters μ and Σ, with the data x₁,…,xₙ treated as fixed constants." />
                                <Term sym="\prod_{i=1}^{n}" meaning="Product over all observations — uses independence of the i.i.d. sample." />
                                <Term sym="(\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})" meaning="The squared Mahalanobis distance of the i-th observation from the candidate mean μ (Eq. 5.2)." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7.2 Log-likelihood */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">7.2 The Log-Likelihood Function</h4>
                    <Eq n="7.2" math="\ell(\boldsymbol{\mu},\mathbf{\Sigma}) \;=\; -\frac{np}{2}\ln(2\pi) \;-\; \frac{n}{2}\ln|\mathbf{\Sigma}| \;-\; \frac{1}{2}\sum_{i=1}^{n}(\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})" label="Log-likelihood" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="-\frac{np}{2}\ln(2\pi)" meaning="A constant — does not depend on μ or Σ, so plays no role in optimisation." />
                                <Term sym="-\frac{n}{2}\ln|\mathbf{\Sigma}|" meaning="Penalises large determinants (overly spread distributions). Encourages the covariance to be as small as possible." />
                                <Term sym="-\frac{1}{2}\sum_i(\mathbf{x}_i-\boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i-\boldsymbol{\mu})" meaning="Sum of squared Mahalanobis distances. Penalises observations far from the mean. Encourages the mean to be close to the data." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7.3 MLE of μ */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">7.3 MLE of the Mean Vector</h4>
                    <p className={fb}>Setting <MathText math="\frac{\partial \ell}{\partial \boldsymbol{\mu}} = \mathbf{0}" /> and solving:</p>
                    <Eq n="7.3" math="\hat{\boldsymbol{\mu}}_{\text{MLE}} \;=\; \bar{\mathbf{X}} \;=\; \frac{1}{n}\sum_{i=1}^{n}\mathbf{x}_i" label="MLE of μ" />
                    <p className={`${fb} text-sm`}>Derivation sketch:</p>
                    <Eq n="7.4" math="\frac{\partial \ell}{\partial \boldsymbol{\mu}} \;=\; \mathbf{\Sigma}^{-1}\sum_{i=1}^n(\mathbf{x}_i - \boldsymbol{\mu}) \;=\; \mathbf{0} \;\Rightarrow\; \hat{\boldsymbol{\mu}} = \bar{\mathbf{x}}" label="Score equation for μ" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="\frac{\partial \ell}{\partial \boldsymbol{\mu}}" meaning="The gradient of the log-likelihood with respect to μ — a p×1 vector of partial derivatives." />
                                <Term sym="\mathbf{\Sigma}^{-1}\sum_i(\mathbf{x}_i-\boldsymbol{\mu})" meaning="Setting this to zero: since Σ⁻¹ is invertible, the sum of deviations must be zero, giving μ̂ = x̄." />
                                <Term sym="\hat{\boldsymbol{\mu}}_{\text{MLE}} = \bar{\mathbf{X}}" meaning="The MLE of the mean vector is simply the sample mean vector — intuitive and unbiased." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7.4 MLE of Σ */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">7.4 MLE of the Covariance Matrix</h4>
                    <Eq n="7.5" math="\hat{\mathbf{\Sigma}}_{\text{MLE}} \;=\; \frac{1}{n}\sum_{i=1}^{n}(\mathbf{x}_i - \bar{\mathbf{x}})(\mathbf{x}_i - \bar{\mathbf{x}})^T" label="MLE of Σ (biased)" />
                    <Eq n="7.6" math="E[\hat{\mathbf{\Sigma}}_{\text{MLE}}] \;=\; \frac{n-1}{n}\mathbf{\Sigma} \;\neq\; \mathbf{\Sigma}" label="Bias of MLE" />
                    <Eq n="7.7" math="\hat{\mathbf{\Sigma}}_{\text{MLE}} \;=\; \frac{n-1}{n}\mathbf{S}" label="Relationship to unbiased S" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="\frac{1}{n}" meaning="MLE divides by n (not n−1). This makes it biased — it systematically underestimates Σ." />
                                <Term sym="\frac{n-1}{n}\mathbf{\Sigma}" meaning="The expected value of the MLE — always smaller than Σ by a factor of (n−1)/n. Bias vanishes as n→∞." />
                                <Term sym="\frac{n-1}{n}\mathbf{S}" meaning="The MLE is a scaled version of the unbiased estimator S. For large n, the two are nearly identical." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7.5 Properties summary */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">7.5 Properties of the MLEs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-2">
                            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">MLE of μ — Eq. (7.3)</p>
                            <Eq n="7.8" math="\hat{\boldsymbol{\mu}} \sim N_p\!\left(\boldsymbol{\mu},\;\frac{\mathbf{\Sigma}}{n}\right)" label="Distribution" />
                            <ul className="list-disc pl-4 space-y-1 text-brandDark-600 dark:text-brandDark-400 text-xs">
                                <li>Unbiased: <MathText math="E[\hat{\boldsymbol{\mu}}] = \boldsymbol{\mu}" /></li>
                                <li>Efficient: achieves the Cramér-Rao lower bound</li>
                                <li>Sufficient statistic for μ</li>
                            </ul>
                        </div>
                        <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-2">
                            <p className="font-bold text-brandDark-800 dark:text-brandDark-200">MLE of Σ — Eq. (7.5)</p>
                            <Eq n="7.9" math="n\hat{\mathbf{\Sigma}}_{\text{MLE}} \sim W_p(n-1,\;\mathbf{\Sigma})" label="Distribution" />
                            <ul className="list-disc pl-4 space-y-1 text-brandDark-600 dark:text-brandDark-400 text-xs">
                                <li>Biased: <MathText math="E[\hat{\mathbf{\Sigma}}] = \frac{n-1}{n}\mathbf{\Sigma}" /></li>
                                <li>Consistent and asymptotically efficient</li>
                                <li>Sufficient statistic for Σ</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Sec>

            {/* §3 Illustration */}
            <Sec open={open.s3} toggle={() => tog('s3')}
                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                title="§3 — Illustration: MLE as Fitting the Best Ellipse" sub="Geometric interpretation — the ellipse that maximises the probability of the observed data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex justify-center">
                        <svg viewBox="0 0 340 290" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                            <line x1="30" y1="255" x2="310" y2="255" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a7g)" />
                            <line x1="30" y1="255" x2="30" y2="18" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a7g)" />
                            <text x="313" y="259" fontSize="10" fill="#94a3b8" fontWeight="bold">X₁</text>
                            <text x="18" y="14" fontSize="10" fill="#94a3b8" fontWeight="bold">X₂</text>

                            {/* Data points */}
                            {[[148, 138], [165, 128], [158, 145], [182, 115], [168, 130], [176, 140], [152, 150], [186, 110], [170, 133], [174, 122], [160, 142], [180, 118], [155, 148], [172, 125], [164, 136]].map(([x, y], i) => (
                                <circle key={i} cx={x} cy={y} r="4" fill="rgba(59,130,246,0.65)" stroke="#3b82f6" strokeWidth="0.5" />
                            ))}

                            {/* MLE fitted ellipses */}
                            <ellipse cx="170" cy="130" rx="46" ry="24" fill="rgba(124,58,237,0.07)" stroke="#7c3aed" strokeWidth="2.5" transform="rotate(-22 170 130)" />
                            <ellipse cx="170" cy="130" rx="28" ry="15" fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="1.8" transform="rotate(-22 170 130)" />

                            {/* MLE mean */}
                            <circle cx="170" cy="130" r="7" fill="#ef4444" stroke="white" strokeWidth="2" />
                            <text x="176" y="124" fontSize="9" fill="#ef4444" fontWeight="bold">μ̂ = x̄ (Eq.7.3)</text>

                            {/* Mahalanobis lines to a few points */}
                            {[[148, 138], [186, 110], [152, 150]].map(([x, y], i) => (
                                <line key={i} x1="170" y1="130" x2={x} y2={y} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                            ))}

                            <text x="80" y="275" fontSize="9" fill="#7c3aed" fontWeight="bold">Σ̂ MLE ellipse — Eq.(7.5)</text>

                            <defs>
                                <marker id="a7g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                            </defs>
                        </svg>
                    </div>
                    <div className="space-y-4 text-sm">
                        <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the diagram</h4>
                        <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Blue dots</strong> — the observed data points <MathText math="\mathbf{x}_1,\ldots,\mathbf{x}_n" />.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Red dot</strong> — the MLE of the mean <MathText math="\hat{\boldsymbol{\mu}} = \bar{\mathbf{x}}" /> (Eq. 7.3) — the centroid of the data cloud.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Purple ellipses</strong> — the MLE-fitted covariance ellipses <MathText math="\hat{\mathbf{\Sigma}}" /> (Eq. 7.5) — the ellipse that best "wraps" the data cloud, minimising the total Mahalanobis distance from all points to the centre.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-slate-400 flex-shrink-0 mt-0.5" />
                                <div><strong>Grey dashed lines</strong> — Mahalanobis distances from the MLE mean to individual observations (Eq. 5.2). MLE minimises the sum of these squared distances.</div>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                                <strong>Intuition:</strong> MLE simultaneously positions the centre (Eq. 7.3) and shapes the ellipse (Eq. 7.5) to maximise the probability of observing exactly the data you have. The result is the sample mean and (biased) sample covariance.
                            </div>
                        </div>
                    </div>
                </div>
            </Sec>

            {/* §4 Worked Example */}
            <Sec open={open.s4} toggle={() => tog('s4')}
                icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                title="§4 — Worked Example: Computing MLEs" sub="Numerical MLE calculation and bias comparison">
                <div className={`${fb} space-y-4`}>
                    <p>Given <MathText math="n = 3" /> observations: <MathText math="\mathbf{x}_1=(1,2)^T" />, <MathText math="\mathbf{x}_2=(3,4)^T" />, <MathText math="\mathbf{x}_3=(5,6)^T" />.</p>
                    <p><strong>MLE of mean vector (Eq. 7.3):</strong></p>
                    <Eq n="7.10" math="\hat{\boldsymbol{\mu}} = \frac{1}{3}\begin{bmatrix}1+3+5\\2+4+6\end{bmatrix} = \begin{bmatrix}3\\4\end{bmatrix}" label="MLE mean" />
                    <p><strong>MLE of covariance matrix (Eq. 7.5, divides by n=3):</strong></p>
                    <Eq n="7.11" math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{1}{3}\begin{bmatrix}8&8\\8&8\end{bmatrix} = \begin{bmatrix}2.67&2.67\\2.67&2.67\end{bmatrix}" label="MLE covariance (biased)" />
                    <p><strong>Unbiased sample covariance (Eq. 6.5, divides by n−1=2):</strong></p>
                    <Eq n="7.12" math="\mathbf{S} = \frac{1}{2}\begin{bmatrix}8&8\\8&8\end{bmatrix} = \begin{bmatrix}4&4\\4&4\end{bmatrix}" label="Unbiased S" />
                    <p><strong>Bias relationship (Eq. 7.7):</strong></p>
                    <Eq n="7.13" math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{n-1}{n}\mathbf{S} = \frac{2}{3}\begin{bmatrix}4&4\\4&4\end{bmatrix} = \begin{bmatrix}2.67&2.67\\2.67&2.67\end{bmatrix}\;\checkmark" label="Bias verification" />
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm">
                        <strong>Comparison:</strong> The MLE underestimates the true covariance by a factor of <MathText math="\frac{n-1}{n} = \frac{2}{3}" />. For large <MathText math="n" />, this bias is negligible. In practice, use <MathText math="\mathbf{S}" /> (Eq. 6.5) for unbiased estimation and <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}}" /> (Eq. 7.5) when maximum likelihood properties are needed.
                    </div>
                </div>
            </Sec>

        </div>
    );
};

export default Topic7_MLEMeanDispersion;
