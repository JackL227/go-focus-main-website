'use client';

import { useState } from 'react';

/**
 * Real buttons with aria-expanded. Height animates via grid-template-rows
 * 0fr → 1fr so nothing is hard-coded.
 */
export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-rule">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-[1.05rem] font-medium leading-[1.5] text-ink">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-mono text-[0.85rem] text-[var(--muted)]"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>

            <div
              className="acc-panel"
              data-open={isOpen ? 'true' : 'false'}
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
            >
              <div>
                <p className="pb-7 pr-10 text-[1rem] leading-[1.66] text-[var(--body)]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
