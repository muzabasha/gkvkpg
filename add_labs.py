"""Add virtual lab sections to Topics 4-8 and fix s5 state."""
import re

def add_lab_to_topic(filepath, lab_import, lab_component, lab_subtitle, export_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add s5 to open state if not present
    content = re.sub(
        r"const \[open, setOpen\] = useState\(\{ s1: true, s2: true, s3: true, s4: true \}\);",
        "const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true, s5: true });",
        content
    )

    # 2. Add lab import after lucide import if not already present
    if lab_import not in content:
        content = content.replace(
            "import { ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle } from 'lucide-react';",
            f"import {{ ChevronDown, ChevronUp, Sparkles, Calculator, BookOpen, HelpCircle }} from 'lucide-react';\n{lab_import}"
        )

    # 3. Add lab section before the closing </div> + export
    lab_section = f"""
      {{/* §5 — Virtual Interactive Laboratory */}}
      <Sec id="s5" open={{open.s5}} toggle={{() => tog('s5')}}
        icon={{<BookOpen size={{22}} />}} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
        title="§5 — Virtual Interactive Laboratory" sub="{lab_subtitle}">
        <{lab_component} />
      </Sec>

    </div>
  );
}};

export default {export_name};"""

    # Replace the closing pattern
    old_ending = f"""
    </div>
  );
}};

export default {export_name};"""

    if old_ending in content:
        content = content.replace(old_ending, lab_section)
        print(f"  Added lab section to {filepath}")
    else:
        print(f"  WARN: closing pattern not found in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

add_lab_to_topic(
    'src/modules/block1/Topic4_ExpectationCovariance.tsx',
    "import { Lab4_ExpectationCovariance } from '../../components/labs/Lab4_ExpectationCovariance';",
    'Lab4_ExpectationCovariance',
    'Watch the sample mean converge and the covariance matrix build observation by observation',
    'Topic4_ExpectationCovariance'
)

add_lab_to_topic(
    'src/modules/block1/Topic5_MultivariateNormal.tsx',
    "import { Lab5_MultivariateNormal } from '../../components/labs/Lab5_MultivariateNormal';",
    'Lab5_MultivariateNormal',
    'Explore density contours, Mahalanobis distance, marginals and conditionals interactively',
    'Topic5_MultivariateNormal'
)

add_lab_to_topic(
    'src/modules/block1/Topic6_SampleMeanVector.tsx',
    "import { Lab6_SampleMean } from '../../components/labs/Lab6_SampleMean';",
    'Lab6_SampleMean',
    'Repeat sampling to observe the distribution of x̄ converging to N₂(μ, Σ/n)',
    'Topic6_SampleMeanVector'
)

add_lab_to_topic(
    'src/modules/block1/Topic7_MLEMeanDispersion.tsx',
    "import { Lab7_MLE } from '../../components/labs/Lab7_MLE';",
    'Lab7_MLE',
    'Watch MLE converge and compare biased MLE vs unbiased S as n grows',
    'Topic7_MLEMeanDispersion'
)

add_lab_to_topic(
    'src/modules/block1/Topic8_HypothesisTests.tsx',
    "import { Lab8_HypothesisTest } from '../../components/labs/Lab8_HypothesisTest';",
    'Lab8_HypothesisTest',
    'Repeatedly sample and compute T² to observe rejection rates and the F-distribution',
    'Topic8_HypothesisTests'
)

print("Done.")
