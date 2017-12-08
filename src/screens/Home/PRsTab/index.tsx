import * as React from "react";
import { View, Text } from "react-native";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";

interface PullRequestsTabScreenProps extends IBaseScreenProps {}

interface PullRequestsTabScreenState {}

export default class PullRequestsTabScreen extends React.Component<
    PullRequestsTabScreenProps,
    PullRequestsTabScreenState
> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <View>
                <Text>PullRequestsTabScreen</Text>
            </View>
        );
    }
}
