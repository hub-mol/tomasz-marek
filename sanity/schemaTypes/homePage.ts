import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage', title: 'Strona główna', type: 'document',
  fields: [
    defineField({name: 'heroTitle', title: 'Nagłówek główny', type: 'text', rows: 3}),
    defineField({name: 'heroLead', title: 'Wprowadzenie', type: 'text', rows: 4}),
    defineField({name: 'aboutTitle', title: 'Nagłówek „O mnie”', type: 'text', rows: 3}),
    defineField({name: 'aboutParagraphs', title: 'Opis „O mnie”', type: 'array', of: [defineArrayMember({type: 'text', rows: 3})]}),
    defineField({name: 'faq', title: 'FAQ', type: 'array', of: [defineArrayMember({type: 'object', name: 'faqItem', title: 'Pytanie', fields: [
      defineField({name: 'question', title: 'Pytanie', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'answer', title: 'Odpowiedź', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    ]})]}),
  ],
  preview: {prepare: () => ({title: 'Strona główna'})},
})
