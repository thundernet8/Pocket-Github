import * as React from "react";
import { Text } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, Icon } from "native-base";
import GlobalStore from "../../store/GlobalStore";
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { me } = GlobalStore.getInstance();
        return (React.createElement(Container, { style: {
                width: "100%",
                height: "100%",
                backgroundColor: "#fff"
            } },
            React.createElement(Header, null,
                React.createElement(Text, null, me ? me.name : "Login")),
            React.createElement(Content, null,
                React.createElement(Form, null,
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Username" })),
                    React.createElement(Item, null,
                        React.createElement(Input, { placeholder: "Password" })),
                    React.createElement(Item, { last: true },
                        React.createElement(Button, { primary: true, full: true },
                            React.createElement(Icon, { name: "paper-plane" }),
                            React.createElement(Text, null, "Sign In")))))));
    }
}
