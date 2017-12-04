import * as React from "react";
import { View, Text } from "react-native";
export default class FeedsTabScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.navigator.showModal({
            screen: "screen.Login",
            title: "Login",
            passProps: {},
            navigatorStyle: { navBarHidden: true },
            animationType: "slide-up"
        });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null, "FeedsTabScreen")));
    }
}
FeedsTabScreen.navigatorButtons = {};
