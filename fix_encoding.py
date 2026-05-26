# Fix garbled UTF-8 encoding in lab section titles for Topics 4, 5, 6
import re

files = [
    'src/modules/block1/Topic4_ExpectationCovariance.tsx',
    'src/modules/block1/Topic5_MultivariateNormal.tsx',
    'src/modules/block1/Topic6_SampleMeanVector.tsx',
    'src/modules/block1/Topic7_MLEMeanDispersion.tsx',
    'src/modules/block1/Topic8_HypothesisTests.tsx',
]

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix garbled UTF-8: Â§ -> §, â€" -> —
    fixed = content.replace('Â§5 â€"', '§5 —').replace('Â§', '§').replace('â€"', '—')
    
    if fixed != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fixed)
        print(f"Fixed encoding in {path}")
    else:
        print(f"No encoding issues in {path}")

print("Done.")
