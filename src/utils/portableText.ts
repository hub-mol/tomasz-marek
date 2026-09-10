import type {PortableTextBlock} from '@portabletext/types'
import {plNoBreak} from './typography'

export function paragraphsToPortableText(paragraphs: string[], keyPrefix = 'paragraph'): PortableTextBlock[] {
  return paragraphs.map((text, index) => ({
    _key: `${keyPrefix}-${index}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{
      _key: `${keyPrefix}-${index}-span`,
      _type: 'span',
      text,
      marks: [],
    }],
  }))
}

/**
 * Wiąże jednoliterowe polskie słowa z następnym wyrazem w każdym spanie tekstu.
 * Odpowiednik `plNoBreak` dla treści, które nie są zwykłym stringiem.
 */
function applyTypography(block: PortableTextBlock): PortableTextBlock {
  const children = (block as {children?: unknown}).children

  if (!Array.isArray(children)) return block

  return {
    ...block,
    children: children.map((child) => child
      && typeof child === 'object'
      && 'text' in child
      && typeof (child as {text: unknown}).text === 'string'
      ? {...child, text: plNoBreak((child as {text: string}).text)}
      : child),
  } as PortableTextBlock
}

export function normalizePortableText(
  value: unknown,
  fallback: PortableTextBlock[],
  keyPrefix: string,
): PortableTextBlock[] {
  if (!Array.isArray(value)) return fallback

  return value.flatMap((item, index) => {
    if (typeof item === 'string') {
      return paragraphsToPortableText([item], `${keyPrefix}-${index}`)
    }

    return item && typeof item === 'object' && '_type' in item
      ? [item as PortableTextBlock]
      : []
  }).map(applyTypography)
}

/**
 * Przyjmuje wartość z CMS-u w dowolnej z trzech postaci: gotowego Portable Text,
 * zwykłego stringa sprzed migracji albo braku wartości. Dzięki temu schemat i dane
 * mogą się rozjechać w czasie, a strona i tak się wyrenderuje.
 */
export function toPortableText(
  value: unknown,
  fallback: PortableTextBlock[],
  keyPrefix: string,
): PortableTextBlock[] {
  if (typeof value === 'string') {
    const paragraphs = value.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)
    if (paragraphs.length === 0) return fallback
    return paragraphsToPortableText(paragraphs, keyPrefix).map(applyTypography)
  }

  return normalizePortableText(value, fallback, keyPrefix)
}
