/** Converts Arabic-Indic / Persian digits to ASCII and strips formatting. */
export function normalizePhone(input: string) {
  let digits = input
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[^\d+]/g, "");

  if (digits.startsWith("+20")) digits = `0${digits.slice(3)}`;
  else if (digits.startsWith("0020")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("20") && digits.length === 12) digits = `0${digits.slice(2)}`;

  return digits;
}

/** Egyptian mobile numbers: 010, 011, 012 or 015 followed by 8 digits. */
export function isEgyptianMobile(input: string) {
  return /^01[0125]\d{8}$/.test(normalizePhone(input));
}
