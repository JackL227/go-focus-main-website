'use client';

import { useState } from 'react';
import { contact } from '@/lib/content';

export function LeadForm({ source }: { source: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <p className="border border-rule bg-paper p-7 text-[1.05rem] leading-[1.6] text-ink">
        {contact.form.success}
      </p>
    );
  }

  const field =
    'w-full border border-rule bg-ground px-3.5 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-[var(--blue-text)]';
  const label = 'eyebrow eyebrow-quiet block mb-2';

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="lf-name" className={label}>
          Name
        </label>
        <input id="lf-name" name="name" type="text" autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="lf-email" className={label}>
          Email
        </label>
        <input
          id="lf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="lf-company" className={label}>
          Company
        </label>
        <input
          id="lf-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="lf-revenue" className={label}>
          Approximate revenue
        </label>
        <select id="lf-revenue" name="revenue" className={field} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {contact.form.revenueOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="lf-constraint" className={label}>
          What is currently constraining you
        </label>
        <textarea id="lf-constraint" name="constraint" rows={4} className={field} />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex h-12 items-center justify-center rounded-[3px] bg-[var(--blue-text)] px-6 text-[0.94rem] font-medium text-white transition-colors hover:bg-[#093f99] disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending' : 'Send'}
        </button>

        {state === 'error' && (
          <p role="alert" className="text-[0.9rem] text-ink">
            {contact.form.error}
          </p>
        )}
      </div>
    </form>
  );
}
