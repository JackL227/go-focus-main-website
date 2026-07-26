import type { Metadata } from 'next';
import Link from 'next/link';
import { capabilities, capabilitiesClosing, cases, home, site } from '@/lib/content';
import { ArrowLink, Button, Eyebrow, Heading, Section } from '@/components/Primitives';
import { CaseCard, FitColumns, Photo } from '@/components/Blocks';
import { CiteScope, Cite } from '@/components/Cite';
import { Sources } from '@/components/Sources';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { ctaDefault } from '@/lib/content';

const PAGE_CITES = [1, 2];

export const metadata: Metadata = {
  title: 'GoFocus AI | Built to run without you',
  description:
    'We remove the constraint holding a business back, whether it sits in acquisition, in a process the founder personally runs, or in a role nobody has filled.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featured = home.work.featured
    .map((slug) => cases.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <CiteScope cites={PAGE_CITES}>
      {/* Hero */}
      <section className="shell pt-16 pb-14 md:pt-24 md:pb-20">
        <Reveal>
          <Eyebrow quiet>{home.hero.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display-xl mt-7 max-w-[13ch]">{home.hero.h1}</h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 prose-col text-[1.15rem] leading-[1.6] text-[var(--body)]">
            {home.hero.standfirst}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={site.bookingUrl} variant="solid">
              {home.hero.primary}
            </Button>
            <Button href="/work" variant="ghost">
              {home.hero.secondary}
            </Button>
          </div>
        </Reveal>

        {/* Client bar — a footnote, not a headline */}
        <Reveal delay={240}>
          <div className="mt-20 md:mt-24">
            <p className="eyebrow eyebrow-quiet">{home.clientBar.label}</p>
            <ul className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
              {home.clientBar.logos.map((logo) => (
                <li key={logo.name}>
                  {logo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="w-auto opacity-55 transition-opacity hover:opacity-80"
                      style={{ height: logo.aspect < 2 ? 26 : logo.aspect <= 5 ? 20 : 14 }}
                    />
                  ) : (
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted)] opacity-70">
                      {logo.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={300}>
          <dl className="mt-16 grid gap-8 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {home.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
                  {stat.value}
                  <Cite n={stat.cite} />
                </dt>
                <dd className="mt-2 max-w-[24ch] text-[0.88rem] leading-[1.55] text-[var(--muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Photo band */}
      <div className="shell pb-16 md:pb-20">
        <Reveal>
          <Photo slot="wide" ratio="16 / 6" />
        </Reveal>
      </div>

      {/* Positioning */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{home.positioning.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <Heading as="h2" size="lg" className="max-w-[22ch]">
                {home.positioning.heading}
              </Heading>
            </Reveal>

            <div className="mt-8 space-y-6">
              {home.positioning.paragraphs.map((p, i) => (
                <Reveal key={i} delay={60 + i * 55}>
                  <p className="text-[1.05rem] leading-[1.66]">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <Photo slot="work" ratio="3 / 2" className="mt-12" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The constraint */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{home.constraint.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <Heading as="h2" size="lg" className="max-w-[22ch]">
                {home.constraint.heading}
              </Heading>
            </Reveal>

            <Reveal delay={60}>
              <p className="mt-8 text-[1.05rem] leading-[1.66]">
                {home.constraint.body}
                <Cite n={home.constraint.bodyCite} />
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {home.constraint.figures.map((f, i) => (
                <Reveal key={f.value} delay={120 + i * 55}>
                  <p className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold tracking-[-0.03em] text-ink">
                    {f.value}
                    <Cite n={f.cite} />
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-[1.55] text-[var(--muted)]">
                    {f.label}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Two bars do not justify a charting library. */}
            <Reveal delay={240}>
              <figure className="mt-14 border-t border-rule pt-8">
                <figcaption className="eyebrow eyebrow-quiet">
                  {home.constraint.chart.title}
                </figcaption>
                <div className="mt-7 space-y-6">
                  {home.constraint.chart.bars.map((bar) => (
                    <div key={bar.label}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[0.92rem] text-[var(--body)]">{bar.label}</span>
                        <span className="font-mono text-[0.8rem] text-ink">
                          {bar.value.toFixed(1)}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-paper">
                        <div
                          className="h-full"
                          style={{
                            width: `${(bar.value / home.constraint.chart.max) * 100}%`,
                            backgroundColor: bar.fill,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Capabilities summary */}
      <Section>
        <Reveal>
          <Eyebrow quiet>{home.capabilities.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="mt-5 max-w-[20ch]">
            {home.capabilities.heading}
          </Heading>
          <p className="mt-6 prose-col text-[1.05rem] leading-[1.66]">
            {home.capabilities.intro}
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-rule">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 55}>
              <Link
                href={`/services#${c.slug}`}
                className="group grid gap-3 border-b border-rule py-7 transition-colors hover:bg-paper md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono text-[0.72rem] text-[var(--muted)]">{c.n}</span>
                  <h3 className="display-md">{c.title}</h3>
                </div>
                <p className="md:col-span-7 md:col-start-6 text-[0.98rem] leading-[1.62] text-[var(--body)]">
                  {c.oneLine}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 prose-col text-[1.05rem] leading-[1.66]">{capabilitiesClosing}</p>
          <ArrowLink href="/services" className="mt-8">
            {home.capabilities.link}
          </ArrowLink>
        </Reveal>
      </Section>

      {/* Selected work */}
      <Section>
        <Reveal>
          <Eyebrow quiet>{home.work.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="mt-5 max-w-[24ch]">
            {home.work.heading}
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-px bg-rule md:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70} className="flex">
              <CaseCard {...c} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <ArrowLink href="/work" className="mt-10">
            {home.work.link}
          </ArrowLink>
        </Reveal>
      </Section>

      {/* The fit */}
      <Section>
        <FitColumns />
      </Section>

      <Sources cites={PAGE_CITES} />
      <CtaBand {...ctaDefault} />
    </CiteScope>
  );
}
