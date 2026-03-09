import React, { useRef } from 'react';
import { Settings, Megaphone, TrendingUp, Check, AlertTriangle, FileText, Zap, Users, X } from 'lucide-react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/* ─── Mockup Window Frame ─── */
const Frame = ({ children, label, variant }: {
  children: React.ReactNode;
  label: string;
  variant: 'before' | 'after';
}) => (
  <div className="rounded-xl border border-white/8 bg-[#080d18] overflow-hidden shadow-2xl shadow-black/40">
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="ml-auto flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${variant === 'before' ? 'bg-white/20' : 'bg-emerald-500'}`} />
        <span className={`text-[9px] font-medium ${variant === 'before' ? 'text-white/25' : 'text-emerald-400/70'}`}>{label}</span>
      </div>
    </div>
    <div className="p-3 md:p-4 min-h-[160px] md:min-h-[190px]">{children}</div>
  </div>
);

/* ─── Step 1 Before: Manual Chaos ─── */
const ChaosView = () => (
  <div className="space-y-2.5">
    <div className="grid grid-cols-3 gap-1.5">
      <div className="-rotate-2 bg-amber-500/10 border border-amber-500/15 rounded-lg p-2">
        <div className="flex items-center gap-1 mb-0.5">
          <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
          <span className="text-[7px] text-amber-400/70">Urgent</span>
        </div>
        <p className="text-[7px] md:text-[8px] text-white/30 leading-tight">Follow up with client??</p>
      </div>
      <div className="rotate-1 translate-y-1 bg-red-500/10 border border-red-500/15 rounded-lg p-2">
        <div className="flex items-center gap-1 mb-0.5">
          <X className="w-2.5 h-2.5 text-red-400" />
          <span className="text-[7px] text-red-400/70">Overdue</span>
        </div>
        <p className="text-[7px] md:text-[8px] text-white/30 leading-tight">Invoice #3847 unpaid</p>
      </div>
      <div className="-rotate-1 -translate-y-0.5 bg-white/5 border border-white/8 rounded-lg p-2">
        <p className="text-[7px] md:text-[8px] text-white/25 leading-tight">Onboarding steps... check email... ???</p>
      </div>
    </div>
    <div className="bg-white/[0.02] rounded-lg p-2 border border-white/5">
      <div className="grid grid-cols-4 gap-px">
        {['Client', 'Status', 'Amount', 'Notes'].map((h) => (
          <div key={h} className="text-[7px] text-white/20 px-1 py-0.5 bg-white/[0.03] font-medium">{h}</div>
        ))}
        <div className="text-[7px] text-white/15 px-1 py-0.5">Acme Co</div>
        <div className="text-[7px] text-amber-400/40 px-1 py-0.5">???</div>
        <div className="text-[7px] text-white/15 px-1 py-0.5">$2.4k</div>
        <div className="text-[7px] text-white/10 px-1 py-0.5" />
        <div className="text-[7px] text-white/15 px-1 py-0.5">Beta Inc</div>
        <div className="text-[7px] text-red-400/40 px-1 py-0.5">lost?</div>
        <div className="text-[7px] text-white/15 px-1 py-0.5" />
        <div className="text-[7px] text-white/10 px-1 py-0.5">lost email</div>
      </div>
    </div>
    <div className="flex gap-1.5">
      <div className="flex-1 bg-red-500/5 border border-red-500/10 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
        <span className="text-[7px] md:text-[8px] text-red-400/50">3 missed follow-ups</span>
      </div>
      <div className="flex-1 bg-amber-500/5 border border-amber-500/10 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        <span className="text-[7px] md:text-[8px] text-amber-400/50">No SOPs found</span>
      </div>
    </div>
  </div>
);

/* ─── Step 1 After: Organized Systems ─── */
const SystemView = () => (
  <div className="space-y-2">
    {[
      { label: 'Client Onboarding SOP', Icon: FileText },
      { label: 'Fulfillment Pipeline', Icon: Zap },
      { label: 'Retention Playbook', Icon: Users },
    ].map((s) => (
      <div key={s.label} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/8 rounded-lg px-2.5 py-2">
        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <s.Icon className="w-3 h-3 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[8px] md:text-[10px] text-white/70 font-medium">{s.label}</p>
          <div className="w-full bg-white/5 rounded-full h-0.5 mt-1">
            <div className="bg-emerald-500/50 rounded-full h-0.5 w-full" />
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Check className="w-3 h-3 text-emerald-500" />
          <span className="text-[7px] text-emerald-400/70">Active</span>
        </div>
      </div>
    ))}
    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
      <span className="text-[8px] text-emerald-400/70">All systems operational</span>
      <span className="text-[8px] text-emerald-400/80 font-medium">3/3 Active</span>
    </div>
  </div>
);

