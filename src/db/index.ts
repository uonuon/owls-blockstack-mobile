import {
  Database,
} from '@nozbe/watermelondb';
import SqLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {
  Platform,
} from 'react-native';
import {
  User,
} from './models/UserModel';
import {
  Hoot,
} from './models/HootsModel';
import schema from './schema';

const adapter = new SqLiteAdapter({
  schema,
  // @ts-ignore
  synchronous: Platform.OS === 'ios',

});
export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Hoot
  ],
  actionsEnabled: true,
});
