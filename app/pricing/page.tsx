import type { Metadata } from 'next';
import Link from 'next/link';
import { capabilities, ctaVariants, pricing, site } from '@/lib/content';
import { Eyebrow, Heading, Section } from '@/components/Primitives';
import { PageHeader } from '@/components/PageHeader';
import { ProcessSteps } from '@/components/Blocks';
import { CiteScope } from '@/components/Cite';
import { Sources } from '@/components/Sources';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';

const PAGE_CITES = [1];

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Priced per capability, scoped per business. Public bands for outbound, marketing, systems architecture, agentic systems and talent placement.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <CiteScope cites={PAGE_CITES}>
      <PageHeader
        breadcrumb={pricing.header.breadcrumb}
        h1={pricing.header.h1}
        standfirst={pricing.header.standfirst}
      />

      {/* The table */}
      <Section rule={false}>
        <Reveal className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                {pricing.tableHead.map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={[
                      'pb-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink',
                      i === 2 ? 'text-right' : '',
                    ].join(' ')}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capabilities.map((c) => (
                <tr key={c.slug} className="border-b border-rule align-top">
                  <td className="py-6 pr-6">
                    <Link
                      href={`/services#${c.slug}`}
                      className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {c.title}
                    </Link>
                  </td>
                  <td className="py-6 pr-6 text-[0.92rem] leading-[1.6] text-[var(--muted)]">
                    {c.priceCovers}
                  </td>
                  <td className="whitespace-nowrap py-6 text-right font-mono text-[0.85rem] text-ink">
                    {c.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Full advisory */}
        <Reveal delay={80}>
          <div className="mt-14 border border-ink p-8 md:p-12">
            <Eyebrow>{pricing.advisory.label}</Eyebrow>
            <p className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
              {pricing.advisory.figure}
            </p>
            <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-[1.66]">
              {pricing.advisory.body}
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-12 items-center justify-center rounded-[3px] bg-[var(--blue-text)] px-6 text-[0.94rem] font-medium text-white transition-colors hover:bg-[#093f99]"
            >
              {pricing.advisory.button}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* What every engagement includes */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{pricing.included.eyebrow}</Eyebrow>
              <Heading as="h2" size="lg" className="mt-5 max-w-[16ch]">
                {pricing.included.heading}
              </Heading>
            </Reveal>
          </div>

          <ul className="md:col-span-7 md:col-start-6">
            {pricing.included.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 55}>
                <p className="border-b border-rule py-6 text-[1.02rem] leading-[1.66] text-[var(--body)]">
                  {item}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* How we work */}
      <Section>
        <ProcessSteps />
      </Section>

      <Sources cites={PAGE_CITES} />
      <CtaBand {...ctaVariants.pricing} />
    </CiteScope>
  );
}
