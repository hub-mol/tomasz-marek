import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost', title: 'Blog', type: 'document',
  fields: [
    defineField({name: 'title', title: 'Tytuł', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Adres', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Zajawka', type: 'text', rows: 3, validation: (rule) => rule.required().max(240)}),
    defineField({name: 'publishedAt', title: 'Data publikacji', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'cover', title: 'Okładka', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})]}),
    defineField({name: 'body', title: 'Treść', type: 'array', of: [
      defineArrayMember({type: 'block'}),
      defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})]}),
    ]}),
  ],
})
