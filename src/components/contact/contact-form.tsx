"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonClass } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form-field";
import type { Dictionary } from "@/i18n/get-dictionary";
import { whatsappUrl } from "@/lib/utils";

interface ContactFormProps {
  copy: Dictionary["contact"]["form"];
}

export function ContactForm({ copy }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(copy.topics[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = {
      name: name.trim().length < 2 ? copy.errors.name : undefined,
      message: message.trim().length < 3 ? copy.errors.message : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.message) return;

    const lines = [copy.greeting, `${copy.name}: ${name.trim()}`];
    if (phone.trim()) lines.push(`${copy.phone}: ${phone.trim()}`);
    lines.push(`${copy.topic}: ${topic}`, "", message.trim());

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label={copy.name} error={errors.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="contact-phone" label={copy.phone}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={`${inputClass} rtl:text-right`}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-fog">{copy.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {copy.topics.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-fog transition-colors has-checked:border-glow-400 has-checked:bg-glow-400 has-checked:text-ink-950 has-focus-visible:ring-2 has-focus-visible:ring-glow-400 hover:border-white/25"
            >
              <input
                type="radio"
                name="topic"
                value={option}
                checked={topic === option}
                onChange={() => setTopic(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="contact-message" label={copy.message} error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={buttonClass("primary", "lg")}>
          <WhatsAppIcon className="size-5" />
          {copy.submit}
        </button>
        {sent && (
          <p role="status" className="inline-flex items-center gap-2 text-sm text-glow-200">
            <CircleCheck aria-hidden className="size-4" />
            {copy.sent}
          </p>
        )}
      </div>
    </form>
  );
}
