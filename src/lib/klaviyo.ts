/**
 * Minimal Klaviyo REST client (server only).
 * Docs: https://developers.klaviyo.com/en/reference/api_overview
 */
import 'server-only';

const BASE_URL = 'https://a.klaviyo.com/api';

function config() {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  const revision = process.env.KLAVIYO_API_REVISION || '2025-10-15';

  if (!apiKey || !listId) {
    throw new Error('KLAVIYO_PRIVATE_API_KEY and KLAVIYO_LIST_ID must be set');
  }

  return { apiKey, listId, revision };
}

async function request(path: string, body: unknown): Promise<any> {
  const { apiKey, revision } = config();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision,
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Klaviyo ${path} failed with ${response.status}: ${text.slice(0, 500)}`);
  }

  return response.status === 204 || response.status === 202 ? null : response.json();
}

export type ContactSubmission = {
  email: string;
  name?: string;
  company?: string;
  message: string;
};

/**
 * 1. creates / updates the profile (name, company, last message)
 * 2. subscribes the profile to email marketing on the contact list (consent given with the GDPR checkbox)
 * 3. tracks a "Contact Form Submitted" event, so a Klaviyo flow can notify the team / reply
 */
export async function saveContactSubmission({ email, name, company, message }: ContactSubmission): Promise<void> {
  const { listId } = config();

  const profile = await request('/profile-import', {
    data: {
      type: 'profile',
      attributes: {
        email,
        ...(name ? { first_name: name } : {}),
        ...(company ? { organization: company } : {}),
        properties: {
          contact_form_message: message,
          contact_form_source: 'datavallis.com',
        },
      },
    },
  });

  const profileId: string = profile.data.id;

  // the form can only be sent after agreeing to the privacy policy (GDPR checkbox) -> subscribe to email marketing
  await request('/profile-subscription-bulk-create-jobs', {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        custom_source: 'datavallis.com contact form',
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email,
                subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
              },
            },
          ],
        },
      },
      relationships: {
        list: { data: { type: 'list', id: listId } },
      },
    },
  });

  await request('/events', {
    data: {
      type: 'event',
      attributes: {
        properties: { name: name || '', company: company || '', message, source: 'datavallis.com' },
        metric: { data: { type: 'metric', attributes: { name: 'Contact Form Submitted' } } },
        profile: { data: { type: 'profile', id: profileId } },
      },
    },
  });
}
