import * as React from "react";
import { Text } from "react-native";
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Button,
    Icon
} from "native-base";
import IBaseScreenProps from "../../data/interface/IBaseScreenProps";
import GlobalStore from "../../store/GlobalStore";

interface LoginScreenProps extends IBaseScreenProps {}

interface LoginScreenState {}

export default class LoginScreen extends React.Component<
    LoginScreenProps,
    LoginScreenState
> {
    constructor(props) {
        super(props);
    }

    render() {
        const { me } = GlobalStore.getInstance();

        return (
            <Container
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff"
                }}
            >
                <Header>
                    <Text>{me ? me.name : "Login"}</Text>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item>
                            <Input placeholder="Password" />
                        </Item>
                        <Item last>
                            <Button primary full>
                                <Icon name="paper-plane" />
                                <Text>Sign In</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
