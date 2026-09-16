import { branches } from "@/data/branches";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href, mapsUrl } from "@/lib/utils";
import type { ExplorerBranch, ExplorerLabels } from "./locations-explorer";

/** Flattens branch data into plain, localized props for the client explorer. */
export function getExplorerProps(locale: Locale, dict: Dictionary): { branches: ExplorerBranch[]; labels: ExplorerLabels } {
  const { locations } = dict;

  return {
    branches: branches.map((branch) => ({
      slug: branch.slug,
      name: branch.name[locale],
      district: branch.district[locale],
      meetingPoint: branch.meetingPoint[locale],
      directionsUrl: mapsUrl(branch.mapQuery),
      bookUrl: href(locale, `/book?branch=${branch.slug}`),
      pin: branch.pin,
    })),
    labels: {
      mapLabel: locations.mapLabel,
      meetingPoint: locations.meetingPoint,
      hours: locations.hours,
      hoursValue: site.hours[locale],
      directions: locations.directions,
      bookHere: locations.bookHere,
      legend: locations.legend,
    },
  };
}
