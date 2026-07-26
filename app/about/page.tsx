import type { Metadata } from 'next';
import { about, ctaVariants, site } from '@/lib/content';
import { Eyebrow, Heading, Section } from '@/components/Primitives';
import { PageHeader } from '@/components/PageHeader';
import { FitColumns, Photo, ProcessSteps } from '@/components/Blocks';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'GoFocus AI works with small and medium enterprises to remove the constraint holding back growth. Operating since 2023, based in Montreal.',
  alternates: { canonical: '/about' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: `${site.url}/about`,
  foundingDate: '2023',
  employee: about.firm.people.map((p) => ({
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <PageHeader
        breadcrumb={about.header.breadcrumb}
        h1={about.header.h1}
        standfirst={about.header.standfirst}
      />

      {/* Why it exists */}
      <Section rule={false}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow quiet>{about.why.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <Heading as="h2" size="lg" className="max-w-[22ch]">
                {about.why.heading}
              </Heading>
            </Reveal>

            <div className="mt-8 space-y-6">
              {about.why.paragraphs.map((p, i) => (
                <Reveal key={i} delay={60 + i * 55}>
                  <p className="text-[1.05rem] leading-[1.66]">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <Photo slot="about" ratio="3 / 2" className="mt-12" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The firm */}
      <Section>
        <Reveal>
          <Eyebrow quiet>{about.firm.eyebrow}</Eyebrow>
          <Heading as="h2" size="lg" className="mt-5">
            {about.firm.heading}
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {about.firm.people.map((person, i) => (
            <Reveal key={person.name} delay={i * 70}>
              <div
                className="h-24 w-24 overflow-hidden rounded-full border border-rule"
                style={
                  person.photo
                    ? undefined
                    : {
                        backgroundColor: '#eceef0',
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent 0 8px, rgba(10,12,15,0.055) 8px 16px)',
                      }
                }
              >
                {person.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <h3 className="display-md mt-6">{person.name}</h3>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {person.role}
              </p>
              <p className="mt-5 text-[0.95rem] leading-[1.65] text-[var(--muted)]">{person.bio}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-16 border-t border-rule pt-8 font-mono text-[0.72rem] uppercase leading-[1.7] tracking-[0.14em] text-[var(--muted)]">
            {about.firm.footer}
          </p>
        </Reveal>
      </Section>

      {/* How we work */}
      <Section>
        <ProcessSteps />
      </Section>

      {/* The fit */}
      <Section>
        <FitColumns />
      </Section>

      <CtaBand {...ctaVariants.about} />
    </>
  );
}
