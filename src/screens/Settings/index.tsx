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

interface SettingsScreenScreenProps extends IBaseScreenProps {}

interface SettingsScreenScreenState {}

export default class SettingsScreenScreen extends React.Component<
    SettingsScreenScreenProps,
    SettingsScreenScreenState
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
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>SettingsScreenScreen</Text>
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
