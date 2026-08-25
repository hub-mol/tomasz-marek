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
  fields: [
    defineField({name: 'title', title: 'Pełna nazwa', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'shortTitle', title: 'Krótka nazwa', type: 'string', validation: (rule) => rule.required().max(40)}),
    defineField({name: 'slug', title: 'Adres', type: 'slug', options: {source: 'shortTitle', maxLength: 80}, validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Typ projektu', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'location', title: 'Lokalizacja', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'surface', title: 'Powierzchnia', type: 'string'}),
    defineField({name: 'status', title: 'Status', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Opis', type: 'text', rows: 8}),
    defineField({name: 'award', title: 'Nagroda / wyróżnienie', type: 'string'}),
    defineField({
      name: 'layout',
      title: 'Układ podstrony',
      type: 'string',
      initialValue: 'editorial',
      options: {list: [
        {title: 'Redakcyjny', value: 'editorial'},
        {title: 'Pełnoekranowy', value: 'immersive'},
        {title: 'Mozaika', value: 'mosaic'},
      ], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardTone',
      title: 'Kolor tekstu na miniaturze',
      type: 'string',
      initialValue: 'light',
      options: {list: [{title: 'Ciemny', value: 'light'}, {title: 'Jasny', value: 'dark'}], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({...imageField, name: 'cover', title: 'Okładka', validation: (rule) => rule.required()}),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [defineArrayMember(imageField)],
      options: {layout: 'grid'},
    }),
    defineField({name: 'order', title: 'Kolejność', type: 'number', initialValue: 100, validation: (rule) => rule.required().integer().min(0)}),
    defineField({name: 'featured', title: 'Pokaż na stronie głównej', type: 'boolean', initialValue: true}),
  ],
  orderings: [{title: 'Kolejność na stronie', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'shortTitle', subtitle: 'location', media: 'cover'}},
})
