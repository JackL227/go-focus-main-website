import { site } from '@/lib/content';
import { Heading } from './Primitives';
import { Reveal } from './Reveal';

/**
 * The only dark section on any page, and always the closing one. One
 * inversion reads as emphasis; several read as a template.
 */
export function CtaBand({
  heading,
  body,
  button,
}: {
  heading: string;
  body: string;
  button: string;
}) {
  return (
    <section className="bg-dark section-pad">
      <div className="shell">
        <Reveal>
          <Heading as="h2" size="lg" onDark className="max-w-[18ch]">
            {heading}
          </Heading>
        </Reveal>

        <Reveal delay={70}>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-[var(--dark-body)]">
            {body}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-[3px] bg-white px-6 text-[0.94rem] font-medium text-ink transition-colors hover:bg-[#e8eaed]"
            >
              {button}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
