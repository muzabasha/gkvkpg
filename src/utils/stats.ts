/**
 * Statistical Utilities for Multivariate Normal distributions
 */

// Generate a random sample from standard normal distribution N(0, 1) using Box-Muller transform
export const randomNormal = (): number => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export interface BivariatePoint {
  x: number;
  y: number;
}

/**
 * Generates synthetic points from a Bivariate Normal Distribution
 * using means, variances, and covariance.
 */
export const generateBivariateNormalSample = (
  n: number,
  muX: number,
  muY: number,
  varX: number,
  varY: number,
  covXY: number
): BivariatePoint[] => {
  const stdX = Math.sqrt(Math.max(varX, 0.01));
  const stdY = Math.sqrt(Math.max(varY, 0.01));
  
  // Calculate correlation coefficient rho
  let rho = covXY / (stdX * stdY);
  // Clip rho to [-0.999, 0.999] to prevent numerical issues in Cholesky
  rho = Math.max(-0.999, Math.min(0.999, rho));
  
  const points: BivariatePoint[] = [];
  
  for (let i = 0; i < n; i++) {
    const z0 = randomNormal();
    const z1 = randomNormal();
    
    // Cholesky transformation:
    // X = mu_x + std_x * Z0
    // Y = mu_y + std_y * (rho * Z0 + sqrt(1 - rho^2) * Z1)
    const x = muX + stdX * z0;
    const y = muY + stdY * (rho * z0 + Math.sqrt(1 - rho * rho) * z1);
    
    points.push({ 
      x: Math.round(x * 100) / 100, 
      y: Math.round(y * 100) / 100 
    });
  }
  
  return points;
};

export interface EigenvalueResult {
  values: [number, number];
  vectors: [[number, number], [number, number]]; // [v1, v2]
}

/**
 * Calculates eigenvalues and eigenvectors for a 2x2 covariance matrix
 * [ varX   covXY ]
 * [ covXY  varY  ]
 */
export const calculateEigenvalues2D = (
  varX: number,
  varY: number,
  covXY: number
): EigenvalueResult => {
  // Characteristic equation: det(Sigma - lambda*I) = 0
  // lambda^2 - tr(Sigma)*lambda + det(Sigma) = 0
  const trace = varX + varY;
  const det = varX * varY - covXY * covXY;
  
  const discriminant = Math.sqrt(Math.max(trace * trace - 4 * det, 0));
  
  const lambda1 = (trace + discriminant) / 2;
  const lambda2 = (trace - discriminant) / 2;
  
  // Eigenvectors: (Sigma - lambda*I) v = 0
  // v1 = [covXY, lambda1 - varX] or [lambda1 - varY, covXY]
  let v1: [number, number] = [1, 0];
  let v2: [number, number] = [0, 1];
  
  if (covXY !== 0) {
    const v1_raw: [number, number] = [covXY, lambda1 - varX];
    const len1 = Math.sqrt(v1_raw[0] * v1_raw[0] + v1_raw[1] * v1_raw[1]);
    v1 = len1 > 0 ? [v1_raw[0] / len1, v1_raw[1] / len1] : [1, 0];
    
    const v2_raw: [number, number] = [covXY, lambda2 - varX];
    const len2 = Math.sqrt(v2_raw[0] * v2_raw[0] + v2_raw[1] * v2_raw[1]);
    v2 = len2 > 0 ? [v2_raw[0] / len2, v2_raw[1] / len2] : [0, 1];
  } else {
    // If covariance is 0, axes are aligned with X and Y
    if (varX >= varY) {
      v1 = [1, 0];
      v2 = [0, 1];
    } else {
      v1 = [0, 1];
      v2 = [1, 0];
    }
  }
  
  return {
    values: [lambda1, lambda2],
    vectors: [v1, v2]
  };
};
