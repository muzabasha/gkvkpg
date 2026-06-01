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
  ResponsiveContainer
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

const Term: React.FC<{ sym: string; meaning: React.ReactNode }> = ({ sym, meaning }) => (
  <tr className="border-b border-brandDark-100 dark:border-brandDark-800 last:border-0">
    <td className="py-2 pr-4 align-top w-52 text-sm"><MathText math={sym} /></td>
    <td className="py-2 text-sm text-brandDark-600 dark:text-brandDark-400 align-top leading-relaxed">{meaning}</td>
  </tr>
);

export const Topic8_MDS: React.FC<TopicProps> = ({ projectorMode }) => {
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
  const [scalingFactor, setScalingFactor] = useState<number>(1);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Coordinates representing reconstructed 2D map from distances
  const mapPoints = [
    { x: -3 * scalingFactor, y: -1 * scalingFactor, name: 'Mumbai' },
    { x: 3 * scalingFactor, y: 2 * scalingFactor, name: 'Delhi' },
    { x: -1 * scalingFactor, y: -4 * scalingFactor, name: 'Bangalore' },
  ];

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
                SECTION 1 — Storytelling: The Mapmaker's Distance Table Puzzle
              </h3>
              <p className="text-xs text-brandDark-400 m-0">Reconstructing actual physical coordinates from abstract proximity metrics.</p>
            </div>
          </div>
          {openSections.sec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec1 && (
          <div className={`p-6 ${fontBody} space-y-4`}>
            <div className="border-l-4 border-primary-500 pl-4 py-1 bg-primary-500/5 rounded-r-xl">
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300">
                Imagine you are handed a road atlas of India. Someone has cut out the map pages, leaving only the distance matrix table at the back (e.g. Bangalore to Mumbai = 980km, Mumbai to Delhi = 1400km, etc.). You don't have any coordinates or maps.
              </p>
              <p className="italic font-medium text-brandDark-700 dark:text-brandDark-300 mt-2">
                Can we reconstruct the exact 2D map of India using *only* this distance table? 
                **Multidimensional Scaling (MDS)** is the exact mathematical compiler that does this! 
                By treating distances as force strings, MDS stretches and rotates the points on a blank 2D canvas until the physical distances between the dots perfectly match the atlas table, recreating the map from scratch!
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
              <p className="text-xs text-brandDark-400 m-0">The stress objective function and coordinate solvers.</p>
            </div>
          </div>
          {openSections.sec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec2 && (
          <div className="p-6 space-y-6">
            <div className={`${fontBody} space-y-8`}>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500 block">A. The MDS Stress Function</span>
                <p>MDS finds a set of coordinates in low-dimensional space to minimize the "Stress" discrepancy between reconstructed distances <MathText math="d_{ij}" /> and target proximities <MathText math="\\delta_{ij}" />:</p>
                <Eq n="8.1" math="\text{Stress} = \sqrt{ \frac{\sum_{i < j} (d_{ij} - \delta_{ij})^2}{\sum_{i < j} \delta_{ij}^2} }" label="Stress Function" />
                
                <div className="overflow-x-auto rounded-xl border border-brandDark-200 dark:border-brandDark-800">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-brandDark-100 dark:bg-brandDark-800">
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 w-52 text-sm">Term</th>
                        <th className="text-left px-4 py-2 font-bold text-brandDark-700 dark:text-brandDark-300 text-sm">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brandDark-100 dark:divide-brandDark-800">
                      <Term sym="\delta_{ij}" meaning="Target proximity or dissimilarity between item i and item j in high-dimensional space." />
                      <Term sym="d_{ij}" meaning="Euclidean distance between projected coordinates in the low-dimensional (e.g. 2D) space." />
                    </tbody>
                  </table>
                </div>
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
              <h5 className="font-bold">Level 1 — Teacher Do: Triangulation Demo</h5>
              <p className="mt-1">
                The teacher places three push pins on a corkboard, connected by strings of measured lengths (distances). By rotating the whole triangle, the teacher shows that while coordinate axes can rotate, the relative spatial layout remains locked.
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
                SECTION 4 — Project Based Learning: Perceptual Product Mapper
              </h3>
              <p className="text-xs text-brandDark-400 m-0">MDS applied to customer feedback surveys.</p>
            </div>
          </div>
          {openSections.sec4 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec4 && (
          <div className="p-6 text-sm">
            <p>
              Design a market perception tracker. Feed product-to-product customer dissimilarity scores into an MDS compiler to map competing brands on a 2D canvas, isolating market niches out-of-the-box.
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
              <h5 className="font-bold">Q1: What is the main objective of Multidimensional Scaling?</h5>
              <p className="text-brandDark-600 dark:text-brandDark-400">
                <strong>Answer:</strong> To model high-dimensional similarities or distances as coordinate layouts in a lower-dimensional space (e.g. 2D) such that relative distances are preserved.
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
              <p className="text-xs text-brandDark-400 m-0">Adjust the scaling multiplier and observe reconstructed spatial maps live.</p>
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
                  <label className="text-xs font-bold block mb-1">MDS Scaling Multiplier: {scalingFactor}</label>
                  <input
                    type="range" min="0.5" max="2" step="0.1"
                    value={scalingFactor} onChange={(e) => setScalingFactor(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-3 bg-brandDark-50 dark:bg-brandDark-950 p-4 rounded-xl h-64">
                <h5 className="font-bold text-xs uppercase text-brandDark-400 mb-2">Reconstructed 2D Coordinate Map</h5>
                <ResponsiveContainer width="100%" height="90%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis type="number" dataKey="x" domain={[-6, 6]} stroke="#64748b" />
                    <YAxis type="number" dataKey="y" domain={[-6, 6]} stroke="#64748b" />
                    <Tooltip />
                    <Scatter name="Cities" data={mapPoints} fill="#ef4444" />
                  </ScatterChart>
                </ResponsiveContainer>
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
              <p className="text-xs text-brandDark-400 m-0">Fit MDS coordinates out-of-the-box in R.</p>
            </div>
          </div>
          {openSections.sec7 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {openSections.sec7 && (
          <div className="p-6 space-y-4">
            <pre className="text-xs font-mono text-brandDark-300 bg-brandDark-950 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`# Classical Multidimensional Scaling in R
# Target road distances matrix between 3 cities
d_matrix <- as.dist(matrix(c(
  0, 980, 1400,
  980, 0, 800,
  1400, 800, 0
), nrow=3, byrow=TRUE))

# Fit metric MDS
fit <- cmdscale(d_matrix, k=2)

cat("--- Reconstructed 2D Coordinates ---\\n")
print(fit)
`}
            </pre>
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="bg-gradient-to-r from-primary-950 to-brandDark-900 border border-primary-900/50 rounded-2xl p-6 text-white text-sm shadow-md">
        <h4 className="font-black text-lg text-primary-400 mb-2 uppercase tracking-wider">Topic Summary</h4>
        <p className="text-brandDark-200">
          Multidimensional Scaling reconstructs low-dimensional coordinate systems from abstract proximity or dissimilarity tables. It is widely used in marketing, psychology, and mapping workflows.
        </p>
      </section>
    </div>
  );
};

export default Topic8_MDS;
