import type {PortableTextBlock} from '@portabletext/types'

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
  })
}
