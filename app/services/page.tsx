import type { Metadata } from 'next';
import { capabilities, cases, ctaVariants, services, site } from '@/lib/content';
import { ArrowLink, Eyebrow, Heading, Section } from '@/components/Primitives';
import { PageHeader } from '@/components/PageHeader';
import { CiteScope, Cite } from '@/components/Cite';
import { Sources } from '@/components/Sources';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';

const PAGE_CITES = [1, 3, 5, 6, 8, 9];

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five functions, one engagement. Outbound, marketing, systems architecture, agentic systems and talent placement, scoped per business.',
  alternates: { canonical: '/services' },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Organization', name: site.name, url: site.url },
  serviceType: capabilities.map((c) => c.title),
  areaServed: 'Worldwide',
};

export default function ServicesPage() {
  return (
    <CiteScope cites={PAGE_CITES}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <PageHeader
        breadcrumb={services.header.breadcrumb}
        h1={services.header.h1}
        standfirst={services.header.standfirst}
        meta={services.header.meta}
      />

      {/* Enterprise value */}
      <Section rule={false}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{services.enterpriseValue.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          {/* min-w-0: grid items default to min-width:auto, which would let the
              tables inside stretch the page instead of scrolling in place. */}
          <div className="min-w-0 md:col-span-7 md:col-start-6">
            <Reveal>
              <Heading as="h2" size="lg" className="max-w-[22ch]">
                {services.enterpriseValue.heading}
              </Heading>
            </Reveal>

            <Reveal delay={60}>
              <p className="mt-8 text-[1.05rem] leading-[1.66]">
                {services.enterpriseValue.body1}
                <Cite n={services.enterpriseValue.body1Cite} />
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink">
                    {services.enterpriseValue.table.head.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="pb-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.enterpriseValue.table.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-rule">
                      <td className="py-4 pr-6 text-[0.95rem] text-[var(--body)]">{row[0]}</td>
                      <td className="py-4 font-mono text-[0.85rem] text-ink">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal delay={180}>
              <blockquote className="mt-10 border-l-2 border-rule pl-6 text-[1.02rem] leading-[1.66] text-[var(--body)]">
                {services.enterpriseValue.body2}
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Four levers */}
        <Reveal delay={60}>
          <div className="mt-16 bg-paper p-8 md:mt-20 md:p-12">
            <Eyebrow quiet>{services.enterpriseValue.leversLabel}</Eyebrow>
            <dl className="mt-9 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {services.enterpriseValue.levers.map((lever) => (
                <div key={lever.title}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">
                    {lever.title}
                  </dt>
                  <dd className="mt-4">
                    <span className="font-display text-[clamp(1.6rem,2.6vw,2.05rem)] font-semibold tracking-[-0.03em] text-ink">
                      {lever.value}
                    </span>
                    <Cite n={lever.cite} />
                    <p className="mt-2.5 text-[0.88rem] leading-[1.58] text-[var(--muted)]">
                      {lever.body}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      {/* The five capabilities */}
      {capabilities.map((c) => {
        const linked = cases.find((x) => x.slug === c.caseSlug);
        return (
          <Section key={c.slug} id={c.slug}>
            <div className="grid gap-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.72rem] text-[var(--muted)]">{c.n}</span>
                    <Heading as="h2" size="lg">
                      {c.title}
                    </Heading>
                  </div>
                  <p className="mt-5 font-mono text-[0.8rem] text-ink">{c.price}</p>
                </Reveal>
              </div>

              {/* min-w-0: grid items default to min-width:auto, which would let the
              tables inside stretch the page instead of scrolling in place. */}
          <div className="min-w-0 md:col-span-7 md:col-start-6">
                <Reveal>
                  <p className="text-[1.05rem] leading-[1.66]">{c.body}</p>
                </Reveal>

                <Reveal delay={60}>
                  <ul className="mt-8 space-y-3 border-t border-rule pt-8">
                    {c.bullets.map((b) => (
                      <li key={b} className="grid grid-cols-[1.25rem_1fr] gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6rem] h-1 w-1 rounded-full bg-ink"
                        />
                        <span className="text-[0.98rem] leading-[1.62] text-[var(--body)]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Per-capability extras */}
                {c.slug === 'outbound' && (
                  <Reveal delay={120} className="mt-10 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
                    <table className="w-full min-w-[26rem] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-ink">
                          {services.outboundTable.head.map((h) => (
                            <th
                              key={h}
                              scope="col"
                              className="pb-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {services.outboundTable.rows.map((row) => (
                          <tr key={row[0]} className="border-b border-rule align-top">
                            <td className="py-4 pr-6 text-[0.92rem] text-[var(--muted)]">
                              {row[0]}
                            </td>
                            <td className="py-4 text-[0.92rem] text-[var(--body)]">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Reveal>
                )}

                {c.slug === 'marketing' && (
                  <Reveal delay={120}>
                    <p className="mt-9 border-t border-rule pt-8 text-[1.02rem] leading-[1.66] text-ink">
                      {services.extras.marketing.stat}
                      <Cite n={services.extras.marketing.cite} />
                    </p>
                  </Reveal>
                )}

                {c.slug === 'systems' && (
                  <Reveal delay={120}>
                    <p className="mt-9 border-t border-rule pt-8 font-display text-[1.35rem] leading-[1.35] text-ink">
                      {services.extras.systems.callout}
                    </p>
                  </Reveal>
                )}

                {c.slug === 'agentic' && (
                  <Reveal delay={120}>
                    <p className="mt-9 border-t border-rule pt-8 text-[1.02rem] leading-[1.66] text-ink">
                      {services.extras.agentic.stat}
                      <Cite n={services.extras.agentic.cite} />
                    </p>
                  </Reveal>
                )}

                {c.slug === 'talent' && (
                  <Reveal delay={120}>
                    <p className="mt-9 border-t border-rule pt-8 text-[1.02rem] leading-[1.66] text-ink">
                      {services.extras.talent.note}
                      <Cite n={services.extras.talent.cite} />
                    </p>
                  </Reveal>
                )}

                {linked && (
                  <Reveal delay={180}>
                    <ArrowLink href={`/work/${linked.slug}`} className="mt-9">
                      See it in practice
                    </ArrowLink>
                  </Reveal>
                )}
              </div>
            </div>
          </Section>
        );
      })}

      {/* How they connect */}
      <Section>
        <Reveal>
          <div className="bg-paper p-8 md:p-14">
            <p className="max-w-[62ch] text-[1.05rem] leading-[1.7] text-[var(--body)]">
              {services.connect.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Sources cites={PAGE_CITES} />
      <CtaBand {...ctaVariants.services} />
    </CiteScope>
  );
}
