import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

import type {ProjectImage} from '../data/portfolio';

export interface ImageEdgeColors {
  top: string;
  bottom: string;
  navText: '#111' | '#fff';
  titleText: '#111' | '#fff';
  mobileTop: string;
  mobileBottom: string;
  mobileNavText: '#111' | '#fff';
  mobileTitleText: '#111' | '#fff';
}

const FALLBACK_COLORS: ImageEdgeColors = {
  top: 'rgb(36 37 35)',
  bottom: 'rgb(22 23 21)',
  navText: '#fff',
  titleText: '#fff',
  mobileTop: 'rgb(36 37 35)',
  mobileBottom: 'rgb(22 23 21)',
  mobileNavText: '#fff',
  mobileTitleText: '#fff',
};

interface Rgb {
  r: number;
  g: number;
  b: number;
}

const paletteCache = new Map<string, Promise<ImageEdgeColors>>();

const readImage = async (image: ProjectImage) => {
  const source = 'url' in image ? image.url : image.src;

  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Nie udało się pobrać obrazu: ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }

  const withoutQuery = decodeURIComponent(source.split('?')[0]);
  const filePath = withoutQuery.startsWith('file:')
    ? fileURLToPath(withoutQuery)
    : withoutQuery.startsWith('/@fs/')
      ? withoutQuery.slice(4)
      : path.resolve(process.cwd(), withoutQuery.replace(/^\//, ''));

  return readFile(filePath);
};

const toCssColor = ({r, g, b}: Rgb) =>
  `rgb(${r} ${g} ${b})`;

const desaturate = ({r, g, b}: Rgb, amount: number): Rgb => {
  const gray = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722);
  return {
    r: Math.round(r + (gray - r) * amount),
    g: Math.round(g + (gray - g) * amount),
    b: Math.round(b + (gray - b) * amount),
  };
};

const readableText = ({r, g, b}: Rgb): '#111' | '#fff' => {
  const linear = (channel: number) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
  // Punkt, w którym czerń daje wyższy kontrast WCAG niż biel.
  return luminance > 0.179 ? '#111' : '#fff';
};

const strengthenContrast = ({r, g, b}: Rgb, text: '#111' | '#fff'): Rgb => {
  const target = text === '#111' ? 255 : 0;
  return {
    r: Math.round(r + (target - r) * 0.4),
    g: Math.round(g + (target - g) * 0.4),
    b: Math.round(b + (target - b) * 0.4),
  };
};

const colorDistance = (first: Rgb, second: Rgb) =>
  Math.hypot(first.r - second.r, first.g - second.g, first.b - second.b);

const ensureDistinctBottom = (top: Rgb, bottom: Rgb): Rgb => {
  if (colorDistance(top, bottom) >= 24) return bottom;
  const topBrightness = top.r + top.g + top.b;
  const factor = topBrightness > 330 ? 0.82 : 1.18;
  return {
    r: Math.min(255, Math.round(bottom.r * factor)),
    g: Math.min(255, Math.round(bottom.g * factor)),
    b: Math.min(255, Math.round(bottom.b * factor)),
  };
};

const calculateEdgeColors = async (image: ProjectImage): Promise<ImageEdgeColors> => {
  const input = await readImage(image);
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) return FALLBACK_COLORS;

  const samplePalette = async (targetAspect: number) => {
    const sourceAspect = metadata.width! / metadata.height!;
    const cropWidth = sourceAspect > targetAspect
      ? Math.round(metadata.height! * targetAspect)
      : metadata.width!;
    const cropHeight = sourceAspect > targetAspect
      ? metadata.height!
      : Math.round(metadata.width! / targetAspect);
    const left = Math.round((metadata.width! - cropWidth) / 2);
    const cropTop = Math.round((metadata.height! - cropHeight) / 2);
    const bandHeight = Math.max(1, Math.round(cropHeight * 0.08));

    const sample = async (top: number) => {
    const {channels} = await sharp(input)
      .extract({left, top, width: cropWidth, height: bandHeight})
      .resize({width: 96, withoutEnlargement: true})
      .stats();
      return {
        r: Math.round(channels[0].mean),
        g: Math.round(channels[1].mean),
        b: Math.round(channels[2].mean),
      };
    };

    const [rawTop, rawBottom] = await Promise.all([
      sample(cropTop),
      sample(cropTop + cropHeight - bandHeight),
    ]);
    const top = desaturate(rawTop, 0.33);
    const bottom = ensureDistinctBottom(top, rawBottom);
    const navText = readableText(top);
    const titleText = readableText(bottom);

    return {
      top: strengthenContrast(top, navText),
      bottom: strengthenContrast(bottom, titleText),
      navText,
      titleText,
    };
  };

  // Odpowiada kadrowaniu `object-fit: cover` dla typowego desktopu i telefonu.
  const [desktop, mobile] = await Promise.all([
    samplePalette(2.55),
    samplePalette(1.3),
  ]);

  return {
    top: toCssColor(desktop.top),
    bottom: toCssColor(desktop.bottom),
    navText: desktop.navText,
    titleText: desktop.titleText,
    mobileTop: toCssColor(mobile.top),
    mobileBottom: toCssColor(mobile.bottom),
    mobileNavText: mobile.navText,
    mobileTitleText: mobile.titleText,
  };
};

export const getImageEdgeColors = (image: ProjectImage) => {
  const source = 'url' in image ? image.url : image.src;
  const cached = paletteCache.get(source);
  if (cached) return cached;

  const colors = calculateEdgeColors(image).catch((error) => {
    console.warn(`Nie udało się wyznaczyć palety obrazu ${source}.`, error);
    return FALLBACK_COLORS;
  });
  paletteCache.set(source, colors);
  return colors;
};
