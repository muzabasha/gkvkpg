/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
/**
 * Lab 7 — MLE of Mean Vector & Covariance Matrix
 * Shows: log-likelihood surface, MLE convergence, bias comparison (MLE vs S),
 * animated fitting of the best ellipse, compare MLE vs unbiased.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line,
} from 'recharts';
import { VirtualLabShell, LabSlider, MetricBadge } from '../VirtualLabShell';
import {
    generateBivariateNormalSample, sampleMean, sampleCovariance, mleCovarianceMatrix,
} from '../../utils/stats';
import type { BivariatePoint } from '../../utils/stats';

const STAGES = [
    'Drawing n observations. The MLE of μ is simply x̄ (Eq. 7.3) — the centroid of the data.',
    'Computing MLE of Σ: divides by n (biased). Watch it converge as more data arrives.',
    'Computing unbiased S: divides by n−1. Compare MLE vs S — the gap shrinks as n grows.',
    'Bias analysis: MLE underestimates Σ by factor (n−1)/n. Shown in the bias chart.',
];

export const Lab7_MLE: React.FC = () => {
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
    const [n, setN] = useState(50);
    const [allPoints, setAllPoints] = useState<BivariatePoint[]>([]);
    const [visibleN, setVisibleN] = useState(2);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const covXY = rho * Math.sqrt(varX) * Math.sqrt(varY);

    const reset = useCallback(() => {
        setIsPlaying(false); setVisibleN(2); setStep(1);
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
    const { s11: mle11 } = mleCovarianceMatrix(visible);
    const biasFactor = visible.length > 1 ? (visible.length - 1) / visible.length : 0;
    const corrEst = s11 > 0 && s22 > 0 ? s12 / Math.sqrt(s11 * s22) : 0;

    const xDomain: [number, number] = [muX - 4 * Math.sqrt(varX), muX + 4 * Math.sqrt(varX)];
    const yDomain: [number, number] = [muY - 4 * Math.sqrt(varY), muY + 4 * Math.sqrt(varY)];

    // Bias convergence chart: track MLE s11 vs unbiased s11 as n grows
    const biasHistory = Array.from({ length: Math.min(visibleN, 40) }, (_, i) => {
        const ni = Math.max(2, Math.floor((i + 1) * visibleN / 40));
        const pts = allPoints.slice(0, ni);
        const { s11: si } = sampleCovariance(pts);
        const { s11: mi } = mleCovarianceMatrix(pts);
        return { n: ni, unbiased: si, mle: mi, true: varX };
    });

    // Compare: different n values showing bias
    const compareNs = [5, 10, 20, 50, 100];
    const biasData = compareNs.map(ni => {
        const pts = generateBivariateNormalSample(ni, muX, muY, varX, varY, covXY);
        const { s11: si } = sampleCovariance(pts);
        const { s11: mi } = mleCovarianceMatrix(pts);
        return { n: ni, unbiased: si, mle: mi };
    });

    return (
        <VirtualLabShell
            title="Lab 7 — MLE of Mean Vector & Covariance Matrix"
            subtitle="Watch MLE converge and compare biased MLE vs unbiased S as n grows"
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
                    <LabSlider label="μ_X (true)" value={muX} min={-3} max={3} step={0.5} onChange={setMuX} />
                    <LabSlider label="μ_Y (true)" value={muY} min={-3} max={3} step={0.5} onChange={setMuY} />
                    <LabSlider label="σ²_X (true)" value={varX} min={0.5} max={9} step={0.5} onChange={setVarX} />
                    <LabSlider label="σ²_Y (true)" value={varY} min={0.5} max={9} step={0.5} onChange={setVarY} />
                    <LabSlider label="ρ (true)" value={rho} min={-0.95} max={0.95} step={0.05} onChange={setRho} />
                    <LabSlider label="n (sample size)" value={n} min={5} max={150} step={5} onChange={setN} format={v => String(Math.round(v))} />
                </div>
            }
            metrics={
                <div className="space-y-2">
                    <MetricBadge label="μ̂_X (MLE = x̄)" value={mx.toFixed(3)} color="blue" />
                    <MetricBadge label="μ̂_Y (MLE = ȳ)" value={my.toFixed(3)} color="blue" />
                    <MetricBadge label="Σ̂₁₁ MLE (÷n)" value={mle11.toFixed(3)} color="amber" />
                    <MetricBadge label="S₁₁ unbiased (÷n−1)" value={s11.toFixed(3)} color="emerald" />
                    <MetricBadge label="True σ²_X" value={varX.toFixed(3)} color="violet" />
                    <MetricBadge label="Bias factor (n−1)/n" value={biasFactor.toFixed(3)} color="amber" />
                    <MetricBadge label="ρ̂ (from S)" value={corrEst.toFixed(3)} color="emerald" />
                </div>
            }
        >
            <div className="p-3 space-y-3">
                {/* Scatter with MLE mean */}
                <div className="text-xs font-bold text-center text-brandDark-600 dark:text-brandDark-400">
                    Data cloud — red cross = MLE mean μ̂ = x̄ (Eq. 7.3). {visibleN} observations.
                </div>
                <ResponsiveContainer width="100%" height={220}>
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
                            label={{ value: `μ̂_X=${mx.toFixed(2)}`, position: 'top', fontSize: 9, fill: '#ef4444' }} />
                        <ReferenceLine y={my} stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2"
                            label={{ value: `μ̂_Y=${my.toFixed(2)}`, position: 'right', fontSize: 9, fill: '#ef4444' }} />
                        <ReferenceLine x={muX} stroke="#94a3b8" strokeDasharray="2 4" strokeWidth={1} />
                        <ReferenceLine y={muY} stroke="#94a3b8" strokeDasharray="2 4" strokeWidth={1} />
                        <Scatter name="Observations" data={visible} fill="rgba(124,58,237,0.6)" r={4} />
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Bias convergence chart */}
                <div className="text-[10px] font-bold text-center text-brandDark-500 mb-1">
                    {compareMode
                        ? 'MLE (amber) vs Unbiased S (green) vs True σ²_X (grey) across n — Eq.(7.6)'
                        : 'MLE Σ̂₁₁ (amber) vs Unbiased S₁₁ (green) vs True σ²_X (grey) — Eq.(7.5) vs Eq.(6.5)'}
                </div>
                <ResponsiveContainer width="100%" height={110}>
                    <LineChart
                        data={compareMode ? biasData : biasHistory}
                        margin={{ top: 5, right: 20, bottom: 20, left: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                        <XAxis dataKey="n" tick={{ fontSize: 9, fill: '#94a3b8' }}
                            label={{ value: 'n (sample size)', position: 'insideBottom', offset: -8, fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }}
                            label={{ value: 'σ²_X estimate', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: 8, fontSize: 10 }} />
                        <Line type="monotone" dataKey="mle" stroke="#f59e0b" strokeWidth={2} name="MLE (÷n)" dot={false} />
                        <Line type="monotone" dataKey="unbiased" stroke="#10b981" strokeWidth={2} name="Unbiased S (÷n−1)" dot={false} />
                        {!compareMode && <Line type="monotone" dataKey="true" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 2" name="True σ²_X" dot={false} />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </VirtualLabShell>
    );
};
