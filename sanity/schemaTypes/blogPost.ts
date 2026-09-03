import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost', title: 'Publikacja', type: 'document',
  groups: [
    {name: 'content', title: 'Treść', default: true},
    {name: 'publishing', title: 'Publikacja'},
    {name: 'seo', title: 'SEO i social media'},
  ],
  fields: [
    defineField({name: 'title', title: 'Tytuł', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Adres', description: 'Sam fragment adresu, bez /blog/ lub /oferta/.', type: 'slug', group: 'publishing', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({
      name: 'routeType',
      title: 'Rodzaj strony',
      description: 'Określa, czy publikacja pojawi się pod /blog/, czy pod /oferta/.',
      type: 'string',
      group: 'publishing',
      initialValue: 'blog',
      options: {list: [{title: 'Artykuł blogowy', value: 'blog'}, {title: 'Strona oferty', value: 'offer'}], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'excerpt', title: 'Zajawka', type: 'text', rows: 3, group: 'content', validation: (rule) => rule.required().max(240)}),
    defineField({name: 'categories', title: 'Kategorie', type: 'array', group: 'content', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
    defineField({name: 'publishedAt', title: 'Data publikacji', description: 'Strony z datą w przyszłości nie są jeszcze publikowane.', type: 'datetime', group: 'publishing', validation: (rule) => rule.required()}),
    defineField({name: 'author', title: 'Autor', type: 'string', group: 'publishing', initialValue: 'Tomasz Marek', validation: (rule) => rule.required()}),
    defineField({name: 'readingTime', title: 'Czas czytania (min)', type: 'number', group: 'publishing', initialValue: 5, validation: (rule) => rule.required().integer().min(1)}),
    defineField({name: 'cover', title: 'Okładka', type: 'image', group: 'content', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})]}),
    defineField({name: 'body', title: 'Treść', type: 'array', group: 'content', of: [
      defineArrayMember({type: 'block'}),
      defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})]}),
    ]}),
    defineField({name: 'seoTitle', title: 'Tytuł SEO', description: 'Jeśli puste, użyty zostanie tytuł publikacji.', type: 'string', group: 'seo', validation: (rule) => rule.max(70)}),
    defineField({name: 'seoDescription', title: 'Opis SEO', description: 'Jeśli puste, użyta zostanie zajawka.', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(180)}),
    defineField({
      name: 'socialImage',
      title: 'Obraz dla social media',
      description: 'Grafika udostępniania (najlepiej 1200 × 630 px). Jeśli pusta, użyta zostanie okładka.',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
    }),
  ],
  orderings: [{title: 'Data publikacji — najnowsze', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', routeType: 'routeType', publishedAt: 'publishedAt', media: 'cover'},
    prepare: ({title, routeType, publishedAt, media}) => ({
      title,
      subtitle: `${routeType === 'offer' ? 'Oferta' : 'Blog'}${publishedAt ? ` · ${new Date(publishedAt).toLocaleDateString('pl-PL')}` : ''}`,
      media,
    }),
  },
})
