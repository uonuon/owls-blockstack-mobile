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
      name: 'created_at',
      type: 'number',
      isIndexed: true,
    },
    {
      name: 'updated_at',
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
      isOptional: true,
    },
    {
      name: 'favoritesNumber',
      type: 'number',
    },
    {
      name: 'repliesNumber',
      type: 'number',
    },
    {
      name: 'retweetsNumber',
      type: 'number',
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

