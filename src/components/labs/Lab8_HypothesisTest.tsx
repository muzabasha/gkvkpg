/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 8 — Tests of Hypothesis about Mean Vector (Hotelling's T²)
 * Shows: animated sampling, T² statistic building, F-distribution comparison,
 * confidence ellipsoid, Type I/II error visualization, compare H₀ true vs false.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import {
    generateBivariateNormalSample, sampleMean, sampleCovariance,
    hotellingT2, fCritical95,
} from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Drawing n observations from the true population N₂(μ_true, Σ). Computing sample mean x̄.',
    'Computing Hotelling T² = n·(x̄−μ₀)ᵀ·S⁻¹·(x̄−μ₀) — Eq.(8.2). Watch T² accumulate.',
    'Converting T² to F-statistic (Eq. 8.4). Comparing to critical value F_{p,n-p;0.05}.',
    'Decision: if F_obs > F_crit → Reject H₀. Confidence ellipsoid shown around x̄.',
];

export const Lab8_HypothesisTest: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [zoom, setZoom] = useState(1);
    const [compareMode, setCompareMode] = useState(false);
    const [step, setStep] = useState(1);
    const [mu0X, setMu0X] = useState(0);
    const [mu0Y, setMu0Y] = useState(0);
    const [trueMuX, setTrueMuX] = useState(0.5);
    const [trueMuY, setTrueMuY] = useState(0.3);
    const [varX, setVarX] = useState(4);
    const [varY, setVarY] = useState(2);
    const [rho, setRho] = useState(0.5);
    const [n, setN] = useState(25);
    const [B, setB] = useState(80);
    const [t2History, setT2History] = useState<{ trial: number; t2: number; fStat: number; reject: boolean }[]>([]);
    const [currentSample, setCurrentSample] = useState<BivariatePoint[]>([]);
    const [currentT2, setCurrentT2] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);
    const fCrit = fCritical95(2, n - 2);
    const scaleFactor = (n - 2) / (2 * (n - 1));

    const reset = useCallback(() => {
        setIsPlaying(false); setT2History([]); setCurrentSample([]); setCurrentT2(0); setStep(1);
    }, []);

    useEffect(() => { reset(); }, [mu0X, mu0Y, trueMuX, trueMuY, varX, varY, rho, n, B]);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!isPlaying) return;
        intervalRef.current = setInterval(() => {
            setT2History(prev => {
                if (prev.length >= B) { setIsPlaying(false); setStep(4); return prev; }
                const sample = generateBivariateNormalSample(n, trueMuX, trueMuY, varX, varY, covXY);
                setCurrentSample(sample);
                const { mx, my } = sampleMean(sample);
                const { s11, s22, s12 } = sampleCovariance(sample);
                const t2 = hotellingT2([mx, my], [mu0X, mu0Y], [[s11, s12], [s12, s22]], n);
                const fStat = t2 * scaleFactor;
                const reject = fStat > fCrit;
                setCurrentT2(t2);
                setStep(prev.length < B * 0.25 ? 1 : prev.length < B * 0.5 ? 2 : prev.length < B * 0.75 ? 3 : 4);
                return [...prev, { trial: prev.length + 1, t2, fStat, reject }];
            });
        }, speed);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, speed, n, B, mu0X, mu0Y, trueMuX, trueMuY, varX, varY, covXY, fCrit, scaleFactor]);

    const rejectCount = t2History.filter(d => d.reject).length;
    const rejectRate = t2History.length > 0 ? rejectCount / t2History.length : 0;
    const lastFStat = t2History.length > 0 ? t2History[t2History.length - 1].fStat : 0;
    const lastReject = t2History.length > 0 ? t2History[t2History.length - 1].reject : false;

    const xDomain: [number, number] = [trueMuX - 4 * Math.sqrt(varX), trueMuX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [trueMuY - 4 * Math.sqrt(varY), trueMuY + 4 * Math.sqrt(varY)];

    // T² history chart
    const t2ChartData = t2History.slice(-50).map(d => ({
        trial: d.trial, t2: d.t2, fStat: d.fStat, reject: d.reject ? d.fStat : null,
    }));

    // Compare: H₀ true (trueMu = mu0) vs H₀ false (trueMu ≠ mu0)
    const compareData = compareMode ? [
        {
            label: 'H₀ true (μ=μ₀)',
            data: Array.from({ length: 60 }, (_, i) => {
                const s = generateBivariateNormalSample(n, mu0X, mu0Y, varX, varY, covXY);
                const { mx, my } = sampleMean(s);
                const { s11, s22, s12 } = sampleCovariance(s);
                const t2 = hotellingT2([mx, my], [mu0X, mu0Y], [[s11, s12], [s12, s22]], n);
                return { trial: i + 1, fStat: t2 * scaleFactor };
            }),
            color: '#10b981',
        },
        {
            label: 'H₀ false (μ≠μ₀)',
            data: Array.from({ length: 60 }, (_, i) => {
                const s = generateBivariateNormalSample(n, trueMuX + 1.5, trueMuY + 1.0, varX, varY, covXY);
                const { mx, my } = sampleMean(s);
                const { s11, s22, s12 } = sampleCovariance(s);
                const t2 = hotellingT2([mx, my], [mu0X, mu0Y], [[s11, s12], [s12, s22]], n);
                return { trial: i + 1, fStat: t2 * scaleFactor };
            }),
            color: '#ef4444',
        },
    ] : [];

    return (
        <VirtualLabShell
            title="Lab 8 — Hotelling's T² Test"
            subtitle="Repeatedly sample and compute T² to observe rejection rates and the F-distribution"
            isPlaying={isPlaying} onPlay={() => { if (t2History.length >= B) reset(); setIsPlaying(true); }}
            onPause={() => setIsPlaying(false)} onReset={reset}
            speed={speed} onSpeedChange={setSpeed}
            zoom={zoom} onZoomIn={() => setZoom(z => Math.min(z + 0.25, 3))} onZoomOut={() => setZoom(z => Math.max(z - 0.25, 0.5))}
            compareMode={compareMode} onToggleCompare={() => setCompareMode(c => !c)}
            step={step} maxSteps={4}
            statusText={`${t2History.length}/${B} trials`}
            stageExplanation={STAGES[step - 1]}
            controls={
                <div className="space-y-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brandDark-400 dark:text-brandDark-500">Null Hypothesis μ₀</div>
                    <LabSlider label="μ₀_X (H₀ mean X)" value={mu0X} min={-3} max={3} step={0.25} onChange={setMu0X} />
                    <LabSlider label="μ₀_Y (H₀ mean Y)" value={mu0Y} min={-3} max={3} step={0.25} onChange={setMu0Y} />
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brandDark-400 dark:text-brandDark-500 pt-2">True Population</div>
                    <LabSlider label="μ_X (true)" value={trueMuX} min={-3} max={3} step={0.25} onChange={setTrueMuX} />
                    <LabSlider label="μ_Y (true)" value={trueMuY} min={-3} max={3} step={0.25} onChange={setTrueMuY} />
                    <LabSlider label="σ²_X" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="n (sample size)" value={n} min={10} max={100} step={5} onChange={setN} format={v => String(Math.round(v))} />
                    <LabSlider label="B (# trials)" value={B} min={20} max={200} step={10} onChange={setB} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="Current T²" value={currentT2.toFixed(3)} color="violet" />
                    <MetricBadge label="Current F-stat" value={lastFStat.toFixed(3)} color="violet" />
                    <MetricBadge label="F critical (α=0.05)" value={fCrit.toFixed(3)} color="amber" />
                    <MetricBadge label="Decision" value={lastReject ? 'REJECT H₀' : 'Fail to reject'} color={lastReject ? 'red' : 'emerald'} />
                    <MetricBadge label="Rejection rate" value={`${(rejectRate * 100).toFixed(1)}%`} color={rejectRate > 0.1 ? 'red' : 'emerald'} />
                    <MetricBadge label="Trials done" value={String(t2History.length)} color="blue" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {/* Current sample scatter */}
                <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                    Current sample (n={n}). Red = μ₀ (H₀). Blue = x̄ (sample mean). {lastReject ? '⚠ REJECT H₀' : '✓ Fail to reject'}
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
                        <ReferenceLine x={mu0X} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2"
                            label={{ value: `μ₀_X=${mu0X}`, position: 'top', fontSize: 9, fill: '#ef4444' }} />
                        <ReferenceLine y={mu0Y} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2"
                            label={{ value: `μ₀_Y=${mu0Y}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                        <Scatter name="Sample" data={currentSample} fill="rgba(124,58,237,0.55)" r={3.5} />
                    </ScatterChart>
                </ResponsiveContainer>

                {/* F-statistic history */}
                <div className="text-[10px] font-bold text-center text-brandDark-500 mb-1">
                    {compareMode
                        ? 'F-statistic distribution: H₀ true (green) vs H₀ false (red) — Eq.(8.4)'
                        : 'F-statistic per trial (amber=reject, green=fail to reject) vs F_crit (red line) — Eq.(8.6)'}
                </div>
                <ResponsiveContainer width="100%" height={110}>
                    {compareMode ? (
                        <LineChart margin={{ top: 5, right: 20, bottom: 20, left: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                            <XAxis dataKey="trial" tick={{ fontSize: 9, fill: '#94a3b8' }}
                                label={{ value: 'Trial', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                label={{ value: 'F-stat', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                            <ReferenceLine y={fCrit} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5} />
                            {compareData.map(({ label, data, color }) => (
                                <Line key={label} data={data} type="monotone" dataKey="fStat" stroke={color} strokeWidth={1.5} dot={false} name={label} />
                            ))}
                        </LineChart>
                    ) : (
                        <LineChart data={t2ChartData} margin={{ top: 5, right: 20, bottom: 20, left: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                            <XAxis dataKey="trial" tick={{ fontSize: 9, fill: '#94a3b8' }}
                                label={{ value: 'Trial number', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                                label={{ value: 'F-statistic', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                            <ReferenceLine y={fCrit} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={2}
                                label={{ value: `F_crit=${fCrit.toFixed(2)}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                            <Line type="monotone" dataKey="fStat" stroke="#10b981" strokeWidth={1.5} dot={false} name="F-stat (fail to reject)" />
                            <Line type="monotone" dataKey="reject" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} name="F-stat (reject)" connectNulls={false} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </VirtualLabShell>
    );
};
