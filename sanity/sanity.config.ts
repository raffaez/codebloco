import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'codebloco',

  projectId: '6a1a3pze',
  dataset: 'production',
  apiVersion: '2021-03-25',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
