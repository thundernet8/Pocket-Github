var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from "react";
import { observer } from "mobx-react";
import { Text, StyleSheet } from "react-native";
import { Container, Content, Form, Item, Input, Button, Icon, Spinner } from "native-base";
import { Navigation } from "react-native-navigation";
import GlobalStore from "../../store/GlobalStore";
let LoginScreen = class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.requestLogin = () => {
            const globalStore = GlobalStore.getInstance();
            globalStore
                .signIn()
                .then(() => {
                Navigation.dismissAllModals();
            })
                .catch(error => {
                console.log(error);
            });
        };
    }
    render() {
        const globalStore = GlobalStore.getInstance();
        const { isDoingLogin, loginBtnDisabled } = globalStore;
        return (React.createElement(Container, { style: styles.container },
            React.createElement(Content, { style: styles.content },
                React.createElement(Form, null,
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Username", onChangeText: globalStore.inputUsername })),
                    React.createElement(Item, { last: true },
                        React.createElement(Input, { placeholder: "Password", onChangeText: globalStore.inputPassword })),
                    React.createElement(Button, { dark: true, full: true, style: styles.loginBtn, disabled: loginBtnDisabled, onPress: this.requestLogin },
                        isDoingLogin ? (React.createElement(Spinner, null)) : (React.createElement(Icon, { name: "paper-plane" })),
                        React.createElement(Text, { style: styles.loginText }, "Sign In"))))));
    }
};
LoginScreen = __decorate([
    observer,
    __metadata("design:paramtypes", [Object])
], LoginScreen);
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        alignSelf: "stretch",
        paddingLeft: 10,
        paddingRight: 10,
        position: "relative",
        top: "50%",
        marginTop: -100,
        height: 200
    },
    loginBtn: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    loginText: {
        color: "#fff"
    }
});
