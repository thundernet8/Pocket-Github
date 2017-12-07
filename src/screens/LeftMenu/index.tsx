import * as React from "react";
import { View, Text } from "react-native";

interface LeftMenuScreenProps {}

interface LeftMenuScreenState {}

export default class LeftMenuScreen extends React.Component<
    LeftMenuScreenProps,
    LeftMenuScreenState
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "blue", width: 280 }}>
                <Text style={{ color: "red" }}>LeftMenuScreen</Text>
            </View>
        );
    }
}
