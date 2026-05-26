# Fix Topic7 and Topic8 lab sections with correct UTF-8 encoding
import re

# ── Topic 7 ──────────────────────────────────────────────────────────────────
with open('src/modules/block1/Topic7_MLEMeanDispersion.tsx', 'r', encoding='utf-8') as f:
    t7 = f.read()

# Remove any garbled lab section that was written with wrong encoding
# Find the last </Sec> before the closing </div> and replace everything after it
marker = '            </Sec>\n\n        </div>\n    );\n};\n\nexport default Topic7_MLEMeanDispersion;'
replacement = '''            </Sec>

            {/* §5 — Virtual Interactive Laboratory */}
            <Sec id="s5" open={open.s5} toggle={() => tog('s5')}
                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                title="\u00a75 \u2014 Virtual Interactive Laboratory" sub="Watch MLE converge and compare biased MLE vs unbiased S as n grows">
                <Lab7_MLE />
            </Sec>

        </div>
    );
};

export default Topic7_MLEMeanDispersion;'''

# Find the last occurrence of </Sec> followed by closing
# Use regex to find the last </Sec> block before the export
pattern = r'(            </Sec>)\s*\n\s*\{/\*.*?Virtual Interactive Laboratory.*?\*/\}.*?</Sec>\s*\n\s*\n\s*</div>\s*\n\s*\);\s*\n\};\s*\n\nexport default Topic7_MLEMeanDispersion;'
if re.search(pattern, t7, re.DOTALL):
    t7 = re.sub(pattern, replacement, t7, flags=re.DOTALL)
    print("Topic7: replaced garbled lab section")
elif marker in t7:
    t7 = t7.replace(marker, replacement)
    print("Topic7: added lab section (clean)")
else:
    # Find the last </Sec> and append after it
    last_sec = t7.rfind('            </Sec>')
    if last_sec != -1:
        end_of_sec = last_sec + len('            </Sec>')
        # Find the closing of the component after this
        rest = t7[end_of_sec:]
        close_match = re.search(r'\s*\n\s*</div>\s*\n\s*\);\s*\n\};\s*\n\nexport default Topic7_MLEMeanDispersion;', rest)
        if close_match:
            t7 = t7[:end_of_sec] + '\n\n            {/* \u00a75 \u2014 Virtual Interactive Laboratory */}\n            <Sec id="s5" open={open.s5} toggle={() => tog(\'s5\')}\n                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"\n                title="\u00a75 \u2014 Virtual Interactive Laboratory" sub="Watch MLE converge and compare biased MLE vs unbiased S as n grows">\n                <Lab7_MLE />\n            </Sec>\n' + rest
            print("Topic7: appended lab section after last </Sec>")
        else:
            print("Topic7: WARNING - could not find closing pattern")
    else:
        print("Topic7: WARNING - no </Sec> found")

with open('src/modules/block1/Topic7_MLEMeanDispersion.tsx', 'w', encoding='utf-8') as f:
    f.write(t7)

# ── Topic 8 — verify lab section is correct ──────────────────────────────────
with open('src/modules/block1/Topic8_HypothesisTests.tsx', 'r', encoding='utf-8') as f:
    t8 = f.read()

if 'Lab8_HypothesisTest' in t8 and '<Lab8_HypothesisTest />' in t8:
    print("Topic8: lab section already present and correct")
else:
    print("Topic8: WARNING - lab section missing or import not used")

print("Done.")
