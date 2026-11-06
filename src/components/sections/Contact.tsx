import { CircleAlert, CircleCheck } from 'lucide-react'
import { useContactForm } from '../../hooks/useContactForm'

const LABEL_CLASS = 'text-sm font-medium text-ds-text'
const ERROR_CLASS = 'text-xs text-ds-danger-text'
const FIELD_CLASS =
  'ds-field w-full rounded-md border bg-ds-surface px-4 text-sm text-ds-text placeholder:text-ds-text-muted transition-colors duration-(--ds-duration-fast) disabled:opacity-50'

function fieldBorder(hasError: boolean): string {
  return hasError ? 'border-ds-danger' : 'border-ds-border-control'
}

export default function Contact() {
  const { state, fieldErrors, handleChange, handleSubmit } = useContactForm()
  const { values, status, errorMessage } = state
  const isSubmitting = status === 'submitting'

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 px-6 bg-ds-bg-subtle"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-4">
          Get in touch
        </h2>
        <p className="text-sm text-ds-text-secondary mb-12">
          Have a question or want to work together? Send me a message and I'll get back to you.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg border border-ds-border bg-ds-surface shadow-ds-sm p-6 text-sm text-ds-text-secondary"
          >
            <p className="flex items-center gap-2 font-medium text-ds-success-text mb-2">
              <CircleCheck size={16} aria-hidden /> Message sent.
            </p>
            <p>Thanks for reaching out. I'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={LABEL_CLASS}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={isSubmitting}
                aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                aria-invalid={!!fieldErrors.name}
                className={`${FIELD_CLASS} h-10 ${fieldBorder(!!fieldErrors.name)}`}
                placeholder="Your name"
              />
              {fieldErrors.name && (
                <p id="contact-name-error" role="alert" className={ERROR_CLASS}>
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={LABEL_CLASS}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isSubmitting}
                aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                aria-invalid={!!fieldErrors.email}
                className={`${FIELD_CLASS} h-10 ${fieldBorder(!!fieldErrors.email)}`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p id="contact-email-error" role="alert" className={ERROR_CLASS}>
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={LABEL_CLASS}>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                disabled={isSubmitting}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                aria-invalid={!!fieldErrors.message}
                className={`${FIELD_CLASS} py-2.5 resize-y ${fieldBorder(!!fieldErrors.message)}`}
                placeholder="What's on your mind?"
              />
              {fieldErrors.message && (
                <p id="contact-message-error" role="alert" className={ERROR_CLASS}>
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-2 rounded-md border border-ds-danger bg-ds-danger-subtle px-4 py-3 text-sm text-ds-danger-text"
              >
                <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{errorMessage ?? 'Something went wrong. Please try again.'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start h-10 rounded-md bg-ds-primary-solid px-6 text-sm font-medium text-ds-text-on-accent transition-colors duration-(--ds-duration-fast) hover:bg-ds-primary-solid-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
