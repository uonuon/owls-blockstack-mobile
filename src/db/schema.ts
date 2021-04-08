import {
  appSchema,
} from '@nozbe/watermelondb';
import { hootsSchema } from './schemas/hoots';
import {
  usersSchema,
} from './schemas/users';

export default appSchema({
  version: 1,
  tables: [
    usersSchema,
    hootsSchema,
  ],
});
