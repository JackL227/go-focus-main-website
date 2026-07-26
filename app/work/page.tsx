import type { Metadata } from 'next';
import { cases, ctaVariants, work, workFootnote } from '@/lib/content';
import { PageHeader } from '@/components/PageHeader';
import { CaseCard } from '@/components/Blocks';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Nine engagements since 2023, across engineering, real estate, hospitality, financial advisory and agencies. The problem we found, the work we did, what happened.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        breadcrumb={work.header.breadcrumb}
        h1={work.header.h1}
        standfirst={work.header.standfirst}
        meta={work.header.meta}
      />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 70} className="flex">
              <CaseCard {...c} headingLevel="h2" />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-[68ch] text-[0.82rem] leading-[1.6] text-[var(--muted)]">
          {workFootnote}
        </p>
      </section>

      <CtaBand {...ctaVariants.work} />
    </>
  );
}
