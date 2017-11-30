import React, { Component } from "react";
import { observer } from "mobx-react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
import { Text } from "react-native";
import * as Storage from "./utils/Storage";
import GlobalStore from "./store/GlobalStore";

@observer
export default class App extends Component<{}, {}> {
    componentDidMount() {
        // 顶级入口初始化本地存储
        Storage.init();

        GlobalStore.getInstance().checkLogin();
        GlobalStore.getInstance().signIn("", "");
    }

    render() {
        const { me } = GlobalStore.getInstance();
        return (
            <Container>
                <Header>
                    <Text>{me ? me.name : "Login"}</Text>
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
