import * as React from "react";
import { observer } from "mobx-react";
import { Text, StyleSheet } from "react-native";
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Icon,
    Spinner
} from "native-base";
import { Navigation } from "react-native-navigation";
import IBaseScreenProps from "../../data/interface/IBaseScreenProps";
import GlobalStore from "../../store/GlobalStore";
// import Screen from "../../data/enum/Screen";

interface LoginScreenProps extends IBaseScreenProps {}

interface LoginScreenState {}

@observer
export default class LoginScreen extends React.Component<
    LoginScreenProps,
    LoginScreenState
> {
    constructor(props) {
        super(props);
    }

    requestLogin = () => {
        const globalStore = GlobalStore.getInstance();
        globalStore
            .signIn()
            .then(() => {
                //
                Navigation.dismissAllModals();
            })
            .catch(error => {
                // this.props.navigator.showInAppNotification({
                //     screen: Screen.InAppNotification,
                //     passProps: { message: error.message || error.toString() },
                //     autoDismissTimerSec: 2
                // });
                console.log(error);
            });
    };

    render() {
        const globalStore = GlobalStore.getInstance();
        const { isDoingLogin, loginBtnDisabled } = globalStore;

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Username"
                                onChangeText={globalStore.inputUsername}
                            />
                        </Item>
                        <Item last>
                            <Input
                                placeholder="Password"
                                onChangeText={globalStore.inputPassword}
                            />
                        </Item>
                        <Button
                            dark
                            full
                            style={styles.loginBtn}
                            disabled={loginBtnDisabled}
                            onPress={this.requestLogin}
                        >
                            {isDoingLogin ? (
                                <Spinner />
                            ) : (
                                <Icon name="paper-plane" />
                            )}
                            <Text style={styles.loginText}>Sign In</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

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
