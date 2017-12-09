import * as React from "react";
import { observer } from "mobx-react";
import { StyleSheet, View } from "react-native";
import { NavigationActions } from "react-navigation";
import {
    Container,
    // Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Right,
    Body,
    Thumbnail,
    Button
} from "native-base";
import GlobalStore from "../../store/GlobalStore";
import Screen from "../../data/enum/Screen";
import IBaseScreenProps from "../../data/interface/IBaseScreenProps";

interface LeftMenuScreenProps extends IBaseScreenProps {}

interface LeftMenuScreenState {
    userMenuShow: boolean;
}

@observer
export default class LeftMenuScreen extends React.Component<
    LeftMenuScreenProps,
    LeftMenuScreenState
> {
    constructor(props) {
        super(props);
        this.state = {
            userMenuShow: false
        };
    }

    toggleMenu = () => {
        this.setState({
            userMenuShow: !this.state.userMenuShow
        });
        console.log(this.props);
    };

    signOut = () => {
        const globalStore = GlobalStore.getInstance();
        globalStore.signOut();
        globalStore.changeScreen(Screen.LOGIN);
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: "LoginScreenStackNavigator"
            })
        );
    };

    switchScreen = (screen: Screen) => {
        this.props.navigation.navigate(screen);
        GlobalStore.getInstance().changeScreen(screen);
    };

    renderHeader = () => {
        const globalStore = GlobalStore.getInstance();
        const { me } = globalStore;
        if (!me) {
            return null;
        }

        const { avatarUrl, login, name } = me;
        const { userMenuShow } = this.state;

        return (
            <View style={styles.header}>
                <List>
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: avatarUrl }} />
                        </Left>
                        <Body>
                            <Text>{name}</Text>
                            <Text>{login}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.toggleMenu}>
                                <Icon
                                    name={
                                        userMenuShow
                                            ? "md-arrow-dropup"
                                            : "md-arrow-dropdown"
                                    }
                                />
                            </Button>
                        </Right>
                    </ListItem>
                </List>
            </View>
        );
    };

    renderContent = () => {
        const { userMenuShow } = this.state;
        const globalStore = GlobalStore.getInstance();
        const { currentScreen } = globalStore;
        let lists = [];
        if (userMenuShow) {
            lists = [
                [
                    {
                        action: this.signOut,
                        icon: "md-log-out",
                        text: "Logout"
                    },
                    {
                        screen: Screen.MyPinned,
                        icon: "md-bookmark",
                        text: "Pinned"
                    },
                    {
                        screen: Screen.MyRepos,
                        icon: "md-bookmarks",
                        text: "Repositories"
                    },
                    {
                        screen: Screen.MyStarred,
                        icon: "md-star",
                        text: "Starred"
                    }
                ]
            ];
        } else {
            lists = [
                [
                    {
                        screen: Screen.HOME,
                        icon: "md-home",
                        text: "Home"
                    }
                ],
                [
                    {
                        screen: Screen.MyProfile,
                        icon: "md-person",
                        text: "Profile"
                    },
                    {
                        screen: Screen.MyOrgs,
                        icon: "md-people",
                        text: "Organizations"
                    },
                    {
                        screen: Screen.MyNotices,
                        icon: "md-notifications",
                        text: "Notifications"
                    }
                ],
                [
                    {
                        screen: Screen.MyPinned,
                        icon: "md-bookmark",
                        text: "Pinned"
                    },
                    {
                        screen: Screen.Trending,
                        icon: "md-trending-up",
                        text: "Trending"
                    },
                    {
                        screen: Screen.MyGists,
                        icon: "md-list",
                        text: "Gists"
                    }
                ],
                [
                    {
                        screen: Screen.Settings,
                        icon: "md-settings",
                        text: "Settings"
                    },
                    {
                        screen: Screen.BugReport,
                        icon: "md-bug",
                        text: "Report an issus"
                    },
                    {
                        screen: Screen.About,
                        icon: "md-information-circle",
                        text: "About"
                    }
                ]
            ];
        }

        return (
            <Content style={styles.content}>
                {lists.map((list, listIndex) => {
                    return (
                        <List key={listIndex}>
                            {list.map((item, itemIndex) => {
                                return (
                                    <ListItem
                                        key={itemIndex}
                                        style={[
                                            styles.listItem,
                                            currentScreen === item.screen ||
                                            (item.screen === Screen.HOME &&
                                                currentScreen.startsWith(
                                                    "screen.Home"
                                                ))
                                                ? styles.listItemActive
                                                : null
                                        ]}
                                        icon
                                        onPress={
                                            item.action
                                                ? item.action
                                                : this.switchScreen.bind(
                                                      this,
                                                      item.screen
                                                  )
                                        }
                                    >
                                        <Left>
                                            <Icon
                                                style={[
                                                    currentScreen ===
                                                        item.screen ||
                                                    (item.screen ===
                                                        Screen.HOME &&
                                                        currentScreen.startsWith(
                                                            "screen.Home"
                                                        ))
                                                        ? styles.listIconActive
                                                        : null
                                                ]}
                                                name={item.icon}
                                            />
                                        </Left>
                                        <Body>
                                            <Text
                                                style={[
                                                    currentScreen ===
                                                        item.screen ||
                                                    (item.screen ===
                                                        Screen.HOME &&
                                                        currentScreen.startsWith(
                                                            "screen.Home"
                                                        ))
                                                        ? styles.listTextActive
                                                        : null
                                                ]}
                                            >
                                                {item.text}
                                            </Text>
                                        </Body>
                                    </ListItem>
                                );
                            })}
                        </List>
                    );
                })}
            </Content>
        );
    };

    render() {
        return (
            <Container style={styles.container}>
                {this.renderHeader()}
                {this.renderContent()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0
    },
    header: {
        backgroundColor: "#fff",
        height: 100
    },
    content: {
        flex: 1
    },
    list: {},
    listItem: {
        marginLeft: 0,
        paddingLeft: 15
    },
    listItemActive: {
        // backgroundColor: "#eaeaea"
    },
    listIconActive: {
        color: "#2962FF"
    },
    listTextActive: {
        color: "#2962FF"
    }
});
