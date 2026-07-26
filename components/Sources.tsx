import { sources, sourcesIntro } from '@/lib/content';
import { Eyebrow } from './Primitives';

/**
 * Renders only the sources a page actually cites, renumbered in order of
 * appearance. Anchor ids match the numbers <Cite> displays.
 */
export function Sources({ cites }: { cites: number[] }) {
  if (cites.length === 0) return null;

  return (
    <section className="section-pad border-t border-rule" aria-label="Sources">
      <div className="shell">
        <Eyebrow quiet>Sources</Eyebrow>
        <p className="mt-4 text-small text-[var(--muted)] prose-col">{sourcesIntro}</p>

        <ol className="mt-8 space-y-4 prose-col">
          {cites.map((n, i) => (
            <li
              key={n}
              id={`source-${i + 1}`}
              className="grid grid-cols-[1.75rem_1fr] gap-2 text-small text-[var(--muted)]"
              style={{ scrollMarginTop: '6rem' }}
            >
              <span className="font-mono text-[0.7rem] text-ink pt-[0.15rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{sources[n]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
