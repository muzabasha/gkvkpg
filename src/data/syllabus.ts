export interface Topic {
  id: string;
  title: string;
  unitId: string;
  blockId: string;
  prerequisites: string[];
  nextTopicId?: string;
  prevTopicId?: string;
  coMapped: string[];
}

export interface Unit {
  id: string;
  title: string;
  blockId: string;
  topics: Topic[];
}

export interface Block {
  id: string;
  title: string;
  units: Unit[];
}

export interface CourseOutcome {
  id: string;
  description: string;
}

export const COURSE_OUTCOMES: CourseOutcome[] = [
  { id: 'CO1', description: 'Define and describe the core components and evolution of reinforcement learning and intelligent systems (Adjusted: Concept of random vector, expectation, and variance-covariance matrix in multivariate normal systems).' },
  { id: 'CO2', description: 'Differentiate between multivariate statistics and univariate methods, citing suitable applications in data reduction and machine learning.' },
  { id: 'CO3', description: 'Illustrate the structure of random vectors and formulate multivariate tests using Hotelling\'s T² and Mahalanobis D² models.' },
  { id: 'CO4', description: 'Construct and analyze discriminant functions and classification models between multiple multivariate populations.' },
  { id: 'CO5', description: 'Implement principal component analysis, factor analysis, and cluster analysis to solve data reduction problems.' },
  { id: 'CO6', description: 'Apply multidimensional scaling, path analysis, and MANOVA techniques to evaluate multivariate interactions.' }
];

