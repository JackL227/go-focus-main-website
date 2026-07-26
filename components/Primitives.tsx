import Link from 'next/link';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

export function Section({
  children,
  dark = false,
  rule = true,
  id,
  className = '',
}: {
  children: ReactNode;
  dark?: boolean;
  rule?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        'section-pad',
        rule && !dark ? 'border-t border-rule' : '',
        dark ? 'bg-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={id ? { scrollMarginTop: '5rem' } : undefined}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Eyebrow
 * ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  quiet = false,
  onDark = false,
  className = '',
}: {
  children: ReactNode;
  quiet?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={['eyebrow', quiet ? 'eyebrow-quiet' : '', className].filter(Boolean).join(' ')}
      style={onDark ? { color: quiet ? 'var(--dark-muted)' : '#fff' } : undefined}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Heading
 * ------------------------------------------------------------------ */

/**
 * Literal strings, not `display-${size}`. Tailwind scans source text, so a
 * class assembled at runtime gets purged from the stylesheet.
 */
const headingSize = {
  xl: 'display-xl',
  lg: 'display-lg',
  md: 'display-md',
} as const;

export function Heading({
  children,
  as: Tag = 'h2',
  size = 'lg',
  onDark = false,
  className = '',
}: {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={[headingSize[size], className].filter(Boolean).join(' ')}
      style={onDark ? { color: '#fff' } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Button
 * ------------------------------------------------------------------ */

type ButtonVariant = 'solid' | 'ghost' | 'onDark';

const buttonBase =
  'inline-flex items-center justify-center gap-2 h-12 px-6 text-[0.94rem] font-medium rounded-[3px] transition-colors duration-150';

const variantClass: Record<ButtonVariant, string> = {
  solid: 'bg-[var(--blue-text)] text-white hover:bg-[#093f99]',
  ghost: 'border border-rule text-ink hover:bg-paper',
  onDark: 'bg-white text-ink hover:bg-[#e8eaed]',
};

export function Button({
  href,
  children,
  variant = 'solid',
  external,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}) {
  const cls = [buttonBase, variantClass[variant], className].filter(Boolean).join(' ');
  const isExternal = external ?? /^https?:/.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Arrow link
 * ------------------------------------------------------------------ */

export function ArrowLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        'inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink hover:text-[var(--blue-text)] transition-colors',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Rule
 * ------------------------------------------------------------------ */

export function Rule({ className = '' }: { className?: string }) {
  return <hr className={['border-0 h-px bg-rule', className].filter(Boolean).join(' ')} />;
}
