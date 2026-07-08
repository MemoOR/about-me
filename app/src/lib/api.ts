export interface ContactPayload {
  userName: string;
  userEmail: string;
  userMessage: string;
  token: string;
  lang: 'en' | 'es';
}

export interface ContactResult {
  text: string;
  type: 'success' | 'error';
}

/**
 * Posts the contact form to the serverless contact handler.
 *
 * The endpoint is same-origin (`/api/*`) when served through CloudFront, so no
 * CORS is needed. `VITE_API_BASE` can override it for local development.
 *
 * CloudFront reaches the Lambda Function URL as an OAC-signed (SigV4) origin.
 * For requests with a body it cannot hash the payload itself, so the browser
 * MUST send `x-amz-content-sha256` = the hex SHA-256 of the exact body.
 * Without it the origin returns 403 (masked by CloudFront as the site HTML).
 */
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  const base = import.meta.env.VITE_API_BASE ?? '';
  const body = JSON.stringify(payload);
  const response = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-amz-content-sha256': await sha256Hex(body),
    },
    body,
  });
  return (await response.json()) as ContactResult;
}
