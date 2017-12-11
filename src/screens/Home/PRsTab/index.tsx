import * as React from "react";
import { Text, StyleSheet } from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Button,
    Icon,
    Title,
    Right
} from "native-base";
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
        console.log("PullRequestsTabScreen - componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.navigate("DrawerOpen")
                            }
                        >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>PocketGithub</Title>
                    </Body>
                    <Right />
                </Header>
                <Text>PullRequestsTabScreen</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        margin: 0,
        padding: 0
        // borderWidth: 2,
        // borderColor: "red"
        // height: 600
        // alignItems: "stretch",
        // paddingBottom: 100
    }
});
