import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { Text } from "react-native";
import * as Keychain from "react-native-keychain";
import query from "./data/graphQL/demo.graphql";

export default class App extends Component<{}, {}> {
    componentDidMount() {
        Keychain.getGenericPassword()
            .then(credentials => {
                if (typeof credentials !== "boolean") {
                    console.debug(
                        "Credentials successfully loaded for user " +
                            credentials.username +
                            ":" +
                            credentials.password +
                            ":" +
                            credentials.service
                    );
                } else {
                    throw new Error("Credentials has not been set.");
                }
            })
            .catch(error => {
                console.warn(
                    "Keychain couldn't be accessed! Maybe no value set?",
                    error
                );
                // Keychain.setGenericPassword("thundernet8", "123456");
            });
    }

    render() {
        console.warn(query);
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
