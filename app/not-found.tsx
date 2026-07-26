import { Button } from '@/components/Primitives';

export default function NotFound() {
  return (
    <section className="shell pt-24 pb-28 md:pt-32 md:pb-36">
      <p className="eyebrow eyebrow-quiet">404</p>
      <h1 className="display-xl mt-7 max-w-[14ch]">That page does not exist.</h1>
      <p className="mt-7 prose-col text-[1.15rem] leading-[1.6] text-[var(--body)]">
        The link may be out of date. The work, the services and the pricing are all still here.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="solid">
          Back to home
        </Button>
        <Button href="/work" variant="ghost">
          See the work
        </Button>
      </div>
    </section>
  );
}
