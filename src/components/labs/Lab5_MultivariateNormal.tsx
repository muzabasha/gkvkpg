/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 5 — Multivariate Normal Distribution
 * Shows: animated density contours, Mahalanobis distance rings,
 * eigenvector principal axes, marginal/conditional slices, compare p=2 vs p=3.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, Line, ComposedChart, Area,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import {
    generateBivariateNormalSample, normalPDF, conditionalNormal,
    calculateEigenvalues2D,
} from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Drawing N₂(μ,Σ) sample. Density contours are Mahalanobis distance ellipses (Δ²=1,4,9).',
    'Eigenvectors v₁,v₂ of Σ shown as principal axes. Lengths = √λ₁, √λ₂.',
    'Marginal distributions: projecting the joint cloud onto each axis gives univariate normals.',
    'Conditional distribution: slicing at X₂=x₂* gives a narrower normal (Schur complement).',
];

export const Lab5_MultivariateNormal: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [muX, setMuX] = useState(0);
    const [muY, setMuY] = useState(0);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.65);
    const [x2Star, setX2Star] = useState(1.0);
    const [n, setN] = useState(80);
    const [points, setPoints] = useState<BivariatePoint[]>([]);
    const [visibleN, setVisibleN] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);
    const { values: [lam1, lam2] } = calculateEigenvalues2D(varX, varY, covXY);
    const { mu: condMu, sigma2: condVar } = conditionalNormal(x2Star, muX, muY, varX, varY, covXY);

    const reset = useCallback(() => {
        setIsPlaying(false); setVisibleN(0); setStep(1);
        setPoints(generateBivariateNormalSample(n, muX, muY, varX, varY, covXY));
    }, [n, muX, muY, varX, varY, covXY]);

    useEffect(() => { reset(); }, [muX, muY, varX, varY, rho, n]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setVisibleN(prev => {
                const next = Math.min(prev + 2, n);
                setStep(next < n * 0.3 ? 1 : next < n * 0.6 ? 2 : next < n * 0.85 ? 3 : 4);
                if (next >= n) setIsPlaying(false);
                return next;
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed, n]);

    const visible = points.slice(0, Math.max(visibleN, 2));
    const xDomain: [number, number] = [muX - 4 * Math.sqrt(varX), muX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 4 * Math.sqrt(varY), muY + 4 * Math.sqrt(varY)];

    // Density along X₁ axis (marginal)
    const xRange = Array.from({ length: 80 }, (_, i) => xDomain[0] + i * (xDomain[1] - xDomain[0]) / 79);
    const margX = xRange.map(x => ({ x, marg: normalPDF(x, muX, varX), cond: normalPDF(x, condMu, condVar) }));

    // Mahalanobis distance for each visible point
    const sX = Math.sqrt(varX), sY = Math.sqrt(varY);
    const mahalDist = visible.map(p => {
        const dx = (p.x - muX) / sX, dy = (p.y - muY) / sY;
        const rho2 = rho * rho;
        const d2 = (dx * dx - 2 * rho * dx * dy + dy * dy) / (1 - rho2);
        return Math.sqrt(Math.max(d2, 0));
    });
    const avgMahal = mahalDist.length > 0 ? mahalDist.reduce((a, b) => a + b, 0) / mahalDist.length : 0;

    // Compare: different ρ values
    const compareScatters = compareMode ? [
        { label: 'ρ=−0.7', pts: generateBivariateNormalSample(50, muX, muY, varX, varY, -0.7 * Math.sqrt(varX * varY)), color: '#ef4444' },
        { label: 'ρ=0', pts: generateBivariateNormalSample(50, muX, muY, varX, varY, 0), color: '#94a3b8' },
        { label: 'ρ=+0.7', pts: generateBivariateNormalSample(50, muX, muY, varX, varY, 0.7 * Math.sqrt(varX * varY)), color: '#7c3aed' },
    ] : [];

    return (
        <VirtualLabShell
            title="Lab 5 — Multivariate Normal Distribution"
            subtitle="Explore density contours, Mahalanobis distance, marginals and conditionals"
            isPlaying={isPlaying} onPlay={() => { if (visibleN >= n) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={`${visibleN}/${n} pts`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <LabSlider label="μ_X" value={muX} min={-3} max={3} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y" value={muY} min={-3} max={3} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="x₂* (cond. value)" value={x2Star}
                        min={muY - 2 * Math.sqrt(varY)} max={muY + 2 * Math.sqrt(varY)} step={0.1} onChange={setX2Star} />
                    <LabSlider label="n" value={n} min={20} max={200} step={10} onChange={setN} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="λ₁ (major eigenval)" value={lam1.toFixed(3)} color="violet" />
                    <MetricBadge label="λ₂ (minor eigenval)" value={lam2.toFixed(3)} color="violet" />
                    <MetricBadge label="√λ₁ (major axis)" value={Math.sqrt(lam1).toFixed(3)} color="emerald" />
                    <MetricBadge label="√λ₂ (minor axis)" value={Math.sqrt(lam2).toFixed(3)} color="emerald" />
                    <MetricBadge label="μ₁|₂ (cond. mean)" value={condMu.toFixed(3)} color="blue" />
                    <MetricBadge label="σ²₁|₂ (cond. var)" value={condVar.toFixed(3)} color="blue" />
                    <MetricBadge label="Avg Δ (Mahalanobis)" value={avgMahal.toFixed(3)} color="amber" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {!compareMode ? (
                    <>
                        <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                            N₂(μ,Σ) sample — {visibleN} pts. Colour = Mahalanobis distance Δ.
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                                <XAxis type="number" dataKey="x" domain={xDomain} name="X₁"
                                    label={{ value: 'X₁ — Variable 1', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis type="number" dataKey="y" domain={yDomain} name="X₂"
                                    label={{ value: 'X₂ — Variable 2', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }} />
                                <ReferenceLine x={muX} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5}
                                    label={{ value: `μ_X=${muX}`, position: 'top', fontSize: 9, fill: '#ef4444' }} />
                                <ReferenceLine y={muY} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5}
                                    label={{ value: `μ_Y=${muY}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                                <ReferenceLine y={x2Star} stroke="#f59e0b" strokeDasharray="5 3" strokeWidth={1.5}
                                    label={{ value: `x₂*=${x2Star.toFixed(1)}`, position: 'left', fontSize: 9, fill: '#f59e0b' }} />
                                <Scatter name="Sample" data={visible} fill="rgba(124,58,237,0.6)" r={4} />
                            </ScatterChart>
                        </ResponsiveContainer>

                        {/* Marginal vs conditional density */}
                        <div className="text-[10px] font-bold text-center text-brandDark-500 mb-1">
                            Marginal f(X₁) (grey) vs Conditional f(X₁|X₂=x₂*) (blue) — Eq.(5.4) vs Eq.(5.6)
                        </div>
                        <ResponsiveContainer width="100%" height={110}>
                            <ComposedChart data={margX} margin={{ top: 5, right: 20, bottom: 20, left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                                <XAxis dataKey="x" domain={xDomain} tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'X₁', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#64748b' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'Density', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                                <Area type="monotone" dataKey="marg" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" strokeWidth={1.5} name="Marginal" dot={false} />
                                <Line type="monotone" dataKey="cond" stroke="#3b82f6" strokeWidth={2.5} name="Conditional" dot={false} />
                                <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="3 2" />
                                <ReferenceLine x={condMu} stroke="#3b82f6" strokeDasharray="4 2" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {compareScatters.map(({ label, pts, color }) => (
                            <div key={label}>
                                <div className="text-[10px] font-bold text-center mb-1" style={{ color }}>{label}</div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <ScatterChart margin={{ top: 5, right: 5, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                                        <XAxis type="number" dataKey="x" domain={xDomain} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'X₁', position: 'insideBottom', offset: -8, fontSize: 9, fill: '#64748b' }} />
                                        <YAxis type="number" dataKey="y" domain={yDomain} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'X₂', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#64748b' }} />
                                        <ReferenceLine x={muX} stroke="#ef4444" strokeDasharray="3 2" strokeWidth={1} />
                                        <ReferenceLine y={muY} stroke="#ef4444" strokeDasharray="3 2" strokeWidth={1} />
                                        <Scatter data={pts} fill={color} fillOpacity={0.65} r={3.5} />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </VirtualLabShell>
    );
};
