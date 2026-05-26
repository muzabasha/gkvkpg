"""Fix all TypeScript build errors in the lab files."""
import re, os

def fix_file(path, fixes):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in fixes:
        if old in content:
            content = content.replace(old, new, 1)
            print(f"  Fixed in {os.path.basename(path)}: {old[:60]!r}")
        else:
            print(f"  WARN: not found in {os.path.basename(path)}: {old[:60]!r}")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'src/components/labs/'

# ── Lab2: fix Tooltip formatter type ────────────────────────────────────────
fix_file(base + 'Lab2_MarginalJoint.tsx', [
    (
        "formatter={(v: number, name: string) => [v.toFixed(3), name]}",
        "formatter={(v: unknown) => [typeof v === 'number' ? v.toFixed(3) : String(v)]}"
    ),
])

# ── Lab3: remove unused LineChart import ────────────────────────────────────
fix_file(base + 'Lab3_Conditional.tsx', [
    (
        "    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line, ComposedChart, Area,",
        "    Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Area,"
    ),
])

# ── Lab4: remove unused v1, v2 from destructuring ───────────────────────────
fix_file(base + 'Lab4_ExpectationCovariance.tsx', [
    (
        "const { values: [lam1, lam2], vectors: [v1, v2] } = calculateEigenvalues2D(s11, s22, s12);",
        "const { values: [lam1, lam2] } = calculateEigenvalues2D(s11, s22, s12);"
    ),
])

# ── Lab5: remove unused LineChart, bivariatePDF, v1 ─────────────────────────
fix_file(base + 'Lab5_MultivariateNormal.tsx', [
    (
        "    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line, ComposedChart, Area,",
        "    Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Area,"
    ),
    (
        "    calculateEigenvalues2D, bivariatePDF,",
        "    calculateEigenvalues2D,"
    ),
    (
        "const { values: [lam1, lam2], vectors: [v1] } = calculateEigenvalues2D(varX, varY, covXY);",
        "const { values: [lam1, lam2] } = calculateEigenvalues2D(varX, varY, covXY);"
    ),
])

# ── Lab6: remove unused LineChart, Line, trajectory ─────────────────────────
fix_file(base + 'Lab6_SampleMean.tsx', [
    (
        "    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line,",
        "    Tooltip, ResponsiveContainer, ReferenceLine,"
    ),
    (
        "  const trajectory = means.slice(-30).map((p, i) => ({ i: means.length - 30 + i, x: p.x, y: p.y }));",
        "  // trajectory removed (unused)"
    ),
])

# ── Lab7: remove unused mle22, mle12 ────────────────────────────────────────
fix_file(base + 'Lab7_MLE.tsx', [
    (
        "const { s11: mle11, s22: mle22, s12: mle12 } = mleCovarianceMatrix(visible);",
        "const { s11: mle11 } = mleCovarianceMatrix(visible);"
    ),
])

# ── Lab8: remove unused BarChart, Bar, Cell ──────────────────────────────────
fix_file(base + 'Lab8_HypothesisTest.tsx', [
    (
        "    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line, BarChart, Bar, Cell,",
        "    Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line,"
    ),
])

print("All fixes applied.")
