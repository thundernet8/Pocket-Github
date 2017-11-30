import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { Text } from "react-native";
import * as Keychain from "react-native-keychain";
import * as Storage from "./utils/Storage";
import GlobalStore from "./store/GlobalStore";

export default class App extends Component<{}, {}> {
    componentDidMount() {
        // 顶级入口初始化本地存储
        Storage.init();

        Keychain.getGenericPassword()
            .then(credentials => {
                if (typeof credentials !== "boolean") {
                    GlobalStore.getInstance(credentials);
                } else {
                    throw new Error("Credentials has not been set.");
                }
            })
            .catch(error => {
                console.warn(
                    "Keychain couldn't be accessed! Maybe no value set?",
                    error
                );
            });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>Login</Text>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
