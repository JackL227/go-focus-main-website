import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { capabilities, cases, ctaVariants, site } from '@/lib/content';
import { Heading } from '@/components/Primitives';
import { CaseCard } from '@/components/Blocks';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};

  return {
    title: c.name,
    description: `${c.sector}. ${c.result}`,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.name} | ${site.name}`,
      description: c.result,
      url: `/work/${c.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  const used = capabilities.filter((cap) => c.capabilities.includes(cap.slug));

  // Prefer cases sharing a capability, then fill to three.
  const related = [
    ...cases.filter((x) => x.slug !== c.slug && x.capabilities.some((k) => c.capabilities.includes(k))),
    ...cases.filter((x) => x.slug !== c.slug && !x.capabilities.some((k) => c.capabilities.includes(k))),
  ].slice(0, 3);

  return (
    <>
      <header className="shell pt-16 pb-14 md:pt-24 md:pb-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow eyebrow-quiet">
            <Link href="/" className="hover:text-ink transition-colors">
              GoFocus
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <Link href="/work" className="hover:text-ink transition-colors">
              Work
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="text-ink">{c.name}</span>
          </nav>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display-xl mt-7 max-w-[16ch]">{c.name}</h1>
          <p className="mt-5 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            {c.sector}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-2">
            <li className="eyebrow eyebrow-quiet">{used.map((u) => u.title).join(' · ')}</li>
            <li className="eyebrow eyebrow-quiet">
              {c.reference ? 'Reference available' : 'Reference not offered'}
            </li>
          </ul>
        </Reveal>

        <hr className="mt-12 border-0 h-px bg-rule md:mt-16" />
      </header>

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="eyebrow">The problem</h2>
              <p className="mt-5 text-[1.05rem] leading-[1.7]">{c.problem}</p>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="eyebrow mt-14">What we built</h2>
              <p className="mt-5 text-[1.05rem] leading-[1.7]">{c.solution}</p>

              <ul className="mt-8 space-y-3 border-t border-rule pt-8">
                {used.map((u) => (
                  <li key={u.slug} className="grid grid-cols-[1.25rem_1fr] gap-2">
                    <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 rounded-full bg-ink" />
                    <Link
                      href={`/services#${u.slug}`}
                      className="text-[0.98rem] leading-[1.62] text-[var(--body)] underline decoration-rule underline-offset-4 hover:decoration-ink hover:text-ink transition-colors"
                    >
                      {u.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            {c.quote && (
              <Reveal delay={110}>
                <blockquote className="mt-14 border-l-2 border-ink pl-6">
                  <p className="font-display text-[1.35rem] leading-[1.4] text-ink">
                    “{c.quote.text}”
                  </p>
                  <footer className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {c.quote.attribution}
                  </footer>
                </blockquote>
              </Reveal>
            )}

            <Reveal delay={140}>
              <h2 className="eyebrow mt-14">The result</h2>
              <p className="mt-5 font-display text-[clamp(1.4rem,2.6vw,1.95rem)] leading-[1.3] text-ink">
                {c.result}
              </p>
            </Reveal>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={60}>
              <div className="border border-rule p-7 md:sticky md:top-24">
                <dl className="space-y-6">
                  <div>
                    <dt className="eyebrow eyebrow-quiet">Sector</dt>
                    <dd className="mt-2 text-[0.95rem] text-[var(--body)]">{c.sector}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow eyebrow-quiet">Capabilities</dt>
                    <dd className="mt-2 text-[0.95rem] text-[var(--body)]">
                      {used.map((u) => u.title).join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow eyebrow-quiet">Reference</dt>
                    <dd className="mt-2 text-[0.95rem] text-[var(--body)]">
                      {c.reference ? 'Available on request' : 'Not offered'}
                    </dd>
                  </div>
                </dl>

                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[3px] bg-[var(--blue-text)] px-6 text-[0.94rem] font-medium text-white transition-colors hover:bg-[#093f99]"
                >
                  Book a call
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <hr className="border-0 h-px bg-rule" />
        <h2 className="eyebrow eyebrow-quiet mt-12">Related work</h2>
        <div className="mt-8 grid gap-px bg-rule md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 70} className="flex">
              <CaseCard {...r} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand {...ctaVariants.caseStudy} />
    </>
  );
}
