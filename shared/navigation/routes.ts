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
    const Notifications = new Screen('Notifications');

    const homeTabsNavigator = new TabNavigator()
      .addScreen(NewsFeed)
      .addScreen(Search)
      .addScreen(Notifications)
      .addScreen(Profile)
    const homeScreen = new NavigatorContainer('home', homeTabsNavigator);
    const splashScreen = new Screen('splash');
    const loginScreen = new Screen('login');
    const WriteHoot = new Screen('WriteHoot');
    const Followers = new Screen('Followers');
    const Following = new Screen('Following');
    const UserProfile = new Screen('UserProfile');

    const Replies = new Screen('Replies');
    const FillUserData = new Screen('FillUserData')
    const rootStackNavigator = new StackNavigator()
      .addScreen(NewsFeed)
      .addScreen(Notifications)
      .addScreen(Search)
      .addScreen(homeScreen)
      .addScreen(WriteHoot)
      .addScreen(UserProfile)
      .addScreen(Followers)
      .addScreen(Following)
      .addScreen(loginScreen)
      .addScreen(Replies)
      .addScreen(FillUserData)
      .addScreen(splashScreen, true);
    const navigationContainer = new RootNavigator(rootStackNavigator);
    return navigationContainer;
  };
}
