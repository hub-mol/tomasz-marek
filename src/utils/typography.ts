const polishSingleLetterWord = /(^|[\s([{„“«])([aiouwz])\s+/giu;

/** Nie pozwala zostawić jednoliterowego polskiego słowa na końcu wiersza. */
export const plNoBreak = (text: string) =>
  text.replace(polishSingleLetterWord, '$1$2\u00A0');
