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
    const homeTabsNavigator = new TabNavigator()
      .addScreen(NewsFeed)
      .addScreen(Search)
    const homeScreen = new NavigatorContainer('home', homeTabsNavigator);
    const splashScreen = new Screen('splash');
    const loginScreen = new Screen('login');
    const tutorial1Screen = new Screen('tutorial1');
    const tutorial2Screen = new Screen('tutorial2');
    const WriteHoot = new Screen('WriteHoot')
    const rootStackNavigator = new StackNavigator()
      .addScreen(NewsFeed)
      .addScreen(Search)
      .addScreen(homeScreen)
      .addScreen(WriteHoot)
      .addScreen(loginScreen)
      .addScreen(tutorial1Screen)
      .addScreen(tutorial2Screen)
      .addScreen(splashScreen, true);
    const navigationContainer = new RootNavigator(rootStackNavigator);
    return navigationContainer;
  };
}
