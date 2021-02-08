/**
 * @format
 */

import {
  AppRegistry,
} from 'react-native';
import App from './App';
import {
  name as appName,
} from './app.json';
import 'shared/fluree';
import './shim';

AppRegistry.registerComponent(appName, () => App);
