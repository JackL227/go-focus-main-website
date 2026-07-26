import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

/**
 * The service role key is read here and never leaves the server. It must not
 * be referenced from a client component.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Supabase environment variables are not configured.');
    return NextResponse.json({ error: 'Could not save that.' }, { status: 500 });
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);

  const { error } = await supabase.from('leads').insert({
    name: str(payload.name),
    email,
    company: str(payload.company),
    revenue: str(payload.revenue),
    constraint_: str(payload.constraint),
    source: str(payload.source),
    user_agent: request.headers.get('user-agent'),
  });

  if (error) {
    console.error('Lead insert failed:', error.message);
    return NextResponse.json({ error: 'Could not save that.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
