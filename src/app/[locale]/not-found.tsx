import { locale as getLocale } from "next/root-params";
import { NotFoundView } from "@/components/ui/not-found-view";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function LocaleNotFound() {
  const value = await getLocale();
  return <NotFoundView locale={isLocale(value) ? value : defaultLocale} />;
}
