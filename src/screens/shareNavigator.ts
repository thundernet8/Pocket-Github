import { StackNavigator } from "react-navigation";
import MyProfileScreen from "./MyProfile";
import MyOrgsScreen from "./MyOrgs";
import MyNoticesScreen from "./MyNotices";
import MyPinnedScreen from "./MyPinned";
import MyReposScreen from "./MyRepos";
import MyGistsScreen from "./MyGists";
import MyStarredScreen from "./MyStarred";
import SettingsScreen from "./Settings";
import TrendingScreen from "./Trending";
import UserScreen from "./User";
import RepoScreen from "./Repository";
import Screen from "../data/enum/Screen";

export const sharedScreens = {
    [Screen.Settings]: { screen: SettingsScreen },
    [Screen.Trending]: { screen: TrendingScreen },
    [Screen.MyProfile]: { screen: MyProfileScreen },
    [Screen.MyOrgs]: { screen: MyOrgsScreen },
    [Screen.MyNotices]: { screen: MyNoticesScreen },
    [Screen.MyPinned]: { screen: MyPinnedScreen },
    [Screen.MyRepos]: { screen: MyReposScreen },
    [Screen.MyGists]: { screen: MyGistsScreen },
    [Screen.MyStarred]: { screen: MyStarredScreen },
    [Screen.User]: { screen: UserScreen },
    [Screen.Repo]: { screen: RepoScreen }
};

const SharedStackNavigator = StackNavigator(sharedScreens, {
    headerMode: "none",
    mode: "card"
});

export default SharedStackNavigator;
