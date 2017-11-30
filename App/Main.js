import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { Text } from "react-native";
import * as Keychain from "react-native-keychain";
import query from "./data/graphQL/demo.graphql";
export default class App extends Component {
    componentDidMount() {
        Keychain.getGenericPassword()
            .then(credentials => {
            if (typeof credentials !== "boolean") {
                console.debug("Credentials successfully loaded for user " +
                    credentials.username +
                    ":" +
                    credentials.password +
                    ":" +
                    credentials.service);
            }
            else {
                throw new Error("Credentials has not been set.");
            }
        })
            .catch(error => {
            console.warn("Keychain couldn't be accessed! Maybe no value set?", error);
        });
    }
    render() {
        console.warn(query);
        return (React.createElement(Container, null,
            React.createElement(Header, null,
                React.createElement(Text, null, "Login")),
            React.createElement(Content, null,
                React.createElement(Form, null,
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Username" })),
                    React.createElement(Item, { last: true },
                        React.createElement(Input, { placeholder: "Password" }))))));
    }
}
