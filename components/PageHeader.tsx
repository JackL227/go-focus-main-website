import Link from 'next/link';
import { Reveal } from './Reveal';

/**
 * The same opening structure on every route except home. This is what makes
 * seven pages read as one document. Deliberately not full-height.
 */
export function PageHeader({
  breadcrumb,
  h1,
  standfirst,
  meta,
}: {
  breadcrumb: string;
  h1: string;
  standfirst: string;
  meta?: readonly string[];
}) {
  return (
    <header className="shell pt-16 pb-14 md:pt-24 md:pb-20">
      <Reveal>
        <nav aria-label="Breadcrumb" className="eyebrow eyebrow-quiet">
          <Link href="/" className="hover:text-ink transition-colors">
            GoFocus
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="text-ink">{breadcrumb}</span>
        </nav>
      </Reveal>

      <Reveal delay={60}>
        <h1 className="display-xl mt-7 max-w-[16ch]">{h1}</h1>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-7 prose-col text-[1.15rem] leading-[1.6] text-[var(--body)]">
          {standfirst}
        </p>
      </Reveal>

      {meta && meta.length > 0 && (
        <Reveal delay={180}>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-2">
            {meta.map((item) => (
              <li key={item} className="eyebrow eyebrow-quiet">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <hr className="mt-12 border-0 h-px bg-rule md:mt-16" />
    </header>
  );
}
