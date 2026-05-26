/**
 * Statistical Utilities for Multivariate Normal distributions
 * Extended for Unit 1 Virtual Labs
 */

// ── Box-Muller standard normal sampler ──────────────────────────────────────
export const randomNormal = (): number => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export interface BivariatePoint { x: number; y: number; }

// ── Bivariate Normal sampler (Cholesky) ─────────────────────────────────────
export const generateBivariateNormalSample = (
  n: number, muX: number, muY: number,
  varX: number, varY: number, covXY: number
): BivariatePoint[] => {
  const stdX = Math.sqrt(Math.max(varX, 0.01));
  const stdY = Math.sqrt(Math.max(varY, 0.01));
  let rho = covXY / (stdX * stdY);
  rho = Math.max(-0.999, Math.min(0.999, rho));
  const pts: BivariatePoint[] = [];
  for (let i = 0; i < n; i++) {
    const z0 = randomNormal(), z1 = randomNormal();
    pts.push({
      x: Math.round((muX + stdX * z0) * 100) / 100,
      y: Math.round((muY + stdY * (rho * z0 + Math.sqrt(1 - rho * rho) * z1)) * 100) / 100,
    });
  }
  return pts;
};

// ── Eigenvalues / eigenvectors of 2×2 covariance matrix ─────────────────────
export interface EigenvalueResult {
  values: [number, number];
  vectors: [[number, number], [number, number]];
}
export const calculateEigenvalues2D = (varX: number, varY: number, covXY: number): EigenvalueResult => {
  const trace = varX + varY;
  const det = varX * varY - covXY * covXY;
  const disc = Math.sqrt(Math.max(trace * trace - 4 * det, 0));
  const lambda1 = (trace + disc) / 2;
  const lambda2 = (trace - disc) / 2;
  let v1: [number, number];
  let v2: [number, number];
  if (covXY !== 0) {
    const r1: [number, number] = [covXY, lambda1 - varX];
    const l1 = Math.sqrt(r1[0] ** 2 + r1[1] ** 2);
    v1 = l1 > 0 ? [r1[0] / l1, r1[1] / l1] : [1, 0];
    const r2: [number, number] = [covXY, lambda2 - varX];
    const l2 = Math.sqrt(r2[0] ** 2 + r2[1] ** 2);
    v2 = l2 > 0 ? [r2[0] / l2, r2[1] / l2] : [0, 1];
  } else {
    v1 = varX >= varY ? [1, 0] : [0, 1];
    v2 = varX >= varY ? [0, 1] : [1, 0];
  }
  return { values: [lambda1, lambda2], vectors: [v1, v2] };
};

// ── Marginal density (univariate normal PDF) ─────────────────────────────────
export const normalPDF = (x: number, mu: number, sigma2: number): number => {
  const sigma = Math.sqrt(Math.max(sigma2, 1e-9));
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
};

// ── Bivariate normal PDF ─────────────────────────────────────────────────────
export const bivariatePDF = (
  x: number, y: number,
  muX: number, muY: number,
  varX: number, varY: number, covXY: number
): number => {
  const sX = Math.sqrt(Math.max(varX, 1e-9));
  const sY = Math.sqrt(Math.max(varY, 1e-9));
  let rho = covXY / (sX * sY);
  rho = Math.max(-0.999, Math.min(0.999, rho));
  const z = ((x - muX) / sX) ** 2 - 2 * rho * ((x - muX) / sX) * ((y - muY) / sY) + ((y - muY) / sY) ** 2;
  return (1 / (2 * Math.PI * sX * sY * Math.sqrt(1 - rho ** 2))) * Math.exp(-z / (2 * (1 - rho ** 2)));
};

// ── Conditional normal parameters ────────────────────────────────────────────
export const conditionalNormal = (
  x2: number, mu1: number, mu2: number,
  var1: number, var2: number, cov12: number
): { mu: number; sigma2: number } => ({
  mu: mu1 + (cov12 / Math.max(var2, 1e-9)) * (x2 - mu2),
  sigma2: var1 - (cov12 ** 2) / Math.max(var2, 1e-9),
});

