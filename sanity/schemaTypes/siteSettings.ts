import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  groups: [
    {name: 'general', title: 'Ogólne', default: true},
    {name: 'contact', title: 'Kontakt'},
    {name: 'footer', title: 'Stopka'},
    {name: 'structuredData', title: 'Dane strukturalne'},
  ],
  fields: [
    defineField({name: 'siteTitle', title: 'Nazwa strony', type: 'string', group: 'general', validation: (rule) => rule.required()}),
    defineField({name: 'defaultSeoTitle', title: 'Domyślny tytuł SEO', type: 'string', group: 'general', validation: (rule) => rule.required()}),
    defineField({name: 'defaultSeoDescription', title: 'Domyślny opis SEO', type: 'text', rows: 3, group: 'general', validation: (rule) => rule.required().max(180)}),
    defineField({name: 'logo', title: 'Skrót logo', type: 'string', group: 'general', validation: (rule) => rule.required().max(12)}),
    defineField({name: 'logoSuffix', title: 'Nazwa przy logo', type: 'string', group: 'general'}),

    defineField({name: 'email', title: 'E-mail', type: 'string', group: 'contact', validation: (rule) => rule.required().email()}),
    defineField({name: 'phoneLabel', title: 'Telefon — zapis widoczny', type: 'string', group: 'contact'}),
    defineField({name: 'phoneHref', title: 'Telefon — numer do linku', description: 'Bez spacji, np. +48696995899', type: 'string', group: 'contact'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url', group: 'contact'}),
    defineField({name: 'facebook', title: 'Facebook', type: 'url', group: 'contact'}),
    defineField({name: 'bookingLabel', title: 'Tekst przycisku kontaktowego', type: 'string', group: 'contact'}),

    defineField({name: 'footerTitle', title: 'Nagłówek stopki', type: 'string', group: 'footer'}),
    defineField({name: 'footerText', title: 'Tekst stopki', type: 'text', rows: 4, group: 'footer'}),
    defineField({name: 'studioAddress', title: 'Adres pracowni', type: 'array', of: [defineArrayMember({type: 'string'})], group: 'footer'}),
    defineField({name: 'businessAddress', title: 'Adres działalności', type: 'array', of: [defineArrayMember({type: 'string'})], group: 'footer'}),
    defineField({name: 'nip', title: 'NIP', type: 'string', group: 'footer'}),
    defineField({name: 'regon', title: 'REGON', type: 'string', group: 'footer'}),

    defineField({name: 'founderName', title: 'Imię i nazwisko architekta', type: 'string', group: 'structuredData'}),
    defineField({name: 'studioStreet', title: 'Ulica i numer pracowni', type: 'string', group: 'structuredData'}),
    defineField({name: 'studioPostalCode', title: 'Kod pocztowy pracowni', type: 'string', group: 'structuredData'}),
    defineField({name: 'studioCity', title: 'Miasto pracowni', type: 'string', group: 'structuredData'}),
    defineField({name: 'studioRegion', title: 'Województwo', type: 'string', group: 'structuredData'}),
    defineField({name: 'studioCountry', title: 'Kod kraju', description: 'Dwuliterowy kod, np. PL.', type: 'string', group: 'structuredData', validation: (rule) => rule.max(2)}),
    defineField({name: 'areaServed', title: 'Obszar działania', description: 'Obszary obsługiwane lokalnie i zdalnie, np. Gdańsk, województwo pomorskie, Polska.', type: 'array', of: [defineArrayMember({type: 'string'})], group: 'structuredData'}),
    defineField({name: 'iarpNumber', title: 'Numer wpisu IARP', description: 'Np. PO-1963.', type: 'string', group: 'structuredData'}),
    defineField({name: 'iarpUrl', title: 'Link do wpisu IARP', type: 'url', group: 'structuredData'}),
  ],
  preview: {prepare: () => ({title: 'Ustawienia strony'})},
})
