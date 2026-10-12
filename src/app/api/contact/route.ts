import { NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/klaviyo';

// Same rule as Angular's Validators.email
const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const str = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = str(body.email, 254);
  const message = str(body.message, 5000);
  const name = str(body.first_name, 200);
  const company = str(body.company, 200);

  if (!EMAIL_REGEXP.test(email) || !message) {
    return NextResponse.json({ error: 'Email and message are required' }, { status: 422 });
  }

  try {
    await saveContactSubmission({ email, name, company, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Could not save the message' }, { status: 502 });
  }
}
