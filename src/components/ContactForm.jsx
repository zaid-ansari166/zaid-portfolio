"use client";
import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { IconArrow, IconArrowUpRight, IconCheck } from "@/components/ui/Icons";

// EmailJS keys, exposed to the client bundle by next.config.js `env` (already set on the Vercel project).
const SERVICE_ID = process.env.SERVICE_ID;
const TEMPLATE_ID = process.env.TEMPLATE_ID;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send"; // the public endpoint @emailjs/browser posts to
const TIMEOUT_MS = 15000;
const MIN_MESSAGE = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", message: "", company: "" };
const FIELDS = ["name", "email", "message"];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  const email = values.email.trim();
  if (!email) errors.email = "Please add your email so I can reply.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email address.";
  const message = values.message.trim();
  if (!message) errors.message = "Please write a message.";
  else if (message.length < MIN_MESSAGE) errors.message = `A few more words, please — at least ${MIN_MESSAGE} characters.`;
  return errors;
}

// Browser autofill can drop a real visitor's company into the honeypot; such fields match :autofill.
function isBrowserAutofilled(el) {
  if (!el) return false;
  for (const selector of [":autofill", ":-webkit-autofill"]) {
    try {
      if (el.matches(selector)) return true;
    } catch {
      // selector not supported by this engine
    }
  }
  return false;
}

/**
 * Contact form with honest states. Posts straight to EmailJS's REST API (template params unchanged from the
 * previous site: from_name, from_email, message, to_name, to_email). Without the keys it hands the message to
 * the visitor's email app via mailto: and says so — it never presents an unconfigured flow as a working send.
 */
export default function ContactForm({ note, email, toName = "Zaid Ansari", className = "" }) {
  const uid = useId();
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [state, setState] = useState("idle"); // idle | sending | success | error | mailto
  const [sentName, setSentName] = useState("");

  const sending = state === "sending";
  const mailtoHref = `mailto:${email}`;
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message`, company: `${uid}-company` };

  // The submit button is disabled while sending, so focus has nowhere to sit; park it on the result.
  useEffect(() => {
    if ((state === "success" || state === "error" || state === "mailto") && statusRef.current) statusRef.current.focus();
  }, [state]);

  const control = (name) => (formRef.current ? formRef.current.elements.namedItem(name) : null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (state === "success" || state === "mailto") setState("idle");
    // after a failed submit, a field's error clears as soon as it is fixed
    if (attempted && errors[name]) setErrors((prev) => ({ ...prev, [name]: validate({ ...values, [name]: value })[name] }));
  };

  const onBlur = (e) => {
    if (!attempted) return;
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((name) => nextErrors[name]);
    if (firstInvalid) {
      const el = control(firstInvalid);
      if (el) el.focus();
      return;
    }

    const name = values.name.trim();
    const from = values.email.trim();
    const message = values.message.trim();

    // Honeypot: only bots fill "company". Pretend it worked and send nothing.
    if (values.company.trim() && !isBrowserAutofilled(control("company"))) {
      setSentName(name);
      setValues(EMPTY);
      setErrors({});
      setAttempted(false);
      setState("success");
      return;
    }

    if (!configured) {
      const subject = `Portfolio message from ${name}`;
      const body = `${message}\n\n— ${name}\n${from}`;
      window.location.href = `${mailtoHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }

    setState("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: { from_name: name, from_email: from, message, to_name: toName, to_email: email },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
      setSentName(name);
      setValues(EMPTY);
      setErrors({});
      setAttempted(false);
      setState("success");
    } catch (err) {
      console.error("[contact] send failed", err);
      setState("error"); // values are kept so the visitor can retry or paste them into an email
    } finally {
      window.clearTimeout(timeout);
    }
  };

  let status = null;
  if (state === "success") {
    status = {
      tone: "status--ok",
      body: (
        <>
          <IconCheck size={18} className="mt-[3px] shrink-0 text-accent" />
          <span>
            {`Thanks, ${sentName} — your message is on its way. I usually reply within a day.`}
          </span>
        </>
      ),
    };
  } else if (state === "error") {
    status = {
      tone: "status--error",
      body: (
        <span>
          {"Couldn't send right now. Email me directly at "}
          <a className="link-inline" href={mailtoHref}>
            {email}
          </a>
          .
        </span>
      ),
    };
  } else if (state === "mailto") {
    status = {
      tone: "",
      body: (
        <span>
          {"Your email app should open with the message filled in. If nothing happened, email me at "}
          <a className="link-inline" href={mailtoHref}>
            {email}
          </a>
          .
        </span>
      ),
    };
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`grid gap-6 ${className}`.trim()}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={ids.name}
          name="name"
          label="Name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.name}
          disabled={sending}
        />
        <Field
          id={ids.email}
          name="email"
          label="Email"
          hint="Only used to reply to you."
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.email}
          disabled={sending}
        />
      </div>
      <Field
        as="textarea"
        id={ids.message}
        name="message"
        label="Message"
        hint="What you're working on, and roughly when."
        rows={6}
        maxLength={5000}
        required
        value={values.message}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.message}
        disabled={sending}
      />

      {/* Honeypot: hidden from people and assistive tech; bots that fill every input give themselves away. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={ids.company}>Company (leave this empty)</label>
        <input
          id={ids.company}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={onChange}
        />
      </div>

      <div className="grid gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          magnetic
          loading={sending}
          icon={configured ? <IconArrow /> : <IconArrowUpRight />}
          className="w-full sm:w-auto"
        >
          {configured ? (sending ? "Sending…" : "Send message") : "Open in your email app"}
        </Button>

        {/* Always in the DOM so the live region announces reliably; takes the banner styles only when there is something to say. */}
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className={status ? `status ${status.tone}`.trim() : "sr-only"}
        >
          {status ? status.body : null}
        </div>

        {!configured ? (
          <p className="field__hint">This form sends through your email app until the EmailJS keys are configured.</p>
        ) : null}
        {note ? <p className="field__hint">{note}</p> : null}
      </div>
    </form>
  );
}

/** Labelled control with hint + inline error, wired up with aria-describedby / aria-invalid. */
function Field({ as = "input", id, label, hint, error, className = "", ...control }) {
  const Tag = as;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <Tag
        id={id}
        className={`input disabled:opacity-60 ${className}`.trim()}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        {...control}
      />
      {error ? (
        <p id={errorId} className="field__error">
          {error}
        </p>
      ) : null}
      {hint ? (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
