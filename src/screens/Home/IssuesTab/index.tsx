import * as React from "react";
import { View, Text } from "react-native";
import IBaseScreenProps from "../../../data/interface/IBaseScreenProps";

interface IssuesTabScreenProps extends IBaseScreenProps {}

interface IssuesTabScreenState {}

export default class IssuesTabScreen extends React.Component<
    IssuesTabScreenProps,
    IssuesTabScreenState
> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("IssuesTabScreen - componentDidMount");
        console.log(this.props.navigation.state);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <View>
                <Text>IssuesTabScreen</Text>
            </View>
        );
    }
}
