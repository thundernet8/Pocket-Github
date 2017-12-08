import React from "react";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import HomeScreen from "./Home";
import LeftMenuScreen from "./LeftMenu";

const EntryRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen }
    },
    {
        contentComponent: props => <LeftMenuScreen {...props} />
    }
);

export default class RootScreen extends React.Component<{}> {
    private navigator: DrawerNavigator;

    refNavigator = nav => {
        this.navigator = nav;
    };

    someEvent() {
        // call navigate for AppNavigator here:
        this.navigator.dispatch(
            NavigationActions.navigate({ routeName: "someRouteName" })
        );
    }

    render() {
        return <EntryRouter ref={this.refNavigator} />;
    }
}
