const DEFAULT_WIDTHS = [480, 768, 1120, 1600];

export const getSanityImageUrl = (source: string, width: number, quality = 82) => {
  const url = new URL(source);
  url.searchParams.set('w', String(width));
  url.searchParams.set('fit', 'max');
  url.searchParams.set('auto', 'format');
  url.searchParams.set('q', String(quality));
  return url.toString();
};

export const getSanityImageSources = (
  source: string,
  intrinsicWidth: number,
  widths: number[] = DEFAULT_WIDTHS,
) => {
  const candidates = [...new Set(
    widths.map((width) => Math.min(Math.round(width), intrinsicWidth)),
  )]
    .filter((width) => width > 0)
    .sort((a, b) => a - b);

  const fallbackWidth = candidates.at(-1) ?? intrinsicWidth;

  return {
    src: getSanityImageUrl(source, fallbackWidth),
    srcset: candidates
      .map((width) => `${getSanityImageUrl(source, width)} ${width}w`)
      .join(', '),
  };
};
