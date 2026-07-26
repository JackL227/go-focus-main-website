'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/content';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-colors duration-200',
        scrolled || open ? 'bg-ground border-b border-rule' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="shell flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Image
            src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
            alt=""
            width={26}
            height={26}
            priority
          />
          <span className="font-display text-[1.15rem] font-semibold tracking-[-0.03em] text-ink">
            GoFocus
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={[
                'text-[0.92rem] transition-colors',
                isActive(item.href) ? 'text-ink font-medium' : 'text-[var(--muted)] hover:text-ink',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-[3px] bg-[var(--blue-text)] px-4 text-[0.88rem] font-medium text-white transition-colors hover:bg-[#093f99]"
          >
            Book a call
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-rule bg-ground md:hidden">
          <div className="shell flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={[
                  'py-3 text-[0.98rem] border-b border-rule',
                  isActive(item.href) ? 'text-ink font-medium' : 'text-[var(--muted)]',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-[3px] bg-[var(--blue-text)] px-6 text-[0.94rem] font-medium text-white"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
