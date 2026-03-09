
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import CenterLogo from './CenterLogo';
import { CONVERSION_TYPES } from './constants';
import { useIsMobile } from '@/hooks/use-mobile';

const LEAD_TEXTS = ['New Lead', 'Prospect', 'Inquiry', 'Website Visitor', 'New Contact'];
const NAMES = [
  'John G.', 'Amy W.', 'Mike B.', 'Tara L.',
  'Sam T.', 'Lisa M.', 'Chris R.', 'Emma D.', 'Robert K.',
];

const rand = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

let _uid = 0;

interface Lead { id: number; text: string; phase: 'waiting' | 'absorbing'; }
interface Booking { id: number; name: string; action: string; }

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [processing, setProcessing] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const setIsPaused = (v: boolean) => {
    pausedRef.current = v;
    setPaused(v);
  };

  useEffect(() => {
    let running = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const push = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (running) fn(); }, ms);
      timers.push(t);
    };

    const scheduleNext = (ms: number) => {
      push(() => {
        if (pausedRef.current) { scheduleNext(400); return; }
        runCycle();
      }, ms);
    };

    const runCycle = () => {
      const id = ++_uid;
      // Spawn lead card on the left
      setLeads(prev => [...prev.slice(-1), { id, text: rand(LEAD_TEXTS), phase: 'waiting' }]);

      // Start absorbing: card flies into the logo
      push(() => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, phase: 'absorbing' } : l));
        setProcessing(true);
      }, 860);

      // Absorption complete: remove lead, emit booking from the logo's right side
      push(() => {
        setLeads(prev => prev.filter(l => l.id !== id));
        setProcessing(false);
        setBookings(prev => [
          { id: ++_uid, name: rand(NAMES), action: rand(CONVERSION_TYPES) },
          ...prev.slice(0, 3),
        ]);
        scheduleNext(780);
      }, 2060);
    };

    scheduleNext(350);
    return () => { running = false; timers.forEach(clearTimeout); };
  }, []);

  // Pixel distance a card travels toward / emerges from the logo center
  const absorbX = isMobile ? 112 : 208;

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: isMobile ? '268px' : '328px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
      aria-label="AI agent converting leads into booked calls"
    >

      {/* ── LEFT ZONE: incoming leads ─────────────────────── */}
      <div className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 w-[112px] md:w-[150px]">
        <p className="text-[8px] font-semibold text-white/20 tracking-widest uppercase mb-2.5 ml-0.5">
          Incoming
        </p>
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                layout="position"
                initial={{ x: -72, opacity: 0, scale: 0.88 }}
                animate={
                  lead.phase === 'absorbing'
                    ? {
                        x: absorbX,
                        opacity: 0,
                        scale: 0.14,
                        transition: { duration: 1.18, ease: [0.48, 0, 0.72, 0.1] },
                      }
                    : {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.38, ease: 'easeOut' },
                      }
                }
                // Card is already opacity-0 when removed; instant exit prevents flash
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className={[
                  'w-full rounded-xl px-3 py-2 md:py-2.5 border shadow-md',
                  lead.phase === 'absorbing'
                    ? 'bg-primary/8 border-primary/18'
                    : 'bg-background/90 backdrop-blur-sm border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.04] transition-colors cursor-default',
                ].join(' ')}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-[11px] md:text-xs font-medium text-white/90 truncate">
                    {lead.text}
                  </span>
                </div>
                <p className="text-[9px] text-white/22 mt-0.5 pl-3.5">Just now</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── CENTER: logo + pulsing connector beams ─────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Left beam — lights up as lead approaches */}
        <motion.div
          className="absolute top-1/2 -translate-y-px"
          style={{
            left: isMobile ? '28%' : '26%',
            width: isMobile ? '8%' : '10.5%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5))',
          }}
          animate={{ opacity: processing ? [0.2, 1, 0.2] : 0.15 }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        {/* Right beam — lights up as booking emerges */}
        <motion.div
          className="absolute top-1/2 -translate-y-px"
          style={{
            right: isMobile ? '28%' : '26%',
            width: isMobile ? '8%' : '10.5%',
            height: '1px',
            background: 'linear-gradient(to right, rgba(59,130,246,0.5), transparent)',
          }}
          animate={{ opacity: processing ? [0.2, 1, 0.2] : 0.15 }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
        />

        <CenterLogo processingLead={processing} />
      </div>

      {/* ── RIGHT ZONE: booking card stack ─────────────────── */}
      <div className="absolute right-3 md:right-7 top-1/2 -translate-y-1/2 w-[112px] md:w-[150px]">
        <p className="text-[8px] font-semibold text-white/20 tracking-widest uppercase mb-2.5 mr-0.5 text-right">
          Converted
        </p>
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {bookings.map((booking, idx) => (
              <motion.div
                key={booking.id}
                layout="position"
                // Emerges from the logo center (negative x = start closer to center)
                initial={{ x: -absorbX, opacity: 0, scale: 0.14 }}
                animate={{
                  x: 0,
                  opacity: Math.max(0.1, 1 - idx * 0.25),
                  scale: 1 - idx * 0.02,
                }}
                exit={{ x: 50, opacity: 0, transition: { duration: 0.22 } }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx === 0 ? 0 : idx * 0.04,
                }}
                className="w-full bg-background/90 backdrop-blur-sm border border-white/[0.08] shadow-md rounded-xl px-3 py-2 md:py-2.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-[11px] md:text-xs font-semibold text-white/90 truncate">
                    {booking.name}
                  </span>
                </div>
                <p className="text-[9px] text-white/22 mt-0.5 pl-5 truncate">{booking.action}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── PAUSE TOAST ────────────────────────────────────── */}
      <AnimatePresence>
        {paused && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-[10px] text-white/22 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.07] whitespace-nowrap"
          >
            Paused — hover away to resume
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
