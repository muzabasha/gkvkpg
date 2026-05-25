import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';

interface Topic8Props { projectorMode?: boolean; }

export const Topic8_HypothesisTests: React.FC<Topic8Props> = ({ projectorMode = false }) => {
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
                            <h3 className={`${fh} m-0 text-blue-600 dark:text-blue-400`}>SECTION 1 — Storytelling: Is This Class Average Normal?</h3>
                            <p className="text-xs text-brandDark-400 m-0">From univariate t-test to multivariate Hotelling's T².</p>
                        </div>
                    </div>
                    {open.s1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s1 && (
                    <div className={`p-6 ${fb} space-y-4`}>
                        <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
                            <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                                A university claims that the average student profile is: Height = 170 cm, Weight = 65 kg, GPA = 3.5. You measure 60 students and get a sample mean vector of (172, 67, 3.6). Is this difference statistically significant, or just random sampling variation?
                            </p>
                            <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-3">
                                In univariate statistics, you'd use a t-test for a single mean. In multivariate statistics, you use <strong>Hotelling's T² test</strong> — the multivariate generalization that simultaneously tests all components of the mean vector, accounting for the correlations between variables.
                            </p>
                        </div>
                        <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
                            <h4 className="font-bold text-primary-500 mb-2">Why Not Just Run p Separate t-tests?</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Multiple testing problem</strong>: Running 3 separate t-tests at α = 0.05 gives a family-wise error rate of <MathText math="1 - (0.95)^3 \approx 14\%" /> — much higher than 5%.</li>
                                <li><strong>Ignores correlations</strong>: Height and weight are correlated. A joint test uses this information to be more powerful.</li>
                                <li><strong>Hotelling's T²</strong> controls the Type I error at exactly α while using all the correlation structure.</li>
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
                            <h3 className={`${fh} m-0 text-violet-600 dark:text-violet-400`}>SECTION 2 — Mathematical Modelling: Hotelling's T² Test</h3>
                            <p className="text-xs text-brandDark-400 m-0">Test statistic, null distribution, and decision rule.</p>
                        </div>
                    </div>
                    {open.s2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s2 && (
                    <div className={`p-6 ${fb} space-y-8`}>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">A. Hypotheses</span>
                            <p>We test whether the population mean vector equals a specified value <MathText math="\boldsymbol{\mu}_0" />:</p>
                            <MathText math="H_0: \boldsymbol{\mu} = \boldsymbol{\mu}_0 \quad \text{vs} \quad H_1: \boldsymbol{\mu} \neq \boldsymbol{\mu}_0" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <MathText math="\boldsymbol{\mu}_0" />: The hypothesized mean vector — a specific <MathText math="p \times 1" /> vector of claimed population means (e.g., the university's claimed profile).</div>
                                <div>• <MathText math="H_0" />: The null hypothesis — the population mean equals the claimed value.</div>
                                <div>• <MathText math="H_1" />: The alternative — the population mean differs from the claimed value in at least one component.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">B. Hotelling's T² Statistic</span>
                            <p>The test statistic is the multivariate analog of the squared t-statistic:</p>
                            <MathText math="T^2 = n(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div className="font-bold text-brandDark-800 dark:text-brandDark-200">Term-by-Term Interpretation:</div>
                                <div>• <MathText math="n" />: Sample size — scales the statistic so that larger samples give more evidence against <MathText math="H_0" />.</div>
                                <div>• <MathText math="(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" />: The deviation of the sample mean from the hypothesized mean — a <MathText math="p \times 1" /> vector. If <MathText math="H_0" /> is true, this should be close to <MathText math="\mathbf{0}" />.</div>
                                <div>• <MathText math="\mathbf{S}^{-1}" />: The inverse of the sample covariance matrix — standardizes the deviation by the estimated variability and accounts for correlations between variables.</div>
                                <div>• <MathText math="(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" />: The squared sample Mahalanobis distance from <MathText math="\bar{\mathbf{X}}" /> to <MathText math="\boldsymbol{\mu}_0" />. Large values indicate the sample mean is far from the hypothesized mean in the Mahalanobis sense.</div>
                                <div>• <strong>Univariate analog</strong>: For <MathText math="p=1" />, <MathText math="T^2 = n(\bar{X} - \mu_0)^2 / s^2 = t^2" /> — the square of the one-sample t-statistic.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">C. Null Distribution of T²</span>
                            <p>Under <MathText math="H_0" />, the T² statistic follows Hotelling's T² distribution, which is related to the F-distribution:</p>
                            <MathText math="T^2 \sim T^2_{p,\, n-1}" block />
                            <p className="mt-3">Equivalently, the transformed statistic follows an exact F-distribution:</p>
                            <MathText math="\frac{n-p}{p(n-1)}\, T^2 \sim F_{p,\, n-p} \quad \text{under } H_0" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <MathText math="p" />: Number of variables (dimension of the mean vector).</div>
                                <div>• <MathText math="n-1" />: Degrees of freedom of the sample covariance matrix <MathText math="\mathbf{S}" />.</div>
                                <div>• <MathText math="F_{p,\, n-p}" />: F-distribution with <MathText math="p" /> numerator and <MathText math="n-p" /> denominator degrees of freedom.</div>
                                <div>• <MathText math="\frac{n-p}{p(n-1)}" />: The scaling factor that converts T² to an F-statistic. This exact result (due to Hotelling, 1931) allows us to use standard F-tables for inference.</div>
                                <div>• <strong>Requirement</strong>: <MathText math="n > p" /> — we need more observations than variables for <MathText math="\mathbf{S}" /> to be invertible.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">D. Decision Rule</span>
                            <p>Reject <MathText math="H_0" /> at significance level <MathText math="\alpha" /> if:</p>
                            <MathText math="T^2 > \frac{p(n-1)}{n-p}\, F_{p,\, n-p;\, \alpha}" block />
                            <p className="mt-3">Equivalently, reject if the F-statistic exceeds the critical value:</p>
                            <MathText math="\frac{n-p}{p(n-1)}\, T^2 > F_{p,\, n-p;\, \alpha}" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• <MathText math="F_{p,\, n-p;\, \alpha}" />: The upper <MathText math="\alpha" />-critical value of the F-distribution — found from F-tables or software.</div>
                                <div>• <strong>p-value</strong>: <MathText math="P\!\left(F_{p,n-p} > \frac{n-p}{p(n-1)}T^2_{\text{obs}}\right)" /> — reject <MathText math="H_0" /> if p-value <MathText math="< \alpha" />.</div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block mb-2">E. Confidence Region for μ</span>
                            <p>The <MathText math="(1-\alpha) \times 100\%" /> confidence region for <MathText math="\boldsymbol{\mu}" /> is the set of all <MathText math="\boldsymbol{\mu}_0" /> not rejected by the T² test:</p>
                            <MathText math="\left\{\boldsymbol{\mu}_0 : n(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{X}} - \boldsymbol{\mu}_0) \leq \frac{p(n-1)}{n-p} F_{p,\, n-p;\, \alpha}\right\}" block />
                            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm text-brandDark-600 dark:text-brandDark-400 mt-3 space-y-2">
                                <div>• This is an <strong>ellipsoidal confidence region</strong> centered at <MathText math="\bar{\mathbf{X}}" /> in <MathText math="p" />-dimensional space.</div>
                                <div>• The shape and orientation of the ellipsoid are determined by <MathText math="\mathbf{S}^{-1}" /> — the inverse sample covariance.</div>
                                <div>• The size of the ellipsoid is controlled by the critical value <MathText math="\frac{p(n-1)}{n-p} F_{p,n-p;\alpha}" />.</div>
                                <div>• <strong>Interpretation</strong>: We are <MathText math="(1-\alpha) \times 100\%" /> confident that the true population mean vector <MathText math="\boldsymbol{\mu}" /> lies inside this ellipsoid.</div>
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
                            <h3 className={`${fh} m-0 text-emerald-600 dark:text-emerald-400`}>SECTION 3 — Visual Illustration: Confidence Ellipsoid & Rejection Region</h3>
                            <p className="text-xs text-brandDark-400 m-0">Geometric interpretation of the T² test.</p>
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
                                    <line x1="30" y1="260" x2="295" y2="260" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag8)" />
                                    <line x1="30" y1="260" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag8)" />
                                    <text x="298" y="264" fontSize="10" fill="#94a3b8">μ₁</text>
                                    <text x="18" y="12" fontSize="10" fill="#94a3b8">μ₂</text>

                                    {/* Confidence ellipsoid (acceptance region) */}
                                    <ellipse cx="165" cy="145" rx="65" ry="40" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" transform="rotate(-25 165 145)" />
                                    <text x="165" y="100" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">95% Confidence Region</text>
                                    <text x="165" y="112" textAnchor="middle" fontSize="8" fill="#10b981">(Acceptance Region for H₀)</text>

                                    {/* Sample mean */}
                                    <circle cx="165" cy="145" r="6" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
                                    <text x="170" y="140" fontSize="9" fill="#3b82f6" fontWeight="bold">X̄ (sample mean)</text>

                                    {/* μ₀ inside — do not reject */}
                                    <circle cx="150" cy="135" r="5" fill="#10b981" stroke="white" strokeWidth="1.5" />
                                    <text x="100" y="125" fontSize="8" fill="#10b981" fontWeight="bold">μ₀ (inside → fail to reject)</text>

                                    {/* μ₀ outside — reject */}
                                    <circle cx="240" cy="90" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                                    <text x="220" y="80" fontSize="8" fill="#ef4444" fontWeight="bold">μ₀* (outside → reject)</text>

                                    {/* T² distance arrows */}
                                    <line x1="165" y1="145" x2="150" y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
                                    <line x1="165" y1="145" x2="240" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                                    <text x="195" y="125" fontSize="8" fill="#ef4444">T² large</text>

                                    <defs>
                                        <marker id="ag8" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                                    </defs>
                                </svg>
                            </div>
                            <div className="space-y-4 text-sm">
                                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the Diagram:</h4>
                                <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Blue dot</strong>: The observed sample mean <MathText math="\bar{\mathbf{X}}" /> — the center of the confidence ellipsoid.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Green ellipse</strong>: The 95% confidence region for <MathText math="\boldsymbol{\mu}" />. Any <MathText math="\boldsymbol{\mu}_0" /> inside this ellipse is not rejected at <MathText math="\alpha = 0.05" />.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Green dot (μ₀ inside)</strong>: The hypothesized mean is inside the confidence region → T² is small → fail to reject <MathText math="H_0" />.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                                        <div><strong>Red dot (μ₀* outside)</strong>: The hypothesized mean is outside the confidence region → T² is large → reject <MathText math="H_0" />.</div>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                                        <strong>Key insight:</strong> The T² test is equivalent to checking whether <MathText math="\boldsymbol{\mu}_0" /> falls inside the confidence ellipsoid. The ellipsoid's shape reflects the correlation structure of the data — it is not a circle unless all variables are uncorrelated with equal variance.
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
                            <h3 className={`${fh} m-0 text-amber-600 dark:text-amber-400`}>SECTION 4 — Worked Example: Hotelling's T² Calculation</h3>
                            <p className="text-xs text-brandDark-400 m-0">Step-by-step numerical test of a mean vector hypothesis.</p>
                        </div>
                    </div>
                    {open.s4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open.s4 && (
                    <div className={`p-6 ${fb} space-y-5`}>
                        <p><strong>Setup:</strong> <MathText math="n = 25" /> students, <MathText math="p = 2" /> variables (Height, Weight). Hypothesized mean: <MathText math="\boldsymbol{\mu}_0 = (170, 65)^T" />.</p>
                        <p>Observed: <MathText math="\bar{\mathbf{x}} = (172, 67)^T" />, sample covariance: <MathText math="\mathbf{S} = \begin{bmatrix}100 & 60 \\ 60 & 64\end{bmatrix}" /></p>

                        <p><strong>Step 1 — Compute deviation:</strong></p>
                        <MathText math="\bar{\mathbf{x}} - \boldsymbol{\mu}_0 = \begin{bmatrix}172-170\\67-65\end{bmatrix} = \begin{bmatrix}2\\2\end{bmatrix}" block />

                        <p><strong>Step 2 — Compute S⁻¹:</strong></p>
                        <MathText math="|\mathbf{S}| = 100 \times 64 - 60^2 = 6400 - 3600 = 2800" block />
                        <MathText math="\mathbf{S}^{-1} = \frac{1}{2800}\begin{bmatrix}64 & -60 \\ -60 & 100\end{bmatrix}" block />

                        <p><strong>Step 3 — Compute T²:</strong></p>
                        <MathText math="T^2 = 25 \cdot \begin{bmatrix}2&2\end{bmatrix} \frac{1}{2800}\begin{bmatrix}64 & -60 \\ -60 & 100\end{bmatrix}\begin{bmatrix}2\\2\end{bmatrix}" block />
                        <MathText math="= 25 \cdot \frac{1}{2800}\begin{bmatrix}2&2\end{bmatrix}\begin{bmatrix}8\\80\end{bmatrix} = 25 \cdot \frac{176}{2800} = \frac{4400}{2800} \approx 1.571" block />

                        <p><strong>Step 4 — Convert to F-statistic:</strong></p>
                        <MathText math="F = \frac{n-p}{p(n-1)} T^2 = \frac{25-2}{2(25-1)} \times 1.571 = \frac{23}{48} \times 1.571 \approx 0.753" block />

                        <p><strong>Step 5 — Decision:</strong></p>
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm">
                            Critical value: <MathText math="F_{2,23;\, 0.05} \approx 3.42" />. Since <MathText math="F_{\text{obs}} = 0.753 < 3.42" />, we <strong>fail to reject <MathText math="H_0" /></strong> at <MathText math="\alpha = 0.05" />. The sample mean vector (172, 67) is not significantly different from the hypothesized (170, 65). The observed difference could easily be due to random sampling variation.
                        </div>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Topic8_HypothesisTests;
