import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href, whatsappUrl } from "@/lib/utils";

export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { cta } = dict;

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-28 sm:pt-36">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-glow-400/[.12] blur-[140px]"
      />

      <div className="container-x relative z-10 text-center">
        <h2
          data-reveal
          className="mx-auto max-w-4xl font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-paper rtl:leading-[1.25] rtl:tracking-normal"
        >
          <span className="block">{cta.title[0]}</span>
          <span className="block text-glow-400 text-backlit">{cta.title[1]}</span>
        </h2>
        <p data-reveal className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fog rtl:leading-loose">
          {cta.description}
        </p>
        <div data-reveal className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={href(locale, "/book")} size="lg" arrow>
            {cta.primary}
          </ButtonLink>
          <ButtonAnchor href={whatsappUrl()} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
            <WhatsAppIcon className="size-5 text-glow-400" />
            {cta.secondary}
          </ButtonAnchor>
        </div>
      </div>

      <div aria-hidden className="road-scene relative -mt-6 h-[300px] sm:h-[380px]">
        <div className="road-plane" />
      </div>
    </section>
  );
}
