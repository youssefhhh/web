"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Home, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form-field";
import type { Dictionary } from "@/i18n/get-dictionary";
import { isEgyptianMobile, normalizePhone } from "@/lib/phone";
import { cn, format, formatNumber, padNumber, whatsappUrl } from "@/lib/utils";

export interface BookingCourse {
  slug: string;
  name: string;
  sessions: number;
  sessionsLabel: string;
  price: number;
  categoryLabel: string;
  popular: boolean;
}

export interface BookingBranch {
  slug: string;
  name: string;
  district: string;
}

export interface BookingWizardProps {
  copy: Dictionary["booking"];
  popularLabel: string;
  pricesNote: string;
  currency: string;
  /** Joins day names in the WhatsApp message, e.g. ", " or "، ". */
  listSeparator: string;
  courses: BookingCourse[];
  branches: BookingBranch[];
  pickupPrice: number;
  hours: string;
  phone: { href: string; display: string };
  initialCourse?: string | null;
  initialBranch?: string | null;
}

type Transmission = "automatic" | "manual";
type Captain = "any" | "female" | "male";

const PICKUP = "pickup";
const LAST_STEP = 3;

export function BookingWizard({
  copy,
  popularLabel,
  pricesNote,
  currency,
  listSeparator,
  courses,
  branches,
  pickupPrice,
  hours,
  phone: contactPhone,
  initialCourse,
  initialBranch,
}: BookingWizardProps) {
  const validCourse = courses.some((course) => course.slug === initialCourse) ? initialCourse! : null;
  const validBranch =
    initialBranch === PICKUP || branches.some((branch) => branch.slug === initialBranch) ? initialBranch! : null;

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseSlug, setCourseSlug] = useState<string | null>(validCourse);
  const [branchSlug, setBranchSlug] = useState<string | null>(validBranch);
  const [transmission, setTransmission] = useState<Transmission>("automatic");
  const [captain, setCaptain] = useState<Captain>("any");
  const [days, setDays] = useState<number[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [start, setStart] = useState(copy.schedule.starts[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});

  const container = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  const course = courses.find((item) => item.slug === courseSlug) ?? null;
  const pickup = branchSlug === PICKUP;
  const branchName = pickup ? copy.location.pickupOption : branches.find((item) => item.slug === branchSlug)?.name;
  const total = course ? course.price + (pickup ? pickupPrice * course.sessions : 0) : 0;
  const money = (value: number) => `${formatNumber(value)} ${currency}`;

  const transmissionLabel = transmission === "automatic" ? copy.location.automatic : copy.location.manual;
  const captainLabel = {
    any: copy.location.captainAny,
    female: copy.location.captainFemale,
    male: copy.location.captainMale,
  }[captain];
  const timeOption = copy.schedule.times.find((option) => option.id === time);
  const startLabel = copy.schedule.starts.find((option) => option.id === start)?.label;
  const dayList = [...days].sort((a, b) => a - b);

  useEffect(() => {
    if (!interacted.current) return;
    heading.current?.focus({ preventScroll: true });
    const top = container.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) container.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, done]);

  const validateStep = () => {
    if (step === 0 && !courseSlug) return copy.errors.course;
    if (step === 1 && !branchSlug) return copy.errors.branch;
    if (step === 2 && days.length === 0) return copy.errors.days;
    if (step === 2 && !time) return copy.errors.time;
    return null;
  };

  const message = () => {
    const lines = [
      copy.message.greeting,
      `• ${copy.message.course}: ${course?.name} (${course?.sessions} ${course?.sessionsLabel})`,
      `• ${copy.message.price}: ${money(total)}`,
      `• ${copy.message.branch}: ${branchName}`,
      `• ${copy.message.transmission}: ${transmissionLabel}`,
      `• ${copy.message.captain}: ${captainLabel}`,
      `• ${copy.message.days}: ${dayList.map((day) => copy.schedule.dayNames[day]).join(listSeparator)}`,
      `• ${copy.message.time}: ${timeOption?.label} (${timeOption?.range})`,
      `• ${copy.message.start}: ${startLabel}`,
      `• ${copy.message.name}: ${name.trim()}`,
      `• ${copy.message.phone}: ${normalizePhone(phone)}`,
    ];
    if (notes.trim()) lines.push(`• ${copy.message.notes}: ${notes.trim()}`);
    return lines.join("\n");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interacted.current = true;

    if (step < LAST_STEP) {
      const problem = validateStep();
      setError(problem);
      if (!problem) setStep(step + 1);
      return;
    }

    const nextErrors = {
      name: name.trim().length < 2 ? copy.errors.name : undefined,
      phone: isEgyptianMobile(phone) ? undefined : copy.errors.phone,
    };
    setFieldErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    window.open(whatsappUrl(message()), "_blank", "noopener,noreferrer");
    setDone(true);
  };

  const goBack = () => {
    interacted.current = true;
    setError(null);
    setStep((current) => Math.max(0, current - 1));
  };

  const reset = () => {
    interacted.current = true;
    setDone(false);
    setStep(0);
    setDays([]);
    setTime(null);
    setNotes("");
  };

  const toggleDay = (day: number) => {
    setError(null);
    setDays((current) => (current.includes(day) ? current.filter((item) => item !== day) : [...current, day]));
  };

  const stepTitles = [copy.course.title, copy.location.title, copy.schedule.title, copy.details.title];

  return (
    <div ref={container} className="grid scroll-mt-24 gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
      <div className="rounded-[32px] border border-white/[.08] bg-ink-900 p-5 sm:p-8 lg:p-10">
        <ProgressRoad steps={copy.steps} current={step} done={done} />

        {done ? (
          <div className="animate-rise py-8 text-center [animation-duration:.7s]">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-glow-400 text-ink-950 shadow-[0_0_0_10px_rgb(255_178_56/.12),0_0_60px_rgb(255_178_56/.5)]">
              <Check aria-hidden className="size-9" strokeWidth={3} />
            </span>
            <h2 ref={heading} tabIndex={-1} className="mt-8 font-display text-3xl font-extrabold text-paper outline-none sm:text-4xl">
              {copy.success.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-fog">{copy.success.body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={whatsappUrl(message())} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg")}>
                <WhatsAppIcon className="size-5" />
                {copy.success.retry}
              </a>
              <button type="button" onClick={reset} className={buttonClass("secondary", "lg")}>
                {copy.success.another}
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit}>
            <div key={step} className="animate-rise [animation-duration:.6s]">
              <p className="font-brand text-xs font-bold text-glow-400">
                {padNumber(step + 1)} / {padNumber(LAST_STEP + 1)}
              </p>
              <h2 ref={heading} tabIndex={-1} className="mt-2 font-display text-2xl leading-tight font-extrabold text-paper outline-none sm:text-3xl">
                {stepTitles[step]}
              </h2>

              {step === 0 && (
                <fieldset className="mt-7">
                  <legend className="text-sm text-smoke">{copy.course.hint}</legend>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {courses.map((item) => (
                      <OptionCard
                        key={item.slug}
                        name="course"
                        value={item.slug}
                        checked={courseSlug === item.slug}
                        onChange={() => {
                          setCourseSlug(item.slug);
                          setError(null);
                        }}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-display font-bold text-paper">{item.name}</span>
                          {item.popular && (
                            <span className="shrink-0 rounded-full bg-glow-400 px-2 py-0.5 text-[0.65rem] font-bold text-ink-950">
                              {popularLabel}
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-smoke">
                          <span>
                            {item.sessions} {item.sessionsLabel}
                          </span>
                          <span aria-hidden>·</span>
                          <span className="font-semibold text-fog">{money(item.price)}</span>
                        </span>
                      </OptionCard>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <div className="mt-7 grid gap-8">
                  <fieldset>
                    <legend className="text-sm font-medium text-fog">{copy.location.branch}</legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {branches.map((branch) => (
                        <OptionCard
                          key={branch.slug}
                          name="branch"
                          value={branch.slug}
                          checked={branchSlug === branch.slug}
                          onChange={() => {
                            setBranchSlug(branch.slug);
                            setError(null);
                          }}
                        >
                          <span className="font-display font-bold text-paper">{branch.name}</span>
                          <span className="mt-1 text-sm text-smoke">{branch.district}</span>
                        </OptionCard>
                      ))}
                      <OptionCard
                        name="branch"
                        value={PICKUP}
                        checked={pickup}
                        dashed
                        className="sm:col-span-2"
                        onChange={() => {
                          setBranchSlug(PICKUP);
                          setError(null);
                        }}
                      >
                        <span className="flex items-center gap-2 font-display font-bold text-paper">
                          <Home aria-hidden className="size-4 text-glow-400" />
                          {copy.location.pickupOption}
                        </span>
                        <span className="mt-1 text-sm text-smoke">
                          {format(copy.location.pickupHint, { price: money(pickupPrice) })}
                        </span>
                      </OptionCard>
                    </div>
                  </fieldset>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Segmented
                      legend={copy.location.transmission}
                      name="transmission"
                      value={transmission}
                      onChange={(value) => setTransmission(value as Transmission)}
                      options={[
                        { value: "automatic", label: copy.location.automatic },
                        { value: "manual", label: copy.location.manual },
                      ]}
                    />
                    <Segmented
                      legend={copy.location.captain}
                      name="captain"
                      value={captain}
                      onChange={(value) => setCaptain(value as Captain)}
                      options={[
                        { value: "any", label: copy.location.captainAny },
                        { value: "female", label: copy.location.captainFemale },
                        { value: "male", label: copy.location.captainMale },
                      ]}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-7 grid gap-8">
                  <fieldset>
                    <legend className="text-sm font-medium text-fog">{copy.schedule.days}</legend>
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {copy.schedule.dayShort.map((day, index) => {
                        const checked = days.includes(index);
                        return (
                          <label
                            key={day}
                            className={cn(
                              "grid h-14 cursor-pointer place-items-center rounded-2xl border text-sm font-semibold transition-colors has-focus-visible:ring-2 has-focus-visible:ring-glow-400",
                              checked
                                ? "border-glow-400 bg-glow-400 text-ink-950"
                                : "border-white/10 text-fog hover:border-white/25 hover:text-paper",
                            )}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleDay(index)}
                              aria-label={copy.schedule.dayNames[index]}
                            />
                            {day}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium text-fog">{copy.schedule.time}</legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {copy.schedule.times.map((option) => (
                        <OptionCard
                          key={option.id}
                          name="time"
                          value={option.id}
                          checked={time === option.id}
                          onChange={() => {
                            setTime(option.id);
                            setError(null);
                          }}
                        >
                          <span className="font-display font-bold text-paper">{option.label}</span>
                          <span dir="ltr" className="mt-1 text-sm text-smoke rtl:text-right">
                            {option.range}
                          </span>
                        </OptionCard>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium text-fog">{copy.schedule.start}</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {copy.schedule.starts.map((option) => (
                        <label
                          key={option.id}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors has-focus-visible:ring-2 has-focus-visible:ring-glow-400",
                            start === option.id
                              ? "border-glow-400 bg-glow-400 text-ink-950"
                              : "border-white/10 text-fog hover:border-white/25 hover:text-paper",
                          )}
                        >
                          <input
                            type="radio"
                            name="start"
                            value={option.id}
                            checked={start === option.id}
                            onChange={() => setStart(option.id)}
                            className="sr-only"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="mt-7 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="booking-name" label={copy.details.name} error={fieldErrors.name}>
                      <input
                        id="booking-name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={copy.details.namePlaceholder}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "booking-name-error" : undefined}
                        className={inputClass}
                      />
                    </Field>
                    <Field id="booking-phone" label={copy.details.phone} hint={copy.details.phoneHint} error={fieldErrors.phone}>
                      <input
                        id="booking-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder={copy.details.phonePlaceholder}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={fieldErrors.phone ? "booking-phone-error" : "booking-phone-hint"}
                        className={`${inputClass} rtl:text-right`}
                      />
                    </Field>
                  </div>
                  <Field id="booking-notes" label={copy.details.notes}>
                    <textarea
                      id="booking-notes"
                      rows={4}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder={copy.details.notesPlaceholder}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>
              )}

              {error && (
                <p role="alert" className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/[.07] pt-6">
              {step > 0 ? (
                <button type="button" onClick={goBack} className={buttonClass("secondary", "md")}>
                  <ArrowRight aria-hidden className="size-4 -scale-x-100 rtl:scale-x-100" />
                  {copy.actions.back}
                </button>
              ) : (
                <span />
              )}
              {step < LAST_STEP ? (
                <button type="submit" className={buttonClass("primary", "md")}>
                  {copy.actions.next}
                  <ButtonArrow />
                </button>
              ) : (
                <button type="submit" className={buttonClass("primary", "md")}>
                  <WhatsAppIcon className="size-5" />
                  {copy.actions.submit}
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <aside className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[28px] border border-white/[.08] bg-ink-900 p-6">
          <h2 className="eyebrow text-glow-300">{copy.summary.title}</h2>
          <dl className="mt-4 divide-y divide-white/[.06] text-sm">
            <SummaryRow label={copy.summary.course} value={course?.name} />
            <SummaryRow label={copy.summary.branch} value={branchName} />
            <SummaryRow label={copy.summary.transmission} value={step > 0 || done ? transmissionLabel : undefined} />
            <SummaryRow label={copy.summary.captain} value={step > 0 || done ? captainLabel : undefined} />
            <SummaryRow
              label={copy.summary.days}
              value={dayList.length ? dayList.map((day) => copy.schedule.dayShort[day]).join(" · ") : undefined}
            />
            <SummaryRow label={copy.summary.time} value={timeOption?.label} />
            <SummaryRow label={copy.summary.start} value={step > 1 || done ? startLabel : undefined} />
          </dl>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-white/[.08] pt-5">
            <span className="text-sm text-fog">{copy.summary.total}</span>
            <span className="font-brand text-3xl leading-none font-extrabold text-paper">
              {course ? formatNumber(total) : "—"}
              {course && <span className="ms-1.5 font-sans text-xs font-medium text-smoke">{currency}</span>}
            </span>
          </div>
          {course && pickup && (
            <p className="mt-2 text-xs text-smoke">
              {formatNumber(course.price)} + {formatNumber(pickupPrice)} × {course.sessions}
            </p>
          )}
          <p className="mt-4 text-xs text-smoke">{pricesNote}</p>
        </div>

        <div className="rounded-[28px] border border-white/[.08] bg-linear-to-br from-glow-400/[.08] to-transparent p-6">
          <h2 className="font-display text-lg font-bold text-paper">{copy.help.title}</h2>
          <p className="mt-1 text-sm text-fog">{format(copy.help.body, { hours })}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a href={contactPhone.href} className={buttonClass("secondary", "sm", "w-full")}>
              <Phone aria-hidden className="size-4 text-glow-400" />
              {copy.help.call}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "sm", "w-full")}>
              <WhatsAppIcon className="size-4 text-glow-400" />
              {copy.help.whatsapp}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProgressRoad({ steps, current, done }: { steps: string[]; current: number; done: boolean }) {
  const progress = done ? 1 : current / (steps.length - 1);

  return (
    <div className="relative mb-10 border-b border-white/[.07] pb-8">
      <div aria-hidden className="absolute inset-x-[12.5%] top-[17px] h-1.5 overflow-hidden rounded-full bg-ink-950">
        <span className="absolute inset-0 text-white/10 lane-dashes" />
        <span
          className="absolute inset-y-0 start-0 rounded-full bg-glow-400 shadow-[0_0_14px_rgb(255_178_56/.8)] transition-[width] duration-700 ease-[var(--ease-out-expo)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <ol className="relative grid grid-cols-4">
        {steps.map((label, index) => {
          const state = done || index < current ? "complete" : index === current ? "current" : "upcoming";
          return (
            <li key={label} className="relative flex flex-col items-center gap-2.5" aria-current={state === "current" ? "step" : undefined}>
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-full border-2 font-brand text-xs font-bold transition-[background-color,border-color,color,box-shadow] duration-500",
                  state === "complete" && "border-glow-400 bg-glow-400 text-ink-950",
                  state === "current" && "border-glow-400 bg-ink-950 text-glow-300 shadow-[0_0_0_6px_rgb(255_178_56/.14)]",
                  state === "upcoming" && "border-white/10 bg-ink-900 text-smoke",
                )}
              >
                {state === "complete" ? <Check aria-hidden className="size-4" strokeWidth={3} /> : padNumber(index + 1)}
              </span>
              <span className={cn("text-xs font-medium sm:text-sm", state === "upcoming" ? "text-smoke" : "text-paper")}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

interface OptionCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  dashed?: boolean;
  className?: string;
}

function OptionCard({ name, value, checked, onChange, children, dashed, className }: OptionCardProps) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer flex-col rounded-2xl border p-4 pe-12 transition-[border-color,background-color] duration-300 has-focus-visible:ring-2 has-focus-visible:ring-glow-400",
        dashed && "border-dashed",
        checked ? "border-glow-400 bg-glow-400/[.08]" : "border-white/10 hover:border-white/25 hover:bg-white/[.02]",
        className,
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute top-4 end-4 grid size-5 place-items-center rounded-full border-2 transition-colors",
          checked ? "border-glow-400 bg-glow-400 text-ink-950" : "border-white/20",
        )}
      >
        {checked && <Check className="size-3" strokeWidth={4} />}
      </span>
    </label>
  );
}

interface SegmentedProps {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function Segmented({ legend, name, value, onChange, options }: SegmentedProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-fog">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-ink-950/40 p-1.5">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex-1 cursor-pointer rounded-xl px-3 py-2.5 text-center text-sm font-semibold whitespace-nowrap transition-colors has-focus-visible:ring-2 has-focus-visible:ring-glow-400",
              value === option.value ? "bg-glow-400 text-ink-950" : "text-fog hover:text-paper",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-smoke">{label}</dt>
      <dd className={cn("text-end font-medium", value ? "text-paper" : "text-ink-400")}>{value ?? "—"}</dd>
    </div>
  );
}
