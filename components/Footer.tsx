import Link from 'next/link';
import { capabilities, nav, site } from '@/lib/content';

const linkClass = 'text-[0.88rem] text-[var(--muted)] hover:text-ink transition-colors';

export function Footer() {
  return (
    <footer className="border-t border-rule pt-16 pb-10">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-display text-[1.15rem] font-semibold tracking-[-0.03em] text-ink">
              GoFocus AI
            </p>
            <p className="mt-3 max-w-[28ch] text-[0.88rem] leading-[1.6] text-[var(--muted)]">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Pages">
            <p className="eyebrow eyebrow-quiet">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Capabilities">
            <p className="eyebrow eyebrow-quiet">Capabilities</p>
            <ul className="mt-4 space-y-2.5">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services#${c.slug}`} className={linkClass}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow eyebrow-quiet">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className={linkClass}>
                  {site.phone}
                </a>
              </li>
              <li className="text-[0.88rem] leading-[1.6] text-[var(--muted)]">
                {site.address}
                <br />
                {site.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            {site.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
