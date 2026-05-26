import re

with open('src/modules/block1/Topic1_RandomVector.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start marker
start_marker = '            {/* Theoretical concepts with KaTeX */}\n            <div className={`${fontBody} space-y-6`}>\n              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">1. Formal Definitions & Mathematical Anatomy</h4>'

# Find the end marker — the closing of the illustration div, right before the Interactive Slider Widget
end_marker = '            {/* Interactive Slider Widget */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1:
    print("ERROR: start marker not found")
    exit(1)
if end_idx == -1:
    print("ERROR: end marker not found")
    exit(1)

print(f"Found start at {start_idx}, end at {end_idx}")

replacement = '''            {/* Theoretical concepts with KaTeX — numbered equations */}
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Formal Definitions &amp; Mathematical Anatomy
              </h4>

              {/* A. Random Vector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Random Vector</span>
                <p>A <strong>Random Vector</strong> <MathText math="\\\\mathbf{X}_{p \\\\times 1}" /> aggregates <MathText math="p" /> individual random variables into a single algebraic column vector:</p>
                <Eq n="1.1" math="\\\\mathbf{X} = \\\\begin{bmatrix} X_1 \\\\\\\\ X_2 \\\\\\\\ \\\\vdots \\\\\\\\ X_p \\\\end{bmatrix}" label="Random Vector" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="X_i" meaning="A distinct univariate random variable representing one measurement scale (e.g., X₁ = Student Height, X₂ = Student Shoe Size)." />
                    <Term sym="p" meaning="The total number of dimensions — the number of variables being measured simultaneously." />
                    <Term sym="\\\\mathbf{X}_{p \\\\times 1}" meaning={<>Column orientation is mandatory so that linear transformations can be computed via matrix multiplication: <MathText math="\\\\mathbf{Y} = \\\\mathbf{A}\\\\mathbf{X}" />.</>} />
                  </tbody></table>
                </div>
              </div>

              {/* B. Mean Vector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. The Expectation Vector (Centre of Gravity)</span>
                <p>The <strong>Mean Vector</strong> <MathText math="\\\\boldsymbol{\\\\mu}" /> locates the multi-dimensional centre of mass of the probability density cloud:</p>
                <Eq n="1.2" math="\\\\boldsymbol{\\\\mu} = E[\\\\mathbf{X}] = \\\\begin{bmatrix} E[X_1] \\\\\\\\ E[X_2] \\\\\\\\ \\\\vdots \\\\\\\\ E[X_p] \\\\end{bmatrix} = \\\\begin{bmatrix} \\\\mu_1 \\\\\\\\ \\\\mu_2 \\\\\\\\ \\\\vdots \\\\\\\\ \\\\mu_p \\\\end{bmatrix}" label="Mean Vector" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="E[\\\\mathbf{X}]" meaning="The expectation operator applied to the entire random vector — returns a vector of the same dimension p." />
                    <Term sym="E[X_i] = \\\\int x\\\\,f_i(x)\\\\,dx" meaning="The scalar expected value of the i-th component — the probability-weighted average of all possible values of X_i." />
                    <Term sym="\\\\mu_i" meaning="The standalone population average of variable X_i — the i-th entry of the mean vector." />
                  </tbody></table>
                </div>
              </div>

              {/* C. Covariance Matrix */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">C. The Variance-Covariance Matrix (Dispersion Matrix)</span>
                <p>The <strong>Covariance Matrix</strong> <MathText math="\\\\mathbf{\\\\Sigma}" /> captures both the individual spreads and the mutual linear associations between all variables:</p>
                <Eq n="1.3" math="\\\\mathbf{\\\\Sigma} = E\\\\!\\\\left[(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})^T\\\\right] = \\\\begin{bmatrix} \\\\sigma_1^2 & \\\\sigma_{12} & \\\\cdots & \\\\sigma_{1p} \\\\\\\\ \\\\sigma_{21} & \\\\sigma_2^2 & \\\\cdots & \\\\sigma_{2p} \\\\\\\\ \\\\vdots & \\\\vdots & \\\\ddots & \\\\vdots \\\\\\\\ \\\\sigma_{p1} & \\\\sigma_{p2} & \\\\cdots & \\\\sigma_p^2 \\\\end{bmatrix}" label="Variance-Covariance Matrix" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})" meaning="The deviation vector — how far a particular observation falls from the class centre of mass. A p×1 column vector." />
                    <Term sym="(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})^T" meaning="The transpose — turns the column deviation vector into a row vector." />
                    <Term sym="(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})(\\\\mathbf{X}-\\\\boldsymbol{\\\\mu})^T" meaning="The outer product — yields a symmetric p×p matrix of deviation products (not a scalar dot product)." />
                    <Term sym="\\\\sigma_i^2 \\\\geq 0" meaning="Diagonal entries — the variance of variable X_i. Always non-negative; measures standalone spread." />
                    <Term sym="\\\\sigma_{ij} = \\\\sigma_{ji}" meaning={<>Off-diagonal entries — the covariance between <MathText math="X_i" /> and <MathText math="X_j" />. Positive: they scale together; negative: one rises as the other falls; zero: no linear dependency.</>} />
                    <Term sym="\\\\mathbf{\\\\Sigma} = \\\\mathbf{\\\\Sigma}^T" meaning="Symmetry — covariance is commutative, so the matrix equals its own transpose." />
                  </tbody></table>
                </div>
              </div>

              {/* D. Bivariate Normal Density */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">D. Bivariate Normal Density Function</span>
                <p>For two variables (Height <MathText math="X" /> and Shoe Size <MathText math="Y" />), the joint probability density is:</p>
                <Eq n="1.4" math="f(x,y) = \\\\frac{1}{2\\\\pi\\\\sigma_X\\\\sigma_Y\\\\sqrt{1-\\\\rho^2}} \\\\exp\\\\!\\\\left(-\\\\frac{1}{2(1-\\\\rho^2)}\\\\left[\\\\frac{(x-\\\\mu_X)^2}{\\\\sigma_X^2} - \\\\frac{2\\\\rho(x-\\\\mu_X)(y-\\\\mu_Y)}{\\\\sigma_X\\\\sigma_Y} + \\\\frac{(y-\\\\mu_Y)^2}{\\\\sigma_Y^2}\\\\right]\\\\right)" label="Bivariate Normal Density" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="\\\\rho = \\\\frac{\\\\sigma_{XY}}{\\\\sigma_X\\\\sigma_Y}" meaning="Correlation coefficient — a scale-free, normalised covariance index bounded strictly within [−1, 1]." />
                    <Term sym="\\\\frac{1}{2\\\\pi\\\\sigma_X\\\\sigma_Y\\\\sqrt{1-\\\\rho^2}}" meaning="Normalisation constant — guarantees the total volume beneath the density surface integrates to exactly 1." />
                    <Term sym="\\\\sigma_X\\\\sigma_Y\\\\sqrt{1-\\\\rho^2}" meaning="Generalised standard deviation — measures the volume of the probability ellipsoid. Larger spread → flatter density peak." />
                    <Term sym="\\\\frac{(x-\\\\mu_X)^2}{\\\\sigma_X^2}" meaning="Normalised squared deviation along the X axis." />
                    <Term sym="\\\\frac{(y-\\\\mu_Y)^2}{\\\\sigma_Y^2}" meaning="Normalised squared deviation along the Y axis." />
                    <Term sym="-\\\\frac{2\\\\rho(x-\\\\mu_X)(y-\\\\mu_Y)}{\\\\sigma_X\\\\sigma_Y}" meaning="Cross-interaction term — when ρ > 0, deviations of the same sign raise the density, tilting the contour ellipse upward." />
                  </tbody></table>
                </div>
              </div>

              {/* E. Pearson Correlation */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">E. Pearson Correlation Coefficient</span>
                <Eq n="1.5" math="\\\\rho_{ij} = \\\\frac{\\\\sigma_{ij}}{\\\\sigma_i\\\\,\\\\sigma_j} \\\\;\\\\in\\\\; [-1,\\\\,1]" label="Pearson Correlation" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="\\\\sigma_{ij}" meaning="The covariance between X_i and X_j — the numerator, measuring joint variability." />
                    <Term sym="\\\\sigma_i\\\\,\\\\sigma_j" meaning="Product of the individual standard deviations — the denominator, normalising the covariance to a dimensionless scale." />
                    <Term sym="\\\\rho_{ij} \\\\in [-1,1]" meaning="Bounded range: +1 = perfect positive linear relationship; −1 = perfect negative; 0 = no linear association." />
                  </tbody></table>
                </div>
              </div>

              {/* F. Linear Transformation */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">F. Linear Transformation of a Random Vector</span>
                <p>If <MathText math="\\\\mathbf{Y} = \\\\mathbf{A}\\\\mathbf{X} + \\\\mathbf{b}" /> where <MathText math="\\\\mathbf{A}" /> is a <MathText math="q \\\\times p" /> constant matrix:</p>
                <Eq n="1.6a" math="E[\\\\mathbf{Y}] = \\\\mathbf{A}\\\\boldsymbol{\\\\mu} + \\\\mathbf{b}" label="Mean of linear transform" />
                <Eq n="1.6b" math="\\\\text{Cov}(\\\\mathbf{Y}) = \\\\mathbf{A}\\\\,\\\\mathbf{\\\\Sigma}\\\\,\\\\mathbf{A}^T" label="Covariance of linear transform (sandwich formula)" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                    <Term sym="\\\\mathbf{A}\\\\,\\\\mathbf{\\\\Sigma}\\\\,\\\\mathbf{A}^T" meaning="The sandwich formula — matrix A rotates and scales the covariance structure. Foundation of PCA (choosing A to diagonalise Σ)." />
                    <Term sym="\\\\mathbf{b}" meaning="The constant shift — does not affect the covariance. Shifting data does not change its spread or correlations." />
                  </tbody></table>
                </div>
              </div>

              {/* Illustration */}
              <div className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-500 animate-pulse" />
                  <span className="font-bold text-xs uppercase tracking-wider text-brandDark-700 dark:text-brandDark-300">
                    Visual Illustration — Ellipsoidal Contour Anatomy (Eq. 1.3 &amp; 1.4)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex justify-center">
                    <svg className="w-64 h-64 border border-brandDark-100 dark:border-brandDark-850 rounded-xl bg-brandDark-50/20" viewBox="0 0 200 200">
                      <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(148,163,184,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(148,163,184,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                      <ellipse cx="100" cy="100" rx="60" ry="30" fill="none" stroke="url(#ellipseGrad)" strokeWidth="2" transform="rotate(-30 100 100)" />
                      <ellipse cx="100" cy="100" rx="40" ry="20" fill="none" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="1.5" transform="rotate(-30 100 100)" />
                      <ellipse cx="100" cy="100" rx="20" ry="10" fill="rgba(124, 58, 237, 0.05)" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1" transform="rotate(-30 100 100)" />
                      <circle cx="100" cy="100" r="4" fill="#3b66ff" />
                      <line x1="100" y1="100" x2="152" y2="70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <line x1="100" y1="100" x2="85" y2="74" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow)" />
                      <text x="100" y="114" fill="#3b66ff" fontSize="8" fontWeight="bold" textAnchor="middle">μ = [μ_X, μ_Y]ᵀ  Eq.(1.2)</text>
                      <text x="148" y="62" fill="#10b981" fontSize="8" fontWeight="bold">v₁ (√λ₁)</text>
                      <text x="44" y="68" fill="#ec4899" fontSize="8" fontWeight="bold">v₂ (√λ₂)</text>
                      <text x="100" y="190" fill="#7c3aed" fontSize="7" textAnchor="middle">Eq.(1.3) contours — Eq.(1.4) density</text>
                      <defs>
                        <linearGradient id="ellipseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#3b66ff" stopOpacity="0.8" />
                        </linearGradient>
                        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="context-stroke" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  <div className="md:col-span-7 space-y-2 text-sm">
                    <h6 className="font-extrabold text-brandDark-800 dark:text-brandDark-200">How the Contours Map to Equations:</h6>
                    <div className="space-y-2 text-brandDark-600 dark:text-brandDark-400">
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-1" /><div><strong>Blue dot (μ)</strong> — the mean vector (Eq. 1.2). Centre of the ellipse = peak of the density surface.</div></div>
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-violet-500 flex-shrink-0 mt-1" /><div><strong>Purple ellipses</strong> — level sets of Eq. 1.4. Tilt angle is determined by <MathText math="\\\\rho" /> (Eq. 1.5). Zero covariance → axes-aligned circle.</div></div>
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 mt-1" /><div><strong>Green arrow (v₁)</strong> — first eigenvector of <MathText math="\\\\mathbf{\\\\Sigma}" /> (Eq. 1.3). Direction of maximum variance. Length = <MathText math="\\\\sqrt{\\\\lambda_1}" />.</div></div>
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-pink-500 flex-shrink-0 mt-1" /><div><strong>Pink arrow (v₂)</strong> — second eigenvector. Orthogonal to v₁. Length = <MathText math="\\\\sqrt{\\\\lambda_2}" />.</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

'''

new_content = content[:start_idx] + replacement + content[end_idx:]

with open('src/modules/block1/Topic1_RandomVector.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done. File written successfully.")
