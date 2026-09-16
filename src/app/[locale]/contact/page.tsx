import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { socialIcons, WhatsAppIcon } from "@/components/ui/brand-icons";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";
import { href, revealDelay, whatsappUrl } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, page: "contact", path: "/contact", title: meta.contact.title, description: meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { contact, nav } = dict;

  const methods = [
    {
      icon: Phone,
      title: contact.methods.call.title,
      value: <span dir="ltr">{site.contact.phoneDisplay}</span>,
      action: contact.methods.call.action,
      href: `tel:${site.contact.phone}`,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      title: contact.methods.whatsapp.title,
      value: contact.methods.whatsapp.value,
      action: contact.methods.whatsapp.action,
      href: whatsappUrl(),
      external: true,
    },
    {
      icon: Mail,
      title: contact.methods.email.title,
      value: (
        <span dir="ltr" className="[overflow-wrap:anywhere]">
          {site.contact.email}
        </span>
      ),
      action: contact.methods.email.action,
      href: `mailto:${site.contact.email}`,
      external: false,
    },
    {
      icon: MapPin,
      title: contact.methods.visit.title,
      value: contact.methods.visit.value,
      action: contact.methods.visit.action,
      href: href(locale, "/locations"),
      external: false,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs, locale))} />
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: nav.home, href: href(locale) },
          { label: nav.contact, href: href(locale, "/contact") },
        ]}
      />

      <section className="relative bg-ink-950 py-16 sm:py-24">
        <div className="container-x">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((method, index) => {
              const cardClass =
                "group flex h-full flex-col rounded-[26px] border border-white/[.08] bg-ink-900 p-6 transition-[border-color,background-color] duration-300 hover:border-glow-400/40 hover:bg-ink-800";
              const content = (
                <>
                  <span className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-glow-400/10 text-glow-400 transition-colors group-hover:bg-glow-400 group-hover:text-ink-950">
                      <method.icon aria-hidden className="size-5" />
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-smoke transition-[color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-400 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                  <span className="mt-8 text-sm text-smoke">{method.title}</span>
                  <span className="mt-1 font-display text-lg font-bold text-paper">{method.value}</span>
                  <span className="mt-auto pt-6 text-sm font-semibold text-glow-300">{method.action}</span>
                </>
              );
              return (
                <li key={method.title} data-reveal style={revealDelay(index * 70)}>
                  {method.href.startsWith("/") ? (
                    // Internal page: next/link adds the GitHub Pages base path.
                    <Link href={method.href} className={cardClass}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className={cardClass}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
            <div data-reveal className="rounded-[30px] border border-white/[.08] bg-ink-900 p-6 sm:p-10">
              <Eyebrow>{contact.form.eyebrow}</Eyebrow>
              <h2 className="mt-4 mb-8 font-display text-3xl font-extrabold text-paper sm:text-4xl">{contact.form.title}</h2>
              <ContactForm copy={contact.form} />
            </div>

            <div className="grid content-start gap-5">
              <div data-reveal className="rounded-[30px] border border-white/[.08] bg-ink-900 p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-glow-400 text-ink-950">
                  <Clock aria-hidden className="size-5" />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold text-paper">{contact.hoursTitle}</h2>
                <p className="mt-2 text-fog">{site.hours[locale]}</p>
              </div>
              <div data-reveal className="rounded-[30px] border border-white/[.08] bg-ink-900 p-7">
                <h2 className="font-display text-xl font-bold text-paper">{contact.socialTitle}</h2>
                <ul className="mt-5 grid gap-2">
                  {site.social.map((social) => {
                    const Icon = socialIcons[social.id];
                    return (
                      <li key={social.id}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-2xl border border-white/[.07] px-4 py-3 text-fog transition-colors hover:border-glow-400/40 hover:text-paper"
                        >
                          <Icon className="size-5 text-glow-400" />
                          {social.label}
                          <ArrowUpRight aria-hidden className="ms-auto size-4 rtl:-scale-x-100" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[.05] bg-ink-900 py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title} description={dict.faq.description} />
          </div>
          <FaqList items={faqs} locale={locale} name="contact-faq" />
        </div>
      </section>
    </>
  );
}
