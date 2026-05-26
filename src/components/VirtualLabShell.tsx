/**
 * VirtualLabShell — reusable wrapper for all Unit 1 virtual labs.
 * Provides: Play/Pause, Reset, Speed, Zoom, Comparative mode toggle,
 * Step counter, and a status bar.
 */
import React from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Layers, Gauge } from 'lucide-react';

export interface LabShellProps {
    title: string;
    subtitle: string;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    speed: number;                        // ms per tick
    onSpeedChange: (ms: number) => void;
    zoom: number;                         // 0.5 – 3.0
    onZoomIn: () => void;
    onZoomOut: () => void;
    compareMode: boolean;
    onToggleCompare: () => void;
    step: number;
    maxSteps?: number;
    statusText?: string;
    children: React.ReactNode;            // the actual chart / canvas
    controls?: React.ReactNode;           // topic-specific parameter sliders
    metrics?: React.ReactNode;            // live metric badges
    stageExplanation?: string;            // current stage description
}

const SPEED_OPTIONS = [
    { label: '0.25×', ms: 2000 },
    { label: '0.5×', ms: 1000 },
    { label: '1×', ms: 500 },
    { label: '2×', ms: 250 },
    { label: '4×', ms: 125 },
];

export const VirtualLabShell: React.FC<LabShellProps> = ({
    title, subtitle,
    isPlaying, onPlay, onPause, onReset,
    speed, onSpeedChange,
    zoom, onZoomIn, onZoomOut,
    compareMode, onToggleCompare,
    step, maxSteps,
    statusText,
    children, controls, metrics, stageExplanation,
}) => {
    const currentSpeedLabel = SPEED_OPTIONS.reduce((best, opt) =>
        Math.abs(opt.ms - speed) < Math.abs(best.ms - speed) ? opt : best
    ).label;

    return (
        <div className="rounded-2xl border border-brandDark-200 dark:border-brandDark-700 overflow-hidden shadow-lg bg-white dark:bg-brandDark-900">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-violet-600 to-primary-600 text-white">
                <div>
                    <div className="font-extrabold text-sm tracking-wide">{title}</div>
                    <div className="text-xs text-violet-200 mt-0.5">{subtitle}</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                    <span className="px-2 py-0.5 bg-white/20 rounded-full">
                        Step {step}{maxSteps ? ` / ${maxSteps}` : ''}
                    </span>
                    {statusText && (
                        <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-400/40 rounded-full text-emerald-100">
                            {statusText}
                        </span>
                    )}
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-brandDark-50 dark:bg-brandDark-950/60 border-b border-brandDark-200 dark:border-brandDark-800">

                {/* Play / Pause / Reset */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={isPlaying ? onPause : onPlay}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-all"
                    >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brandDark-200 dark:bg-brandDark-700 hover:bg-brandDark-300 dark:hover:bg-brandDark-600 text-brandDark-700 dark:text-brandDark-200 transition-all"
                    >
                        <RotateCcw size={13} />
                        Reset
                    </button>
                </div>

                {/* Speed */}
                <div className="flex items-center gap-1.5">
                    <Gauge size={13} className="text-brandDark-400" />
                    <span className="text-xs text-brandDark-500 dark:text-brandDark-400 font-semibold">Speed:</span>
                    <div className="flex gap-0.5">
                        {SPEED_OPTIONS.map(opt => (
                            <button
                                key={opt.label}
                                onClick={() => onSpeedChange(opt.ms)}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${opt.label === currentSpeedLabel
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-brandDark-200 dark:bg-brandDark-700 text-brandDark-600 dark:text-brandDark-300 hover:bg-brandDark-300 dark:hover:bg-brandDark-600'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Zoom */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={onZoomOut}
                        disabled={zoom <= 0.5}
                        className="p-1.5 rounded-lg text-xs bg-brandDark-200 dark:bg-brandDark-700 hover:bg-brandDark-300 dark:hover:bg-brandDark-600 text-brandDark-700 dark:text-brandDark-200 disabled:opacity-40 transition-all"
                        title="Zoom out"
                    >
                        <ZoomOut size={13} />
                    </button>
                    <span className="text-[10px] font-bold text-brandDark-500 dark:text-brandDark-400 w-10 text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={onZoomIn}
                        disabled={zoom >= 3.0}
                        className="p-1.5 rounded-lg text-xs bg-brandDark-200 dark:bg-brandDark-700 hover:bg-brandDark-300 dark:hover:bg-brandDark-600 text-brandDark-700 dark:text-brandDark-200 disabled:opacity-40 transition-all"
                        title="Zoom in"
                    >
                        <ZoomIn size={13} />
                    </button>
                </div>

                {/* Compare mode */}
                <button
                    onClick={onToggleCompare}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${compareMode
                            ? 'bg-amber-500 text-white'
                            : 'bg-brandDark-200 dark:bg-brandDark-700 text-brandDark-600 dark:text-brandDark-300 hover:bg-brandDark-300 dark:hover:bg-brandDark-600'
                        }`}
                >
                    <Layers size={13} />
                    Compare
                </button>
            </div>

            {/* ── Body ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-brandDark-200 dark:divide-brandDark-800">

                {/* Left: parameter controls */}
                {controls && (
                    <div className="lg:col-span-3 p-4 space-y-3 bg-brandDark-50/50 dark:bg-brandDark-950/30 overflow-y-auto max-h-[480px]">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-brandDark-400 dark:text-brandDark-500 mb-1">
                            Parameters
                        </div>
                        {controls}
                    </div>
                )}

                {/* Centre: chart */}
                <div className={`${controls ? 'lg:col-span-6' : 'lg:col-span-9'} p-4 flex flex-col gap-3`}>
                    <div
                        className="w-full overflow-hidden rounded-xl border border-brandDark-200 dark:border-brandDark-800 bg-brandDark-50/30 dark:bg-brandDark-950/20"
                        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}
                    >
                        {children}
                    </div>
                    {/* Stage explanation */}
                    {stageExplanation && (
                        <div className="text-xs text-brandDark-600 dark:text-brandDark-400 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl px-4 py-2.5 leading-relaxed">
                            <span className="font-bold text-blue-700 dark:text-blue-400">Stage {step}: </span>
                            {stageExplanation}
                        </div>
                    )}
                </div>

                {/* Right: live metrics */}
                {metrics && (
                    <div className="lg:col-span-3 p-4 space-y-3 bg-brandDark-50/50 dark:bg-brandDark-950/30 overflow-y-auto max-h-[480px]">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-brandDark-400 dark:text-brandDark-500 mb-1">
                            Live Metrics
                        </div>
                        {metrics}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ── Reusable sub-components for labs ──────────────────────────────────────── */

/** A single metric badge */
export const MetricBadge: React.FC<{ label: string; value: string; color?: string }> = ({
    label, value, color = 'primary'
}) => (
    <div className={`p-3 rounded-xl border bg-${color}-50 dark:bg-${color}-950/20 border-${color}-200 dark:border-${color}-900/40`}>
        <div className={`text-[10px] font-bold uppercase tracking-wider text-${color}-600 dark:text-${color}-400`}>{label}</div>
        <div className={`text-lg font-black text-${color}-700 dark:text-${color}-300 mt-0.5`}>{value}</div>
    </div>
);

/** A labelled slider */
export const LabSlider: React.FC<{
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; unit?: string; format?: (v: number) => string;
}> = ({ label, value, min, max, step, onChange, unit = '', format }) => (
    <div className="space-y-1">
        <div className="flex justify-between text-xs font-semibold text-brandDark-700 dark:text-brandDark-300">
            <span>{label}</span>
            <span className="text-primary-600 dark:text-primary-400 font-bold">
                {format ? format(value) : value.toFixed(2)}{unit}
            </span>
        </div>
        <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full h-1.5 bg-brandDark-200 dark:bg-brandDark-700 rounded-full appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex justify-between text-[9px] text-brandDark-400">
            <span>{min}{unit}</span><span>{max}{unit}</span>
        </div>
    </div>
);

/** Axis label helper for recharts */
export const AxisLabel: React.FC<{ value: string; angle?: number; position?: string }> = ({
    value, angle = 0
}) => (
    <text
        x={0} y={0}
        dy={angle === 0 ? 16 : 0}
        dx={angle !== 0 ? -16 : 0}
        textAnchor="middle"
        fill="#64748b"
        fontSize={11}
        fontWeight={600}
        transform={angle !== 0 ? `rotate(${angle})` : undefined}
    >
        {value}
    </text>
);
