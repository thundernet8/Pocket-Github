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

interface AboutScreenProps extends IBaseScreenProps {}

interface AboutScreenState {}

export default class AboutScreen extends React.Component<
    AboutScreenProps,
    AboutScreenState
> {
    constructor(props) {
        super(props);
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
                        <Title>About</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>AboutScreen</Text>
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
