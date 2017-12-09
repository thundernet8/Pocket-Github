import React from "react";
import { observer } from "mobx-react";
import {
    DrawerNavigator,
    StackNavigator,
    NavigationActions
} from "react-navigation";
import HomeScreen from "./Home";
import LeftMenuScreen from "./LeftMenu";
import LoginScreen from "./Login";
import AboutScreen from "./About";
import MyProfileScreen from "./MyProfile";
import MyOrgsScreen from "./MyOrgs";
import MyNoticesScreen from "./MyNotices";
import MyPinnedScreen from "./MyPinned";
import MyReposScreen from "./MyRepos";
import MyGistsScreen from "./MyGists";
import MyStarredScreen from "./MyStarred";
import SettingsScreen from "./Settings";
import TrendingScreen from "./Trending";
import BugReportScreen from "./BugReport";
import GlobalStore from "../store/GlobalStore";
import Screen from "../data/enum/Screen";

const MainDrawerNavigator = DrawerNavigator(
    {
        [Screen.HOME]: { screen: HomeScreen },
        [Screen.About]: { screen: AboutScreen },
        [Screen.BugReport]: { screen: BugReportScreen },
        [Screen.Settings]: { screen: SettingsScreen },
        [Screen.Trending]: { screen: TrendingScreen },
        [Screen.MyProfile]: { screen: MyProfileScreen },
        [Screen.MyOrgs]: { screen: MyOrgsScreen },
        [Screen.MyNotices]: { screen: MyNoticesScreen },
        [Screen.MyPinned]: { screen: MyPinnedScreen },
        [Screen.MyRepos]: { screen: MyReposScreen },
        [Screen.MyGists]: { screen: MyGistsScreen },
        [Screen.MyStarred]: { screen: MyStarredScreen }
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