// ── Sample mean vector ────────────────────────────────────────────────────────
export const sampleMean = (pts: BivariatePoint[]): { mx: number; my: number } => {
  if (pts.length === 0) return { mx: 0, my: 0 };
  return {
    mx: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    my: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  };
};

// ── Sample covariance matrix ──────────────────────────────────────────────────
export const sampleCovariance = (pts: BivariatePoint[]): { s11: number; s22: number; s12: number } => {
  if (pts.length < 2) return { s11: 0, s22: 0, s12: 0 };
  const { mx, my } = sampleMean(pts);
  const n = pts.length;
  const s11 = pts.reduce((s, p) => s + (p.x - mx) ** 2, 0) / (n - 1);
  const s22 = pts.reduce((s, p) => s + (p.y - my) ** 2, 0) / (n - 1);
  const s12 = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / (n - 1);
  return { s11, s22, s12 };
};

// ── MLE covariance (divides by n) ─────────────────────────────────────────────
export const mleCovarianceMatrix = (pts: BivariatePoint[]): { s11: number; s22: number; s12: number } => {
  if (pts.length < 1) return { s11: 0, s22: 0, s12: 0 };
  const { mx, my } = sampleMean(pts);
  const n = pts.length;
  return {
    s11: pts.reduce((s, p) => s + (p.x - mx) ** 2, 0) / n,
    s22: pts.reduce((s, p) => s + (p.y - my) ** 2, 0) / n,
    s12: pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / n,
  };
};

// ── Hotelling T² statistic ────────────────────────────────────────────────────
export const hotellingT2 = (
  xbar: number[], mu0: number[],
  S: number[][], n: number
): number => {
  // For 2D: S = [[s11,s12],[s12,s22]]
  const s11 = S[0][0], s12 = S[0][1], s22 = S[1][1];
  const det = s11 * s22 - s12 * s12;
  if (Math.abs(det) < 1e-12) return 0;
  const inv11 = s22 / det, inv12 = -s12 / det, inv22 = s11 / det;
  const d0 = xbar[0] - mu0[0], d1 = xbar[1] - mu0[1];
  return n * (d0 * (inv11 * d0 + inv12 * d1) + d1 * (inv12 * d0 + inv22 * d1));
};

// ── F critical value approximation (Wilson-Hilferty) ─────────────────────────
export const fCritical95 = (df1: number, df2: number): number => {
  // Rough approximation for common cases used in labs
  if (df1 === 2 && df2 >= 20) return 3.49;
  if (df1 === 2 && df2 >= 10) return 4.10;
  return 3.0 + 10 / df2;
};

// ── Multinomial probability ───────────────────────────────────────────────────
export const multinomialProb = (counts: number[], probs: number[]): number => {
  const n = counts.reduce((a, b) => a + b, 0);
  let logP = logFactorial(n);
  for (let i = 0; i < counts.length; i++) {
    logP -= logFactorial(counts[i]);
    logP += counts[i] * Math.log(Math.max(probs[i], 1e-15));
  }
  return Math.exp(logP);
};

const logFactorial = (n: number): number => {
  if (n <= 1) return 0;
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
};

// ── Density grid for contour plotting ────────────────────────────────────────
export interface DensityPoint { x: number; y: number; z: number; }
export const buildDensityGrid = (
  muX: number, muY: number, varX: number, varY: number, covXY: number,
  nx = 30, ny = 30, rangeMultiplier = 3
): DensityPoint[] => {
  const sX = Math.sqrt(Math.max(varX, 0.01)) * rangeMultiplier;
  const sY = Math.sqrt(Math.max(varY, 0.01)) * rangeMultiplier;
  const pts: DensityPoint[] = [];
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      const x = muX - sX + (2 * sX * i) / (nx - 1);
      const y = muY - sY + (2 * sY * j) / (ny - 1);
      pts.push({ x, y, z: bivariatePDF(x, y, muX, muY, varX, varY, covXY) });
    }
  }
  return pts;
};