/* ─── Step 2 Before: No Lead Generation ─── */
const EmptyAdsView = () => (
  <div className="space-y-3">
    <div className="flex gap-3">
      {[
        { label: 'Ad Spend', value: '$0' },
        { label: 'Leads', value: '0' },
        { label: 'ROAS', value: '\u2014' },
      ].map((m) => (
        <div key={m.label} className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-center">
          <p className="text-[7px] text-white/20 mb-0.5">{m.label}</p>
          <p className="text-sm md:text-base font-semibold text-white/15">{m.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
      <svg viewBox="0 0 200 50" className="w-full h-10 md:h-12">
        <polyline
          points="0,40 30,39 60,41 90,40 120,39 150,41 180,40 200,39"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line x1="0" y1="45" x2="200" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      </svg>
      <p className="text-[7px] text-white/15 text-center mt-1">No campaign data</p>
    </div>
    <div className="bg-white/[0.02] border border-white/5 rounded-lg px-2.5 py-2 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
      <span className="text-[8px] text-white/20">No active campaigns</span>
    </div>
  </div>
);

/* ─── Step 2 After: Active Meta Ads ─── */
const ActiveAdsView = () => (
  <div className="space-y-3">
    <div className="flex gap-3">
      {[
        { label: 'Ad Spend', value: '$3.2K', color: 'text-blue-400' },
        { label: 'Leads', value: '147', color: 'text-emerald-400' },
        { label: 'ROAS', value: '4.2x', color: 'text-violet-400' },
      ].map((m) => (
        <div key={m.label} className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg p-2 text-center">
          <p className="text-[7px] text-white/40 mb-0.5">{m.label}</p>
          <p className={`text-sm md:text-base font-semibold ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/[0.02] border border-white/8 rounded-lg p-3">
      <svg viewBox="0 0 200 50" className="w-full h-10 md:h-12">
        <defs>
          <linearGradient id="ads-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,42 L30,38 L60,35 L90,28 L120,22 L150,14 L180,10 L200,6 L200,50 L0,50 Z"
          fill="url(#ads-chart-fill)"
        />
        <polyline
          points="0,42 30,38 60,35 90,28 120,22 150,14 180,10 200,6"
          fill="none"
          stroke="rgb(59,130,246)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[{ x: 90, y: 28 }, { x: 150, y: 14 }, { x: 200, y: 6 }].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgb(59,130,246)" />
        ))}
      </svg>
    </div>
    <div className="flex gap-2">
      {['Lead Gen \u2014 Lookalike', 'Retargeting \u2014 Warm'].map((c, i) => (
        <div key={i} className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[7px] md:text-[8px] text-white/50 truncate">{c}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Step 3 Before: Stagnant Revenue ─── */
const PlateauView = () => {
  const bars = [28, 30, 27, 29, 28, 30];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {[
          { label: 'MRR', value: '$4.8K' },
          { label: 'Clients', value: '3' },
          { label: 'Growth', value: '+2%' },
        ].map((m) => (
          <div key={m.label} className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-center">
            <p className="text-[7px] text-white/20 mb-0.5">{m.label}</p>
            <p className="text-sm md:text-base font-semibold text-white/20">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
        <div className="flex items-end gap-1.5 h-14 md:h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div className="w-full rounded-t bg-white/8" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
            <span key={m} className="text-[6px] text-white/15 flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
        <span className="text-[7px] text-white/20">Revenue plateau \u2014 no growth strategy</span>
      </div>
    </div>
  );
};

/* ─── Step 3 After: Scaling Revenue ─── */
const GrowthView = () => {
  const bars = [15, 22, 30, 42, 62, 90];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {[
          { label: 'MRR', value: '$52K', color: 'text-emerald-400' },
          { label: 'Clients', value: '24', color: 'text-blue-400' },
          { label: 'Growth', value: '+340%', color: 'text-violet-400' },
        ].map((m) => (
          <div key={m.label} className="flex-1 bg-white/[0.03] border border-white/8 rounded-lg p-2 text-center">
            <p className="text-[7px] text-white/40 mb-0.5">{m.label}</p>
            <p className={`text-sm md:text-base font-semibold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.02] border border-white/8 rounded-lg p-3">
        <div className="flex items-end gap-1.5 h-14 md:h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div className="w-full rounded-t bg-gradient-to-t from-emerald-600/40 to-emerald-400/60" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
            <span key={m} className="text-[6px] text-white/30 flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
        <span className="text-[8px] text-emerald-400/70">Predictable recurring revenue</span>
        <span className="text-[8px] text-emerald-400/80 font-medium">Scaling</span>
      </div>
    </div>
  );
};

/* ─── Step Data ─── */
interface StepData {
  icon: React.ElementType;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  BeforeView: React.FC;
  AfterView: React.FC;
}

const steps: StepData[] = [
  {
    icon: Settings,
    title: 'We install our proven systems',
    description: 'Get the exact SOPs, workflows, and operational playbooks we used to scale our own AI agency \u2014 from client onboarding to fulfillment to retention.',
    beforeLabel: 'Manual Processes',
    afterLabel: 'GoFocus Systems',
    BeforeView: ChaosView,
    AfterView: SystemView,
  },
  {
    icon: Megaphone,
    title: 'We launch and manage your Meta ads',
    description: 'Our team builds, launches, and optimizes high-performing Meta ad campaigns on your behalf. We handle creative, targeting, and daily management.',
    beforeLabel: 'No Lead Generation',
    afterLabel: 'Meta Ads \u2014 Live',
    BeforeView: EmptyAdsView,
    AfterView: ActiveAdsView,
  },
  {
    icon: TrendingUp,
    title: 'You scale with predictable growth',
    description: 'With a steady pipeline of qualified leads and battle-tested systems, you scale to $20K, $50K, and beyond in monthly recurring revenue.',
    beforeLabel: 'Stagnant Revenue',
    afterLabel: 'GoFocus Scaling',
    BeforeView: PlateauView,
    AfterView: GrowthView,
  },
];

/* ─── Step Content (absolutely positioned within sticky container) ─── */
const STEP_RANGES: [number, number][] = [
  [0, 0.37],
  [0.31, 0.69],
  [0.63, 1.0],
];

const StepContent = ({
  step,
  index,
  scrollProgress,
}: {
  step: StepData;
  index: number;
  scrollProgress: MotionValue<number>;
}) => {
  const [start, end] = STEP_RANGES[index];

  // Map global scroll → local 0-1 for this step
  const local = useTransform(scrollProgress, [start, end], [0, 1]);

  const isReversed = index % 2 === 1;

  // Envelope: entire step fades in/out with overlap for crossfade between steps
  const envelope = useTransform(local, [0, 0.10, 0.88, 1], [0, 1, 1, 0]);

  // Text
  const textOpacity = useTransform(local, [0.02, 0.12, 0.86, 0.98], [0, 1, 1, 0]);
  const textY = useTransform(local, [0.02, 0.12], [20, 0]);

  // Before mockup
  const beforeOpacity = useTransform(local, [0.04, 0.12, 0.36, 0.50], [0, 1, 1, 0]);
  const beforeY = useTransform(local, [0.36, 0.50], [0, -10]);
  const beforeScale = useTransform(local, [0.36, 0.50], [1, 0.97]);

  // After mockup — overlaps with before fadeout
  const afterOpacity = useTransform(local, [0.42, 0.54, 0.86, 0.98], [0, 1, 1, 0]);
  const afterY = useTransform(local, [0.42, 0.54], [10, 0]);
  const afterScale = useTransform(local, [0.42, 0.54], [0.97, 1]);

  return (
    <motion.div
      style={{ opacity: envelope }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="container-custom">
        <div
          className={`w-full flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-14`}
        >
        {/* Text side */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="flex-1 max-w-lg">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <step.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-primary/70 tracking-wide">Step {index + 1}</span>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">{step.title}</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
        </motion.div>

        {/* Visual side */}
        <div className="flex-1 w-full max-w-md relative">
          <motion.div
            style={{ opacity: beforeOpacity, y: beforeY, scale: beforeScale }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <Frame label={step.beforeLabel} variant="before">
              <step.BeforeView />
            </Frame>
          </motion.div>
          <motion.div style={{ opacity: afterOpacity, y: afterY, scale: afterScale }}>
            <Frame label={step.afterLabel} variant="after">
              <step.AfterView />
            </Frame>
          </motion.div>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Progress Dot ─── */
const ProgressDot = ({
  scrollProgress,
  index,
}: {
  scrollProgress: MotionValue<number>;
  index: number;
}) => {
  const [start, end] = STEP_RANGES[index];
  const mid = (start + end) / 2;
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.04, mid, end - 0.04, end],
    [0.25, 1, 1, 1, 0.25]
  );
  const scale = useTransform(
    scrollProgress,
    [start, start + 0.04, mid, end - 0.04, end],
    [0.75, 1, 1, 1, 0.75]
  );
  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-1.5 h-1.5 rounded-full bg-primary"
    />
  );
};

/* ─── Main Section ─── */
const HowItWorksSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="how-it-works">
      {/* Header */}
      <div className="container-custom pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="section-label mb-4">
            <span>How It Works</span>
          </div>
          <h2 className="mb-4">
            From stuck to scaling,<br className="hidden md:block" /> in three steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grow your AI agency — systems, ads, and support.
          </p>
        </motion.div>
      </div>

      {/* Scroll-driven area: single sticky container, 3 steps cycle within */}
      <div ref={scrollRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen relative">
          {steps.map((step, i) => (
            <StepContent
              key={i}
              step={step}
              index={i}
              scrollProgress={scrollYProgress}
            />
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <ProgressDot key={i} scrollProgress={scrollYProgress} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
