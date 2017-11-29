import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
// import { Platform, StyleSheet, Text, View } from "react-native";
import * as Keychain from "react-native-keychain";

export default class App extends Component<{}, {}> {
    componentDidMount() {
        Keychain.getGenericPassword()
            .then(credentials => {
                if (typeof credentials !== "boolean") {
                    console.debug(
                        "Credentials successfully loaded for user " +
                            credentials.username
                    );
                }
            })
            .catch(error => {
                console.debug(
                    "Keychain couldn't be accessed! Maybe no value set?",
                    error
                );
            });
    }

    render() {
        console.debug("xxx");
        return (
            <Container>
                <Header>Login</Header>
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
