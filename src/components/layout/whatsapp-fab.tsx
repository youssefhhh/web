import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { whatsappUrl } from "@/lib/utils";

export function WhatsAppFab({ label }: { label: string }) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="whatsapp-fab group fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full border border-glow-400/40 bg-ink-900/90 text-glow-400 shadow-[0_0_0_6px_rgb(8_8_10/.55),0_18px_40px_-12px_rgb(255_178_56/.55)] backdrop-blur-md transition-[scale,background-color,color] duration-300 hover:scale-105 hover:bg-glow-400 hover:text-ink-950 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden className="absolute inset-0 rounded-full border border-glow-400/50 animate-ping-soft" />
      <WhatsAppIcon className="relative size-6" />
    </a>
  );
}
