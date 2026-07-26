import type { Metadata } from 'next';
import { contact, ctaDefault, site } from '@/lib/content';
import { Eyebrow, Heading, Section } from '@/components/Primitives';
import { Accordion } from '@/components/Accordion';
import { LeadForm } from '@/components/LeadForm';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Thirty minutes, no pitch. If we cannot see where value is available in your business, we will tell you on the call.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
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
            <span className="text-ink">{contact.header.breadcrumb}</span>
          </nav>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display-xl mt-7 max-w-[16ch]">{contact.header.h1}</h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-7 prose-col text-[1.15rem] leading-[1.6] text-[var(--body)]">
            {contact.header.standfirst}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-[3px] bg-[var(--blue-text)] px-6 text-[0.94rem] font-medium text-white transition-colors hover:bg-[#093f99]"
          >
            Book a call
          </a>
        </Reveal>

        <hr className="mt-12 border-0 h-px bg-rule md:mt-16" />
      </header>

      {/* Details */}
      <Section rule={false}>
        <dl className="grid gap-10 sm:grid-cols-3">
          <Reveal>
            <dt className="eyebrow eyebrow-quiet">Email</dt>
            <dd className="mt-4 space-y-1.5">
              <a
                href={`mailto:${site.email}`}
                className="block text-[1rem] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                {site.email}
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="block text-[1rem] text-[var(--muted)] underline decoration-rule underline-offset-4 hover:text-ink"
              >
                {site.supportEmail}
              </a>
            </dd>
          </Reveal>

          <Reveal delay={60}>
            <dt className="eyebrow eyebrow-quiet">Phone</dt>
            <dd className="mt-4">
              <a
                href={`tel:${site.phoneHref}`}
                className="text-[1rem] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                {site.phone}
              </a>
            </dd>
          </Reveal>

          <Reveal delay={120}>
            <dt className="eyebrow eyebrow-quiet">Office</dt>
            <dd className="mt-4 text-[1rem] leading-[1.6] text-[var(--body)]">
              {site.address}
              <br />
              {site.city}
            </dd>
          </Reveal>
        </dl>
      </Section>

      {/* Questions */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{contact.faq.eyebrow}</Eyebrow>
              <Heading as="h2" size="lg" className="mt-5 max-w-[16ch]">
                {contact.faq.heading}
              </Heading>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <Accordion items={contact.faq.items} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Fallback form */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>Or send details</Eyebrow>
              <Heading as="h2" size="lg" className="mt-5 max-w-[16ch]">
                Tell us where it hurts.
              </Heading>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <LeadForm source="/contact" />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand {...ctaDefault} />
    </>
  );
}
