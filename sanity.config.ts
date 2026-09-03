import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'tomasz_marek',
  title: 'Tomasz Marek',
  projectId: 'o8oniqgy',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Treść').items([
        S.listItem().title('Strona główna').child(S.document().schemaType('homePage').documentId('homePage')),
        S.listItem().title('Ustawienia strony').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        S.divider(),
        S.documentTypeListItem('project').title('Projekty'),
        S.listItem().id('blog').title('Blog').schemaType('blogPost').child(
          S.documentList()
            .id('blog-documents')
            .title('Blog')
            .schemaType('blogPost')
            .filter('_type == "blogPost" && coalesce(routeType, "blog") == $routeType')
            .params({routeType: 'blog'})
            .initialValueTemplates([S.initialValueTemplateItem('blog-post')]),
        ),
        S.listItem().id('offer').title('Oferta').schemaType('blogPost').child(
          S.documentList()
            .id('offer-documents')
            .title('Oferta')
            .schemaType('blogPost')
            .filter('_type == "blogPost" && routeType == $routeType')
            .params({routeType: 'offer'})
            .initialValueTemplates([S.initialValueTemplateItem('offer-page')]),
        ),
      ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((template) => template.schemaType !== 'blogPost'),
      {id: 'blog-post', title: 'Wpis blogowy', schemaType: 'blogPost', value: {routeType: 'blog'}},
      {id: 'offer-page', title: 'Strona oferty', schemaType: 'blogPost', value: {routeType: 'offer'}},
    ],
  },
  document: {
    newDocumentOptions: (items) => items.filter((item) => !['homePage', 'siteSettings', 'blogPost'].includes(item.templateId)),
  },
})
