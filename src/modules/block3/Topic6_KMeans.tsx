import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  BookOpen,
  HelpCircle,
  Layers,
  Activity
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

interface TopicProps {
  projectorMode: boolean;
}

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

export const Topic6_KMeans: React.FC<TopicProps> = ({ projectorMode }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: true,
    sec7: true,
  });
  // Lab parameters
  const [centroidX, setCentroidX] = useState<number>(0);
  const [centroidY, setCentroidY] = useState<number>(0);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Fixed mock points
  const points = [
    { x: -3, y: -2, name: 'A' },
    { x: -2, y: -3, name: 'B' },
    { x: 3, y: 4, name: 'C' },
    { x: 4, y: 3, name: 'D' },
  ];

  // Calculate sum of squared errors to the adjustable centroid
  const sse = points.reduce((acc, p) => {
    const dx = p.x - centroidX;
    const dy = p.y - centroidY;
    return acc + (dx * dx + dy * dy);
  }, 0);

  const fontBody = projectorMode ? 'text-xl-readable leading-relaxed' : 'text-base md:text-lg-readable';
  const fontHeading3 = projectorMode ? 'text-2xl font-bold' : 'text-xl font-semibold';

  return (
    <div className="space-y-8 pb-16">
      {/* SECTION 1 — STORY TELLING */}
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
                SECTION 1 — Storytelling: The Pizza Franchise Center of Mass
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Positioning franchise hubs to minimize delivery times.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Suppose you want to establish 3 new pizza delivery hubs in Bangalore. You have the coordinates of all your active customers. You want to position the hubs so that the distance from each customer to their closest hub is as small as possible.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                This is **K-means Clustering**.
                You start by placing 3 mock hubs randomly (initial centroids). 
                Each customer is assigned to their closest hub. 
                Then, you relocate each hub to the exact "center of mass" (mean) of its assigned customers. 
                By repeating this assign-and-shift loop, the hubs naturally converge to the optimal positions, minimizing the Sum of Squared Errors (SSE)!
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
                SECTION 2 — Mathematical Modelling & Equations
              </h3>
              <p className="text-xs text-brandDark-400 m-0">SSE objective function and convergence loops.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The K-Means Objective Function (SSE)</span>
                <p>The goal is to partition observations into $K$ clusters $C_j$ to minimize the sum of squared Euclidean errors to the centroids <MathText math="\\mathbf{m}_j" />:</p>
                <Eq n="6.1" math="\text{SSE} = \sum_{j=1}^K \sum_{\mathbf{x}_i \in C_j} \|\mathbf{x}_i - \mathbf{m}_j\|^2" label="Sum of Squared Errors" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">B. Centroid Relocation</span>
                <p>In each step, centroids are recalculated as the coordinate averages of all points in the cluster:</p>
                <Eq n="6.2" math="\mathbf{m}_j = \frac{1}{|C_j|} \sum_{\mathbf{x}_i \in C_j} \mathbf{x}_i" label="Centroid Calculation" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3 — ACTIVE LEARNING */}
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
              <p className="text-xs text-brandDark-400 m-0">Detailed 4-level active collaborative learning.</p>
            </div>
          </div>
          {openSections.sec3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec3 && (
          <div className="p-6 space-y-4 text-sm">
            <div className="p-4 bg-brandDark-50 dark:bg-brandDark-950 rounded-xl">
              <h5 className="font-bold">Level 1 — Teacher Do: Grouping the Classroom</h5>
              <p className="mt-1">
                The teacher designates 2 students as "centroids" in different corners. Students step to whichever centroid is physically closer, and the centroids shift to stand in the exact middle of their groups, showing the algorithm live.
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
              <Activity size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-emerald-600 dark:text-emerald-400`}>
                SECTION 4 — Project Based Learning: Delivery Hub Optimizer
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Optimal facility locating projects.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 text-sm">
            <p>
              Develop a dispatch router for pizza delivery. Group customer locations into 3 optimal delivery hub centroids using K-means, minimizing total logistics and fuel expenses.
            </p>
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
              <p className="text-xs text-brandDark-400 m-0">Traps and solutions explained.</p>
            </div>
          </div>
          {openSections.sec5 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec5 && (
          <div className="p-6 space-y-4 text-sm">
            <div>
              <h5 className="font-bold">Q1: Why is K-means sensitive to initial centroid selection?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> Since K-means uses greedy gradient descent, bad starting spots can lock the model into sub-optimal local minima. Algorithms like K-means++ help bypass this.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6 — VIRTUAL LAB */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('sec6')}
          className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Layers size={22} />
            </span>
            <div>
              <h3 className={`${fontHeading3} m-0 text-indigo-600 dark:text-indigo-400`}>
                SECTION 6 — Virtual Interactive Laboratory
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Move the mock centroid and watch the Sum of Squared Errors (SSE) update live.</p>
            </div>
          </div>
          {openSections.sec6 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec6 && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-brandDark-50 dark:bg-brandDark-950 rounded-xl space-y-4">
                <h5 className="font-bold text-xs uppercase text-brandDark-400">Controls</h5>
                <div>
                  <label className="text-xs font-bold block mb-1">Centroid X: {centroidX}</label>
                  <input
                    type="range" min="-5" max="5" step="0.5"
                    value={centroidX} onChange={(e) => setCentroidX(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Centroid Y: {centroidY}</label>
                  <input
                    type="range" min="-5" max="5" step="0.5"
                    value={centroidY} onChange={(e) => setCentroidY(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">Error Dashboard</h5>
                  <div className="text-center py-4">
                    <span className="block text-xs text-brandDark-400 font-bold uppercase">Computed Sum of Squared Errors (SSE)</span>
                    <strong className="text-4xl font-extrabold text-blue-600">{sse.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                      <XAxis type="number" dataKey="x" domain={[-6, 6]} stroke="#64748b" />
                      <YAxis type="number" dataKey="y" domain={[-6, 6]} stroke="#64748b" />
                      <Tooltip />
                      <Scatter name="Points" data={points} fill="#8884d8" />
                      <ReferenceDot x={centroidX} y={centroidY} r={10} fill="#ef4444" stroke="#fff" label={{ value: 'Centroid', fill: '#fff', fontSize: 8 }} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 7 — R SANDBOX */}
      <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
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
                SECTION 7 — Practical Computations &amp; R Language Sandbox
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Fit K-means models out-of-the-box in R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# K-means Clustering in Base R
set.seed(42)

# Generate two distinct clusters
c1 <- matrix(rnorm(20, mean=1), ncol=2)
c2 <- matrix(rnorm(20, mean=5), ncol=2)
df <- rbind(c1, c2)

# Fit K-means with K=2
fit <- kmeans(df, centers=2)

cat("--- Centroid Coordinates ---\\n")
print(fit$centers)
cat("\\n--- Cluster Allocations ---\\n")
print(fit$cluster)
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          K-means partition clustering partitions datasets into K distinct groups. By iteratively executing assignment and relocation updates, K-means achieves optimal centroid centers minimizing total Euclidean distances.
        </p>
      </section>
    </div>
  );
};

export default Topic6_KMeans;
