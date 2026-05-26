import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';
import { Lab8_HypothesisTest } from '../../components/labs/Lab8_HypothesisTest';

interface Topic8Props { projectorMode?: boolean; }

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

export const Topic8_HypothesisTests: React.FC<Topic8Props> = ({ projectorMode = false }) => {
    const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true, s5: true });
    const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
    const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

    return (
        <div className="space-y-8 pb-16">

            {/* §1 Motivation */}
            <Sec open={open.s1} toggle={() => tog('s1')}
                icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                title="§1 — Motivation: Is This Class Average Normal?" sub="From univariate t-test to multivariate Hotelling's T²">
                <div className={`${fb} space-y-4`}>
                    <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
                        <p className="italic text-brandDark-700 dark:text-brandDark-300">
                            A university claims the average student profile is: Height = 170 cm, Weight = 65 kg, GPA = 3.5.
                            You measure 60 students and get a sample mean vector of (172, 67, 3.6). Is this difference statistically significant, or just random sampling variation?
                            In univariate statistics you'd use a t-test. In multivariate statistics you use <strong>Hotelling's T² test</strong> — the multivariate generalisation that simultaneously tests all components of the mean vector, accounting for correlations between variables.
                        </p>
                    </div>
                    <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-200/50 dark:border-brandDark-800/50 text-sm space-y-2">
                        <p className="font-bold text-brandDark-800 dark:text-brandDark-200">Why not just run p separate t-tests?</p>
                        <ul className="list-disc pl-5 space-y-1 text-brandDark-600 dark:text-brandDark-400">
                            <li><strong>Multiple testing problem:</strong> Running 3 separate t-tests at α = 0.05 gives a family-wise error rate of <MathText math="1-(0.95)^3 \approx 14\%" /> — much higher than 5%.</li>
                            <li><strong>Ignores correlations:</strong> Height and weight are correlated. A joint test uses this information to be more powerful.</li>
                            <li><strong>Hotelling's T²</strong> controls the Type I error at exactly α while using all the correlation structure.</li>
                        </ul>
                    </div>
                </div>
            </Sec>

            {/* §2 Equations */}
            <Sec open={open.s2} toggle={() => tog('s2')}
                icon={<Calculator size={22} />} color="bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
                title="§2 — Equations with Term-by-Term Breakdown" sub="Hypotheses, T² statistic, null distribution, decision rule, confidence region">

                {/* 8.1 Hypotheses */}
                <div className="space-y-3">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">8.1 Hypotheses</h4>
                    <Eq n="8.1" math="H_0:\;\boldsymbol{\mu} = \boldsymbol{\mu}_0 \qquad \text{vs} \qquad H_1:\;\boldsymbol{\mu} \neq \boldsymbol{\mu}_0" label="Null and alternative hypotheses" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="\boldsymbol{\mu}_0" meaning="The hypothesised mean vector — a specific p×1 vector of claimed population means (e.g., the university's claimed profile)." />
                                <Term sym="H_0" meaning="The null hypothesis — the population mean equals the claimed value." />
                                <Term sym="H_1" meaning="The alternative — the population mean differs from the claimed value in at least one component." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 8.2 T² statistic */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">8.2 Hotelling's T² Statistic</h4>
                    <Eq n="8.2" math="T^2 \;=\; n\,(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)^T\,\mathbf{S}^{-1}\,(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" label="Hotelling's T² statistic" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="n" meaning="Sample size — scales the statistic so that larger samples give more evidence against H₀." />
                                <Term sym="(\bar{\mathbf{X}} - \boldsymbol{\mu}_0)" meaning="The deviation of the sample mean from the hypothesised mean — a p×1 vector. If H₀ is true, this should be close to 0." />
                                <Term sym="\mathbf{S}^{-1}" meaning="The inverse of the sample covariance matrix — standardises the deviation by the estimated variability and accounts for correlations between variables." />
                                <Term sym="(\bar{\mathbf{X}}-\boldsymbol{\mu}_0)^T\mathbf{S}^{-1}(\bar{\mathbf{X}}-\boldsymbol{\mu}_0)" meaning="The squared sample Mahalanobis distance from X̄ to μ₀. Large values indicate the sample mean is far from the hypothesised mean." />
                                <Term sym="T^2 = t^2 \text{ when } p=1" meaning="Univariate analog: for p=1, T² = n(X̄−μ₀)²/s² = t² — the square of the one-sample t-statistic." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 8.3 Null distribution */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">8.3 Null Distribution of T²</h4>
                    <Eq n="8.3" math="T^2 \;\sim\; T^2_{p,\,n-1} \quad \text{under } H_0" label="Hotelling's T² distribution" />
                    <p className={`${fb} text-sm`}>Equivalently, the transformed statistic follows an exact F-distribution:</p>
                    <Eq n="8.4" math="\frac{n-p}{p(n-1)}\,T^2 \;\sim\; F_{p,\,n-p} \quad \text{under } H_0" label="F-distribution equivalence" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="p" meaning="Number of variables (dimension of the mean vector) — the numerator degrees of freedom." />
                                <Term sym="n-1" meaning="Degrees of freedom of the sample covariance matrix S." />
                                <Term sym="F_{p,\,n-p}" meaning="F-distribution with p numerator and n−p denominator degrees of freedom." />
                                <Term sym="\frac{n-p}{p(n-1)}" meaning="The scaling factor that converts T² to an F-statistic. This exact result (Hotelling, 1931) allows use of standard F-tables for inference." />
                                <Term sym="n > p" meaning="Requirement: we need more observations than variables for S to be invertible." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 8.4 Decision rule */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">8.4 Decision Rule</h4>
                    <p className={fb}>Reject <MathText math="H_0" /> at significance level <MathText math="\alpha" /> if:</p>
                    <Eq n="8.5" math="T^2 \;>\; \frac{p(n-1)}{n-p}\,F_{p,\,n-p;\,\alpha}" label="Rejection criterion (T² form)" />
                    <p className={`${fb} text-sm`}>Equivalently, reject if the F-statistic exceeds the critical value:</p>
                    <Eq n="8.6" math="\frac{n-p}{p(n-1)}\,T^2 \;>\; F_{p,\,n-p;\,\alpha}" label="Rejection criterion (F form)" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="F_{p,\,n-p;\,\alpha}" meaning="The upper α-critical value of the F-distribution — found from F-tables or software." />
                                <Term sym="\frac{p(n-1)}{n-p}\,F_{p,n-p;\alpha}" meaning="The critical value in T² units — the threshold above which we reject H₀." />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 8.5 Confidence region */}
                <div className="space-y-3 pt-4 border-t border-brandDark-100 dark:border-brandDark-800">
                    <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">8.5 Confidence Region for μ</h4>
                    <Eq n="8.7" math="\left\{\boldsymbol{\mu}_0 \;:\; n(\bar{\mathbf{X}}-\boldsymbol{\mu}_0)^T\mathbf{S}^{-1}(\bar{\mathbf{X}}-\boldsymbol{\mu}_0) \;\leq\; \frac{p(n-1)}{n-p}\,F_{p,\,n-p;\,\alpha}\right\}" label="(1−α)×100% confidence region" />
                    <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52">Term</th>
                                <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300">Meaning</th>
                            </tr></thead>
                            <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                                <Term sym="\{\boldsymbol{\mu}_0 : \cdots\}" meaning="The set of all hypothesised mean vectors not rejected by the T² test — an ellipsoidal region in p-dimensional space." />
                                <Term sym="\mathbf{S}^{-1}" meaning="Determines the shape and orientation of the confidence ellipsoid — the inverse sample covariance." />
                                <Term sym="\frac{p(n-1)}{n-p}\,F_{p,n-p;\alpha}" meaning="Controls the size of the ellipsoid — larger α → smaller ellipsoid → less confidence." />
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-xl text-sm text-emerald-800 dark:text-emerald-300">
                        <strong>Interpretation:</strong> We are <MathText math="(1-\alpha)\times 100\%" /> confident that the true population mean vector <MathText math="\boldsymbol{\mu}" /> lies inside this ellipsoid. The T² test (Eq. 8.2) is equivalent to checking whether <MathText math="\boldsymbol{\mu}_0" /> falls inside the confidence ellipsoid (Eq. 8.7).
                    </div>
                </div>
            </Sec>

            {/* §3 Illustration */}
            <Sec open={open.s3} toggle={() => tog('s3')}
                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                title="§3 — Illustration: Confidence Ellipsoid & Rejection Region" sub="Geometric interpretation of the T² test in parameter space">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex justify-center">
                        <svg viewBox="0 0 340 310" className="w-full max-w-sm border border-brandDark-100 dark:border-brandDark-800 rounded-2xl bg-brandDark-50/30 dark:bg-brandDark-950/30 p-2">
                            <line x1="40" y1="265" x2="310" y2="265" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a8g)" />
                            <line x1="40" y1="265" x2="40" y2="18" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#a8g)" />
                            <text x="313" y="269" fontSize="11" fill="#94a3b8" fontWeight="bold">μ₁</text>
                            <text x="26" y="14" fontSize="11" fill="#94a3b8" fontWeight="bold">μ₂</text>

                            {/* Confidence ellipsoid — acceptance region */}
                            <ellipse cx="175" cy="148" rx="72" ry="44" fill="rgba(16,185,129,0.07)" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3" transform="rotate(-20 175 148)" />
                            <text x="175" y="96" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">95% Confidence Region</text>
                            <text x="175" y="108" textAnchor="middle" fontSize="8" fill="#10b981">Eq. (8.7) — Acceptance region for H₀</text>

                            {/* Sample mean X̄ */}
                            <circle cx="175" cy="148" r="7" fill="#3b82f6" stroke="white" strokeWidth="2" />
                            <text x="182" y="143" fontSize="9" fill="#3b82f6" fontWeight="bold">X̄ (Eq.6.1)</text>

                            {/* μ₀ inside — fail to reject */}
                            <circle cx="158" cy="138" r="6" fill="#10b981" stroke="white" strokeWidth="1.5" />
                            <text x="100" y="128" fontSize="8" fill="#10b981" fontWeight="bold">μ₀ inside → fail to reject H₀</text>
                            <line x1="175" y1="148" x2="158" y2="138" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
                            <text x="155" y="155" fontSize="8" fill="#10b981">T² small</text>

                            {/* μ₀* outside — reject */}
                            <circle cx="268" cy="88" r="6" fill="#ef4444" stroke="white" strokeWidth="1.5" />
                            <text x="240" y="78" fontSize="8" fill="#ef4444" fontWeight="bold">μ₀* outside → reject H₀</text>
                            <line x1="175" y1="148" x2="268" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                            <text x="218" y="128" fontSize="8" fill="#ef4444">T² large</text>

                            {/* T² label */}
                            <text x="42" y="285" fontSize="8" fill="#3b82f6">T² = n(X̄−μ₀)ᵀS⁻¹(X̄−μ₀) — Eq.(8.2)</text>

                            <defs>
                                <marker id="a8g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" /></marker>
                            </defs>
                        </svg>
                    </div>
                    <div className="space-y-4 text-sm">
                        <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">Reading the diagram</h4>
                        <div className="space-y-3 text-brandDark-600 dark:text-brandDark-400">
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Blue dot (X̄)</strong> — the observed sample mean (Eq. 6.1) — the centre of the confidence ellipsoid.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Green ellipse</strong> — the 95% confidence region (Eq. 8.7). Any <MathText math="\boldsymbol{\mu}_0" /> inside this ellipse is not rejected at <MathText math="\alpha = 0.05" />.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Green dot (μ₀ inside)</strong> — T² (Eq. 8.2) is small → fail to reject <MathText math="H_0" />. The hypothesised mean is plausible given the data.</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                                <div><strong>Red dot (μ₀* outside)</strong> — T² (Eq. 8.2) is large → reject <MathText math="H_0" /> (Eq. 8.5). The hypothesised mean is too far from the sample mean.</div>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                                <strong>Key insight:</strong> The T² test is equivalent to checking whether <MathText math="\boldsymbol{\mu}_0" /> falls inside the confidence ellipsoid (Eq. 8.7). The ellipsoid's shape reflects the correlation structure of the data — it is not a circle unless all variables are uncorrelated with equal variance.
                            </div>
                        </div>
                    </div>
                </div>
            </Sec>

            {/* §4 Worked Example */}
            <Sec open={open.s4} toggle={() => tog('s4')}
                icon={<HelpCircle size={22} />} color="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                title="§4 — Worked Example: Hotelling's T² Calculation" sub="Step-by-step numerical test of a mean vector hypothesis">
                <div className={`${fb} space-y-4`}>
                    <p><strong>Setup:</strong> <MathText math="n = 25" /> students, <MathText math="p = 2" /> variables (Height, Weight). Hypothesised mean: <MathText math="\boldsymbol{\mu}_0 = (170, 65)^T" />.</p>
                    <p>Observed: <MathText math="\bar{\mathbf{x}} = (172, 67)^T" />, sample covariance: <MathText math="\mathbf{S} = \begin{bmatrix}100&60\\60&64\end{bmatrix}" /></p>
                    <p><strong>Step 1 — Deviation from hypothesised mean:</strong></p>
                    <Eq n="8.8" math="\bar{\mathbf{x}} - \boldsymbol{\mu}_0 = \begin{bmatrix}172-170\\67-65\end{bmatrix} = \begin{bmatrix}2\\2\end{bmatrix}" label="Deviation vector" />
                    <p><strong>Step 2 — Determinant and inverse of S (Eq. 5.12 pattern):</strong></p>
                    <Eq n="8.9" math="|\mathbf{S}| = 100\cdot64 - 60^2 = 6400 - 3600 = 2800" label="Determinant" />
                    <Eq n="8.10" math="\mathbf{S}^{-1} = \frac{1}{2800}\begin{bmatrix}64&-60\\-60&100\end{bmatrix}" label="Inverse of S" />
                    <p><strong>Step 3 — Hotelling's T² (Eq. 8.2):</strong></p>
                    <Eq n="8.11" math="T^2 = 25\cdot\begin{bmatrix}2&2\end{bmatrix}\frac{1}{2800}\begin{bmatrix}64&-60\\-60&100\end{bmatrix}\begin{bmatrix}2\\2\end{bmatrix} = 25\cdot\frac{1}{2800}\begin{bmatrix}2&2\end{bmatrix}\begin{bmatrix}8\\80\end{bmatrix} = 25\cdot\frac{176}{2800} \approx 1.571" label="T² value" />
                    <p><strong>Step 4 — Convert to F-statistic (Eq. 8.4):</strong></p>
                    <Eq n="8.12" math="F = \frac{n-p}{p(n-1)}\,T^2 = \frac{25-2}{2(25-1)}\times 1.571 = \frac{23}{48}\times 1.571 \approx 0.753" label="F-statistic" />
                    <p><strong>Step 5 — Decision (Eq. 8.6):</strong></p>
                    <Eq n="8.13" math="F_{\text{obs}} = 0.753 \;<\; F_{2,\,23;\,0.05} \approx 3.42 \;\Rightarrow\; \text{Fail to reject } H_0" label="Decision" />
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl text-sm">
                        <strong>Conclusion:</strong> The sample mean vector (172, 67) is not significantly different from the hypothesised (170, 65) at <MathText math="\alpha = 0.05" />. The observed difference could easily be due to random sampling variation. The hypothesised mean vector lies inside the 95% confidence ellipsoid (Eq. 8.7).
                    </div>
                </div>
            </Sec>

            {/* §5 — Virtual Interactive Laboratory */}
            <Sec open={open.s5} toggle={() => tog('s5')}
                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                title="§5 — Virtual Interactive Laboratory" sub="Repeatedly sample and compute T² to observe rejection rates and the F-distribution">
                <Lab8_HypothesisTest />
            </Sec>

        </div>
    );
};

export default Topic8_HypothesisTests;