export const SYLLABUS: Block[] = [
  {
    id: 'block-1',
    title: 'Block - I: Introduction to Multivariate Analysis',
    units: [
      {
        id: 'unit-1',
        title: 'Unit 1: Multivariate Random Vectors & Normal Distributions',
        blockId: 'block-1',
        topics: [
          {
            id: 'b1-u1-t1',
            title: 'Concept of random vector, its expectation and Variance Covariance matrix',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['Basic Probability', 'Univariate Random Variables', 'Matrix Algebra'],
            nextTopicId: 'b1-u1-t2',
            coMapped: ['CO1', 'CO2']
          },
          {
            id: 'b1-u1-t2',
            title: 'Marginal and joint distributions of random vectors',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t1', 'Double Integration'],
            prevTopicId: 'b1-u1-t1',
            nextTopicId: 'b1-u1-t3',
            coMapped: ['CO1', 'CO2']
          },
          {
            id: 'b1-u1-t3',
            title: 'Conditional distributions and Independence of random vectors',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t2', 'Conditional Probability'],
            prevTopicId: 'b1-u1-t2',
            nextTopicId: 'b1-u1-t4',
            coMapped: ['CO1', 'CO2']
          },
          {
            id: 'b1-u1-t4',
            title: 'Multinomial distribution',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t1', 'Binomial Distribution'],
            prevTopicId: 'b1-u1-t3',
            nextTopicId: 'b1-u1-t5',
            coMapped: ['CO1', 'CO2']
          },
          {
            id: 'b1-u1-t5',
            title: 'Multivariate Normal distribution, marginal and conditional distributions',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t3', 'Gaussian Integral', 'Matrix Inversion'],
            prevTopicId: 'b1-u1-t4',
            nextTopicId: 'b1-u1-t6',
            coMapped: ['CO1', 'CO2', 'CO3']
          },
          {
            id: 'b1-u1-t6',
            title: 'Sample mean vector and its distribution',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t5', 'Central Limit Theorem'],
            prevTopicId: 'b1-u1-t5',
            nextTopicId: 'b1-u1-t7',
            coMapped: ['CO2', 'CO3']
          },
          {
            id: 'b1-u1-t7',
            title: 'Maximum likelihood estimates of mean vector and dispersion matrix',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t6', 'Differential Calculus for Matrices'],
            prevTopicId: 'b1-u1-t6',
            nextTopicId: 'b1-u1-t8',
            coMapped: ['CO2', 'CO3']
          },
          {
            id: 'b1-u1-t8',
            title: 'Tests of hypothesis about mean vector',
            unitId: 'unit-1',
            blockId: 'block-1',
            prerequisites: ['b1-u1-t7', 'Hypothesis Testing Framework'],
            prevTopicId: 'b1-u1-t7',
            coMapped: ['CO3']
          }
        ]
      }
    ]
  },
  {
    id: 'block-2',
    title: 'Block - II: Multivariate Tests',
    units: [
      {
        id: 'unit-2',
        title: 'Unit 2: Wishart, Hotelling\'s T² & Discriminant Analysis',
        blockId: 'block-2',
        topics: [
          {
            id: 'b2-u2-t1',
            title: 'Wishart distribution and its simple properties',
            unitId: 'unit-2',
            blockId: 'block-2',
            prerequisites: ['b1-u1-t7', 'Chi-Square Distribution'],
            nextTopicId: 'b2-u2-t2',
            coMapped: ['CO3']
          },
          {
            id: 'b2-u2-t2',
            title: 'Hotelling\'s T² and Mahalanobis D² statistics',
            unitId: 'unit-2',
            blockId: 'block-2',
            prerequisites: ['b2-u2-t1', 'Student\'s t-distribution'],
            prevTopicId: 'b2-u2-t1',
            nextTopicId: 'b2-u2-t3',
            coMapped: ['CO3']
          },
          {
            id: 'b2-u2-t3',
            title: 'Null distribution of Hotelling\'s T² & Rao\'s U statistics',
            unitId: 'unit-2',
            blockId: 'block-2',
            prerequisites: ['b2-u2-t2', 'F-distribution'],
            prevTopicId: 'b2-u2-t2',
            nextTopicId: 'b2-u2-t4',
            coMapped: ['CO3']
          },
          {
            id: 'b2-u2-t4',
            title: 'Wilks\' Lambda (Λ) criterion and its properties',
            unitId: 'unit-2',
            blockId: 'block-2',
            prerequisites: ['b2-u2-t3', 'Likelihood Ratio Tests'],
            prevTopicId: 'b2-u2-t3',
            nextTopicId: 'b2-u2-t5',
            coMapped: ['CO3', 'CO4']
          },
          {
            id: 'b2-u2-t5',
            title: 'Discriminant Analysis & Linear Discriminant Function (LDF)',
            unitId: 'unit-2',
            blockId: 'block-2',
            prerequisites: ['b2-u2-t4', 'Bayes Classifier'],
            prevTopicId: 'b2-u2-t4',
            coMapped: ['CO4']
          }
        ]
      }
    ]
  },
  {
    id: 'block-3',
    title: 'Block - III: Data Reduction and Classification Techniques',
    units: [
      {
        id: 'unit-3',
        title: 'Unit 3: PCA, Factor Analysis & Cluster Analysis',
        blockId: 'block-3',
        topics: [
          {
            id: 'b3-u3-t1',
            title: 'Principal Component Analysis (PCA)',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b1-u1-t1', 'Eigenvalues & Eigenvectors'],
            nextTopicId: 'b3-u3-t2',
            coMapped: ['CO5']
          },
          {
            id: 'b3-u3-t2',
            title: 'Factor Analysis & Latent Variables',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b3-u3-t1'],
            prevTopicId: 'b3-u3-t1',
            nextTopicId: 'b3-u3-t3',
            coMapped: ['CO5']
          },
          {
            id: 'b3-u3-t3',
            title: 'Canonical variables and canonical correlations',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b3-u3-t2'],
            prevTopicId: 'b3-u3-t2',
            nextTopicId: 'b3-u3-t4',
            coMapped: ['CO5']
          },
          {
            id: 'b3-u3-t4',
            title: 'Cluster Analysis: distance metrics & qualitative/quantitative similarity',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b1-u1-t1', 'Euclidean Distance'],
            prevTopicId: 'b3-u3-t3',
            nextTopicId: 'b3-u3-t5',
            coMapped: ['CO5']
          },
          {
            id: 'b3-u3-t5',
            title: 'Hierarchical Clustering: Single, Complete and Average Linkage',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b3-u3-t4'],
            prevTopicId: 'b3-u3-t4',
            nextTopicId: 'b3-u3-t6',
            coMapped: ['CO5']
          },
          {
            id: 'b3-u3-t6',
            title: 'K-means Cluster Analysis',
            unitId: 'unit-3',
            blockId: 'block-3',
            prerequisites: ['b3-u3-t4', 'Optimization algorithms'],
            prevTopicId: 'b3-u3-t5',
            coMapped: ['CO5']
          }
        ]
      },
      {
        id: 'unit-4',
        title: 'Unit 4: Path Analysis & Multidimensional Scaling',
        blockId: 'block-3',
        topics: [
          {
            id: 'b3-u4-t1',
            title: 'Path Analysis & Computation of Path Coefficients',
            unitId: 'unit-4',
            blockId: 'block-3',
            prerequisites: ['b1-u1-t1', 'Multiple Regression'],
            nextTopicId: 'b3-u4-t2',
            coMapped: ['CO6']
          },
          {
            id: 'b3-u4-t2',
            title: 'Introduction to Multidimensional Scaling (MDS)',
            unitId: 'unit-4',
            blockId: 'block-3',
            prerequisites: ['b3-u3-t4'],
            prevTopicId: 'b3-u4-t1',
            nextTopicId: 'b3-u4-t3',
            coMapped: ['CO6']
          },
          {
            id: 'b3-u4-t3',
            title: 'Metric & Non-metric scaling methods & Theoretical Results',
            unitId: 'unit-4',
            blockId: 'block-3',
            prerequisites: ['b3-u4-t2'],
            prevTopicId: 'b3-u4-t2',
            coMapped: ['CO6']
          }
        ]
      }
    ]
  }
];

export const PREREQUISITE_GRAPH: Record<string, string[]> = {
  'b1-u1-t1': [],
  'b1-u1-t2': ['b1-u1-t1'],
  'b1-u1-t3': ['b1-u1-t2'],
  'b1-u1-t4': ['b1-u1-t1'],
  'b1-u1-t5': ['b1-u1-t3'],
  'b1-u1-t6': ['b1-u1-t5'],
  'b1-u1-t7': ['b1-u1-t6'],
  'b1-u1-t8': ['b1-u1-t7'],
  'b2-u2-t1': ['b1-u1-t7'],
  'b2-u2-t2': ['b2-u2-t1'],
  'b2-u2-t3': ['b2-u2-t2'],
  'b2-u2-t4': ['b2-u2-t3'],
  'b2-u2-t5': ['b2-u2-t4'],
  'b3-u3-t1': ['b1-u1-t1'],
  'b3-u3-t2': ['b3-u3-t1'],
  'b3-u3-t3': ['b3-u3-t2'],
  'b3-u3-t4': ['b1-u1-t1'],
  'b3-u3-t5': ['b3-u3-t4'],
  'b3-u3-t6': ['b3-u3-t4'],
  'b3-u4-t1': ['b1-u1-t1'],
  'b3-u4-t2': ['b3-u3-t4'],
  'b3-u4-t3': ['b3-u4-t2'],
};
