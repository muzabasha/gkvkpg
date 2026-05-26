/**
 * Lab 2 — Marginal & Joint Distributions
 * Visualizes the relationship between a bivariate normal distribution and its marginals.
 */
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import { generateBivariateNormalSample, normalPDF, sampleMean, sampleCovariance } from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Generating joint sample from N₂(μ, Σ). Each dot is one observation (x₁, x₂).',
    'Computing marginal f(x₁) by integrating out x₂. Blue histogram shows the X₁ distribution.',
    'Computing marginal f(x₂) by integrating out x₁. Green histogram shows the X₂ distribution.',
    'Comparing: the tilt of the joint ellipse encodes ρ, but both marginals are symmetric bell curves regardless of ρ.',
];

export const Lab2_MarginalJoint: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [muX, setMuX] = useState(0);
    const [muY, setMuY] = useState(0);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.7);
    const [n, setN] = useState(60);
    const [points, setPoints] = useState<BivariatePoint[]>([]);
    const [visibleN, setVisibleN] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setStep(1);
        setVisibleN(0);
        const pts = generateBivariateNormalSample(n, muX, muY, varX, varY, covXY);
        setPoints(pts);
    }, [n, muX, muY, varX, varY, covXY]);

    useEffect(() => { reset(); }, [muX, muY, varX, varY, rho, n]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setVisibleN(prev => {
                const next = Math.min(prev + Math.max(1, Math.floor(n / 20)), n);
                if (next >= n) {
                    setIsPlaying(false);
                    setStep(4);
                } else {
                    setStep(next < n * 0.3 ? 1 : next < n * 0.6 ? 2 : 3);
                }
                return next;
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed, n]);

    const visible = points.slice(0, visibleN);
    const { mx, my } = sampleMean(visible.length > 0 ? visible : points);
    const { s11, s22, s12 } = sampleCovariance(visible.length > 1 ? visible : points);
    const corrEst = s11 > 0 && s22 > 0 ? s12 / Math.sqrt(s11 * s22) : 0;

    // Marginal density curves
    const xRange = Array.from({ length: 60 }, (_, i) => muX - 3 * Math.sqrt(varX) + i * 6 * Math.sqrt(varX) / 59);
    const margX = xRange.map(x => ({ x, y: normalPDF(x, muX, varX) }));
    const yRange = Array.from({ length: 60 }, (_, i) => muY - 3 * Math.sqrt(varY) + i * 6 * Math.sqrt(varY) / 59);
    const margY = yRange.map(y => ({ x: y, y: normalPDF(y, muY, varY) }));

    // Compare: uncorrelated version
    const comparePoints = compareMode
        ? generateBivariateNormalSample(n, muX, muY, varX, varY, 0)
        : [];

    const xDomain: [number, number] = [muX - 3.5 * Math.sqrt(varX), muX + 3.5 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 3.5 * Math.sqrt(varY), muY + 3.5 * Math.sqrt(varY)];

    return (
        <VirtualLabShell
            title="Lab 2 — Marginal & Joint Distributions"
            subtitle="Observe how marginalisation projects the joint cloud onto each axis"
            isPlaying={isPlaying} onPlay={() => { if (visibleN >= n) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={visibleN >= n ? 'Complete' : `${visibleN}/${n} pts`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <LabSlider label="μ_X (mean X)" value={muX} min={-5} max={5} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y (mean Y)" value={muY} min={-5} max={5} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X (var X)" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y (var Y)" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ (correlation)" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="n (sample size)" value={n} min={20} max={200} step={10} onChange={setN} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="x̄ (sample mean X)" value={mx.toFixed(3)} color="blue" />
                    <MetricBadge label="ȳ (sample mean Y)" value={my.toFixed(3)} color="blue" />
                    <MetricBadge label="s²_X (sample var)" value={s11.toFixed(3)} color="violet" />
                    <MetricBadge label="s²_Y (sample var)" value={s22.toFixed(3)} color="violet" />
                    <MetricBadge label="ρ̂ (est. correlation)" value={corrEst.toFixed(3)} color="emerald" />
                    <MetricBadge label="True ρ" value={rho.toFixed(2)} color="amber" />
                </div>
            }
        >
            {/* Joint scatter + marginal curves */}
            <div className="p-3 space-y-3">
                <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                    Joint Distribution f(x₁, x₂) — {visible.length} observations
                    {compareMode && <span className="ml-2 text-amber-600">(grey = ρ=0 reference)</span>}
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                        <XAxis type="number" dataKey="x" domain={xDomain} name="X₁"
                            label={{ value: 'X₁ — Variable 1 (e.g. Height)', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                            tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis type="number" dataKey="y" domain={yDomain} name="X₂"
                            label={{ value: 'X₂ — Variable 2 (e.g. Weight)', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                            tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }}
                            formatter={(v: unknown) => [typeof v === 'number' ? v.toFixed(3) : String(v)]}
                            labelFormatter={() => 'Observation'} />
                        <ReferenceLine x={muX} stroke="#3b82f6" strokeDasharray="4 2" strokeWidth={1.5}
                            label={{ value: `μ_X=${muX}`, position: 'top', fontSize: 9, fill: '#3b82f6' }} />
                        <ReferenceLine y={muY} stroke="#10b981" strokeDasharray="4 2" strokeWidth={1.5}
                            label={{ value: `μ_Y=${muY}`, position: 'right', fontSize: 9, fill: '#10b981' }} />
                        {compareMode && <Scatter name="ρ=0 reference" data={comparePoints} fill="rgba(148,163,184,0.3)" r={3} />}
                        <Scatter name="Joint sample" data={visible} fill="rgba(124,58,237,0.65)" r={4} />
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Marginal curves side by side */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div className="text-[10px] font-bold text-center text-blue-600 dark:text-blue-400 mb-1">
                            Marginal f(x₁) — Eq.(2.6)
                        </div>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={margX} margin={{ top: 5, right: 10, bottom: 20, left: 10 }}>
                                <XAxis dataKey="x" domain={xDomain} tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'X₁', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#3b82f6' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'f(x₁)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#3b82f6' }} />
                                <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-center text-emerald-600 dark:text-emerald-400 mb-1">
                            Marginal f(x₂) — Eq.(2.7)
                        </div>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={margY} margin={{ top: 5, right: 10, bottom: 20, left: 10 }}>
                                <XAxis dataKey="x" domain={yDomain} tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'X₂', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#10b981' }} />
                                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    label={{ value: 'f(x₂)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#10b981' }} />
                                <Line type="monotone" dataKey="y" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </VirtualLabShell>
    );
};
