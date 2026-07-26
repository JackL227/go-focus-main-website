import Link from 'next/link';
import { fit, process, photos } from '@/lib/content';
import { Eyebrow, Heading } from './Primitives';
import { Reveal } from './Reveal';

/* ------------------------------------------------------------------ *
 * FitColumns — used on / and /about, rendered from one array
 * ------------------------------------------------------------------ */

export function FitColumns() {
  return (
    <>
      <Reveal>
        <Eyebrow quiet>{fit.eyebrow}</Eyebrow>
        <Heading as="h2" size="lg" className="mt-5 max-w-[20ch]">
          {fit.heading}
        </Heading>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal delay={60}>
          <h3 className="eyebrow">{fit.builtForLabel}</h3>
          <ul className="mt-6 space-y-4">
            {fit.builtFor.map((item) => (
              <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
                <span aria-hidden="true" className="font-mono text-ink text-[0.9rem] leading-[1.7]">
                  +
                </span>
                <span className="text-[1rem] leading-[1.66] text-[var(--body)]">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="eyebrow eyebrow-quiet">{fit.notBuiltForLabel}</h3>
          <ul className="mt-6 space-y-4">
            {fit.notBuiltFor.map((item) => (
              <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
                <span
                  aria-hidden="true"
                  className="font-mono text-[var(--muted)] text-[0.9rem] leading-[1.7]"
                >
                  –
                </span>
                <span className="text-[1rem] leading-[1.66] text-[var(--muted)]">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * ProcessSteps — used on /pricing and /about
 * ------------------------------------------------------------------ */

export function ProcessSteps({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <>
      <Reveal>
        <Eyebrow quiet>{process.eyebrow}</Eyebrow>
        <Heading as="h2" size="lg" className="mt-5 max-w-[20ch]">
          {process.heading}
        </Heading>
        {showIntro && (
          <p className="mt-6 prose-col text-[1.05rem] leading-[1.66]">{process.intro}</p>
        )}
      </Reveal>

      <ol className="mt-14">
        {process.steps.map((step, i) => (
          <Reveal as="li" key={step.n} delay={i * 55}>
            <div className="grid gap-3 border-t border-rule py-7 md:grid-cols-12 md:gap-8 md:py-9">
              <div className="md:col-span-4 flex items-baseline gap-4">
                <span className="font-mono text-[0.72rem] text-[var(--muted)]">{step.n}</span>
                <h3 className="display-md">{step.title}</h3>
              </div>
              <p className="md:col-span-7 md:col-start-6 text-[1rem] leading-[1.66]">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Photo — a null src hides the slot entirely. Placeholders are visibly
 * fake so they cannot ship by accident.
 * ------------------------------------------------------------------ */

export function Photo({
  slot,
  ratio,
  className = '',
}: {
  slot: keyof typeof photos;
  ratio: string;
  className?: string;
}) {
  const photo = photos[slot];
  if (!photo) return null;

  if (!photo.src) {
    return (
      <figure className={className}>
        <div
          className="relative w-full overflow-hidden rounded-[3px] border border-rule"
          style={{
            aspectRatio: ratio,
            backgroundColor: '#eceef0',
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0 10px, rgba(10,12,15,0.055) 10px 20px)',
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#4a4f57]">
            Placeholder
          </span>
        </div>
        {photo.caption && (
          <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            {photo.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full rounded-[3px] object-cover"
        style={{ aspectRatio: ratio }}
      />
      {photo.caption && (
        <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * CaseCard
 * ------------------------------------------------------------------ */

export function CaseCard({
  slug,
  name,
  sector,
  problem,
  solution,
  result,
  reference,
  headingLevel = 'h3',
}: {
  slug: string;
  name: string;
  sector: string;
  problem: string;
  solution: string;
  result: string;
  reference: boolean;
  /** h2 where cards sit directly under the page h1, h3 under a section h2. */
  headingLevel?: 'h2' | 'h3';
}) {
  const CardHeading = headingLevel;

  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col bg-ground p-7 transition-colors hover:bg-paper md:p-8"
    >
      <CardHeading className="display-md">{name}</CardHeading>
      <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {sector}
      </p>

      <dl className="mt-7 space-y-5">
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Problem
          </dt>
          <dd className="mt-1.5 text-[0.92rem] leading-[1.62] text-[var(--body)]">{problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Solution
          </dt>
          <dd className="mt-1.5 text-[0.92rem] leading-[1.62] text-[var(--body)]">{solution}</dd>
        </div>
        <div>
          {/* The one place blue earns its keep in this section. */}
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--blue-text)]">
            Result
          </dt>
          <dd className="mt-1.5 text-[0.95rem] font-medium leading-[1.6] text-ink">{result}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-7">
        {reference && (
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Reference available
          </p>
        )}
      </div>
    </Link>
  );
}
