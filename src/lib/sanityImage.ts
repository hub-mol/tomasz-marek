const DEFAULT_WIDTHS = [480, 768, 1120, 1600];

export const isValidSanityImage = (image: unknown): image is {
  url: string
  width: number
  height: number
  alt?: string
} => {
  if (!image || typeof image !== 'object') return false

  const {url, width, height} = image as Record<string, unknown>
  return typeof url === 'string'
    && URL.canParse(url)
    && typeof width === 'number'
    && width > 0
    && typeof height === 'number'
    && height > 0
}

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
