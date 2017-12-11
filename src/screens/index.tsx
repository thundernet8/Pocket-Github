import React from "react";
import { observer } from "mobx-react";
import {
    DrawerNavigator,
    StackNavigator,
    NavigationActions
} from "react-navigation";
import HomeScreen from "./Home";
// import HomeFeedsTabScreen from "./Home/FeedsTab";
// import HomeIssuesTabScreen from "./Home/IssuesTab";
// import HomePullRequestTabScreen from "./Home/PRsTab";
import LeftMenuScreen from "./LeftMenu";
import LoginScreen from "./Login";
import AboutScreen from "./About";
// import MyProfileScreen from "./MyProfile";
// import MyOrgsScreen from "./MyOrgs";
// import MyNoticesScreen from "./MyNotices";
// import MyPinnedScreen from "./MyPinned";
// import MyReposScreen from "./MyRepos";
// import MyGistsScreen from "./MyGists";
// import MyStarredScreen from "./MyStarred";
import SettingsScreen from "./Settings";
// import TrendingScreen from "./Trending";
import BugReportScreen from "./BugReport";
// import UserScreen from "./User";
// import RepoScreen from "./Repository";
import GlobalStore from "../store/GlobalStore";
import Screen from "../data/enum/Screen";
import SharedStackNavigator from "./shareNavigator";

const MainDrawerNavigator = DrawerNavigator(
    {
        [Screen.HOME]: { screen: HomeScreen },
        [Screen.About]: { screen: AboutScreen },
        [Screen.BugReport]: { screen: BugReportScreen },
        [Screen.Settings]: { screen: SettingsScreen },
        [Screen.Trending]: { screen: SharedStackNavigator },
        [Screen.MyProfile]: { screen: SharedStackNavigator },
        [Screen.MyOrgs]: { screen: SharedStackNavigator },
        [Screen.MyNotices]: { screen: SharedStackNavigator },
        [Screen.MyPinned]: { screen: SharedStackNavigator },
        [Screen.MyRepos]: { screen: SharedStackNavigator },
        [Screen.MyGists]: { screen: SharedStackNavigator },
        [Screen.MyStarred]: { screen: SharedStackNavigator },
        [Screen.User]: { screen: SharedStackNavigator },
        [Screen.Repo]: { screen: SharedStackNavigator }
    },
    {
        contentComponent: props => <LeftMenuScreen {...props} />
    }
);

const LoginStackNavigator = StackNavigator(
    {
        [Screen.LOGIN]: { screen: LoginScreen }
    },
    {
        headerMode: "none"
    }
);

const RootStackNavigator = StackNavigator(
    {
        MainDrawerNavigator: { screen: MainDrawerNavigator },
        LoginScreenStackNavigator: { screen: LoginStackNavigator }
    },
    {
        headerMode: "none",
        mode: "modal"
    }
);

interface RootScreenProps {}

@observer
export default class RootScreen extends React.Component<RootScreenProps> {
    private navigator: StackNavigator;

    refNavigator = nav => {
        this.navigator = nav;
    };

    someEvent() {
        // call navigate for AppNavigator here:
        this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "someRouteName" })
        );
    }

    componentDidMount() {
        console.log("RootScreen", this.navigator.subs);
        const globalStore = GlobalStore.getInstance();
        globalStore.getMePromise().catch(() => {
            this.navigator.dispatch(
                NavigationActions.navigate({
                    routeName: "LoginScreenStackNavigator",
                    params: {}
                })
            );
            GlobalStore.getInstance().changeScreen(Screen.LOGIN);
        });
    }

    render() {
        return <RootStackNavigator ref={this.refNavigator} />;
    }
}
