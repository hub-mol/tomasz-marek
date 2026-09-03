import {defineArrayMember, defineField, defineType} from 'sanity'

const richText = defineField({
  name: 'body',
  title: 'Tekst',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Akapit', value: 'normal'},
        {title: 'Nagłówek', value: 'h2'},
        {title: 'Śródtytuł', value: 'h3'},
        {title: 'Cytat', value: 'blockquote'},
      ],
      marks: {
        decorators: [
          {title: 'Pogrubienie', value: 'strong'},
          {title: 'Kursywa', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [defineField({name: 'href', title: 'Adres', type: 'url'})],
          },
        ],
      },
    }),
  ],
  validation: (rule) => rule.required(),
})

export const projectTextBlock = defineType({
  name: 'projectTextBlock',
  title: 'Tekst',
  type: 'object',
  fields: [
    defineField({name: 'tagline', title: 'Tagline (opcjonalny)', description: 'Krótka etykieta wyświetlana nad tekstem.', type: 'string'}),
    defineField({
      name: 'textSize',
      title: 'Wielkość tekstu',
      type: 'string',
      initialValue: 'h3',
      options: {list: [{title: 'H3 — duży', value: 'h3'}, {title: 'H4 — mniejszy', value: 'h4'}], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    richText,
  ],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => ({
      title: 'Tekst',
      subtitle: body?.[0]?.children?.map((child: {text?: string}) => child.text).join('') || 'Pusty blok',
    }),
  },
})

export const projectImageBlock = defineType({
  name: 'projectImageBlock',
  title: 'Zdjęcia',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      description: 'Jedno lub kilka zdjęć wyświetlanych w wybranej liczbie kolumn.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Tekst alternatywny',
              description: 'Krótko opisz to, co widać na zdjęciu.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Liczba kolumn',
      description: 'Na telefonie zdjęcia zawsze układają się w jedną kolumnę.',
      type: 'number',
      initialValue: 1,
      options: {list: [
        {title: '1 — pełna szerokość', value: 1},
        {title: '2 kolumny', value: 2},
        {title: '3 kolumny', value: 3},
        {title: '4 kolumny', value: 4},
      ], layout: 'radio'},
      validation: (rule) => rule.required().integer().min(1).max(4),
    }),
  ],
  preview: {
    select: {media: 'images.0', images: 'images', columns: 'columns'},
    prepare: ({media, images, columns}) => ({title: 'Zdjęcia', subtitle: `${images?.length ?? 0} zdjęć · ${columns ?? 1} kol.`, media}),
  },
})
