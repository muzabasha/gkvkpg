import React, { useState } from 'react';
import { MathText } from '../../components/MathText';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { Lab7_MLE } from '../../components/labs/Lab7_MLE';

interface Topic7Props { projectorMode?: boolean; }

const Sec: React.FC<{ open: boolean; toggle: () => void; icon: React.ReactNode; color: string; title: string; sub: string; children: React.ReactNode }> =
    ({ open, toggle, icon, color, title, sub, children }) => (
        <section className="bg-white dark:bg-brandDark-900 border border-brandDark-200 dark:border-brandDark-800 rounded-2xl overflow-hidden shadow-sm">
            <button onClick={toggle} className="w-full flex items-center justify-between p-5 bg-brandDark-50/50 dark:bg-brandDark-950/20 border-b border-brandDark-100 dark:border-brandDark-800 text-left">
                <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${color}`}>{icon}</span>
                    <div><h3 className="text-xl font-semibold m-0">{title}</h3><p className="text-xs text-brandDark-400 m-0">{sub}</p></div>
                </div>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {open && <div className="p-6 space-y-6">{children}</div>}
        </section>
    );

export const Topic7_MLEMeanDispersion: React.FC<Topic7Props> = ({ projectorMode = false }) => {
    const [open, setOpen] = useState({ s1: true, s2: true, s3: true, s4: true, s5: true });
    const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));
    const fb = projectorMode ? 'text-xl leading-relaxed' : 'text-base leading-relaxed';

    return (
        <div className="space-y-8 pb-16">

            {/* §1 Motivation */}
            <Sec open={open.s1} toggle={() => tog('s1')}
                icon={<Sparkles size={22} />} color="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                title="§1 — Motivation: Fitting the Best Bell Tent" sub="MLE as finding the distribution that best explains the observed data">
                <div className={`${fb} space-y-4`}>
                    <div className="border-l-4 border-primary-500 pl-4 bg-primary-500/5 rounded-r-xl py-3">
                        <p className="italic text-brandDark-700 dark:text-brandDark-300">
                            You have 60 students' measurements and believe they come from a multivariate normal distribution.
                            But you don't know the true mean <MathText math="\boldsymbol{\mu}" /> or covariance <MathText math="\mathbf{\Sigma}" />.
                            <strong> Maximum Likelihood Estimation (MLE)</strong> asks: "Which values of <MathText math="\boldsymbol{\mu}" /> and <MathText math="\mathbf{\Sigma}" /> make the observed data most probable?"
                            Think of it as positioning and shaping a bell tent over your data cloud — MLE finds the exact centre and shape that maximises the probability of seeing exactly the data you collected.
                        </p>
                    </div>
                </div>
            </Sec>

            {/* §5 — Virtual Interactive Laboratory */}
            <Sec open={open.s5} toggle={() => tog('s5')}
                icon={<BookOpen size={22} />} color="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                title="§5 — Virtual Interactive Laboratory" sub="Watch MLE converge and compare biased MLE vs unbiased S as n grows">
                <Lab7_MLE />
            </Sec>

        </div>
    );
};

export default Topic7_MLEMeanDispersion;
