import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookingFromParams } from "@/components/booking/booking-from-params";
import { BookingWizard, type BookingWizardProps } from "@/components/booking/booking-wizard";
import { PageHero } from "@/components/ui/page-hero";
import { branches } from "@/data/branches";
import { addOns, courses } from "@/data/courses";
import { site } from "@/data/site";
import { isLocale } from "@/i18n/config";
import { getDictionary, plural } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/book">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, page: "book", path: "/book", title: meta.book.title, description: meta.book.description });
}

export default async function BookPage({ params }: PageProps<"/[locale]/book">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const wizard: BookingWizardProps = {
    copy: dict.booking,
    popularLabel: dict.common.popular,
    pricesNote: dict.common.pricesNote,
    currency: locale === "ar" ? "ج.م" : "EGP",
    listSeparator: locale === "ar" ? "، " : ", ",
    courses: courses.map((course) => ({
      slug: course.slug,
      name: course.name[locale],
      sessions: course.sessions,
      sessionsLabel: plural(course.sessions, locale, dict.common.sessions),
      price: course.price,
      categoryLabel: dict.courses.categories[course.category],
      popular: Boolean(course.popular),
    })),
    branches: branches.map((branch) => ({
      slug: branch.slug,
      name: branch.name[locale],
      district: branch.district[locale],
    })),
    pickupPrice: addOns.find((addOn) => addOn.id === "pickup")!.price,
    hours: site.hours[locale],
    phone: { href: `tel:${site.contact.phone}`, display: site.contact.phoneDisplay },
  };

  return (
    <>
      <PageHero
        eyebrow={dict.booking.eyebrow}
        title={dict.booking.title}
        description={dict.booking.description}
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: dict.nav.home, href: href(locale) },
          { label: dict.booking.title, href: href(locale, "/book") },
        ]}
      />
      <section className="relative bg-ink-950 py-12 sm:py-16">
        <div className="container-x">
          <Suspense fallback={<BookingWizard {...wizard} />}>
            <BookingFromParams {...wizard} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
