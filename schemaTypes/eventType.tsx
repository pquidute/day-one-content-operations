import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      hidden: ({document}) => !document?.name, // hides the field if document hasn't name
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
      group: 'details',
      description: (
        <details>
          <summary>Why is it important?</summary>
          <p>
            {' '}
            The slug is what turns this content into a real, accessible page on your website. It
            defines the URL path (e.g., <code>/my-page</code>), making the page shareable, indexable
            by search engines, and reachable by users.
          </p>
        </details>
      ),
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      group: 'editorial',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'editorial',
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      type: 'number',
      initialValue: 60,
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      hidden: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
      group: 'editorial',
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'editorial',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['editorial', 'details'],
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Optional field for adding extra details about the event — like allowed items, special instructions, or anything attendees should know beforehand.',
      group: 'details'
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      description: 'Link the page where tickets are going to be sold',
      group: ['editorial', 'details']
    }),
  ],
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  icon: CalendarIcon,
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled Event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : ''

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} @${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
