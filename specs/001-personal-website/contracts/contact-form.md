# Contract: Contact Form

**Feature**: `001-personal-website`
**Date**: 2026-04-19
**Provider**: Formspree (external service)
**Consumer**: `src/hooks/useContactForm.ts` → `src/components/sections/Contact.tsx`

---

## Endpoint

```
POST https://formspree.io/f/{VITE_FORMSPREE_ENDPOINT}
```

`VITE_FORMSPREE_ENDPOINT` is the form ID from the Formspree dashboard (e.g. `"xabcd1234"`). Set in `.env.local` for local development and as an Environment Variable in the Vercel dashboard for production.

---

## Request

**Headers**:
```
Content-Type: application/json
Accept: application/json
```

**Body** (JSON):
```json
{
  "name": "<string, required>",
  "email": "<valid email address, required>",
  "message": "<string, required>"
}
```

All three fields are required. Values are trimmed of leading/trailing whitespace before submission. The hook MUST NOT submit if any field fails client-side validation.

---

## Response

**Success** (HTTP 200):
```json
{ "ok": true }
```

**Client behaviour on success**:
- Set `ContactFormStatus` → `'success'`
- Display a success confirmation banner/message
- Clear all form field values

**Error** (HTTP 4xx / 5xx, or network failure):
```json
{ "ok": false, "error": "<reason string>" }
```

**Client behaviour on error**:
- Set `ContactFormStatus` → `'error'`
- Set `errorMessage` from `error` field (or a generic fallback if absent)
- Preserve all field values so the user can retry without re-typing
- Display an inline error message with a suggestion to try again or email directly

---

## Timeout Handling

If no response is received within **10 seconds**, treat as network error:
- Abort the fetch request
- Set status → `'error'` with message: "Request timed out. Please try again."

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FORMSPREE_ENDPOINT` | Formspree form ID (from dashboard) | `xabcd1234` |

Accessed in code as `import.meta.env.VITE_FORMSPREE_ENDPOINT`.

The variable MUST be prefixed with `VITE_` to be exposed to the browser build by Vite.

---

## Client-Side Validation (pre-submission)

| Field | Validation | Error message |
|-------|------------|---------------|
| `name` | Required, non-empty | "Name is required." |
| `email` | Required, valid email | "A valid email address is required." |
| `message` | Required, non-empty | "Message is required." |

Validation runs on form submit. Errors display inline below the corresponding field. The form is NOT submitted to Formspree if any field is invalid.

---

## Spam Protection

Formspree provides server-side spam filtering automatically. No additional honeypot or CAPTCHA is required for the initial implementation.
