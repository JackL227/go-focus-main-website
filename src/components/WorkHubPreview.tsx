import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  TrendingUp,
  Megaphone,
  MessageCircle,
  BarChart2,
  ArrowLeft,
  Plus,
  RefreshCw,
  ChevronDown,
  Zap,
  LayoutGrid,
  Users,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────── */
type TabId = 'hub' | 'tasks' | 'finance' | 'ads' | 'sales';
const TAB_IDS: TabId[] = ['hub', 'tasks', 'finance', 'ads', 'sales'];

/* ─── Animated Counter ───────────────────────────────────────────────── */
const Counter = ({
  to,
  prefix = '',
  suffix = '',
  duration = 1000,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const t0 = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [to, duration]);
  return (
    <>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </>
  );
};

/* ─── SVG Progress Ring ──────────────────────────────────────────────── */
const Ring = ({ pct, size = 42 }: { pct: number; size?: number }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={4}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={4}
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 3.5}
        textAnchor="middle"
        fill="white"
        fontSize={9}
        fontWeight="700"
      >
        {pct}%
      </text>
    </svg>
  );
};

/* ─── VIEW 1: Hub Landing ────────────────────────────────────────────── */
const HubView = () => (
  <div className="flex flex-col items-center justify-center h-full p-4 md:p-6">
    <motion.p
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white font-bold text-sm md:text-base mb-1"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      Where to next?
    </motion.p>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 }}
      className="text-white/35 text-[9px] md:text-[10px] mb-4"
    >
      Select a section to get started
    </motion.p>

    <div className="grid grid-cols-4 gap-2 w-full max-w-lg mb-2">
      {[
        { Icon: Briefcase, title: 'Work Hub', desc: 'Manage tasks and client projects efficiently.' },
        { Icon: Users, title: 'Client Analytics', desc: 'Track revenue, hours, and costs per client.' },
        { Icon: TrendingUp, title: 'Internal Analytics', desc: 'Monthly P&L, ad metrics, and sales data.' },
        { Icon: Megaphone, title: 'Ads Hub', desc: 'Daily Meta ads metrics, CPL, CTR, and funnels.' },
      ].map(({ Icon, title, desc }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-2 md:p-2.5 cursor-pointer hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-200"
        >
          <div className="w-6 h-6 bg-white/[0.07] rounded-md flex items-center justify-center text-white/50 mb-1.5">
            <Icon size={12} />
          </div>
          <p className="text-white text-[9px] font-semibold leading-tight mb-0.5">{title}</p>
          <p className="text-white/35 text-[8px] leading-tight hidden md:block">{desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-2 md:p-2.5 cursor-pointer hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-200"
      >
        <div className="w-6 h-6 bg-white/[0.07] rounded-md flex items-center justify-center text-white/50 mb-1.5">
          <MessageCircle size={12} />
        </div>
        <p className="text-white text-[9px] font-semibold leading-tight mb-0.5">Sales Advisor</p>
        <p className="text-white/35 text-[8px] leading-tight hidden md:block">
          AI-powered Socratic coaching for sales calls.
        </p>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55 }}
      className="text-white/20 text-[8px] mt-5 font-mono tracking-widest"
    >
      GoFocus.AI WorkHub v1.0
    </motion.p>
  </div>
);

/* ─── VIEW 2: Task Board ─────────────────────────────────────────────── */
const CLIENTS = [
  { name: 'GF AI', color: 'bg-blue-600', active: true },
  { name: 'Innoveum', color: 'bg-indigo-600' },
  { name: 'Myles AI', color: 'bg-purple-600' },
  { name: 'Chris AI', color: 'bg-pink-600' },
  { name: 'Sellaa AI', color: 'bg-emerald-600' },
  { name: 'Avelo AI', color: 'bg-orange-600' },
  { name: 'Cerevo AI', color: 'bg-red-600' },
];

const TASK_COLS = [
  {
    title: 'Client Related',
    tasks: ['Close deal with Ronan', 'Follow up on proposal', 'Review service agreement'],
  },
  {
    title: 'Internal Related',
    tasks: ['Build AI ranking system', 'Create mobile app', 'Set up ad tracking', 'Prep weekly report'],
  },
];

const TaskView = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-28 md:w-36 border-r border-white/5 flex flex-col p-2 shrink-0 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <img
          src="/lovable-uploads/gofocus-logo.png"
          alt="GoFocus"
          className="w-4 h-4 rounded-full object-cover"
        />
        <span className="text-white text-[9px] font-bold">WorkHub</span>
      </div>
      <button className="text-white/40 text-[8px] flex items-center gap-1 mb-2.5 px-1 cursor-pointer hover:text-white/60 transition-colors duration-150">
        <ArrowLeft size={8} />
        Back to Hub
      </button>
      <p className="text-white/25 text-[7px] font-semibold tracking-widest px-1 mb-1">CLIENTS</p>
      {CLIENTS.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg mb-0.5 cursor-pointer transition-all duration-150 ${
            c.active
              ? 'bg-primary/15 border border-primary/20'
              : 'border border-transparent hover:bg-white/5'
          }`}
        >
          <div
            className={`w-3.5 h-3.5 rounded-full ${c.color} flex items-center justify-center text-[6px] font-bold text-white shrink-0`}
          >
            {c.name[0]}
          </div>
          <span className={`text-[8px] truncate ${c.active ? 'text-white font-medium' : 'text-white/40'}`}>
            {c.name}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Main */}
    <div className="flex-1 p-2.5 md:p-3 overflow-hidden flex flex-col gap-2">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <p className="text-white text-[11px] font-bold">Task Board</p>
          <p className="text-white/40 text-[8px]">
            Managing <span className="text-primary font-medium">GF AI</span>
          </p>
        </div>
        <button className="bg-white/90 text-black text-[8px] px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-white transition-colors duration-150 font-semibold">
          <Plus size={8} />
          New Task
        </button>
      </div>

      {/* Progress rings */}
      <div className="flex gap-2 shrink-0">
        {[
          { label: 'Client Tasks', pct: 100, done: '2/2' },
          { label: 'Internal Tasks', pct: 70, done: '7/10' },
        ].map(({ label, pct, done }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-2.5 py-1.5 flex-1"
          >
            <Ring pct={pct} size={36} />
            <div>
              <p className="text-white text-[8px] font-medium leading-tight">{label}</p>
              <p className="text-white/35 text-[7px]">{done} done</p>
            </div>
          </div>
        ))}
      </div>

      {/* Task columns */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 overflow-hidden">
        {TASK_COLS.map(({ title, tasks }, ci) => (
          <div key={title} className="bg-white/[0.02] border border-white/5 rounded-xl p-2 overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white/60 text-[8px] font-semibold">{title}</p>
              <div className="flex gap-0.5 items-center">
                {['bg-yellow-500', 'bg-orange-500', 'bg-green-500'].map((c) => (
                  <div key={c} className={`w-1.5 h-1.5 rounded-full ${c}`} />
                ))}
                <span className="text-white/30 text-[7px] ml-1">{tasks.length}</span>
              </div>
            </div>
            <div className="space-y-1">
              {tasks.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + ci * 0.1 + i * 0.08 }}
                  className="bg-white/[0.04] border border-white/5 rounded-lg px-2 py-1.5 text-[8px] text-white/75 flex items-center gap-1.5 cursor-pointer hover:border-white/10 transition-colors duration-150"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                  {t}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── VIEW 3: Financial Dashboard ───────────────────────────────────── */
const FINANCE_STATS = [
  {
    label: 'Total Revenue',
    to: 31250,
    prefix: '$',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-700/20',
    text: 'text-emerald-400',
  },
  {
    label: 'Total Expenses',
    to: 4850,
    prefix: '$',
    bg: 'bg-red-950/60',
    border: 'border-red-700/20',
    text: 'text-red-400',
  },
  {
    label: 'Net Profit',
    to: 26400,
    prefix: '$',
    bg: 'bg-blue-950/60',
    border: 'border-blue-700/20',
    text: 'text-blue-400',
  },
];

const MONTHS = [
  { month: 'Mar 2026', rev: 9800, net: 8200 },
  { month: 'Feb 2026', rev: 8200, net: 6600 },
  { month: 'Jan 2026', rev: 3200, net: 2700 },
  { month: 'Dec 2025', rev: 10725, net: 9678 },
];

const BAR_DATA = [45, 30, 80, 55, 90, 65, 75, 85, 95, 70, 60, 88];

const FinanceView = () => (
  <div className="h-full p-3 md:p-4 overflow-hidden flex flex-col gap-2.5">
    {/* Top nav */}
    <div className="flex items-center gap-2 shrink-0">
      <button className="text-white/35 text-[8px] flex items-center gap-0.5 cursor-pointer hover:text-white/55 transition-colors duration-150">
        <ArrowLeft size={8} />
        Back
      </button>
      <span className="text-white/15 text-[9px]">|</span>
      <span className="text-white/60 text-[9px] flex items-center gap-1">
        <BarChart2 size={9} />
        Analytics
      </span>
      <div className="ml-auto text-white/25 text-[8px] hidden md:block">support@gofocus.ai</div>
    </div>

    <div className="shrink-0">
      <p className="text-white text-[13px] font-bold mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Financial Dashboard
      </p>
      <p className="text-white/35 text-[8px]">Monthly P&L, ad metrics, and sales analytics</p>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-3 gap-1.5 shrink-0">
      {FINANCE_STATS.map(({ label, to, prefix, bg, border, text }) => (
        <div key={label} className={`${bg} border ${border} rounded-xl p-2.5`}>
          <p className="text-white/50 text-[8px] mb-1">{label}</p>
          <p className={`text-base font-bold ${text}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Counter to={to} prefix={prefix} />
          </p>
        </div>
      ))}
    </div>

    {/* Monthly breakdown */}
    <div className="shrink-0">
      <p className="text-white/45 text-[8px] font-semibold mb-1.5 flex items-center gap-1">
        <BarChart2 size={8} />
        Monthly Breakdown
      </p>
      <div className="grid grid-cols-4 gap-1">
        {MONTHS.map(({ month, rev, net }) => (
          <div key={month} className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5">
            <p className="text-white/30 text-[7px]">{month}</p>
            <p className="text-emerald-400 text-[10px] font-bold">${(rev / 1000).toFixed(1)}k</p>
            <p className="text-white/30 text-[7px]">+${(net / 1000).toFixed(1)}k net</p>
          </div>
        ))}
      </div>
    </div>

    {/* Revenue chart */}
    <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-2.5 min-h-0 flex flex-col">
      <div className="flex items-center justify-between mb-1.5 shrink-0">
        <p className="text-white/45 text-[8px] font-medium">Revenue Trend</p>
        <div className="flex gap-2">
          {[
            ['#22c55e', 'Revenue'],
            ['#ef4444', 'Expenses'],
          ].map(([color, label]) => (
            <span key={label} className="flex items-center gap-0.5 text-[7px]" style={{ color }}>
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-1 flex-1 min-h-0">
        {BAR_DATA.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-[2px]"
            style={{
              height: `${v}%`,
              background: 'linear-gradient(to top, #16a34a66, #22c55e)',
              transformOrigin: 'bottom',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ─── VIEW 4: Ads Hub ────────────────────────────────────────────────── */
const ADS_METRICS = [
  { label: 'TOTAL SPEND', val: '$864' },
  { label: 'IMPRESSIONS', val: '22.0k' },
  { label: 'LINK CLICKS', val: '224' },
  { label: 'LEADS', val: '44', dot: '#22c55e' },
  { label: 'BOOKINGS', val: '10', dot: '#22c55e' },
  { label: 'HOOK RATE', val: '15.4%', dot: '#eab308' },
  { label: 'COST/LEAD', val: '$19.65', dot: '#22c55e' },
  { label: 'CPC (LINK)', val: '$3.86', dot: '#22c55e' },
  { label: 'CPM', val: '$39.24' },
  { label: 'CTR (LINK)', val: '1.0%', dot: '#22c55e' },
  { label: 'LF CONV RATE', val: '19.6%', dot: '#22c55e' },
  { label: 'COST/BOOKING', val: '$86.47', dot: '#eab308' },
];

const DAILY_BARS = [20, 35, 28, 45, 30, 55, 40, 60, 35, 70, 55, 65, 45, 75, 60, 50, 80, 45];

const AdsView = () => (
  <div className="h-full p-3 md:p-4 overflow-hidden flex flex-col gap-2">
    {/* Top nav */}
    <div className="flex items-center gap-2 shrink-0">
      <button className="text-white/35 text-[8px] flex items-center gap-0.5 cursor-pointer hover:text-white/55 transition-colors duration-150">
        <ArrowLeft size={8} />
        Back
      </button>
      <span className="text-white/15">|</span>
      <span className="text-white/60 text-[9px] flex items-center gap-1">
        <Megaphone size={9} />
        Ads Hub
      </span>
      <div className="ml-auto flex items-center gap-1.5">
        <span className="text-white/25 text-[7px]">2d ago</span>
        <button className="bg-primary/80 text-white text-[8px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 cursor-pointer hover:bg-primary transition-colors duration-150">
          <RefreshCw size={7} />
          Sync
        </button>
      </div>
    </div>

    <div className="shrink-0">
      <p className="text-white text-[13px] font-bold mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Meta Ads Analytics Hub
      </p>
      <p className="text-white/35 text-[8px]">Daily performance metrics from Meta Marketing API</p>
    </div>

    {/* Tabs + date */}
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex gap-0.5">
        <button className="bg-primary text-white text-[8px] px-2.5 py-1 rounded-lg font-medium cursor-pointer">
          Overview
        </button>
        <button className="text-white/40 text-[8px] px-2.5 py-1 rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-150">
          Campaigns
        </button>
      </div>
      <div className="ml-auto flex items-center gap-1 text-[7px] text-white/30">
        <span className="flex items-center gap-0.5 bg-white/5 px-1.5 py-0.5 rounded cursor-pointer hover:bg-white/8 transition-colors duration-150">
          Last 30 Days
          <ChevronDown size={7} />
        </span>
        <span>2/4 – 3/6/2026</span>
      </div>
    </div>

    {/* Metrics grid */}
    <div className="grid grid-cols-6 gap-1 shrink-0">
      {ADS_METRICS.map(({ label, val, dot }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-1.5"
        >
          <div className="flex items-center gap-1 mb-0.5">
            {dot && (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: dot }}
              />
            )}
            <p className="text-white/30 text-[6.5px] font-medium leading-tight">{label}</p>
          </div>
          <p className="text-white text-[11px] font-bold">{val}</p>
        </motion.div>
      ))}
    </div>

    {/* Daily performance chart */}
    <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-2.5 min-h-0 flex flex-col">
      <div className="flex items-center gap-3 mb-1.5 shrink-0">
        <p className="text-white/45 text-[8px] font-medium">Daily Performance</p>
        {[['#3b82f6', 'Spend'], ['#22c55e', 'Leads']].map(([color, label]) => (
          <span key={label} className="flex items-center gap-0.5 text-[7px]" style={{ color }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-end gap-[2px] flex-1 min-h-0">
        {DAILY_BARS.map((v, i) => (
          <div key={i} className="flex-1 flex gap-[1px] items-end h-full">
            <motion.div
              className="flex-1 rounded-t-[1px] bg-blue-500/55"
              style={{ height: `${v * 0.7}%`, transformOrigin: 'bottom' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: i * 0.025 }}
            />
            <motion.div
              className="flex-1 rounded-t-[1px] bg-emerald-500/65"
              style={{ height: `${v * 0.45}%`, transformOrigin: 'bottom' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: i * 0.025 + 0.1 }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── VIEW 5: Sales Advisor ──────────────────────────────────────────── */
const SalesView = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-32 md:w-40 border-r border-white/5 p-2.5 shrink-0 flex flex-col">
      <motion.button
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[9px] font-semibold py-2 rounded-xl mb-3 flex items-center justify-center gap-1 cursor-pointer hover:opacity-90 transition-opacity duration-150"
      >
        <Plus size={9} />
        New Session
      </motion.button>
      <div className="flex flex-col items-center justify-center flex-1 text-center gap-1.5">
        <MessageCircle size={20} className="text-white/15" />
        <p className="text-white/35 text-[8px]">No sessions yet</p>
        <p className="text-white/20 text-[7px] leading-tight">Start a new coaching session</p>
      </div>
    </div>

    {/* Main */}
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="w-14 h-14 rounded-2xl bg-[#0d2218] border border-emerald-800/30 flex items-center justify-center mb-3"
      >
        <MessageCircle size={26} className="text-emerald-400" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="text-white font-bold text-[13px] mb-1.5"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Sales Coaching Hub
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-white/40 text-[8px] max-w-[200px] leading-relaxed mb-4"
      >
        Upload your sales call transcripts and get AI-powered Socratic coaching to discover patterns
        and build winning habits.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        whileHover={{ scale: 1.04 }}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[9px] font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer mb-5 hover:opacity-90 transition-opacity duration-150"
      >
        <Zap size={10} />
        Start Your First Session
      </motion.button>

      <div className="flex gap-2">
        {[
          { label: 'Sessions', val: 0 },
          { label: 'Active', val: 0 },
          { label: 'Completed', val: 0 },
        ].map(({ label, val }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 + i * 0.07 }}
            className="bg-white/[0.04] border border-white/5 rounded-xl px-4 py-2.5 text-center"
          >
            <p className="text-emerald-400 text-base font-bold">{val}</p>
            <p className="text-white/35 text-[7px]">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Tab Config ─────────────────────────────────────────────────────── */
type TabConfig = { id: TabId; label: string; Icon: React.ComponentType<{ size?: number }> };
const TABS: TabConfig[] = [
  { id: 'hub', label: 'Hub', Icon: LayoutGrid },
  { id: 'tasks', label: 'Work Hub', Icon: Briefcase },
  { id: 'finance', label: 'Analytics', Icon: TrendingUp },
  { id: 'ads', label: 'Ads Hub', Icon: Megaphone },
  { id: 'sales', label: 'Sales AI', Icon: MessageCircle },
];

const VIEW_COMPONENTS: Record<TabId, React.ComponentType> = {
  hub: HubView,
  tasks: TaskView,
  finance: FinanceView,
  ads: AdsView,
  sales: SalesView,
};

/* ─── Main Component ─────────────────────────────────────────────────── */
const WorkHubPreview = () => {
  const [active, setActive] = useState<TabId>('hub');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => TAB_IDS[(TAB_IDS.indexOf(prev) + 1) % TAB_IDS.length]);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const ViewComponent = VIEW_COMPONENTS[active];

  return (
    <div
      className="w-full flex flex-col bg-[#080f1e]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Browser Chrome */}
      <div className="flex items-center px-3 md:px-4 py-2.5 bg-[#0b1626] border-b border-white/5 shrink-0">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/[0.06]">
            <img
              src="/lovable-uploads/gofocus-logo.png"
              alt="GoFocus AI"
              className="w-3.5 h-3.5 rounded-full object-cover"
            />
            <span className="text-[9px] text-white/40">app.gofocus.ai</span>
          </div>
        </div>
        <div className="text-white/20 text-[8px] shrink-0 hidden md:block">support@gofocus.ai</div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center px-2 md:px-3 py-1.5 bg-[#0a1322] border-b border-white/[0.06] gap-0.5 shrink-0">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActive(id);
              setPaused(true);
            }}
            className={`flex items-center gap-1 px-2 md:px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
              active === id
                ? 'bg-primary/15 text-primary border border-primary/25'
                : 'text-white/35 hover:text-white/65 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={9} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}

        {/* Progress pills */}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          {TAB_IDS.map((id) => (
            <button
              key={id}
              onClick={() => {
                setActive(id);
                setPaused(true);
              }}
              className="cursor-pointer flex items-center"
            >
              <motion.div
                animate={{
                  width: active === id ? 14 : 6,
                  opacity: active === id ? 1 : 0.25,
                }}
                transition={{ duration: 0.25 }}
                className={`h-1.5 rounded-full ${active === id ? 'bg-primary' : 'bg-white'}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative overflow-hidden" style={{ height: '360px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ViewComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkHubPreview;
