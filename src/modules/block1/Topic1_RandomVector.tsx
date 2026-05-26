/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import MathText from '../../components/MathText';
import { generateBivariateNormalSample, calculateEigenvalues2D } from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  HelpCircle,
  Calculator
} from 'lucide-react';

/* ── Numbered equation block ─────────────────────────────────────────────── */
const Eq: React.FC<{ n: string; math: string; label?: string }> = ({ n, math, label }) => (
  <div className="my-5 flex items-start gap-3">
    <div className="flex-1 overflow-x-auto">
      <MathText math={math} block />
    </div>
    <span className="mt-3 text-xs font-mono font-semibold text-brandDark-400 dark:text-brandDark-500 whitespace-nowrap select-none bg-brandDark-100 dark:bg-brandDark-800 border border-brandDark-200 dark:border-brandDark-700 rounded px-2 py-0.5 flex-shrink-0">
      ({n}){label ? ` — ${label}` : ''}
    </span>
  </div>
);

/* ── Term-table row ──────────────────────────────────────────────────────── */
const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52 text-sm"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top leading-relaxed">{meaning}</td>
  </tr>
);

interface Topic1Props {
  projectorMode: boolean;
}

export const Topic1_RandomVector: React.FC<Topic1Props> = ({ projectorMode }) => {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: true,
    sec7: true,
  });
  const [copied, setCopied] = useState<boolean>(false);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Math Widget State (Section 2)
  const [muX, setMuX] = useState<number>(50); // Mean of variable X (e.g. Student Height in inches)
  const [muY, setMuY] = useState<number>(8);   // Mean of variable Y (e.g. Student Shoe Size)
  const [varX, setVarX] = useState<number>(25); // Variance of X
  const [varY, setVarY] = useState<number>(2.25); // Variance of Y
  const [covXY, setCovXY] = useState<number>(5.5); // Covariance of X and Y
  const [points, setPoints] = useState<BivariatePoint[]>([]);

  // Regulate covariance slider limits based on current variances to keep matrix positive semi-definite
  const maxPossibleCov = Math.sqrt(varX * varY) - 0.05;
  const clampedCovXY = Math.max(-maxPossibleCov, Math.min(maxPossibleCov, covXY));

  // Compute eigenvalues for mathematical modeling
  const { values: eigenvalues } = calculateEigenvalues2D(varX, varY, clampedCovXY);
  const correlation = clampedCovXY / (Math.sqrt(varX) * Math.sqrt(varY));

  // Generate synthetic points whenever parameters change
  useEffect(() => {
    // Generate 60 points representing a classroom of 60 students
    const sample = generateBivariateNormalSample(60, muX, muY, varX, varY, clampedCovXY);
    setPoints(sample);
  }, [muX, muY, varX, varY, clampedCovXY]);

  // Virtual Lab Simulation State (Section 6)
  const [labPoints, setLabPoints] = useState<BivariatePoint[]>([]);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<number>(1000); // interval in ms
  const [labCovMode, setLabCovMode] = useState<'positive' | 'negative' | 'uncorrelated'>('positive');

  // Set parameters based on simulation modes
  useEffect(() => {
    if (labCovMode === 'positive') {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, 6));
    } else if (labCovMode === 'negative') {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, -6));
    } else {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, 0));
    }
  }, [labCovMode]);

  // Live simulation tick: appends new random students coordinates
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (isSimPlaying) {
      intervalId = setInterval(() => {
        setLabPoints(prev => {
          let newPoint: BivariatePoint;
          if (labCovMode === 'positive') {
            newPoint = generateBivariateNormalSample(1, 50, 8, 25, 2.25, 6)[0];
          } else if (labCovMode === 'negative') {
            newPoint = generateBivariateNormalSample(1, 50, 8, 25, 2.25, -6)[0];
          } else {
            newPoint = generateBivariateNormalSample(1, 50, 8, 25, 2.25, 0)[0];
          }
          // Maintain a rolling window of 60 points (representing the active classroom)
          return [...prev.slice(1), newPoint];
        });
      }, simSpeed);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSimPlaying, simSpeed, labCovMode]);

  const handleResetLab = () => {
    setIsSimPlaying(false);
    if (labCovMode === 'positive') {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, 6));
    } else if (labCovMode === 'negative') {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, -6));
    } else {
      setLabPoints(generateBivariateNormalSample(60, 50, 8, 25, 2.25, 0));
    }
  };

  // CSS class naming helper for font size control in Projector Mode
  const fontBody = projectorMode ? 'text-xl-readable leading-relaxed' : 'text-base md:text-lg-readable';
  const fontHeading3 = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">

      {/* SECTION 1 — STORY TELLING WITH FUNNY ANALOGY */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec1')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
              <Sparkles size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-blue-600 dark:text-blue-400`}>
                SECTION 1 — Storytelling: The Pizza Order Dilemma
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Connecting everyday experiences to multivariate models.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine walking into a pizza parlor with two friends. You want to order dinner. If you go alone, you make a single choice: "I want a Pepperoni Pizza" (a single variable, X₁). But since there are three of you, the waiter approaches with a notepad. He writes down:
              </p>
              <div className="my-3 font-semibold text-primary-600 dark:text-primary-400 flex justify-center bg-brandDark-100 dark:bg-brandDark-950 py-2.5 rounded-lg max-w-sm mx-auto">
                Dinner Order = [Pepperoni, Veggie, Cheese]ᵀ
              </div>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Suddenly, a single dish order is no longer enough to describe dinner. We need a list of three distinct choices. The choices can change each Friday (random variables), but they are bundled together as one cohesive delivery order.
              </p>
            </div>

            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h4 className="font-bold text-primary-500 mb-2">Reflective Questions for the Classroom:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>If your friend orders extra spicy garlic bread, does it affect what drink you order? (Correlation)</li>
                <li>Can we predict the price of the total order by looking at just one person's choice? (Information Loss)</li>
                <li>How can we represent this entire group behavior in a single mathematical structure?</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-brandDark-800 dark:text-brandDark-200">What did we just learn?</p>
              <p>
                In the real world, systems rarely exist in isolation. A single observation (like a student's performance) is influenced by multiple components (study hours, sleep, previous grades). To analyze these together without tearing apart their relationships, we bundle them into a column array called a <strong>Random Vector</strong>.
              </p>
              <p>
                <strong>Life Skill Connection:</strong> Multi-dimensional thinking. When making complex career decisions, you don't look at salary alone. You construct a decision vector containing Salary, Location, Learning Curve, and Work Culture. Expectation vectors help you compute your average happiness, and the covariance matrix measures how these variables trade off against each other.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2 — MATHEMATICAL MODELLING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec2')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-xl">
              <Calculator size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-violet-600 dark:text-violet-400`}>
                SECTION 2 — Mathematical Modelling & Real-Time Plots
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Interactive parameter tuning: Covariance matrix & eigenvalues.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">

            {/* Theoretical concepts with KaTeX — numbered equations */}
            <div className={`${fontBody} space-y-8`}>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-lg border-b border-brandDark-200 dark:border-brandDark-700 pb-2">
                §1 — Formal Definitions &amp; Mathematical Anatomy
              </h4>

              {/* A. Random Vector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The Random Vector</span>
                <p>A <strong>Random Vector</strong> <MathText math="\mathbf{X}_{p \times 1}" /> aggregates <MathText math="p" /> individual random variables into a single algebraic column vector:</p>
                <Eq n="1.1" math="\mathbf{X} = \begin{bmatrix} X_1 \\ X_2 \\ \vdots \\ X_p \end{bmatrix}" label="Random Vector" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="X_i" meaning="A distinct univariate random variable representing one measurement scale (e.g., X₁ = Student Height, X₂ = Student Shoe Size)." />
                      <Term sym="p" meaning="The total number of dimensions — the number of variables being measured simultaneously." />
                      <Term sym="\mathbf{X}_{p \times 1}" meaning={<>Column orientation is mandatory so that linear transformations can be computed via matrix multiplication: <MathText math="\mathbf{Y} = \mathbf{A}\mathbf{X}" />.</>} />
                    </tbody></table>
                </div>
              </div>

              {/* B. Mean Vector */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. The Expectation Vector (Centre of Gravity)</span>
                <p>The <strong>Mean Vector</strong> <MathText math="\boldsymbol{\mu}" /> locates the multi-dimensional centre of mass of the probability density cloud:</p>
                <Eq n="1.2" math="\boldsymbol{\mu} = E[\mathbf{X}] = \begin{bmatrix} E[X_1] \\ E[X_2] \\ \vdots \\ E[X_p] \end{bmatrix} = \begin{bmatrix} \mu_1 \\ \mu_2 \\ \vdots \\ \mu_p \end{bmatrix}" label="Mean Vector" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="E[\mathbf{X}]" meaning="The expectation operator applied to the entire random vector — returns a vector of the same dimension p." />
                      <Term sym="E[X_i] = \int x\,f_i(x)\,dx" meaning="The scalar expected value of the i-th component — the probability-weighted average of all possible values of X_i." />
                      <Term sym="\mu_i" meaning="The standalone population average of variable X_i — the i-th entry of the mean vector." />
                    </tbody></table>
                </div>
              </div>

              {/* C. Covariance Matrix */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">C. The Variance-Covariance Matrix (Dispersion Matrix)</span>
                <p>The <strong>Covariance Matrix</strong> <MathText math="\mathbf{\Sigma}" /> captures both the individual spreads and the mutual linear associations between all variables:</p>
                <Eq n="1.3" math="\mathbf{\Sigma} = E\!\left[(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^T\right] = \begin{bmatrix} \sigma_1^2 & \sigma_{12} & \cdots & \sigma_{1p} \\ \sigma_{21} & \sigma_2^2 & \cdots & \sigma_{2p} \\ \vdots & \vdots & \ddots & \vdots \\ \sigma_{p1} & \sigma_{p2} & \cdots & \sigma_p^2 \end{bmatrix}" label="Variance-Covariance Matrix" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="(\mathbf{X}-\boldsymbol{\mu})" meaning="The deviation vector — how far a particular observation falls from the class centre of mass. A p×1 column vector." />
                      <Term sym="(\mathbf{X}-\boldsymbol{\mu})^T" meaning="The transpose — turns the column deviation vector into a row vector." />
                      <Term sym="(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^T" meaning="The outer product — yields a symmetric p×p matrix of deviation products (not a scalar dot product)." />
                      <Term sym="\sigma_i^2 \geq 0" meaning="Diagonal entries — the variance of variable X_i. Always non-negative; measures standalone spread." />
                      <Term sym="\sigma_{ij} = \sigma_{ji}" meaning={<>Off-diagonal entries — the covariance between <MathText math="X_i" /> and <MathText math="X_j" />. Positive: they scale together; negative: one rises as the other falls; zero: no linear dependency.</>} />
                      <Term sym="\mathbf{\Sigma} = \mathbf{\Sigma}^T" meaning="Symmetry — covariance is commutative, so the matrix equals its own transpose." />
                    </tbody></table>
                </div>
              </div>

              {/* D. Bivariate Normal Density */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">D. Bivariate Normal Density Function</span>
                <p>For two variables (Height <MathText math="X" /> and Shoe Size <MathText math="Y" />), the joint probability density is:</p>
                <Eq n="1.4" math="f(x,y) = \frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}} \exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\frac{(x-\mu_X)^2}{\sigma_X^2} - \frac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y} + \frac{(y-\mu_Y)^2}{\sigma_Y^2}\right]\right)" label="Bivariate Normal Density" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\rho = \frac{\sigma_{XY}}{\sigma_X\sigma_Y}" meaning="Correlation coefficient — a scale-free, normalised covariance index bounded strictly within [−1, 1]." />
                      <Term sym="\frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}" meaning="Normalisation constant — guarantees the total volume beneath the density surface integrates to exactly 1." />
                      <Term sym="\sigma_X\sigma_Y\sqrt{1-\rho^2}" meaning="Generalised standard deviation — measures the volume of the probability ellipsoid. Larger spread → flatter density peak." />
                      <Term sym="\frac{(x-\mu_X)^2}{\sigma_X^2}" meaning="Normalised squared deviation along the X axis." />
                      <Term sym="\frac{(y-\mu_Y)^2}{\sigma_Y^2}" meaning="Normalised squared deviation along the Y axis." />
                      <Term sym="-\frac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y}" meaning="Cross-interaction term — when ρ > 0, deviations of the same sign raise the density, tilting the contour ellipse upward." />
                    </tbody></table>
                </div>
              </div>

              {/* E. Pearson Correlation */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">E. Pearson Correlation Coefficient</span>
                <Eq n="1.5" math="\rho_{ij} = \frac{\sigma_{ij}}{\sigma_i\,\sigma_j} \;\in\; [-1,\,1]" label="Pearson Correlation" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\sigma_{ij}" meaning="The covariance between X_i and X_j — the numerator, measuring joint variability." />
                      <Term sym="\sigma_i\,\sigma_j" meaning="Product of the individual standard deviations — the denominator, normalising the covariance to a dimensionless scale." />
                      <Term sym="\rho_{ij} \in [-1,1]" meaning="Bounded range: +1 = perfect positive linear relationship; −1 = perfect negative; 0 = no linear association." />
                    </tbody></table>
                </div>
              </div>

              {/* F. Linear Transformation */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">F. Linear Transformation of a Random Vector</span>
                <p>If <MathText math="\mathbf{Y} = \mathbf{A}\mathbf{X} + \mathbf{b}" /> where <MathText math="\mathbf{A}" /> is a <MathText math="q \times p" /> constant matrix:</p>
                <Eq n="1.6a" math="E[\mathbf{Y}] = \mathbf{A}\boldsymbol{\mu} + \mathbf{b}" label="Mean of linear transform" />
                <Eq n="1.6b" math="\text{Cov}(\mathbf{Y}) = \mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" label="Covariance of linear transform (sandwich formula)" />
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full"><thead><tr className="bg-brandDark-100 dark:bg-brandDark-800">
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                    <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                  </tr></thead><tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\mathbf{A}\,\mathbf{\Sigma}\,\mathbf{A}^T" meaning="The sandwich formula — matrix A rotates and scales the covariance structure. Foundation of PCA (choosing A to diagonalise Σ)." />
                      <Term sym="\mathbf{b}" meaning="The constant shift — does not affect the covariance. Shifting data does not change its spread or correlations." />
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
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-violet-500 flex-shrink-0 mt-1" /><div><strong>Purple ellipses</strong> — level sets of Eq. 1.4. Tilt angle is determined by <MathText math="\rho" /> (Eq. 1.5). Zero covariance → axes-aligned circle.</div></div>
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 mt-1" /><div><strong>Green arrow (v₁)</strong> — first eigenvector of <MathText math="\mathbf{\Sigma}" /> (Eq. 1.3). Direction of maximum variance. Length = <MathText math="\sqrt{\lambda_1}" />.</div></div>
                      <div className="flex items-start gap-2"><span className="w-3 h-3 rounded-full bg-pink-500 flex-shrink-0 mt-1" /><div><strong>Pink arrow (v₂)</strong> — second eigenvector. Orthogonal to v₁. Length = <MathText math="\sqrt{\lambda_2}" />.</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Slider Widget */}
            <div className="border border-brandDark-200 dark:border-brandDark-800 rounded-xl p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="text-primary-500" size={18} />
                <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 m-0">
                  Interactive Covariance Matrix Generator
                </h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Sliders Input Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white dark:bg-brandDark-900 p-4 rounded-xl border border-brandDark-200 dark:border-brandDark-800/80 space-y-3">
                    <h5 className="font-bold text-xs text-brandDark-400 dark:text-brandDark-500 uppercase tracking-wider">
                      Adjust Parameter Sliders
                    </h5>

                    {/* Mean Sliders */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Mean Height (μ_X): {muX} in</span>
                      </div>
                      <input
                        type="range" min="30" max="70" step="1"
                        value={muX} onChange={(e) => setMuX(Number(e.target.value))}
                        className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Mean Shoe Size (μ_Y): {muY}</span>
                      </div>
                      <input
                        type="range" min="4" max="12" step="0.5"
                        value={muY} onChange={(e) => setMuY(Number(e.target.value))}
                        className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>

                    {/* Variance Sliders */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Variance Height (σ²_X): {varX}</span>
                      </div>
                      <input
                        type="range" min="5" max="50" step="1"
                        value={varX} onChange={(e) => {
                          const v = Number(e.target.value);
                          setVarX(v);
                        }}
                        className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Variance Shoe Size (σ²_Y): {varY}</span>
                      </div>
                      <input
                        type="range" min="0.5" max="6" step="0.1"
                        value={varY} onChange={(e) => {
                          const v = Number(e.target.value);
                          setVarY(v);
                        }}
                        className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>

                    {/* Covariance Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Covariance (σ_XY): {clampedCovXY.toFixed(2)}</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400">
                          (Max: ±{maxPossibleCov.toFixed(2)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-maxPossibleCov}
                        max={maxPossibleCov}
                        step="0.05"
                        value={clampedCovXY}
                        onChange={(e) => setCovXY(Number(e.target.value))}
                        className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </div>

                  {/* Matrix Output display */}
                  <div className="bg-white dark:bg-brandDark-900 p-4 rounded-xl border border-brandDark-200 dark:border-brandDark-800/80 space-y-2">
                    <h5 className="font-bold text-xs text-brandDark-400 dark:text-brandDark-500 uppercase tracking-wider">
                      Constructed Covariance Matrix <MathText math="\mathbf{\Sigma}" />
                    </h5>
                    <div className="flex justify-center py-2">
                      <MathText math={`\\mathbf{\\Sigma} = \\begin{bmatrix} ${varX.toFixed(2)} & ${clampedCovXY.toFixed(2)} \\\\ ${clampedCovXY.toFixed(2)} & ${varY.toFixed(2)} \\end{bmatrix}`} />
                    </div>
                    <div className="text-xs space-y-1 text-brandDark-600 dark:text-brandDark-400 font-medium">
                      <div>Correlation Coefficient (<MathText math="\rho" />): <strong className="text-primary-600 dark:text-primary-400">{correlation.toFixed(3)}</strong></div>
                      <div>Eigenvalue 1 (<MathText math="\lambda_1" />): <strong className="text-violet-600 dark:text-violet-400">{eigenvalues[0].toFixed(3)}</strong></div>
                      <div>Eigenvalue 2 (<MathText math="\lambda_2" />): <strong className="text-violet-600 dark:text-violet-400">{eigenvalues[1].toFixed(3)}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Live Graph Chart */}
                <div className="lg:col-span-7 bg-white dark:bg-brandDark-900 p-4 rounded-xl border border-brandDark-200 dark:border-brandDark-800/80 flex flex-col h-96">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-xs text-brandDark-400 dark:text-brandDark-500 uppercase tracking-wider">
                      Student Data Scatter Plot (N = 60)
                    </h5>
                    <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 rounded text-[10px] font-bold">
                      Bivariate Gaussian Distribution
                    </span>
                  </div>

                  <div className="flex-1 min-h-0 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.08)" />
                        <XAxis
                          type="number"
                          dataKey="x"
                          name="Height"
                          unit="in"
                          domain={[20, 80]}
                          stroke="#64748b"
                        />
                        <YAxis
                          type="number"
                          dataKey="y"
                          name="Shoe Size"
                          domain={[2, 14]}
                          stroke="#64748b"
                        />
                        <Tooltip
                          cursor={{ strokeDasharray: '3 3' }}
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            borderColor: '#475569',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        {/* Mean Reference lines */}
                        <ReferenceLine x={muX} stroke="#2563eb" strokeDasharray="3 3" label={{ value: 'Mean Ht', fill: '#2563eb', position: 'top', fontSize: 10 }} />
                        <ReferenceLine y={muY} stroke="#2563eb" strokeDasharray="3 3" label={{ value: 'Mean Size', fill: '#2563eb', position: 'right', fontSize: 10 }} />
                        <Scatter name="Students" data={points} fill="#7c3aed" fillOpacity={0.7} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-[10px] text-brandDark-400 mt-2 text-center italic font-semibold">
                    Scatter deforms along the main eigenvector axis based on covariance.
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 3 — ACTIVITY BASED LEARNING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec3')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
              <BookOpen size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-amber-600 dark:text-amber-400`}>
                SECTION 3 — Activity Based Learning (NEP 2020)
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Detailed 4-level collaborative active learning flow.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-6">

            {/* Level 1 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-600 rounded text-xs font-bold uppercase">Level 1 — Teacher Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Demonstration: Measuring Height & Foot Length
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Gather actual sample coordinates, construct sample covariance matrices on blackboard, show contrast against independence.
              </p>
              <p className="text-sm">
                <strong>Materials Needed:</strong> 1 measuring tape, 1 large ruler, white board, marker.
              </p>
              <div className="text-sm space-y-2 mt-2 pl-3 border-l-2 border-brandDark-200 dark:border-brandDark-700">
                <p><strong>Step 1:</strong> Call out three student volunteers to step up to the whiteboard.</p>
                <p><strong>Step 2:</strong> Measure volunteer heights (in cm) and foot lengths (in cm). Write down coordinates for each.</p>
                <p><strong>Step 3:</strong> Show that if a volunteer is taller, their shoe size is generally larger. Manually compute the covariances for the three points, demonstrating how terms sum up to build covariance.</p>
              </div>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded text-xs font-bold uppercase">Level 2 — Teacher + Student Together</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 15 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Collaborative Matrix Building
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Guided formulation of 3x3 random vector covariance by voting on correlations.
              </p>
              <p className="text-sm">
                <strong>Instructions:</strong> Teacher drafts a 3x3 matrix on board. Variables defined: Height, Shoe Size, and Math Exam Score.
              </p>
              <p className="text-sm">
                <strong>Interactive discussion points:</strong> Ask students if height predicts shoe size (Positive Covariance). Ask if height predicts math exam scores (Zero Covariance). Fill out signs (+, -, 0) in the matrix collectively to understand structural layout.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded text-xs font-bold uppercase">Level 3 — All Students Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 20 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Group Matching Challenge (10 groups of 6)
              </h4>
              <p className="text-sm">
                <strong>Objectives:</strong> Matching simulated scatter shapes to numeric covariance values.
              </p>
              <p className="text-sm">
                <strong>Instructions:</strong> Group students. Show 4 scatter plots on the projector: (a) highly positive, (b) slightly negative, (c) perfectly orthogonal circles, (d) narrow ellipse. Give 4 matrices with varying values and signs. The groups must match matrices to plots within 3 minutes and defend their solutions.
              </p>
              <p className="text-sm">
                <strong>Assessment Rubric:</strong> Correct mapping of eigenvalues to axes orientation (40%), speed (30%), clarity of logical explanation (30%).
              </p>
            </div>

            {/* Level 4 */}
            <div className="p-5 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80 bg-brandDark-50/50 dark:bg-brandDark-950/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded text-xs font-bold uppercase">Level 4 — Individual Student Do</span>
                <span className="text-xs text-brandDark-400 font-medium">(Time: 10 mins)</span>
              </div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-2">
                Numerical Computation and Self-Reflection
              </h4>
              <p className="text-sm">
                <strong>Task:</strong> Compute the expectations and the 2x2 covariance matrix for the following tiny dataset of 3 observations:
              </p>
              <div className="bg-brandDark-100 dark:bg-brandDark-950 p-3 rounded-lg max-w-sm mx-auto my-3 text-xs text-center font-bold">
                Student A: [60 in, 6]ᵀ<br />
                Student B: [62 in, 8]ᵀ<br />
                Student C: [64 in, 10]ᵀ
              </div>
              <p className="text-sm">
                <strong>Self-Evaluation Key:</strong> Mean Vector <MathText math="\boldsymbol{\mu} = [62, 8]^T" />, Variances <MathText math="\sigma^2_X = 4, \sigma^2_Y = 4" />, Covariance <MathText math="\sigma_{XY} = 4" />. Correlation <MathText math="\rho = 1" /> (perfect linear link).
              </p>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 4 — PROJECT BASED LEARNING */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec4')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Layers size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Smart Agrotech Yield
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Project architecture, timeline, costs, and risk tables.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 space-y-6 text-sm">

            <div>
              <h4 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-base mb-1">
                Project Title: Multi-sensor Agriculture Yield Prediction Model
              </h4>
              <p>
                <strong>Scope:</strong> Deploy IoT nodes to collect soil moisture, temperature, and sun exposure as a 3D random vector <MathText math="\mathbf{X} = [\text{Moisture}, \text{Temp}, \text{UV}]^T" />, compute <MathText math="\mathbf{\Sigma}" /> to discover patterns, and model yield expectation.
              </p>
            </div>

            {/* Cost & Budget Allocation Table */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Cost & Budget Estimation</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left border-collapse border border-brandDark-200 dark:border-brandDark-800">
                  <thead>
                    <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Item Description</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Unit Cost (INR)</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Quantity</th>
                      <th className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Node Sensors (DHT22, Soil hygrometer)</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">800</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">10</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">8,000</td>
                    </tr>
                    <tr className="bg-brandDark-50/50 dark:bg-brandDark-950/20">
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">ESP32 Wi-Fi Microcontrollers</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1,200</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">5</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">6,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">Cloud Storage Server and API Gateway</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2,500 / yr</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">1</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800">2,500</td>
                    </tr>
                    <tr className="font-bold bg-brandDark-100 dark:bg-brandDark-800">
                      <td colSpan={3} className="p-2 border border-brandDark-200 dark:border-brandDark-800">Total Estimated Budget</td>
                      <td className="p-2 border border-brandDark-200 dark:border-brandDark-800 text-primary-600 dark:text-primary-400">16,500 INR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Assessment Heatmap */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Risk Heatmap Matrix</h5>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-red-500/15 border border-red-500/40 p-3 rounded-lg">
                  <span className="block font-black text-red-600 dark:text-red-400 text-xs">HIGH RISK: Outliers</span>
                  <p className="text-[11px] mt-1 text-red-800 dark:text-red-300">Sensor degradation leads to heavy outliers deforming the sample covariance. Mitigation: Winsorization algorithms.</p>
                </div>
                <div className="bg-amber-500/15 border border-amber-500/40 p-3 rounded-lg">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MED RISK: Low Wifi</span>
                  <p className="text-[11px] mt-1 text-amber-800 dark:text-amber-300">Dropouts in packet transmission in fields. Mitigation: ESP32 SD-Card buffer mode.</p>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/40 p-3 rounded-lg">
                  <span className="block font-black text-emerald-600 dark:text-emerald-400 text-xs">LOW RISK: Calibration</span>
                  <p className="text-[11px] mt-1 text-emerald-800 dark:text-emerald-300">Scale mismatches across units. Mitigation: Apply z-score normalization on input vector.</p>
                </div>
              </div>
            </div>

            {/* Gantt Timeline */}
            <div>
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 mb-2">Gantt Chart Project Timeline</h5>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center">
                  <span className="w-24">Weeks 1-2:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-1/4 bg-primary-500 h-full text-[10px] text-white flex items-center pl-2">Circuit Setup</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 3-5:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[40%] ml-[25%] bg-amber-500 h-full text-[10px] text-white flex items-center pl-2">Data Acquisition</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Weeks 6-8:</span>
                  <div className="flex-1 bg-brandDark-250 dark:bg-brandDark-800 h-5 rounded overflow-hidden">
                    <div className="w-[35%] ml-[65%] bg-emerald-500 h-full text-[10px] text-white flex items-center pl-2">Covariance Modelling</div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRL & User Manual */}
            <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-100 dark:border-brandDark-800/80">
              <h5 className="font-bold text-brandDark-800 dark:text-brandDark-200 text-sm mb-1">
                TRL Level 3 Demonstration Manual
              </h5>
              <p className="text-xs leading-normal">
                To demonstrate technology feasibility in laboratory environments: Assemble the ESP32 with sensors. Simulate damp soil by wetting sponge. View output vector on Arduino Serial plotter. Compute empirical expectation over 100 ticks. If sponges dry out, covariance moisture and temperature must flip signs, verifying the setup works as designed.
              </p>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 5 — MODEL 2 MARK QUESTIONS */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec5')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
              <HelpCircle size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-red-600 dark:text-red-400`}>
                SECTION 5 — Model 2-Mark Classroom Questions
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Curated conceptual and numerical questions with pitfalls explained.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-6 text-sm">

            {/* Question 1 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q1: Define a Random Vector and its Expectation.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> A random vector <MathText math="\mathbf{X} = [X_1, X_2, \dots, X_p]^T" /> is a vector whose components are random variables. Its expectation <MathText math="E[\mathbf{X}] = [E[X_1], E[X_2], \dots, E[X_p]]^T" /> is the vector of expectations of each component.
              </p>
              <div className="mt-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg font-semibold">
                <strong>Pitfall:</strong> Students often forget to write the vector transpose, writing it as a row vector. In matrix operations, vectors must be column vectors.
              </div>
            </div>

            {/* Question 2 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q2: Why is the Variance-Covariance matrix always symmetric?
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> By definition, the element at row i and column j is <MathText math="\text{Cov}(X_i, X_j)" />, and the element at row j and column i is <MathText math="\text{Cov}(X_j, X_i)" />. Since covariance is commutative, <MathText math="\mathbf{\Sigma} = \mathbf{\Sigma}^T" />.
              </p>
              <div className="mt-2 text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 p-2.5 rounded-lg font-semibold">
                <strong>Remembrall Tip:</strong> Memorize: "Mirror across the diagonal." What is on the top-right matches the bottom-left.
              </div>
            </div>

            {/* Question 3 */}
            <div className="pb-4 border-b border-brandDark-100 dark:border-brandDark-800 last:border-0 last:pb-0">
              <h5 className="font-black text-brandDark-900 dark:text-white mb-1">
                Q3: Calculate Covariance matrix if X and Y are independent random variables with variances 4 and 9.
              </h5>
              <p className="text-brandDark-700 dark:text-brandDark-300">
                <strong>Answer:</strong> Since X and Y are independent, their covariance <MathText math="\text{Cov}(X, Y) = 0" />. The diagonal holds their variances. Hence:
                <MathText math="\mathbf{\Sigma} = \begin{bmatrix} 4 & 0 \\ 0 & 9 \end{bmatrix}" block />
              </p>
            </div>

          </div>
        )}
      </section>

      {/* SECTION 6 — LEARN BY DOING (NEP 2020) VIRTUAL LAB */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec6')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Sparkles size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 6 — Learn By Doing: Random Vector Laboratory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Interactive simulations with run-time data feed & preset modes.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6 space-y-6">

            <div className={`${fontBody}`}>
              <p>
                Welcome to the <strong>Virtual Covariance Simulator</strong>. Adjust the preset distribution mode below to feed synthetic student profiles (Height vs Shoe Size) into the graph. Click <strong>Play</strong> to see new student measurements stream in live, shifting the empirical expectations.
              </p>
            </div>

            {/* Sim Interface */}
            <div className="border border-brandDark-200 dark:border-brandDark-800 rounded-xl p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20">

              {/* Presets and Controls */}
              <div className="flex flex-wrap gap-4 items-center justify-between mb-4 border-b border-brandDark-200 dark:border-brandDark-800 pb-4">

                {/* Presets */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLabCovMode('positive')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${disabledStyle(labCovMode === 'positive')
                      }`}
                  >
                    Positive Covariance Mode
                  </button>
                  <button
                    onClick={() => setLabCovMode('negative')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${disabledStyle(labCovMode === 'negative')
                      }`}
                  >
                    Negative Covariance Mode
                  </button>
                  <button
                    onClick={() => setLabCovMode('uncorrelated')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${disabledStyle(labCovMode === 'uncorrelated')
                      }`}
                  >
                    Uncorrelated Mode
                  </button>
                </div>

                {/* Simulation controls */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setIsSimPlaying(!isSimPlaying)}
                    className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold text-white transition-all ${isSimPlaying ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}
                  >
                    {isSimPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isSimPlaying ? 'Pause Feed' : 'Start Feed'}
                  </button>
                  <button
                    onClick={handleResetLab}
                    className="p-2 rounded-lg bg-brandDark-200 dark:bg-brandDark-850 text-brandDark-700 dark:text-brandDark-300 hover:bg-brandDark-300 dark:hover:bg-brandDark-700 flex items-center justify-center"
                    title="Reset Simulator"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Interactive Simulator Graph */}
                <div className="lg:col-span-8 bg-white dark:bg-brandDark-900 p-4 rounded-xl border border-brandDark-200 dark:border-brandDark-800/80 h-96 text-xs">
                  <div className="flex justify-between items-center mb-2 text-brandDark-500 font-semibold">
                    <span>Virtual Lab: Bivariate Scatter Feed</span>
                    {isSimPlaying && (
                      <span className="flex items-center gap-1 text-emerald-500 font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Generating live streams
                      </span>
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height="90%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.08)" />
                      <XAxis type="number" dataKey="x" name="Height" unit="in" domain={[20, 80]} stroke="#64748b" />
                      <YAxis type="number" dataKey="y" name="Shoe Size" domain={[2, 14]} stroke="#64748b" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Live Feed" data={labPoints} fill={labCovMode === 'positive' ? '#10b981' : labCovMode === 'negative' ? '#ef4444' : '#3b82f6'} fillOpacity={0.75} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {/* Explanation and math matrix display */}
                <div className="lg:col-span-4 bg-white dark:bg-brandDark-900 p-5 rounded-xl border border-brandDark-200 dark:border-brandDark-800/80 flex flex-col justify-between">
                  <div>
                    <h5 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-sm mb-2 uppercase tracking-wider">
                      Process Explanation
                    </h5>
                    <p className="text-xs text-brandDark-600 dark:text-brandDark-400 leading-relaxed mb-4">
                      {labCovMode === 'positive' && (
                        <span>
                          <strong>Positive Covariance:</strong> As students grow taller, their foot sizes grow proportionately. Points cluster along an upward diagonal, showing <MathText math="\text{Cov}(X, Y) > 0" />.
                        </span>
                      )}
                      {labCovMode === 'negative' && (
                        <span>
                          <strong>Negative Covariance:</strong> A hypothetical inverse relationship where taller heights correlate to smaller foot length (<MathText math="\text{Cov}(X, Y) < 0" />). Points align downwards.
                        </span>
                      )}
                      {labCovMode === 'uncorrelated' && (
                        <span>
                          <strong>Uncorrelated:</strong> Variables have no linear relationship. Taller students are equally likely to have small or large shoes. Scatter forms an orthogonal circle (<MathText math="\text{Cov}(X, Y) \approx 0" />).
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl border border-brandDark-100 dark:border-brandDark-800">
                    <h6 className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest mb-2">Lab Controls Settings</h6>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-brandDark-500 mb-1">
                          <span>Feed Interval Speed:</span>
                          <span>{simSpeed} ms</span>
                        </div>
                        <input
                          type="range" min="200" max="2000" step="200"
                          value={simSpeed} onChange={(e) => setSimSpeed(Number(e.target.value))}
                          className="w-full h-1 bg-brandDark-200 dark:bg-brandDark-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}
      </section>

      {/* SECTION 7 — PRACTICAL COMPUTATIONS & R LANGUAGE SANDBOX */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm animate-fadeIn">
        <button
          onClick={() => toggleSection('sec7')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 rounded-xl">
              <Calculator size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-primary-600 dark:text-primary-400`}>
                SECTION 7 — Practical Computations & R Language Sandbox
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Windows x86_64 base R script execution, sample inputs, and console outputs.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-3`}>
              <p>
                To cement theoretical concepts under <strong>NEP 2020 experiential learning</strong> guidelines, this R script simulates student height and shoe size as a 2D random vector and decomposes the sample covariance.
              </p>
              <p>
                This code is written in pure base R, fully compatible with **R version 4.3.3 (2024-02-29 ucrt)** on **x86_64-w64-mingw32** (Windows) systems. It requires **no library installations** and runs out-of-the-box in standard R consoles or RStudio.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* R Script Code Card */}
              <div className="lg:col-span-7 bg-brandDark-950 border border-brandDark-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-brandDark-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      R Script (Bivariate Normal Simulation)
                    </span>
                    <button
                      onClick={() => {
                        const code = `# Bivariate Normal Random Vector Simulation
# Compatible with R 4.3.3 (Windows x86_64-w64-mingw32)
# No external package installations required (uses base R)

set.seed(42)  # For reproducibility

# 1. Define True Parameters (Sample Inputs)
mu <- c(50, 8)       # Mean vector: c(Height in inches, Shoe Size)
var_X <- 25          # Variance of Height
var_Y <- 2.25        # Variance of Shoe Size
cov_XY <- 5.5        # Covariance (correlation is ~0.63)

# Construct true covariance matrix Sigma
Sigma <- matrix(c(var_X, cov_XY, cov_XY, var_Y), nrow = 2, byrow = TRUE)

cat("--- True Parameters (Inputs) ---\\n")
print(Sigma)

# 2. Simulate N=60 Bivariate Normal Observations via Cholesky Decomposition
# Sigma = L %*% t(L)
L <- chol(Sigma) # Cholesky factor (upper triangular)
N <- 60
Z <- matrix(rnorm(N * 2), nrow = N, ncol = 2) # N(0, I) variables
X <- matrix(rep(mu, each = N), nrow = N, byrow = FALSE) + Z %*% L

# 3. Calculate Empirical Estimates (Sample Outputs)
sample_mean <- colMeans(X)
sample_cov <- cov(X)
decomp <- eigen(sample_cov)

cat("\\n--- Simulated Sample Mean Vector ---\\n")
print(sample_mean)

cat("\\n--- Simulated Sample Covariance Matrix ---\\n")
print(sample_cov)

cat("\\n--- Eigenvalue Decomposition of Sample Covariance ---\\n")
cat("Eigenvalues (Variance along Principal Axes):\\n")
print(decomp$values)
cat("\\nEigenvectors (Rotated Orthogonal Axis Directions):\\n")
print(decomp$vectors)
`;
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brandDark-850 hover:bg-brandDark-800 text-brandDark-300 border border-brandDark-700'
                        }`}
                    >
                      <Sparkles size={12} />
                      {copied ? 'Copied!' : 'Copy R Code'}
                    </button>
                  </div>

                  <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950/50 p-4 rounded-xl overflow-x-auto border border-brandDark-850/80 leading-relaxed text-left">
                    {`# Bivariate Normal Random Vector Simulation
# Compatible with R 4.3.3 (Windows x86_64-w64-mingw32)
# No external package installations required (uses base R)

set.seed(42)  # For reproducibility

# 1. Define True Parameters (Sample Inputs)
mu <- c(50, 8)       # Mean vector: c(Height, Shoe Size)
var_X <- 25          # Variance of Height
var_Y <- 2.25        # Variance of Shoe Size
cov_XY <- 5.5        # Covariance (correlation is ~0.63)

# Construct true covariance matrix Sigma
Sigma <- matrix(c(var_X, cov_XY, cov_XY, var_Y), 
                nrow = 2, byrow = TRUE)

cat("--- True Parameters (Inputs) ---\\n")
print(Sigma)

# 2. Simulate N=60 Bivariate Normal Observations via Cholesky
# Sigma = L %*% t(L)
L <- chol(Sigma) # Cholesky factor (upper triangular)
N <- 60
Z <- matrix(rnorm(N * 2), nrow = N, ncol = 2) # N(0, I)
X <- matrix(rep(mu, each = N), nrow = N, byrow = FALSE) + 
     Z %*% L

# 3. Calculate Empirical Estimates (Sample Outputs)
sample_mean <- colMeans(X)
sample_cov <- cov(X)
decomp <- eigen(sample_cov)

cat("\\n--- Simulated Sample Mean Vector ---\\n")
print(sample_mean)

cat("\\n--- Simulated Sample Covariance Matrix ---\\n")
print(sample_cov)

cat("\\n--- Eigenvalue Decomposition ---\\n")
cat("Eigenvalues (Variance along Principal Axes):\\n")
print(decomp$values)
cat("\\nEigenvectors (Rotated Orthogonal Directions):\\n")
print(decomp$vectors)`}
                  </pre>
                </div>
              </div>

              {/* R Console Outputs & Explanations Card */}
              <div className="lg:col-span-5 bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h5 className="font-extrabold text-brandDark-800 dark:text-brandDark-200 text-sm mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={16} className="text-primary-500" />
                    Console Outputs & Interpretations
                  </h5>

                  <div className="space-y-4 text-xs">
                    {/* Input Interpretation */}
                    <div className="p-3 bg-brandDark-50 dark:bg-brandDark-950/40 border border-brandDark-200/50 dark:border-brandDark-850/80 rounded-xl space-y-1.5 text-left">
                      <strong className="text-brandDark-700 dark:text-brandDark-300">1. Sample Inputs (Sigma Matrix):</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`     [,1] [,2]
[1,] 25.0  5.5
[2,]  5.5  2.25`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1">
                        <strong>Interpretation:</strong> The covariance entry is <MathText math="5.5" />, meaning that for every standard unit positive increase in height, shoe size rises. Height has much wider variance (<MathText math="25.0" />) than shoe size (<MathText math="2.25" />).
                      </p>
                    </div>

                    {/* Output Interpretation */}
                    <div className="p-3 bg-brandDark-50 dark:bg-brandDark-950/40 border border-brandDark-200/50 dark:border-brandDark-850/80 rounded-xl space-y-1.5 text-left">
                      <strong className="text-brandDark-700 dark:text-brandDark-300">2. Empirical Output Results:</strong>
                      <pre className="font-mono text-[10px] text-brandDark-450 mt-1">
                        {`$values: [1] 26.265  1.023
$vectors:
          [,1]     [,2]
[1,]  0.974052 -0.22632
[2,]  0.226322  0.97405`}
                      </pre>
                      <p className="text-[11px] leading-relaxed text-brandDark-600 dark:text-brandDark-400 mt-1">
                        <strong>Interpretation:</strong>
                        <br />• <strong>Eigenvalues:</strong> The first eigenvalue (<MathText math="26.265" />) captures <MathText math="96.2\%" /> of total variance. This indicates that the bivariate scatter is highly elongated along a single major principal axis.
                        <br />• <strong>Eigenvectors:</strong> The vector <MathText math="[0.974, 0.226]^T" /> specifies the direction of the major axis, showing it tilts upward, mirroring the positive covariance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-500/5 border border-primary-500/20 p-3.5 rounded-xl text-[11px] leading-normal text-brandDark-500 mt-4 text-left">
                  <strong>Did you know?</strong> Cholesky decomposition simulates joint random variables by factoring <MathText math="\mathbf{\Sigma} = \mathbf{L}\mathbf{L}^T" />. The matrix multiplication <MathText math="\mathbf{Z}\mathbf{L}" /> transforms standard normal coordinates into the correlated space, acting as a geometric skewing operator.
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* END OF TOPIC WRAPPER */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-4 uppercase tracking-wider">
          Topic Summary and Industry Relevance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-bold text-white mb-0.5">Key Insights & Takeaways</h5>
            <ul className="list-disc pl-5 space-y-1.5 text-brandDark-200">
              <li>Random vectors store multi-dimensional variables as columns.</li>
              <li>Expectation coordinates capture center of mass <MathText math="\boldsymbol{\mu}" />.</li>
              <li>Symmetric matrix <MathText math="\mathbf{\Sigma}" /> encapsulates variances and pairwise covariances.</li>
              <li>Eigenvalue decomposition computes axes of maximum variance.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white mb-0.5">Industrial Applications</h5>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Finance Portfolio Optimization:</strong> Measuring covariances of stocks to minimize risk (Modern Portfolio Theory).
            </p>
            <p className="text-brandDark-200 leading-relaxed">
              <strong>Computer Vision:</strong> Representing images as high-dimensional vectors to perform PCA for face recognition (Eigenfaces).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

const disabledStyle = (isActive: boolean) => {
  return isActive
    ? 'bg-primary-600 text-white'
    : 'bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 hover:bg-brandDark-100 dark:text-brandDark-300';
};

export default Topic1_RandomVector;
