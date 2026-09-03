import {defineArrayMember, defineField, defineType} from 'sanity'

const imageField = defineField({
  name: 'image',
  title: 'Zdjęcie',
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
})

export const project = defineType({
  name: 'project',
  title: 'Projekty',
  type: 'document',
  groups: [
    {name: 'content', title: 'Treść', default: true},
    {name: 'publishing', title: 'Publikacja'},
    {name: 'seo', title: 'SEO i social media'},
  ],
  fieldsets: [
    {
      name: 'details',
      title: 'Parametry projektu',
      options: {columns: 2, collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({name: 'title', title: 'Pełna nazwa', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'shortTitle', title: 'Krótka nazwa', type: 'string', group: 'content', validation: (rule) => rule.required().max(40)}),
    defineField({...imageField, name: 'cover', title: 'Okładka', group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Końcówka adresu podstrony projektu, np. „dom-drz” utworzy tomaszmarek.com/projekty/dom-drz.',
      type: 'slug',
      group: 'publishing',
      options: {source: 'shortTitle', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'category', title: 'Typ projektu', type: 'string', group: 'content', fieldset: 'details', validation: (rule) => rule.required()}),
    defineField({name: 'location', title: 'Lokalizacja', type: 'string', group: 'content', fieldset: 'details', validation: (rule) => rule.required()}),
    defineField({name: 'surface', title: 'Powierzchnia', type: 'string', group: 'content', fieldset: 'details'}),
    defineField({name: 'status', title: 'Status', type: 'string', group: 'content', fieldset: 'details', validation: (rule) => rule.required()}),
    defineField({
      name: 'content',
      title: 'Treść projektu',
      description: 'Dodawaj bloki tekstowe i zdjęciowe, a następnie przeciągaj je, aby ustawić kolejność na stronie.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({type: 'projectTextBlock'}),
        defineArrayMember({type: 'projectImageBlock'}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'description', title: 'Stary opis', type: 'text', rows: 8, group: 'content', hidden: true}),
    defineField({name: 'gallery', title: 'Stara galeria', type: 'array', group: 'content', of: [defineArrayMember(imageField)], options: {layout: 'grid'}, hidden: true}),
    defineField({name: 'order', title: 'Kolejność', type: 'number', group: 'publishing', initialValue: 100, validation: (rule) => rule.required().integer().min(0)}),
    defineField({name: 'featured', title: 'Pokaż na stronie głównej', type: 'boolean', group: 'publishing', initialValue: true}),
    defineField({name: 'seoTitle', title: 'Tytuł SEO', description: 'Jeśli puste, użyta zostanie pełna nazwa projektu.', type: 'string', group: 'seo', validation: (rule) => rule.max(70)}),
    defineField({name: 'seoDescription', title: 'Opis SEO', description: 'Jeśli puste, opis zostanie zbudowany z typu, lokalizacji i powierzchni.', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(180)}),
    defineField({name: 'socialImage', title: 'Obraz dla social media', description: 'Grafika udostępniania (najlepiej 1200 × 630 px). Jeśli pusta, użyta zostanie okładka.', type: 'image', group: 'seo', options: {hotspot: true}}),
  ],
  orderings: [{title: 'Kolejność na stronie', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'shortTitle', subtitle: 'location', media: 'cover'}},
})
