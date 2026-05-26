# Fix all remaining build errors
import re

# ── 1. Lab3: add Line back to recharts imports ───────────────────────────────
with open('src/components/labs/Lab3_Conditional.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace(
    '    Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Area,',
    '    Tooltip, ResponsiveContainer, ReferenceLine, Line, ComposedChart, Area,'
)
with open('src/components/labs/Lab3_Conditional.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Lab3: added Line back")

# ── 2. Lab5: add Line back to recharts imports ───────────────────────────────
with open('src/components/labs/Lab5_MultivariateNormal.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace(
    '    Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Area,',
    '    Tooltip, ResponsiveContainer, ReferenceLine, Line, ComposedChart, Area,'
)
with open('src/components/labs/Lab5_MultivariateNormal.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Lab5: added Line back")

# ── 3. Fix Sec interface in Topics 3-8: remove id prop from all <Sec id="s5" calls ──
# The Sec component doesn't have id in its interface, so just remove the id prop
topic_files = [
    'src/modules/block1/Topic3_ConditionalDistribution.tsx',
    'src/modules/block1/Topic4_ExpectationCovariance.tsx',
    'src/modules/block1/Topic5_MultivariateNormal.tsx',
    'src/modules/block1/Topic6_SampleMeanVector.tsx',
    'src/modules/block1/Topic7_MLEMeanDispersion.tsx',
    'src/modules/block1/Topic8_HypothesisTests.tsx',
]
for path in topic_files:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    # Remove id="s5" from Sec calls (keep the rest)
    c = re.sub(r'<Sec id="s5" open=', '<Sec open=', c)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Fixed Sec id prop in {path}")

# ── 4. Fix Topic7: remove duplicate Lab7_MLE import and unused imports ────────
with open('src/modules/block1/Topic7_MLEMeanDispersion.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Remove duplicate Lab7_MLE import (keep only one)
lines = c.split('\n')
seen_lab7 = False
new_lines = []
for line in lines:
    if "import { Lab7_MLE }" in line:
        if not seen_lab7:
            new_lines.append(line)
            seen_lab7 = True
        # skip duplicate
    else:
        new_lines.append(line)
c = '\n'.join(new_lines)

# Fix unused Calculator and HelpCircle - remove them from lucide import
c = c.replace(
    "import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';",
    "import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';"
)

# Remove unused Eq and Term components (they exist in Topic7 but aren't used)
# Replace them with empty comments
c = re.sub(
    r'const Eq: React\.FC<\{ n: string; math: string; label\?: string \}> = \(\{ n, math, label \}\) => \([\s\S]*?\);\n',
    '',
    c
)
c = re.sub(
    r'const Term: React\.FC<\{ sym: string; meaning: React\.ReactNode \}> = \(\{ sym, meaning \}\) => \([\s\S]*?\);\n',
    '',
    c
)

with open('src/modules/block1/Topic7_MLEMeanDispersion.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Topic7: fixed duplicate import and unused symbols")

print("All fixes applied.")
