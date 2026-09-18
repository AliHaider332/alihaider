/* eslint-disable react-hooks/set-state-in-effect */
// components/Contact/Contact.tsx
"use client";

import { useEffect, useActionState, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { sendContactEmail, type ContactFormState } from "@/app/actions/contact";
import Toast, { type ToastData } from "@/components/ui/Toast";

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

/* ------------------------------------------------------------------ */
/*  Field component                                                    */
/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-roboto-slab mb-2 block text-sm font-medium text-(--color-text-primary)"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          className="font-roboto-slab mt-1.5 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Contact = () => {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );
  const [toast, setToast] = useState<ToastData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Show a toast when the action returns — success or failure.
  useEffect(() => {
    if (!state.message) return;

    setToast({
      id: Date.now(),
      kind: state.ok ? "success" : "error",
      message: state.message,
    });

    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <section id="contact">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto flex w-full max-w-3xl flex-col gap-12 overflow-x-clip
                 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        {/* ---------- Header ---------- */}
        <motion.header variants={fadeUp} className="max-w-2xl">
          <span className="font-roboto-slab block text-[11px] font-medium uppercase tracking-[0.22em] text-(--color-text-muted)">
            Contact
          </span>
          <h1 className="font-caprasimo mt-2 bg-gradient-to-r from-(--color-text-primary) to-(--color-primary) bg-clip-text text-4xl font-bold leading-[1.05] text-transparent dark:from-white dark:to-(--color-primary-light) sm:text-5xl">
            Let&apos;s build something.
          </h1>
          <p className="font-roboto-slab mt-4 max-w-2xl text-base leading-relaxed text-(--color-text-secondary)">
            Got a project, a question, or a role in mind? Send a note — I read
            every message and usually reply within a day.
          </p>
        </motion.header>

        {/* ---------- Form ---------- */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-(--color-border)
                   bg-(--color-background-secondary) p-6 sm:p-8 md:p-10"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[3px] bg-orange-500 opacity-80"
          />

          <form
            ref={formRef}
            action={formAction}
            className="space-y-5"
            noValidate
          >
            <Field label="Your name" name="name" error={state.errors?.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                defaultValue={state.values?.name}
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={state.errors?.name ? "name-error" : undefined}
                placeholder="Ali Haider"
                className="font-roboto-slab w-full rounded-xl border border-(--color-border)
                         bg-(--color-background) px-4 py-3 text-sm text-(--color-text-primary)
                         placeholder:text-(--color-text-muted)
                         focus:border-orange-400/50 focus:outline-none
                         focus:ring-2 focus:ring-orange-500/30
                         transition-all duration-200 sm:text-base"
              />
            </Field>

            <Field
              label="Email address"
              name="email"
              error={state.errors?.email}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={state.values?.email}
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={
                  state.errors?.email ? "email-error" : undefined
                }
                placeholder="you@example.com"
                className="font-roboto-slab w-full rounded-xl border border-(--color-border)
                         bg-(--color-background) px-4 py-3 text-sm text-(--color-text-primary)
                         placeholder:text-(--color-text-muted)
                         focus:border-orange-400/50 focus:outline-none
                         focus:ring-2 focus:ring-orange-500/30
                         transition-all duration-200 sm:text-base"
              />
            </Field>

            <Field
              label="Your message"
              name="message"
              error={state.errors?.message}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                defaultValue={state.values?.message}
                aria-invalid={Boolean(state.errors?.message)}
                aria-describedby={
                  state.errors?.message ? "message-error" : undefined
                }
                placeholder="Tell me about your project, role, or question…"
                className="font-roboto-slab w-full resize-y rounded-xl border border-(--color-border)
                         bg-(--color-background) px-4 py-3 text-sm leading-relaxed
                         text-(--color-text-primary) placeholder:text-(--color-text-muted)
                         focus:border-orange-400/50 focus:outline-none
                         focus:ring-2 focus:ring-orange-500/30
                         transition-all duration-200 sm:text-base min-h-[160px]"
              />
            </Field>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={isPending ? undefined : { y: -2 }}
                whileTap={isPending ? undefined : { scale: 0.98 }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl
                         bg-gradient-to-r from-(--color-primary) to-(--color-primary-dark)
                         px-6 py-3.5 font-roboto-slab text-sm font-semibold text-white
                         shadow-lg shadow-orange-500/20 transition-all duration-300
                         hover:shadow-xl hover:shadow-orange-500/25
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-orange-500/60
                         disabled:cursor-not-allowed disabled:opacity-60
                         sm:text-base"
              >
                {isPending ? (
                  <>
                    <span
                      aria-hidden
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <FiSend
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <Toast toast={toast} onClose={() => setToast(null)} />
      </motion.div>
    </section>
  );
};

export default Contact;
