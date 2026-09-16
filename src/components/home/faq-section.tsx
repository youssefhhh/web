import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFaq } from "@/data/faqs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/utils";

const homeFaqs = ["beginner", "price", "how-many", "female-captain", "license", "areas"];

export function FaqSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = homeFaqs.map(getFaq);

  return (
    <section className="relative border-t border-white/[.05] bg-ink-900 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title} description={dict.faq.description} />
          <div data-reveal className="mt-8">
            <ButtonLink href={href(locale, "/contact")} variant="secondary" arrow>
              {dict.faq.more}
            </ButtonLink>
          </div>
        </div>
        <FaqList items={items} locale={locale} />
      </div>
    </section>
  );
}
