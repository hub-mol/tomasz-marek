import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Ustawienia strony', type: 'document',
  fields: [
    defineField({name: 'email', title: 'E-mail', type: 'string'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
    defineField({name: 'calUrl', title: 'Link do rezerwacji spotkania', type: 'url'}),
    defineField({name: 'services', title: 'Oferta', type: 'array', of: [defineArrayMember({type: 'object', name: 'service', title: 'Usługa', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'description', title: 'Opis', type: 'text', rows: 4}),
    ]})]}),
    defineField({name: 'process', title: 'Proces', type: 'array', of: [defineArrayMember({type: 'object', name: 'processStep', title: 'Etap', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'description', title: 'Opis', type: 'text', rows: 4}),
    ]})]}),
  ],
  preview: {prepare: () => ({title: 'Ustawienia strony'})},
})
