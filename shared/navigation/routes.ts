import {
  RootNavigator,
  NavigatorContainer,
  Screen,
  StackNavigator,
  TabNavigator,
} from './types';

export class NavigationFactory {
  navigator: ReturnType<NavigationFactory['createNavigationContainer']>;

  constructor() {
    this.navigator = this.createNavigationContainer();
  }

  createNavigationContainer = () => {
    const NewsFeed = new Screen('NewsFeed');

    const Search = new Screen('Search');
    const Profile = new Screen('Profile');

    const homeTabsNavigator = new TabNavigator()
      .addScreen(NewsFeed)
      .addScreen(Search)
      .addScreen(Profile)
    const homeScreen = new NavigatorContainer('home', homeTabsNavigator);
    const splashScreen = new Screen('splash');
    const loginScreen = new Screen('login');
    const WriteHoot = new Screen('WriteHoot');
    const Replies = new Screen('Replies');
    const rootStackNavigator = new StackNavigator()
      .addScreen(NewsFeed)
      .addScreen(Search)
      .addScreen(homeScreen)
      .addScreen(WriteHoot)
      .addScreen(loginScreen)
      .addScreen(Replies)
      .addScreen(splashScreen, true);
    const navigationContainer = new RootNavigator(rootStackNavigator);
    return navigationContainer;
  };
}
