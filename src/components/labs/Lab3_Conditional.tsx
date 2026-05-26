/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 3 — Conditional Distributions & Independence
 * Shows: joint scatter, animated conditioning slice, conditional density,
 * shift in conditional mean vs unconditional mean, variance reduction.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, Line, ComposedChart, Area,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import { generateBivariateNormalSample, normalPDF, conditionalNormal } from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Joint sample drawn from N₂(μ, Σ). Each point is one (X₁, X₂) observation.',
    'Conditioning event: X₂ = x₂* (red line). We slice the joint density at this value.',
    'Conditional density f(X₁|X₂=x₂*) shown in blue. Notice it is narrower than the marginal.',
    'Comparing conditional mean (blue) vs unconditional mean μ₁ (red). The shift = ρ·(σ₁/σ₂)·(x₂*−μ₂).',
];

export const Lab3_Conditional: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(600);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [muX, setMuX] = useState(0);
    const [muY, setMuY] = useState(0);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.75);
    const [x2Star, setX2Star] = useState(1.0);
    const [n, setN] = useState(80);
    const [points, setPoints] = useState<BivariatePoint[]>([]);
    const [animStep, setAnimStep] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);
    const { mu: condMu, sigma2: condVar } = conditionalNormal(x2Star, muX, muY, varX, varY, covXY);
    const varianceReduction = varX > 0 ? ((varX - condVar) / varX * 100) : 0;

    const reset = useCallback(() => {
        setIsPlaying(false); setAnimStep(0); setStep(1);
        setPoints(generateBivariateNormalSample(n, muX, muY, varX, varY, covXY));
    }, [n, muX, muY, varX, varY, covXY]);

    useEffect(() => { reset(); }, [muX, muY, varX, varY, rho, n]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setAnimStep(prev => {
                const next = prev + 1;
                setStep(Math.min(Math.ceil(next / 3) + 1, 4));
                if (next >= 12) { setIsPlaying(false); setStep(4); }
                return next;
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed]);

    const xDomain: [number, number] = [muX - 4 * Math.sqrt(varX), muX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 4 * Math.sqrt(varY), muY + 4 * Math.sqrt(varY)];

    // Conditional density curve
    const xRange = Array.from({ length: 80 }, (_, i) => xDomain[0] + i * (xDomain[1] - xDomain[0]) / 79);
    const condDensity = xRange.map(x => ({ x, cond: normalPDF(x, condMu, condVar), marg: normalPDF(x, muX, varX) }));

    // Points near the conditioning slice (within ±0.5σ_Y)
    const sliceWidth = 0.5 * Math.sqrt(varY);
    const slicePoints = points.filter(p => Math.abs(p.y - x2Star) < sliceWidth);

    // Independence reference (ρ=0)
    const indepPoints = compareMode ? generateBivariateNormalSample(n, muX, muY, varX, varY, 0) : [];

    return (
        <VirtualLabShell
            title="Lab 3 — Conditional Distributions & Independence"
            subtitle="Slice the joint density at X₂=x₂* and observe the conditional distribution"
            isPlaying={isPlaying} onPlay={() => { if (animStep >= 12) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={animStep >= 12 ? 'Complete' : `Frame ${animStep}/12`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <LabSlider label="μ_X" value={muX} min={-3} max={3} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y" value={muY} min={-3} max={3} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X" value={varX} min={0.5} max={8} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y" value={varY} min={0.5} max={8} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ (correlation)" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="x₂* (conditioning value)" value={x2Star} min={muY - 2 * Math.sqrt(varY)} max={muY + 2 * Math.sqrt(varY)} step={0.1} onChange={setX2Star} />
                    <LabSlider label="n (sample size)" value={n} min={30} max={200} step={10} onChange={setN} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="μ₁|₂ (cond. mean)" value={condMu.toFixed(3)} color="blue" />
                    <MetricBadge label="σ²₁|₂ (cond. var)" value={condVar.toFixed(3)} color="violet" />
                    <MetricBadge label="Var. reduction" value={`${varianceReduction.toFixed(1)}%`} color="emerald" />
                    <MetricBadge label="Shift from μ₁" value={(condMu - muX).toFixed(3)} color="amber" />
                    <MetricBadge label="Points in slice" value={String(slicePoints.length)} color="blue" />
                    <MetricBadge label="True ρ" value={rho.toFixed(2)} color="violet" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {/* Joint scatter with conditioning line */}
                <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                    Joint f(x₁,x₂) with conditioning slice at X₂ = {x2Star.toFixed(2)}
                </div>
                <ResponsiveContainer width="100%" height={240}>
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                        <XAxis type="number" dataKey="x" domain={xDomain} name="X₁"
                            label={{ value: 'X₁ — Variable 1', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                            tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis type="number" dataKey="y" domain={yDomain} name="X₂"
                            label={{ value: 'X₂ — Variable 2', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                            tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }} />
                        <ReferenceLine y={x2Star} stroke="#ef4444" strokeWidth={2} strokeDasharray="6 3"
                            label={{ value: `X₂ = ${x2Star.toFixed(1)}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                        <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={1} />
                        <ReferenceLine x={condMu} stroke="#3b82f6" strokeDasharray="4 2" strokeWidth={1.5}
                            label={{ value: `μ₁|₂=${condMu.toFixed(2)}`, position: 'top', fontSize: 9, fill: '#3b82f6' }} />
                        {compareMode && <Scatter name="ρ=0" data={indepPoints} fill="rgba(148,163,184,0.25)" r={3} />}
                        <Scatter name="All points" data={points} fill="rgba(124,58,237,0.4)" r={3.5} />
                        <Scatter name="Slice points" data={slicePoints} fill="rgba(59,130,246,0.9)" r={5} />
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Conditional vs marginal density */}
                <div className="text-[10px] font-bold text-center text-brandDark-500 dark:text-brandDark-400">
                    Conditional f(X₁|X₂=x₂*) vs Marginal f(X₁) — Eq.(3.1) vs Eq.(2.6)
                </div>
                <ResponsiveContainer width="100%" height={120}>
                    <ComposedChart data={condDensity} margin={{ top: 5, right: 20, bottom: 20, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                        <XAxis dataKey="x" domain={xDomain} tick={{ fontSize: 9, fill: '#94a3b8' }}
                            label={{ value: 'X₁', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                            label={{ value: 'Density', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                        <Area type="monotone" dataKey="marg" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" strokeWidth={1.5} name="Marginal f(X₁)" dot={false} />
                        <Line type="monotone" dataKey="cond" stroke="#3b82f6" strokeWidth={2.5} name="Conditional f(X₁|X₂=x₂*)" dot={false} />
                        <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="3 2" strokeWidth={1} />
                        <ReferenceLine x={condMu} stroke="#3b82f6" strokeDasharray="4 2" strokeWidth={1.5} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </VirtualLabShell>
    );
};
