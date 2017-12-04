import * as React from "react";
import { View, Text } from "react-native";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";

interface FeedsTabScreenProps extends IBaseScreenProps {}

interface FeedsTabScreenState {}

export default class FeedsTabScreen extends React.Component<
    FeedsTabScreenProps,
    FeedsTabScreenState
> {
    static navigatorButtons = {};

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
        return (
            <View>
                <Text>FeedsTabScreen</Text>
            </View>
        );
    }
}
