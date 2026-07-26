'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { sources } from '@/lib/content';

/**
 * Citations are page-scoped. A page declares the master source numbers it
 * uses; every <Cite> resolves its displayed number from that list, so a
 * reader on /pricing sees "1" rather than "9".
 */
const CiteContext = createContext<number[]>([]);

export function CiteScope({ cites, children }: { cites: number[]; children: ReactNode }) {
  return <CiteContext.Provider value={cites}>{children}</CiteContext.Provider>;
}

export function Cite({ n }: { n: number }) {
  const scope = useContext(CiteContext);
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('center');

  const index = scope.indexOf(n);
  // A citation not declared by the page is a content bug, not a render error.
  if (index === -1) return null;
  const display = index + 1;

  /**
   * Measure before showing. Without this the last citation on a line pushes
   * its popover off-screen.
   */
  const place = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const halfPop = Math.min(352, vw - 40) / 2;
    const centre = rect.left + rect.width / 2;

    if (centre - halfPop < 12) setAlign('left');
    else if (centre + halfPop > vw - 12) setAlign('right');
    else setAlign('center');

    setOpen(true);
  };

  return (
    <span className="cite" ref={ref} data-open={open ? 'true' : 'false'} data-align={align}>
      <button
        type="button"
        className="cite-marker"
        aria-label={`Source ${display}. ${sources[n]}`}
        onMouseEnter={place}
        onMouseLeave={() => setOpen(false)}
        onFocus={place}
        onBlur={() => setOpen(false)}
        onClick={() => {
          document
            .getElementById(`source-${display}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        {display}
      </button>
      <span className="cite-pop" role="tooltip">
        <span className="font-mono text-[0.65rem] tracking-[0.1em] text-[var(--muted)] block mb-1">
          SOURCE {display}
        </span>
        {sources[n]}
      </span>
    </span>
  );
}
