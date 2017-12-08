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
import GlobalStore from "../store/GlobalStore";
import Screen from "../data/enum/Screen";

const MainDrawerNavigator = DrawerNavigator(
    {
        Home: { screen: HomeScreen }
    },
    {
        contentComponent: props => <LeftMenuScreen {...props} />
    }
);

const LoginStackNavigator = StackNavigator(
    {
        Login: { screen: LoginScreen }
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
        console.log("RootScreen", this.props);
        const globalStore = GlobalStore.getInstance();
        globalStore
            .checkLogin()
            .then(result => {
                if (result) {
                    // 已有本地credentials直接请求API获取基本信息
                    return globalStore.signIn();
                } else {
                    throw new Error("");
                }
            })
            .catch(() => {
                this.navigator.dispatch(
                    NavigationActions.navigate({
                        routeName: "LoginScreenStackNavigator"
                    })
                );
                GlobalStore.getInstance().changeScreen(Screen.LOGIN);
            });
    }

    render() {
        return <RootStackNavigator ref={this.refNavigator} />;
    }
}
