import {defineArrayMember, defineField, defineType} from 'sanity'

const imageWithAlt = (name: string, title: string, group: string) => defineField({
  name,
  title,
  type: 'image',
  group,
  options: {hotspot: true},
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
    {name: 'hero', title: 'Otwarcie', default: true},
    {name: 'approach', title: 'Podejście'},
    {name: 'projects', title: 'Projekty'},
    {name: 'offer', title: 'Oferta'},
    {name: 'process', title: 'Proces'},
    {name: 'about', title: 'O mnie'},
    {name: 'faq', title: 'FAQ'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroTitle', title: 'Nagłówek główny', type: 'text', rows: 3, group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'showHeroTitle',
      title: 'Pokaż nagłówek na zdjęciu',
      description: 'Po wyłączeniu tekst wprowadzający i przycisk pozostają w tym samym miejscu.',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    }),
    defineField({name: 'heroLead', title: 'Wprowadzenie', type: 'text', rows: 4, group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'heroImages',
      title: 'Slideshow hero',
      description: 'Dodaj maksymalnie 3 zdjęcia. Kolejność można zmieniać przez przeciąganie.',
      type: 'array',
      group: 'hero',
      validation: (rule) => rule.max(3),
      of: [defineArrayMember({
        type: 'image',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string', validation: (rule) => rule.required()})],
      })],
    }),
    defineField({name: 'heroImage', title: 'Poprzednie zdjęcie główne', type: 'image', group: 'hero', hidden: true}),

    defineField({name: 'approachTitle', title: 'Nagłówek', type: 'string', group: 'approach'}),
    richText('approachBody', 'Treść', 'approach'),
    defineField({name: 'approachCallout', title: 'Duże hasło', type: 'string', group: 'approach'}),
    defineField({name: 'approachPillars', title: 'Filary', type: 'array', group: 'approach', of: [defineArrayMember({type: 'object', name: 'approachPillar', title: 'Filar', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'text', title: 'Opis', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    ], preview: {select: {title: 'title', subtitle: 'text'}}})]}),

    defineField({name: 'projectsTitle', title: 'Nagłówek sekcji', type: 'string', group: 'projects'}),
    defineField({name: 'projectsLinkLabel', title: 'Tekst linku', type: 'string', group: 'projects'}),

    defineField({name: 'offerTitle', title: 'Nagłówek sekcji', type: 'string', group: 'offer'}),
    defineField({name: 'offers', title: 'Grupy oferty', type: 'array', group: 'offer', of: [defineArrayMember({type: 'object', name: 'offerGroup', title: 'Grupa', fields: [
      defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'lead', title: 'Pytanie wprowadzające', type: 'text', rows: 2}),
      defineField({name: 'sections', title: 'Pozycje', type: 'array', of: [defineArrayMember({type: 'object', name: 'offerSection', title: 'Pozycja', fields: [
        defineField({name: 'title', title: 'Nazwa', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'text', title: 'Opis', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ], preview: {select: {title: 'title', subtitle: 'text'}}})]})
    ], preview: {select: {title: 'title'}}})]}),

    defineField({name: 'processTitle', title: 'Nagłówek sekcji', type: 'string', group: 'process'}),
    accordionItems('architectureProcess', 'Proces architektura', 'process'),
    accordionItems('interiorsProcess', 'Proces wnętrza', 'process'),

    defineField({name: 'aboutTitle', title: 'Nagłówek', type: 'text', rows: 3, group: 'about'}),
    richText('aboutParagraphs', 'Treść', 'about'),
    imageWithAlt('aboutImage', 'Zdjęcie „O mnie”', 'about'),

    defineField({name: 'faqTitle', title: 'Nagłówek sekcji', type: 'string', group: 'faq'}),
    accordionItems('faq', 'Pytania i odpowiedzi', 'faq'),

    defineField({name: 'seoTitle', title: 'Tytuł SEO', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescription', title: 'Opis SEO', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(180)}),
  ],
  preview: {prepare: () => ({title: 'Strona główna'})},
})
