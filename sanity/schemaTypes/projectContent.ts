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
  fields: [richText],
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
      description: 'Jedno lub kilka zdjęć. Warianty układu dodamy później bez zmiany struktury treści.',
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
  ],
  preview: {
    select: {media: 'images.0', images: 'images'},
    prepare: ({media, images}) => ({title: 'Zdjęcia', subtitle: `${images?.length ?? 0} zdjęć`, media}),
  },
})
