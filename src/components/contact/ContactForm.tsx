"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length > 120) {
    errors.name = "Please keep your name under 120 characters.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (
    values.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!services.some((service) => service.title === values.service)) {
    errors.service = "Please select a service.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a bit about your requirement.";
  } else if (values.message.trim().length > 5000) {
    errors.message = "Please keep your message under 5000 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const handleChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
    setSubmissionError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setStatus("idle");
    setSubmissionError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const result: { error?: string } = await response.json();
        setSubmissionError(
          result.error ?? "Your enquiry could not be sent. Please try again.",
        );
        setStatus("error");
        return;
      }

      setValues(initialState);
      setErrors({});
      setStatus("success");
    } catch {
      setSubmissionError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
            autoComplete="name"
            maxLength={120}
            required
          />
        </Field>

        <Field label="Phone Number" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="+91 00000 00000"
            autoComplete="tel"
            maxLength={15}
            required
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          required
        />
      </Field>

      <Field label="Service Required" error={errors.service}>
        <select
          value={values.service}
          onChange={(e) => handleChange("service", e.target.value)}
          className={inputClass(!!errors.service)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClass(!!errors.message)} min-h-32 resize-y`}
          placeholder="Tell us about your security requirement"
          maxLength={5000}
          required
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-taupe-dark"
      >
        {isSubmitting ? "Sending..." : "Submit Enquiry"}
        <span aria-hidden>→</span>
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-taupe-dark">
          {submissionError}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="text-sm text-green-800">
          Thank you. Your enquiry has been sent successfully.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <span className="mt-1.5 block text-xs text-red-700">{error}</span>
      )}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-grey/60 focus:border-taupe ${
    hasError ? "border-red-400" : "border-border"
  }`;
}
