/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 6 — Sample Mean Vector & Its Distribution
 * Shows: repeated sampling, sample mean trajectory, convergence to μ,
 * sampling distribution ellipse shrinking with n, compare n=5/20/100.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import { generateBivariateNormalSample, sampleMean } from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Drawing one sample of size n. The sample mean x̄ is the centroid of the n points.',
    'Repeating sampling B times. Each trial gives a different x̄. Watch the cloud of x̄ values form.',
    'The cloud of x̄ values is itself N₂(μ, Σ/n) — the sampling distribution (Eq. 6.2).',
    'Larger n → tighter cloud of x̄ values. Compare n=5, n=20, n=100 in Compare mode.',
];

export const Lab6_SampleMean: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [muX, setMuX] = useState(0);
    const [muY, setMuY] = useState(0);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.5);
    const [n, setN] = useState(20);
    const [B, setB] = useState(100);
    const [means, setMeans] = useState<BivariatePoint[]>([]);
    const [currentSample, setCurrentSample] = useState<BivariatePoint[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);

    const reset = useCallback(() => {
        setIsPlaying(false); setMeans([]); setCurrentSample([]); setStep(1);
    }, []);

    useEffect(() => { reset(); }, [muX, muY, varX, varY, rho, n, B]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setMeans(prev => {
                if (prev.length >= B) { setIsPlaying(false); setStep(4); return prev; }
                const sample = generateBivariateNormalSample(n, muX, muY, varX, varY, covXY);
                setCurrentSample(sample);
                const { mx, my } = sampleMean(sample);
                const next = [...prev, { x: mx, y: my }];
                setStep(next.length < B * 0.25 ? 1 : next.length < B * 0.5 ? 2 : next.length < B * 0.85 ? 3 : 4);
                return next;
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed, n, B, muX, muY, varX, varY, covXY]);

    // Stats of the means cloud
    const { mx: mxBar, my: myBar } = sampleMean(means.length > 0 ? means : [{ x: muX, y: muY }]);
    const theoreticalSE_X = Math.sqrt(varX / n);
    const theoreticalSE_Y = Math.sqrt(varY / n);
    const empiricalSE_X = means.length > 1
        ? Math.sqrt(means.reduce((s, p) => s + (p.x - mxBar) ** 2, 0) / (means.length - 1))
        : 0;

    const xDomain: [number, number] = [muX - 4 * Math.sqrt(varX), muX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 4 * Math.sqrt(varY), muY + 4 * Math.sqrt(varY)];
    const meansDomain_x: [number, number] = [muX - 3 * theoreticalSE_X * 3, muX + 3 * theoreticalSE_X * 3];
    const meansDomain_y: [number, number] = [muY - 3 * theoreticalSE_Y * 3, muY + 3 * theoreticalSE_Y * 3];

    // Compare: n=5, 20, 100
    const compareNs = [5, 20, 100];
    const compareMeans = compareMode
        ? compareNs.map(ni => ({
            n: ni,
            pts: Array.from({ length: 80 }, () => {
                const s = generateBivariateNormalSample(ni, muX, muY, varX, varY, covXY);
                const { mx, my } = sampleMean(s);
                return { x: mx, y: my };
            }),
        }))
        : [];

    const compareColors = ['#ef4444', '#3b82f6', '#10b981'];

    // Mean trajectory (last 30 means)
    // trajectory removed (unused)

    return (
        <VirtualLabShell
            title="Lab 6 — Sample Mean Vector & Sampling Distribution"
            subtitle="Repeat sampling B times to observe the distribution of x̄ converging to N₂(μ, Σ/n)"
            isPlaying={isPlaying} onPlay={() => { if (means.length >= B) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={`${means.length}/${B} trials`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <LabSlider label="μ_X (true mean X)" value={muX} min={-3} max={3} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y (true mean Y)" value={muY} min={-3} max={3} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="n (sample size)" value={n} min={5} max={100} step={5} onChange={setN} format={v => String(Math.round(v))} />
                    <LabSlider label="B (# trials)" value={B} min={20} max={300} step={10} onChange={setB} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="Trials completed" value={String(means.length)} color="blue" />
                    <MetricBadge label="Mean of x̄_X" value={mxBar.toFixed(3)} color="blue" />
                    <MetricBadge label="Mean of x̄_Y" value={myBar.toFixed(3)} color="blue" />
                    <MetricBadge label="SE_X (theory √(σ²/n))" value={theoreticalSE_X.toFixed(3)} color="violet" />
                    <MetricBadge label="SE_X (empirical)" value={empiricalSE_X.toFixed(3)} color="emerald" />
                    <MetricBadge label="n (current)" value={String(n)} color="amber" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {!compareMode ? (
                    <>
                        {/* Current sample */}
                        <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                            Current sample (n={n}) — grey dots. Red cross = current x̄.
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                                <XAxis type="number" dataKey="x" domain={xDomain} name="X₁"
                                    label={{ value: 'X₁ — Variable 1', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis type="number" dataKey="y" domain={yDomain} name="X₂"
                                    label={{ value: 'X₂ — Variable 2', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }} />
                                <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="3 2" strokeWidth={1} />
                                <ReferenceLine y={muY} stroke="#94a3b8" strokeDasharray="3 2" strokeWidth={1} />
                                <Scatter name="Current sample" data={currentSample} fill="rgba(148,163,184,0.5)" r={3} />
                            </ScatterChart>
                        </ResponsiveContainer>

                        {/* Cloud of sample means */}
                        <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                            Cloud of x̄ values ({means.length} trials) — sampling distribution N₂(μ, Σ/n) — Eq.(6.2)
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                                <XAxis type="number" dataKey="x" domain={meansDomain_x} name="x̄₁"
                                    label={{ value: 'x̄₁ — Sample mean of X₁', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis type="number" dataKey="y" domain={meansDomain_y} name="x̄₂"
                                    label={{ value: 'x̄₂ — Sample mean of X₂', angle: -90, position: 'insideLeft', offset: 12, fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                                    tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 11 }} />
                                <ReferenceLine x={muX} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5}
                                    label={{ value: `μ_X=${muX}`, position: 'top', fontSize: 9, fill: '#ef4444' }} />
                                <ReferenceLine y={muY} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5}
                                    label={{ value: `μ_Y=${muY}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                                <Scatter name="Sample means" data={means} fill="rgba(59,130,246,0.55)" r={3.5} />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {compareMeans.map(({ n: ni, pts }, idx) => (
                            <div key={ni}>
                                <div className="text-[10px] font-bold text-center mb-1" style={{ color: compareColors[idx] }}>
                                    n = {ni} — SE = {Math.sqrt(varX / ni).toFixed(3)}
                                </div>
                                <ResponsiveContainer width="100%" height={200}>
                                    <ScatterChart margin={{ top: 5, right: 5, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                                        <XAxis type="number" dataKey="x" domain={meansDomain_x} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'x̄₁', position: 'insideBottom', offset: -8, fontSize: 9, fill: '#64748b' }} />
                                        <YAxis type="number" dataKey="y" domain={meansDomain_y} tick={{ fontSize: 8, fill: '#94a3b8' }}
                                            label={{ value: 'x̄₂', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#64748b' }} />
                                        <ReferenceLine x={muX} stroke="#ef4444" strokeDasharray="3 2" strokeWidth={1} />
                                        <ReferenceLine y={muY} stroke="#ef4444" strokeDasharray="3 2" strokeWidth={1} />
                                        <Scatter data={pts} fill={compareColors[idx]} fillOpacity={0.6} r={3} />
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
