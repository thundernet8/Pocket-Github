import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
export default class App extends Component {
    render() {
        return (React.createElement(Container, null,
            React.createElement(Header, null),
            React.createElement(Content, null,
                React.createElement(Form, null,
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Username" })),
                    React.createElement(Item, { last: true },
                        React.createElement(Input, { placeholder: "Password" }))))));
    }
}
