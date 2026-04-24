import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().error('The artist must have a name'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      description:
        'Brief summary of the artist, highlighting their style, background, and what makes their work stand out.',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  icon: UsersIcon,
})
