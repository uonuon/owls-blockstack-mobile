import {
  tableSchema,
} from '@nozbe/watermelondb';

// TODO: check optionals, and stuff you won't need

export const usersSchema = tableSchema({
  name: 'users',
  columns: [
    {
      name: 'username',
      type: 'string',
      isIndexed: true,
    },
    {
      name: 'publicKey',
      type: 'string',
    },
    {
      name: 'profile',
      type: 'string',
    },
    {
      name: 'avatar',
      type: 'string',
    },
    {
      name: 'hubUrl',
      type: 'string',
    },
    {
      name: 'date',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'fullName',
      type: 'string',
    },
    {
      name: 'identityAddress',
      type: 'string',
    },
    {
      name: 'notificationsAllowed',
      type: 'boolean',
      isOptional: true
    },
    {
      name: 'connectionId',
      type: 'number',
      isOptional: true
    },
    {
      name: 'connectionStatus',
      type: 'string',
      isOptional: true
    },
    {
      name: 'isPrivate',
      type: 'boolean',
    },
  ],
});