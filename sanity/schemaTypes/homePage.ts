import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageAssetOrEmpty} from './imageValidation'

const imageWithAlt = (name: string, title: string, group: string) => defineField({
  name,
  title,
  type: 'image',
  group,
  options: {hotspot: true},
  validation: (rule) => rule.custom(imageAssetOrEmpty),
  fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})],
})

const richText = (name: string, title: string, group: string) => defineField({
  name,
  title,
  group,
  type: 'array',
  of: [defineArrayMember({
    type: 'block',
    marks: {
      annotations: [defineField({
        name: 'link',
        title: 'Link',
        type: 'object',
        fields: [defineField({name: 'href', title: 'Adres', type: 'url', options: {allowRelative: true}})],
      })],
    },
  })],
  validation: (rule) => rule.required().min(1),
})

const accordionItems = (name: string, title: string, group: string) => defineField({
  name,
  title,
  group,
  type: 'array',
  of: [defineArrayMember({
    type: 'object',
    name: `${name}Item`,
    title: 'Pozycja',
    fields: [
      defineField({name: 'title', title: 'Nazwa / pytanie', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'body', title: 'Opis / odpowiedź', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    ],
    preview: {select: {title: 'title', subtitle: 'body'}},
  })],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Strona główna',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'approach', title: 'Podejście'},
    {name: 'projects', title: 'Projekty'},
    {name: 'offer', title: 'Oferta'},
    {name: 'process', title: 'Proces'},
    {name: 'about', title: 'O mnie'},
    {name: 'faq', title: 'FAQ'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'showHero', title: 'Pokaż sekcję „Hero”', type: 'boolean', group: 'hero', initialValue: true}),
    defineField({
      name: 'heroType',
      title: 'Hero Typ',
      type: 'string',
      group: 'hero',
      initialValue: 'images',
      options: {
        list: [
          {title: 'Zdjęcia', value: 'images'},
          {title: 'Wideo', value: 'video'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'heroLead', title: 'Wprowadzenie', type: 'text', rows: 4, group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'heroImages',
      title: 'Hero Slideshow',
      description: 'Dodaj maksymalnie 3 zdjęcia. Kolejność można zmieniać przez przeciąganie.',
      type: 'array',
      group: 'hero',
      hidden: ({parent}) => parent?.heroType === 'video',
      validation: (rule) => rule.custom((value, context) => {
        if (context.parent?.heroType === 'video') return true
        if (!Array.isArray(value) || value.length === 0) return 'Dodaj co najmniej jedno zdjęcie.'
        if (value.length > 3) return 'Możesz dodać maksymalnie 3 zdjęcia.'
        return true
      }),
      of: [defineArrayMember({
        type: 'image',
        options: {hotspot: true},
        validation: (rule) => rule.custom(imageAssetOrEmpty),
        fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})],
      })],
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Wideo',
      description: 'Wideo zastępuje slideshow. Odtwarza się automatycznie, bez dźwięku i w pętli.',
      type: 'file',
      group: 'hero',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.heroType !== 'video',
      validation: (rule) => rule.custom((value, context) => {
        if (context.parent?.heroType !== 'video') return true
        return value?.asset ? true : 'Dodaj plik wideo.'
      }),
    }),
    defineField({
      name: 'heroImage',
      title: 'Poprzednie zdjęcie główne',
      type: 'image',
      group: 'hero',
      hidden: true,
      validation: (rule) => rule.custom(imageAssetOrEmpty),
      fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string'})],
    }),

    defineField({name: 'showApproach', title: 'Pokaż sekcję „Podejście”', type: 'boolean', group: 'approach', initialValue: true}),
    defineField({name: 'approachTitle', title: 'Nagłówek sekcji', type: 'string', group: 'approach', validation: (rule) => rule.required()}),
    richText('approachBody', 'Treść', 'approach'),
    defineField({name: 'approachCallout', title: 'Duże hasło', type: 'string', group: 'approach', validation: (rule) => rule.required()}),
    defineField({name: 'approachPillars', title: 'Filary', type: 'array', group: 'approach', validation: (rule) => rule.required().min(1), of: [defineArrayMember({type: 'object', name: 'approachPillar', title: 'Filar', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'text', title: 'Opis', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    ], preview: {select: {title: 'title', subtitle: 'text'}}})]}),

    defineField({name: 'showProjects', title: 'Pokaż sekcję „Projekty”', type: 'boolean', group: 'projects', initialValue: true}),
    defineField({name: 'projectsTitle', title: 'Nagłówek sekcji', type: 'string', group: 'projects', validation: (rule) => rule.required()}),
    defineField({name: 'projectsLinkLabel', title: 'Tekst linku', type: 'string', group: 'projects', validation: (rule) => rule.required()}),

    defineField({name: 'showOffer', title: 'Pokaż sekcję „Oferta”', type: 'boolean', group: 'offer', initialValue: true}),
    defineField({name: 'offerTitle', title: 'Nagłówek sekcji', type: 'string', group: 'offer', validation: (rule) => rule.required()}),
    defineField({name: 'offers', title: 'Grupy oferty', type: 'array', group: 'offer', validation: (rule) => rule.required().min(1), of: [defineArrayMember({type: 'object', name: 'offerGroup', title: 'Grupa', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'lead', title: 'Pytanie wprowadzające', type: 'text', rows: 2}),
      defineField({name: 'sections', title: 'Pozycje', type: 'array', of: [defineArrayMember({type: 'object', name: 'offerSection', title: 'Pozycja', fields: [
        defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'text', title: 'Opis', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ], preview: {select: {title: 'title', subtitle: 'text'}}})]})
    ], preview: {select: {title: 'title'}}})]}),

    defineField({name: 'showProcess', title: 'Pokaż sekcję „Proces”', type: 'boolean', group: 'process', initialValue: true}),
    defineField({name: 'processTitle', title: 'Nagłówek sekcji', type: 'string', group: 'process', validation: (rule) => rule.required()}),
    defineField({name: 'showArchitectureProcess', title: 'Pokaż „Proces architektura”', type: 'boolean', group: 'process', initialValue: true}),
    accordionItems('architectureProcess', 'Proces architektura', 'process'),
    defineField({name: 'showInteriorsProcess', title: 'Pokaż „Proces wnętrza”', type: 'boolean', group: 'process', initialValue: true}),
    accordionItems('interiorsProcess', 'Proces wnętrza', 'process'),

    defineField({name: 'showAbout', title: 'Pokaż sekcję „O mnie”', type: 'boolean', group: 'about', initialValue: true}),
    defineField({name: 'aboutTitle', title: 'Nagłówek sekcji', type: 'text', rows: 3, group: 'about', validation: (rule) => rule.required()}),
    richText('aboutParagraphs', 'Treść', 'about'),
    imageWithAlt('aboutImage', 'Zdjęcie „O mnie”', 'about'),

    defineField({name: 'showFaq', title: 'Pokaż sekcję „FAQ”', type: 'boolean', group: 'faq', initialValue: true}),
    defineField({name: 'faqTitle', title: 'Nagłówek sekcji', type: 'string', group: 'faq', validation: (rule) => rule.required()}),
    defineField({...accordionItems('faq', 'Pytania i odpowiedzi', 'faq'), validation: (rule) => rule.required().min(1)}),

    defineField({name: 'seoTitle', title: 'Tytuł SEO', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescription', title: 'Opis SEO', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(180)}),
  ],
  preview: {prepare: () => ({title: 'Strona główna'})},
})
