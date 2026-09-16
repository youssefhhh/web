import { Alexandria, Archivo } from "next/font/google";

/** Latin display & brand face — the wide cut echoes the "DRIVE" lettering on the sign. */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/** Geometric Arabic face (with Latin support) for Arabic pages. */
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});
