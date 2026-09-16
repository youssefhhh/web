import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { RevealObserver } from "@/components/ui/reveal-observer";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/** Everything inside <body>: skip link, header, page content, footer and floating actions. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.a11y.skipToContent}
      </a>
      <Header locale={locale} nav={dict.nav} a11y={dict.a11y} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFab label={dict.a11y.whatsapp} />
      <RevealObserver />
    </>
  );
}
