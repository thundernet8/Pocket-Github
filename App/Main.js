var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { Component } from "react";
import { observer } from "mobx-react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { Text } from "react-native";
import * as Storage from "./utils/Storage";
import GlobalStore from "./store/GlobalStore";
let App = class App extends Component {
    componentDidMount() {
        Storage.init();
        GlobalStore.getInstance().checkLogin();
        GlobalStore.getInstance().signIn("", "");
    }
    render() {
        const { me } = GlobalStore.getInstance();
        return (React.createElement(Container, null,
            React.createElement(Header, null,
                React.createElement(Text, null, me ? me.name : "Login")),
            React.createElement(Content, null,
                React.createElement(Form, null,
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Username" })),
                    React.createElement(Item, { last: true },
                        React.createElement(Input, { placeholder: "Password" }))))));
    }
};
App = __decorate([
    observer
], App);
export default App;
