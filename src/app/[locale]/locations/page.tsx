import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, MapPin, Navigation } from "lucide-react";
import { FinalCta } from "@/components/home/final-cta";
import { getExplorerProps } from "@/components/locations/explorer-props";
import { LocationsExplorer } from "@/components/locations/locations-explorer";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonAnchor, ButtonArrow, buttonClass } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { addOns } from "@/data/courses";
import { branches, pickupAreas } from "@/data/branches";
import { site } from "@/data/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fillMeta, pageMetadata } from "@/lib/seo";
import { format, formatPrice, href, mapsUrl, revealDelay, whatsappUrl } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/locations">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({
    locale,
    page: "locations",
    path: "/locations",
    title: meta.locations.title,
    description: fillMeta(meta.locations.description, locale),
  });
}

export default async function LocationsPage({ params }: PageProps<"/[locale]/locations">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { locations, nav } = dict;
  const explorer = getExplorerProps(locale, dict);
  const pickup = addOns.find((addOn) => addOn.id === "pickup")!;

  return (
    <>
      <PageHero
        eyebrow={locations.eyebrow}
        title={locations.pageTitle}
        description={locations.description}
        breadcrumbLabel={dict.a11y.breadcrumb}
        breadcrumbs={[
          { label: nav.home, href: href(locale) },
          { label: nav.locations, href: href(locale, "/locations") },
        ]}
      />

      <section className="relative overflow-hidden bg-wall-100 py-16 text-ink-950 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />
        <div className="container-x relative">
          <h2 data-reveal className="max-w-3xl font-display text-3xl leading-tight font-extrabold sm:text-4xl rtl:leading-snug">
            {locations.title}
          </h2>
          <div data-reveal className="mt-10">
            <LocationsExplorer branches={explorer.branches} labels={explorer.labels} />
          </div>

          <div
            data-reveal
            className="mt-5 grid gap-8 rounded-[32px] border border-ink-950/[.08] bg-wall-50 p-7 shadow-[0_30px_80px_-50px_rgb(8_8_10/.45)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-ink-950 text-glow-400">
                  <Home aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{locations.pickupTitle}</h3>
                  <p className="text-sm text-wall-500">
                    {locations.pickupBody} (+{formatPrice(pickup.price, locale)} {pickup.unit[locale]})
                  </p>
                </div>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {pickupAreas[locale].map((area) => (
                  <li
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-wall-100 px-4 py-2 text-sm font-medium"
                  >
                    <MapPin aria-hidden className="size-3.5 text-glow-600" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonAnchor href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="dark" size="lg">
              <WhatsAppIcon className="size-5 text-glow-400" />
              {dict.common.whatsappUs}
            </ButtonAnchor>
          </div>
        </div>
      </section>

      {/* One crawlable section per area — "driving lessons in Nasr City", etc. */}
      <section className="relative bg-ink-950 py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading title={locations.areasTitle} description={locations.areasDescription} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {branches.map((branch, index) => {
              const area = branch.name[locale];
              return (
                <article
                  key={branch.slug}
                  id={branch.slug}
                  data-reveal
                  style={revealDelay((index % 2) * 80)}
                  className="flex scroll-mt-28 flex-col rounded-[28px] border border-white/[.08] bg-ink-900 p-7 sm:p-8"
                >
                  <p className="flex items-center gap-2 text-sm text-smoke">
                    <MapPin aria-hidden className="size-4 text-glow-400" />
                    {branch.district[locale]}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold text-paper">{format(locations.areaHeading, { area })}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-fog rtl:leading-loose">
                    {format(locations.areaBody, {
                      area,
                      meetingPoint: branch.meetingPoint[locale],
                      district: branch.district[locale],
                      hours: site.hours[locale],
                    })}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href={href(locale, `/book?branch=${branch.slug}`)} className={buttonClass("primary", "sm")}>
                      {format(locations.areaCta, { area })}
                      <ButtonArrow />
                    </Link>
                    <a
                      href={mapsUrl(branch.mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("secondary", "sm")}
                    >
                      <Navigation aria-hidden className="size-4" />
                      {locations.directions}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
