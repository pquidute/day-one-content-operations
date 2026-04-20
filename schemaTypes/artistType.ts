import {defineField, defineType} from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      type: 'image',
    }),
  ],
  icon: UsersIcon
})
