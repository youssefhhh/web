import { getExplorerProps } from "@/components/locations/explorer-props";
import { LocationsExplorer } from "@/components/locations/locations-explorer";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/utils";

export function LocationsTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const explorer = getExplorerProps(locale, dict);

  return (
    <section className="relative overflow-hidden bg-wall-100 py-24 text-ink-950 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[.05]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow={dict.locations.eyebrow}
            title={dict.locations.title}
            description={dict.locations.description}
          />
          <div data-reveal className="shrink-0">
            <ButtonLink href={href(locale, "/locations")} variant="outline" arrow>
              {dict.locations.viewAll}
            </ButtonLink>
          </div>
        </div>
        <div data-reveal className="mt-14 lg:mt-16">
          <LocationsExplorer branches={explorer.branches} labels={explorer.labels} />
        </div>
      </div>
    </section>
  );
}
