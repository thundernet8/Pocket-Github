import * as React from "react";
import { StyleSheet } from "react-native";
import {
    Container,
    Header,
    Left,
    Body,
    Content,
    Button,
    Icon,
    Title,
    Right,
    Text
} from "native-base";
import IBaseScreenProps from "../../data/interface/IBaseScreenProps";

interface UserScreenProps extends IBaseScreenProps {}

interface UserScreenState {}

export default class UserScreen extends React.Component<
    UserScreenProps,
    UserScreenState
> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("mount UserScreen");
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log("unmount UserScreen");
    }

    render() {
        const { login } = this.props.navigation.state.params;
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack(null)}
                        >
                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>User - {login}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>UserScreen</Text>
                </Content>
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
    }
});
