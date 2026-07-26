'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * One IntersectionObserver shared by every Reveal on the page. Each element
 * is unobserved as it fires; the observer disconnects once the last one has.
 */
let observer: IntersectionObserver | null = null;
let live = 0;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = 'true';
        observer?.unobserve(entry.target);
        live -= 1;
        if (live <= 0) {
          observer?.disconnect();
          observer = null;
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Loosens JSX prop typing so one component can render div/li/section/article.
  const Component = Tag as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      el.dataset.revealed = 'true';
      return;
    }

    // Safety net: if the observer never fires for this element, show it anyway
    // rather than leave the content invisible.
    const failsafe = window.setTimeout(() => {
      el.dataset.revealed = 'true';
    }, 2500);

    live += 1;
    const io = getObserver();
    io.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      io.unobserve(el);
      live = Math.max(0, live - 1);
    };
  }, []);

  return (
    <Component
      ref={ref}
      data-reveal=""
      data-revealed="false"
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Component>
  );
}
