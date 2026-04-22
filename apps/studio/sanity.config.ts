import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Day One Content Operations',

  projectId: '1l1r6zzx',
  dataset: 'production',
  plugins: [structureTool({structure, defaultDocumentNode}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
