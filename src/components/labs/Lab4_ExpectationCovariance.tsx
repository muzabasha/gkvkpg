/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 4 — Expectation & Covariance
 * Shows: live scatter, animated mean vector convergence, covariance matrix
 * building step-by-step, eigenvalue decomposition, 3-panel compare (ρ<0, ρ=0, ρ>0).
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import { generateBivariateNormalSample, sampleMean, sampleCovariance, calculateEigenvalues2D } from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Drawing observations one by one. Watch the sample mean vector (red cross) converge to μ.',
    'Computing deviation vectors (X_i − x̄). Each arrow shows how far a point is from the mean.',
    'Accumulating outer products (X_i−x̄)(X_i−x̄)ᵀ to build the sample covariance matrix S.',
    'Eigendecomposition of S: principal axes v₁, v₂ and their lengths √λ₁, √λ₂ shown on scatter.',
];

export const Lab4_ExpectationCovariance: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(400);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [muX, setMuX] = useState(0);
    const [muY, setMuY] = useState(0);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.6);
    const [n, setN] = useState(60);
    const [allPoints, setAllPoints] = useState<BivariatePoint[]>([]);
    const [visibleN, setVisibleN] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);

    const reset = useCallback(() => {
        setIsPlaying(false); setVisibleN(0); setStep(1);
        setAllPoints(generateBivariateNormalSample(n, muX, muY, varX, varY, covXY));
    }, [n, muX, muY, varX, varY, covXY]);

    useEffect(() => { reset(); }, [muX, muY, varX, varY, rho, n]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setVisibleN(prev => {
                const next = Math.min(prev + 1, n);
                setStep(next < n * 0.25 ? 1 : next < n * 0.5 ? 2 : next < n * 0.75 ? 3 : 4);
                if (next >= n) setIsPlaying(false);
                return next;
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed, n]);

    const visible = allPoints.slice(0, Math.max(visibleN, 2));
    const { mx, my } = sampleMean(visible);
    const { s11, s22, s12 } = sampleCovariance(visible);
    const { values: [lam1, lam2] } = calculateEigenvalues2D(s11, s22, s12);
    const corrEst = s11 > 0 && s22 > 0 ? s12 / Math.sqrt(s11 * s22) : 0;

    const xDomain: [number, number] = [muX - 4 * Math.sqrt(varX), muX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 4 * Math.sqrt(varY), muY + 4 * Math.sqrt(varY)];

    // Covariance matrix bar chart data
    const matrixBars = [
        { name: 's₁₁', value: s11, fill: '#3b82f6' },
        { name: 's₁₂', value: s12, fill: '#f59e0b' },
        { name: 's₂₂', value: s22, fill: '#10b981' },
    ];

    // Compare panels (ρ<0, ρ=0, ρ>0)
    const compareData = compareMode ? [
        { label: 'ρ = −0.8', pts: generateBivariateNormalSample(40, muX, muY, varX, varY, -0.8 * Math.sqrt(varX * varY)), color: '#ef4444' },
        { label: 'ρ = 0', pts: generateBivariateNormalSample(40, muX, muY, varX, varY, 0), color: '#94a3b8' },
        { label: 'ρ = +0.8', pts: generateBivariateNormalSample(40, muX, muY, varX, varY, 0.8 * Math.sqrt(varX * varY)), color: '#7c3aed' },
    ] : [];

    return (
        <VirtualLabShell
            title="Lab 4 — Expectation & Covariance Matrix"
            subtitle="Watch the sample mean converge and the covariance matrix build up observation by observation"
            isPlaying={isPlaying} onPlay={() => { if (visibleN >= n) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={`${visibleN}/${n} obs`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <LabSlider label="μ_X" value={muX} min={-3} max={3} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y" value={muY} min={-3} max={3} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="n" value={n} min={10} max={150} step={5} onChange={setN} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="x̄ (mean X)" value={mx.toFixed(3)} color="blue" />
                    <MetricBadge label="ȳ (mean Y)" value={my.toFixed(3)} color="blue" />
                    <MetricBadge label="s₁₁ (var X)" value={s11.toFixed(3)} color="violet" />
                    <MetricBadge label="s₂₂ (var Y)" value={s22.toFixed(3)} color="violet" />
                    <MetricBadge label="s₁₂ (cov)" value={s12.toFixed(3)} color="amber" />
                    <MetricBadge label="ρ̂" value={corrEst.toFixed(3)} color="emerald" />
                    <MetricBadge label="λ₁ (major)" value={lam1.toFixed(3)} color="violet" />
                    <MetricBadge label="λ₂ (minor)" value={lam2.toFixed(3)} color="violet" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {!compareMode ? (
                    <>
                        <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                            Live scatter — {visibleN} observations. Red cross = sample mean x̄.
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                                <XAxis type="number" dataKey="x" domain={xDomain} name="X₁"
                                    label={{ value: 'X₁ — Variable 1', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis type="number" dataKey="y" domain={yDomain} name="X₂"
                                    label={{ value: 'X₂ — Variable 2', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }} />
                                <ReferenceLine x={mx} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2"
                                    label={{ value: `x̄=${mx.toFixed(1)}`, position: 'top', fontSize: 9, fill: '#ef4444' }} />
                                <ReferenceLine y={my} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2"
                                    label={{ value: `ȳ=${my.toFixed(1)}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                                {/* True mean reference */}
                                <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="2 4" strokeWidth={1} />
                                <ReferenceLine y={muY} stroke="#94a3b8" strokeDasharray="2 4" strokeWidth={1} />
                                <Scatter name="Observations" data={visible} fill="rgba(124,58,237,0.6)" r={4} />
                            </ScatterChart>
                        </ResponsiveContainer>

                        {/* Covariance matrix bars */}
                        <div className="text-[10px] font-bold text-center text-brandDark-500 mb-1">
                            Sample Covariance Matrix Entries — Eq.(4.3)
                        </div>
                        <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={matrixBars} margin={{ top: 5, right: 20, bottom: 5, left: 30 }}>
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'Value', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {matrixBars.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {compareData.map(({ label, pts, color }) => (
                            <div key={label}>
                                <div className="text-[10px] font-bold text-center mb-1" style={{ color }}>{label}</div>
                                <ResponsiveContainer width="100%" height={180}>
                                    <ScatterChart margin={{ top: 5, right: 5, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                                        <XAxis type="number" dataKey="x" domain={xDomain} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'X₁', position: 'insideBottom', offset: -8, fontSize: 9, fill: '#64748b' }} />
                                        <YAxis type="number" dataKey="y" domain={yDomain} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'X₂', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#64748b' }} />
                                        <Scatter data={pts} fill={color} fillOpacity={0.6} r={3} />
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
