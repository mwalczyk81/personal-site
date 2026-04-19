import { useContactForm } from '../../hooks/useContactForm'

export default function Contact() {
  const { state, fieldErrors, handleChange, handleSubmit } = useContactForm()
  const { values, status, errorMessage } = state
  const isSubmitting = status === 'submitting'

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 px-6 bg-gray-50 dark:bg-slate-950"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-slate-100 mb-4">
          Get in touch
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-12">
          Have a question or want to work together? Send me a message and I'll get back to you.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-sm text-gray-700 dark:text-slate-300"
          >
            <p className="font-medium text-gray-900 dark:text-slate-100 mb-1">Message sent!</p>
            <p>Thanks for reaching out — I'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-semibold tracking-widest text-gray-400 dark:text-slate-500 uppercase">
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
                className={`rounded border px-4 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-300 dark:placeholder-slate-600 bg-white dark:bg-slate-800 outline-none transition-colors duration-150
                  focus:ring-2 focus:ring-offset-0 focus:ring-gray-900/20 dark:focus:ring-slate-400/20
                  disabled:opacity-50
                  ${fieldErrors.name ? 'border-red-400' : 'border-gray-200 dark:border-slate-700 focus:border-gray-400 dark:focus:border-slate-500'}`}
                placeholder="Your name"
              />
              {fieldErrors.name && (
                <p id="contact-name-error" role="alert" className="text-xs text-red-500">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-semibold tracking-widest text-gray-400 dark:text-slate-500 uppercase">
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
                className={`rounded border px-4 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-300 dark:placeholder-slate-600 bg-white dark:bg-slate-800 outline-none transition-colors duration-150
                  focus:ring-2 focus:ring-offset-0 focus:ring-gray-900/20 dark:focus:ring-slate-400/20
                  disabled:opacity-50
                  ${fieldErrors.email ? 'border-red-400' : 'border-gray-200 dark:border-slate-700 focus:border-gray-400 dark:focus:border-slate-500'}`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p id="contact-email-error" role="alert" className="text-xs text-red-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold tracking-widest text-gray-400 dark:text-slate-500 uppercase">
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
                className={`rounded border px-4 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-300 dark:placeholder-slate-600 bg-white dark:bg-slate-800 outline-none resize-y transition-colors duration-150
                  focus:ring-2 focus:ring-offset-0 focus:ring-gray-900/20 dark:focus:ring-slate-400/20
                  disabled:opacity-50
                  ${fieldErrors.message ? 'border-red-400' : 'border-gray-200 dark:border-slate-700 focus:border-gray-400 dark:focus:border-slate-500'}`}
                placeholder="What's on your mind?"
              />
              {fieldErrors.message && (
                <p id="contact-message-error" role="alert" className="text-xs text-red-500">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div role="alert" aria-live="assertive" className="rounded border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {errorMessage ?? 'Something went wrong. Please try again.'}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start rounded bg-gray-900 dark:bg-slate-100 px-6 py-2.5 text-sm font-medium text-white dark:text-slate-900 transition-colors duration-150
                hover:bg-gray-700 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/30 dark:focus:ring-slate-400/30 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
