import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic7Props { projectorMode?: boolean; }

export const Topic7_MLEMeanDispersion: React.FC<Topic7Props> = ({ projectorMode = false }) => {
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
                            <h3 className={`${fh} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: The Best-Fit Bell Tent</h3>
                            <p className="text-xs text-brandDark-400 m-0">MLE as finding the distribution that best explains the observed data.</p>
                        </div>
                    </div>
                    {open.s1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s1 && (
                    <div className={`p-6 ${fb} space-y-4`}>
                        <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
                            <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                                You have 60 students' measurements and you believe they come from a multivariate normal distribution. But you don't know the true mean <MathText math="\boldsymbol{\mu}" /> or covariance <MathText math="\mathbf{\Sigma}" />. Maximum Likelihood Estimation (MLE) asks: "Which values of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" /> make the observed data most probable?"
                            </p>
                            <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                                Think of it as positioning and shaping a bell tent over your data cloud. MLE finds the exact center position (mean vector) and the exact shape/orientation (covariance matrix) that maximizes the probability of seeing exactly the data you collected.
                            </p>
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
                            <h3 className={`${fh} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: Likelihood, Log-Likelihood & MLEs</h3>
                            <p className="text-xs text-brandDark-400 m-0">Deriving the MLE estimators for μ and Σ.</p>
                        </div>
                    </div>
                    {open.s2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s2 && (
                    <div className={`p-6 ${fb} space-y-8`}>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. The Likelihood Function</span>
                            <p>For <MathText math="n" /> i.i.d. observations <MathText math="\mathbf{x}_1, \ldots, \mathbf{x}_n" /> from <MathText math="N_p(\boldsymbol{\mu}, \mathbf{\Sigma})" />, the likelihood function is the joint density viewed as a function of the parameters:</p>
                            <MathText math="L(\boldsymbol{\mu}, \mathbf{\Sigma}) = \prod_{i=1}^{n} f(\mathbf{x}_i;\, \boldsymbol{\mu}, \mathbf{\Sigma}) = \prod_{i=1}^{n} \frac{1}{(2\pi)^{p/2}|\mathbf{\Sigma}|^{1/2}} \exp\!\left(-\frac{1}{2}(\mathbf{x}_i - \boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i - \boldsymbol{\mu})\right)" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <MathText math="L(\boldsymbol{\mu}, \mathbf{\Sigma})" />: A function of the unknown parameters <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" />, with the data <MathText math="\mathbf{x}_1, \ldots, \mathbf{x}_n" /> treated as fixed.</div>
                                <div>• <MathText math="\prod_{i=1}^{n}" />: Product over all observations — uses independence of the i.i.d. sample.</div>
                                <div>• <strong>Goal</strong>: Find <MathText math="\hat{\boldsymbol{\mu}}" /> and <MathText math="\hat{\mathbf{\Sigma}}" /> that maximize <MathText math="L(\boldsymbol{\mu}, \mathbf{\Sigma})" />.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. The Log-Likelihood Function</span>
                            <p>Taking the natural logarithm (monotone transformation, so maximizers are the same):</p>
                            <MathText math="\ell(\boldsymbol{\mu}, \mathbf{\Sigma}) = -\frac{np}{2}\ln(2\pi) - \frac{n}{2}\ln|\mathbf{\Sigma}| - \frac{1}{2}\sum_{i=1}^{n}(\mathbf{x}_i - \boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i - \boldsymbol{\mu})" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <MathText math="-\frac{np}{2}\ln(2\pi)" />: A constant — does not depend on <MathText math="\boldsymbol{\mu}" /> or <MathText math="\mathbf{\Sigma}" />, so it plays no role in optimization.</div>
                                <div>• <MathText math="-\frac{n}{2}\ln|\mathbf{\Sigma}|" />: Penalizes large determinants (overly spread distributions). Encourages the covariance to be as small as possible.</div>
                                <div>• <MathText math="-\frac{1}{2}\sum_i (\mathbf{x}_i - \boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i - \boldsymbol{\mu})" />: The sum of squared Mahalanobis distances. Penalizes observations far from the mean. Encourages the mean to be close to the data.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. MLE of the Mean Vector</span>
                            <p>Setting <MathText math="\frac{\partial \ell}{\partial \boldsymbol{\mu}} = \mathbf{0}" /> and solving:</p>
                            <MathText math="\hat{\boldsymbol{\mu}}_{\text{MLE}} = \bar{\mathbf{X}} = \frac{1}{n}\sum_{i=1}^{n}\mathbf{x}_i" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div><strong>Derivation sketch:</strong></div>
                                <div>• <MathText math="\frac{\partial}{\partial \boldsymbol{\mu}}\left[-\frac{1}{2}\sum_i (\mathbf{x}_i - \boldsymbol{\mu})^T\mathbf{\Sigma}^{-1}(\mathbf{x}_i - \boldsymbol{\mu})\right] = \mathbf{\Sigma}^{-1}\sum_i(\mathbf{x}_i - \boldsymbol{\mu}) = \mathbf{0}" /></div>
                                <div>• Since <MathText math="\mathbf{\Sigma}^{-1}" /> is invertible: <MathText math="\sum_i(\mathbf{x}_i - \boldsymbol{\mu}) = \mathbf{0} \Rightarrow \hat{\boldsymbol{\mu}} = \frac{1}{n}\sum_i \mathbf{x}_i = \bar{\mathbf{x}}" /></div>
                                <div>• <strong>Result</strong>: The MLE of the mean vector is simply the sample mean vector — intuitive and unbiased.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. MLE of the Covariance Matrix</span>
                            <p>Setting <MathText math="\frac{\partial \ell}{\partial \mathbf{\Sigma}^{-1}} = \mathbf{0}" /> (using matrix calculus) and solving:</p>
                            <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{1}{n}\sum_{i=1}^{n}(\mathbf{x}_i - \bar{\mathbf{x}})(\mathbf{x}_i - \bar{\mathbf{x}})^T" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <strong>Key difference from sample covariance</strong>: The MLE divides by <MathText math="n" />, while the unbiased sample covariance <MathText math="\mathbf{S}" /> divides by <MathText math="n-1" />.</div>
                                <div>• <strong>Bias</strong>: <MathText math="E[\hat{\mathbf{\Sigma}}_{\text{MLE}}] = \frac{n-1}{n}\mathbf{\Sigma} \neq \mathbf{\Sigma}" /> — the MLE is biased (underestimates <MathText math="\mathbf{\Sigma}" />).</div>
                                <div>• <strong>Consistency</strong>: As <MathText math="n \to \infty" />, <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}} \to \mathbf{\Sigma}" /> — the bias vanishes for large samples.</div>
                                <div>• <strong>Relationship</strong>: <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{n-1}{n}\mathbf{S}" /> — the MLE is a scaled version of the unbiased estimator.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">E. Properties of the MLEs</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-2">
                                    <div className="font-bold text-brandDark-800 dark:text-brandDark-200">MLE of μ: <MathText math="\hat{\boldsymbol{\mu}} = \bar{\mathbf{X}}" /></div>
                                    <div className="text-brandDark-600 dark:text-brandDark-400 space-y-1">
                                        <div>• Unbiased: <MathText math="E[\hat{\boldsymbol{\mu}}] = \boldsymbol{\mu}" /></div>
                                        <div>• Distribution: <MathText math="\hat{\boldsymbol{\mu}} \sim N_p(\boldsymbol{\mu}, \frac{1}{n}\mathbf{\Sigma})" /></div>
                                        <div>• Efficient: achieves the Cramér-Rao lower bound</div>
                                        <div>• Sufficient statistic for <MathText math="\boldsymbol{\mu}" /></div>
                                    </div>
                                </div>
                                <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 space-y-2">
                                    <div className="font-bold text-brandDark-800 dark:text-brandDark-200">MLE of Σ: <MathText math="\hat{\mathbf{\Sigma}} = \frac{1}{n}\sum_i(\mathbf{x}_i-\bar{\mathbf{x}})(\mathbf{x}_i-\bar{\mathbf{x}})^T" /></div>
                                    <div className="text-brandDark-600 dark:text-brandDark-400 space-y-1">
                                        <div>• Biased: <MathText math="E[\hat{\mathbf{\Sigma}}] = \frac{n-1}{n}\mathbf{\Sigma}" /></div>
                                        <div>• Distribution: <MathText math="n\hat{\mathbf{\Sigma}} \sim W_p(n-1, \mathbf{\Sigma})" /></div>
                                        <div>• Consistent and asymptotically efficient</div>
                                        <div>• Sufficient statistic for <MathText math="\mathbf{\Sigma}" /></div>
                                    </div>
                                </div>
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
                            <h3 className={`${fh} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: MLE as Fitting the Best Ellipse</h3>
                            <p className="text-xs text-brandDark-400 m-0">Geometric interpretation of MLE for MVN.</p>
                        </div>
                    </div>
                    {open.s3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s3 && (
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="flex justify-center">
                                <svg viewBox="0 0 320 280" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                                    {/* Axes */}
                                    <line x1="30" y1="250" x2="295" y2="250" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag7)" />
                                    <line x1="30" y1="250" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag7)" />
                                    <text x="298" y="254" fontSize="10" fill="#94a3b8">X₁</text>
                                    <text x="18" y="12" fontSize="10" fill="#94a3b8">X₂</text>

                                    {/* Data points (simulated scatter) */}
                                    {[[155, 130], [170, 120], [160, 140], [180, 110], [165, 125], [175, 135], [150, 145], [185, 105], [168, 128], [172, 118]].map(([x, y], i) => (
                                        <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(59,130,246,0.6)" stroke="#3b82f6" strokeWidth="0.5" />
                                    ))}

                                    {/* MLE fitted ellipse */}
                                    <ellipse cx="167" cy="126" rx="42" ry="22" fill="rgba(124,58,237,0.08)" stroke="#7c3aed" strokeWidth="2.5" transform="rotate(-20 167 126)" />
                                    <ellipse cx="167" cy="126" rx="25" ry="13" fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="1.5" transform="rotate(-20 167 126)" />

                                    {/* MLE mean (sample mean) */}
                                    <circle cx="167" cy="126" r="6" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                                    <text x="172" y="120" fontSize="9" fill="#ef4444" fontWeight="bold">x̄ = μ̂</text>

                                    {/* Mahalanobis distances from mean to points */}
                                    <line x1="167" y1="126" x2="155" y2="130" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                                    <line x1="167" y1="126" x2="185" y2="105" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />

                                    <text x="80" y="270" fontSize="9" fill="#7c3aed" fontWeight="bold">MLE fitted ellipse (Σ̂)</text>

                                    <defs>
                                        <marker id="ag7" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                                    </defs>
                                </svg>
                            </div>
                            <div className="space-y-4 text-sm">
                                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">What MLE Does Geometrically:</h4>
                                <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Blue dots</strong>: The observed data points <MathText math="\mathbf{x}_1, \ldots, \mathbf{x}_n" />.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Red dot</strong>: The MLE of the mean <MathText math="\hat{\boldsymbol{\mu}} = \bar{\mathbf{x}}" /> — the centroid of the data cloud.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-violet-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Purple ellipses</strong>: The MLE-fitted covariance ellipses <MathText math="\hat{\mathbf{\Sigma}}" /> — the ellipse that best "wraps" the data cloud, minimizing the total Mahalanobis distance from all points to the center.</div>
                                    </div>
                                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                                        <strong>Intuition:</strong> MLE simultaneously positions the center (mean) and shapes the ellipse (covariance) to maximize the probability of observing exactly the data you have. The result is the sample mean and (biased) sample covariance.
                                    </div>
                                </div>
                            </div>
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
                            <h3 className={`${fh} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Computing MLEs</h3>
                            <p className="text-xs text-brandDark-400 m-0">Numerical MLE calculation for a small dataset.</p>
                        </div>
                    </div>
                    {open.s4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s4 && (
                    <div className={`p-6 ${fb} space-y-5`}>
                        <p>Given <MathText math="n = 3" /> observations: <MathText math="\mathbf{x}_1 = (1,2)^T" />, <MathText math="\mathbf{x}_2 = (3,4)^T" />, <MathText math="\mathbf{x}_3 = (5,6)^T" />.</p>
                        <p><strong>MLE of Mean Vector:</strong></p>
                        <MathText math="\hat{\boldsymbol{\mu}} = \bar{\mathbf{x}} = \frac{1}{3}\begin{bmatrix}1+3+5\\2+4+6\end{bmatrix} = \begin{bmatrix}3\\4\end{bmatrix}" block />
                        <p><strong>MLE of Covariance Matrix (divides by n=3):</strong></p>
                        <MathText math="\hat{\mathbf{\Sigma}} = \frac{1}{3}\left[\begin{bmatrix}-2\\-2\end{bmatrix}\begin{bmatrix}-2&-2\end{bmatrix} + \begin{bmatrix}0\\0\end{bmatrix}\begin{bmatrix}0&0\end{bmatrix} + \begin{bmatrix}2\\2\end{bmatrix}\begin{bmatrix}2&2\end{bmatrix}\right] = \frac{1}{3}\begin{bmatrix}8&8\\8&8\end{bmatrix} = \begin{bmatrix}2.67&2.67\\2.67&2.67\end{bmatrix}" block />
                        <p><strong>Unbiased Sample Covariance (divides by n-1=2):</strong></p>
                        <MathText math="\mathbf{S} = \frac{1}{2}\begin{bmatrix}8&8\\8&8\end{bmatrix} = \begin{bmatrix}4&4\\4&4\end{bmatrix}" block />
                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl text-sm">
                            <strong>Comparison:</strong> <MathText math="\hat{\mathbf{\Sigma}}_{\text{MLE}} = \frac{n-1}{n}\mathbf{S} = \frac{2}{3}\mathbf{S}" />. The MLE underestimates the true covariance by a factor of <MathText math="\frac{n-1}{n} = \frac{2}{3}" />. For large <MathText math="n" />, this bias is negligible.
                        </div>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Topic7_MLEMeanDispersion;
