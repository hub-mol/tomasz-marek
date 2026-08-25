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
        S.documentTypeListItem('blogPost').title('Blog'),
      ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (items) => items.filter((item) => !['homePage', 'siteSettings'].includes(item.templateId)),
  },
})
