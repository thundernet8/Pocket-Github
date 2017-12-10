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

interface RepoScreenProps extends IBaseScreenProps {
    name: string;
}

interface RepoScreenState {}

export default class RepoScreen extends React.Component<
    RepoScreenProps,
    RepoScreenState
> {
    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.props.navigation.state.params;

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
                        <Title>Repo - {name}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>RepoScreen</Text>
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
