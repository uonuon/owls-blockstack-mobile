import {
  tableSchema,
} from '@nozbe/watermelondb';
// TODO: Check optionals and stuff you won't need

export const hootsSchema = tableSchema({
  name: 'hoots',
  columns: [
    {
      name: 'text',
      type: 'string',
    },
    {
      name: 'image',
      isOptional: true,
      type: 'string',
    },
    {
      name: 'createdAt',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'updatedAt',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'user',
      type: 'string',
    },
    {
      name: 'threadParent',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'parentTweet',
      type: 'string',
      isIndexed: true,
      isOptional: true,
    },
    {
      name: 'favoritesNumber',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'repliesNumber',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'retweetsNumber',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'isFavorite',
      type: 'boolean',
      isOptional: true,
    },
    {
      name: 'isRetweeted',
      type: 'boolean',
      isOptional: true,
    },
  ],
});

